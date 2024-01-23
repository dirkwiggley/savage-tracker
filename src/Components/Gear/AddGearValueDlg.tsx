import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, DiceType, EffectValueType, findGearEffectCfgIndexByTypeName, GearEffectConfig, GearEffectType, GearType, getWhenUsed } from "./GearData";
import { AttributeNameType, allAttributeNames, isAttributeName, isAttributeNameType } from "../Attributes/AttribPanel";
import { DiceNameType, allDiceNames, isDiceType } from "../Dice";

const DICE = "dice";
const ATTRIBUTE = "attribute";
const NUMBER = "number";
type SelectedValueType = typeof DICE | typeof ATTRIBUTE | typeof NUMBER;

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddGearValueDlgProps = {
  openDlg: boolean,
  gearName: string,
  gearEffectCfgs: Array<GearEffectConfig>,
  closeDlg: (values?: Array<GearType> | null) => void;
}

const AddGearValueDlg = (props: AddGearValueDlgProps) => {
  const { openDlg, closeDlg, gearName, gearEffectCfgs } = props;
  const [char, setChar] = useContext(AppContext)!;
  const [newGearName, setNewGearName] = useState<string>(gearName);
  const [newGearEffectCfgs, setNewGearEffectCfgs] = useState<Array<GearEffectConfig>>(gearEffectCfgs);
  const [currentEffectCfg, setCurrentEffectCfg] = useState<GearEffectConfig>({...gearEffectCfgs[0]});
  const [currentSelectedValueType, setCurrentSelectedValueType] = useState<SelectedValueType>(DICE);
  const [gear, setGear] = useState<GearType | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [openClearDlg, setOpenClearDlg] = useState<boolean>(false);

  const currentEffectCfgIndexRef = useRef(0);

  useEffect(() => {
    setNewGearName(gearName);
  }, [gearName]);

  useEffect(() => {
    modifyDisplayValue();
  }, [currentEffectCfg, currentEffectCfgIndexRef]);

  const getReferencedGearEffect = (): GearEffectConfig => {
    return newGearEffectCfgs[currentEffectCfgIndexRef.current];
  }

  const getButtonDisabled = (gearEffectType: GearEffectType): boolean => {
    const name = getReferencedGearEffect().typeName;
    if (gearEffectType === name) {
      return true;
    }
    return false;
  }

  /**
   * When this is called we are changing from one effect to another due to
   * a UI button press, so we should copy the currentEffectConfig into the 
   * newGearConfigs state variable, save that, then copy the newly selected 
   * effect config into the currentEffectConfig state variable
   * @param effectCfg: GearEffectConfig, the newly selected GearEffectConfig
   */
  const changeCurrentEffectCfg = (effectCfg: GearEffectConfig) => {
    let geCfgs = [...newGearEffectCfgs];
    let effectToSwapIndex = findGearEffectCfgIndexByTypeName(geCfgs, effectCfg.typeName);
    if (effectToSwapIndex !== undefined) {
      geCfgs[effectToSwapIndex] = effectCfg;
      setNewGearEffectCfgs(geCfgs);
      setCurrentEffectCfg(effectCfg);
      setCurrentSelectedValueType(DICE);
      currentEffectCfgIndexRef.current = effectToSwapIndex;
    }
  }
  
  const getEffectButtons = useMemo(() => {
    const eButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    newGearEffectCfgs.forEach((effectCfg, index) => {
      eButtons.push(
        <StyledButton 
          key={index} 
          onClick={() => changeCurrentEffectCfg(effectCfg)} 
          variant="contained"
          disabled={getButtonDisabled(effectCfg.typeName)}
          sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}
        >
          {effectCfg.typeName}
        </StyledButton>
      );
    });
    return <>{eButtons}</>;
  }, [currentEffectCfg]);

  const getAttributeButtons = useMemo(() => {
    const attribButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allAttributeNames.forEach((attribute, index) => {
      attribButtons.push(
        <StyledButton 
          key={index} 
          onClick={(e) => handleAddValue(attribute)} 
          variant="contained" 
          sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}
        >
          {attribute}
        </StyledButton>
      );
    });
    return <>{attribButtons}</>;
  }, []);

  const getDiceButtons = useMemo(() => {
    const diceButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allDiceNames.forEach((diceName, index) => {
      diceButtons.push(
        <StyledButton 
          key={index} 
          onClick={(e) => handleAddValue(diceName)} 
          variant="contained" 
          sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}
        >
          {diceName}
        </StyledButton>
      );
    });
    return <>{diceButtons}</>;
  }, []);

  const handleTextInput = (e: any) => {
    const value = e.target.value;
    if (typeof Number(value) === "number" || value === "") {
      if (e.keyCode === 13) {
        handleAddValue(value);
      }
    } else {
      alert("Please enter numeric values only");
    }
  }

  const getValueInput = useMemo(() => {
    return (
      <>
        <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, marginTop: 2, paddingLeft: 2, paddingRight: 2}}>
          <Input 
            aria-label="Bonus/Penalty" 
            placeholder="Enter bonus/penalty" 
            onKeyUp={(e) => handleTextInput(e)} 
          />
        </Box>
      </>
    );
  }, []);

  const modifyDiceValue = (value: string, newEffectCfg: GearEffectConfig) => {
    if (newEffectCfg.values!.length === 0) {
      // No values in effectCfg? Make a default one
      newEffectCfg.values!.push(
        {
          diceName: value as DiceNameType,
          quantity: 1
        }
      );
    } else {
      // Find the value in the effectCfg that matches the dice type (value)
      let diceValue: DiceType | null = null;
      for (let i = 0; i < newEffectCfg.values.length; i++) {
        let iterDiceValue = newEffectCfg.values[i];
        if (isDiceType(iterDiceValue as string) && (iterDiceValue as DiceType).diceName === value) {
          diceValue = (iterDiceValue as DiceType);
          break;
        }
      }
      if (diceValue) {
        diceValue.quantity += 1;
      } else {
        // Couldn't find the dice type, make a default one
        diceValue = {
          diceName: value as DiceNameType,
          quantity: 1
        };
        // Add the value we made to the effectCfg
        newEffectCfg.values.push(diceValue);
      }
    }
  }

  const handleAddValue = (value: string) => {
    let geCfgs = [...newGearEffectCfgs];
    // Find the effectCfg with the type name that matches our 
    // current EffectCfg
    let newEffectCfg = {...(getReferencedGearEffect())}
    if (isDiceType(value)) {
      modifyDiceValue(value, newEffectCfg);
    } else if (isAttributeName(value)) {
      // Only allow each attribute once
      let foundValue = false;
      for (let i = 0; i < newEffectCfg.values.length; i++) {
        let currentValue = newEffectCfg.values[i];
        if (isAttributeNameType(currentValue) && currentValue === value) {
          foundValue = true;
          break;
        }
      }
      if (!foundValue) {
        newEffectCfg.values.push(value as AttributeNameType);
      }
    } else if (typeof Number(value) === 'number') {
      // Number bonus/penalty type
      if (typeof Number(value) === 'number') {
        // Only allow one of these values
        let newValue = Number(value);
        let foundValue = false;
        for (let i = 0; i < newEffectCfg.values.length; i++) {
          if (typeof newEffectCfg.values[i] === 'number') {
            newEffectCfg.values[i] = newValue;
            foundValue = true;
            break;
          }
        } 
        if (!foundValue) {
          newEffectCfg.values.push(newValue);
        }
      }
    } else {
      console.error("Invalid value type");
      return;
    }
    setNewGearEffectCfgs(geCfgs);
    setCurrentEffectCfg(newEffectCfg);
  }

  const handleCloseAddGearValueDlg = () => {
    closeDlg();
  }

  /**
   * Handle switching between dice, attributes, and numbers
   * @param valueType 
   */
  const handleSelectedValueTypeChange = (valueType: SelectedValueType) => {
    setCurrentSelectedValueType(valueType);
  }

  const getValueInputs = () => {
    switch (currentSelectedValueType) {
      case "number":
        return getValueInput;
      case "dice":
        return getDiceButtons;
      case "attribute":
        return getAttributeButtons;
      default:
        console.error("Invlaide value type");
    }
  }

  /**
   * The display should be: DiceType [+ AttributeNameType] [+number]
   */
  const modifyDisplayValue = () => {
    let display = "";
    const referencedEffect = getReferencedGearEffect();
    if (referencedEffect?.values && referencedEffect.values.length > 0) {
      // find the dice types
      for (let i = 0; i < referencedEffect?.values.length; i++) {
        let currentValue = referencedEffect?.values[i];
        if (isDiceType(currentValue as string)) {
          if (display !== "") {
            display += " + "
          }
          display += (currentValue as DiceType).quantity + (currentValue as DiceType).diceName;
        }
      }
      // find the attribute types
      for (let i = 0; i < referencedEffect?.values.length; i++) {
        let currentValue = referencedEffect?.values[i];
        if (isAttributeName(currentValue as string)) {
          if (display !== "") {
            display += " + "
          }
          display += currentValue;
        }
      }
      // find the number type
      for (let i = 0; i < referencedEffect.values.length; i++) {        
        let currentValue = referencedEffect?.values[i];
        if (typeof currentValue === 'number') {
          if (display !== "") {
            display += " "
          }
          if (currentValue > 0) {
            display += "+" + currentValue;
          } else if (currentValue < 0) {
            display += currentValue;
          }
          break;
        }
      }
    }
    setDisplayValue(display);
  }

  const checkBeforeOpenClearDlg = () => {
    let referencedEffect = getReferencedGearEffect();
      if (referencedEffect.values.length > 0) {
      setOpenClearDlg(true);
    }
  }

  const clearValues = () => {
    // Copy all of the gear effects
    let geCfgs = [...newGearEffectCfgs];
    // get the referenced effect
    let referencedEffect = getReferencedGearEffect();
    let cfg: GearEffectConfig = {...referencedEffect};
    if (cfg) {
      cfg.values = [];
    }
    // Now swap in the effect with the cleared values for
    // the old one and save those
    let effectToSwapIndex = findGearEffectCfgIndexByTypeName(geCfgs, cfg.typeName);
    if (effectToSwapIndex) {
      geCfgs[effectToSwapIndex] = cfg;
      setNewGearEffectCfgs(geCfgs);
      setCurrentEffectCfg(cfg);
    }
    setOpenClearDlg(false);
  }

  return (
    <Dialog onClose={handleCloseAddGearValueDlg} open={openDlg}>
      <Dialog
        open={openClearDlg}
        onClose={() => setOpenClearDlg(false)}
        aria-labelledby={"clear-dialog"}
      >
        <DialogTitle id="clear-dialog">Clear Values Dialog</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button 
            variant={"contained"}
            onClick={() => setOpenClearDlg(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            onClick={clearValues}
          >
            Clear Values
          </Button>
        </DialogActions>
      </Dialog>
      
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Value to add</DialogTitle>

      {getEffectButtons}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, marginTop: 2 }}>
        <FormControl sx={{ marginLeft: 2, marginRight: 2 }}>
          <FormLabel id="value-type-group-label">Value Type</FormLabel>
          <RadioGroup
            aria-label="value-type-group-label"
            defaultValue={DICE}
            name="value-button-group"
            value={currentSelectedValueType}>
            <FormControlLabel onChange={() => handleSelectedValueTypeChange(DICE)} value="dice" control={<Radio />} label="Dice" sx={{ marginTop: -1 }} />
            <FormControlLabel onChange={() => handleSelectedValueTypeChange(ATTRIBUTE)} value="attribute" control={<Radio />} label="Attribute" sx={{ marginTop: -1 }} />
            <FormControlLabel onChange={() => handleSelectedValueTypeChange(NUMBER)} value="number" control={<Radio />} label="Number" sx={{ marginTop: -1 }} />
          </RadioGroup>
        </FormControl>
      </Box>
      {getValueInputs()}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, minHeight: "2rem", marginTop: 2}}>
        <Typography sx={{textAlign: "center", marginTop: 0.5}}>{displayValue}</Typography>
      </Box>
      <StyledButton onClick={checkBeforeOpenClearDlg} sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>Clear Values</StyledButton>
      <StyledButton onClick={handleCloseAddGearValueDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddGearValueDlg;