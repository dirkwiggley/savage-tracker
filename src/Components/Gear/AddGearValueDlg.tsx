import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Box, Button, Dialog, DialogTitle, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, DiceType, EffectValueType, GearEffectConfig, GearEffectType, GearType, getWhenUsed } from "../CharStore/CharData";
import { AttributeNameType, allAttributeNames, isAttributeName, isAttributeNameType } from "../Attributes/AttribPanel";
import { DiceNameType, allDiceNames, isDiceType } from "../Dice";

const DICE = "dice";
const ATTRIBUTE = "attribute";
const NUMBER = "number";
type ValueType = typeof DICE | typeof ATTRIBUTE | typeof NUMBER;

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
  const [newGearEffectCfgs, setGearEffectCfgs] = useState<Array<GearEffectConfig> | null>(gearEffectCfgs);
  const [currentEffect, setCurrentEffect] = useState<GearEffectConfig | null>(gearEffectCfgs[0]);
  const [currentValueType, setCurrentValueType] = useState<ValueType>(DICE);
  const [gear, setGear] = useState<GearType | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    setNewGearName(gearName);
  }, [gearName]);


  const getEffectButtons = () => {
    const eButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    newGearEffectCfgs?.forEach((effectCfg, index) => {
      eButtons.push(
        <StyledButton key={index} onClick={() => setCurrentEffect(effectCfg)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectCfg.typeName}</StyledButton>
      );
    });
    return <>{eButtons}</>;
  }

  const getAttributeButtons = useMemo(() => {
    const attribButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allAttributeNames.forEach((attribute, index) => {
      attribButtons.push(
        <StyledButton key={index} onClick={() => handleAddValue(attribute)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{attribute}</StyledButton>
      );
    });
    return <>{attribButtons}</>;
  }, []);

  const getDiceButtons = useMemo(() => {
    const diceButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allDiceNames.forEach((diceName, index) => {
      diceButtons.push(
        <StyledButton key={index} onClick={() => handleAddValue(diceName)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{diceName}</StyledButton>
      );
    });
    return <>{diceButtons}</>;
  }, []);

  const handleTextInput = (e: any) => {
    const value = e.target.value;
    if (typeof Number(value) === "number") {
      if (e.key === "Enter") {
        handleAddValue(value);
      }
    } else {
      alert("Please enter numeric values only");
    }
  }

  const getValueInput = useMemo(() => {
    return (
      <>
        <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, marginTop: 2}}>
          <Input aria-label="Bonus/Penalty" placeholder="Enter bonus/penalty" onKeyUp={(e) => handleTextInput(e)} />
        </Box>
      </>
    );
  }, []);

  const modifyDiceValue = (value: string, newEffectCfg: GearEffectConfig) => {
    if (newEffectCfg.values!.length === 0) {
      newEffectCfg.values!.push(
        {
          diceName: value as DiceNameType,
          quantity: 1
        }
      );
    } else {
      let correctValue: DiceType | null = null;
      for (let i = 0; i < newEffectCfg.values.length; i++) {
        let currentValue = newEffectCfg.values[i];
        if (isDiceType(currentValue as string) && (currentValue as DiceType).diceName === value) {
          correctValue = (currentValue as DiceType);
          break;
        }
      }
      if (correctValue) {
        correctValue.quantity += 1;
      } else {
        correctValue = {
          diceName: value as DiceNameType,
          quantity: 1
        };
        newEffectCfg.values.push(correctValue);
        newGearEffectCfgs!.push(newEffectCfg);
      }
    }
  }

  const handleAddValue = (value: string) => {
    let newEffectCfg = newGearEffectCfgs?.find(effectCfg => {
      return effectCfg.typeName === currentEffect?.typeName;
    });
    if (!newEffectCfg) {
      newEffectCfg = {
        typeName: currentEffect!.typeName,
        values: [],
        whenUsed: getWhenUsed(currentEffect!.typeName)
      }
    }
    if (isDiceType(value)) {
      modifyDiceValue(value, newEffectCfg);
    } else if (isAttributeName(value)) {
      let foundValue = false;
      for (let i = 0; i < newEffectCfg.values.length; i++) {
        let currentValue = newEffectCfg.values[i];
        if (isAttributeNameType(currentValue) && currentValue === value) {
          foundValue = true;
          break;
        }
      }
      if (!foundValue) {
        newEffectCfg.values.push(value);
      }
    } else if (typeof value === "string") {
      if (typeof Number(value) === 'number') {
        let newValue = Number(value);
        let foundValue = false;
        for (let i = 0; i < newEffectCfg.values.length; i++) {
          let currentValue = newEffectCfg.values[i];
          if (typeof currentValue === 'number') {
            currentValue = newValue;
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
    getDisplayValue();
  }

  const handleCloseAddGearValueDlg = () => {
    closeDlg();
  }

  const handleValueTypeChange = (valueType: ValueType) => {
    setCurrentValueType(valueType);
  }

  const getValueButtons = () => {
    switch (currentValueType) {
      case "number":
        return getValueInput;
        break;
      case "dice":
        return getDiceButtons;
      case "attribute":
        return getAttributeButtons;
      default:
        console.error("Invlaide value type");
    }
  }

  const getDisplayValue = () => {
    let display = "";
    let newEffectCfg = newGearEffectCfgs?.find(effectCfg => {
      return effectCfg.typeName === currentEffect?.typeName;
    });
    if (newEffectCfg?.values && newEffectCfg.values.length > 0) {
      // find the dice types
      for (let i = 0; i < newEffectCfg?.values.length; i++) {
        let currentValue = newEffectCfg?.values[i];
        if (isDiceType(currentValue as string)) {
          if (display !== "") {
            display += " + "
          }
          display += (currentValue as DiceType).quantity + (currentValue as DiceType).diceName;
        }
      }
      // find the attribute types
      for (let i = 0; i < newEffectCfg?.values.length; i++) {
        let currentValue = newEffectCfg?.values[i];
        if (isAttributeName(currentValue as string)) {
          if (display !== "") {
            display += " + "
          }
          display += currentValue;
        }
      }
      // find the number type
      for (let i = 0; i < newEffectCfg?.values.length; i++) {
        let currentValue = newEffectCfg?.values[i];
        if (typeof currentValue === 'number') {
          if (display !== "") {
            display += " "
          }
          if (currentValue > -1) {
            display += "+" + currentValue;
          } else {
            display += currentValue;
          }
          break;
        }
      }
    }
    setDisplayValue(display);
  }

  return (
    <Dialog onClose={handleCloseAddGearValueDlg} open={openDlg}>

      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Value to add</DialogTitle>

      {getEffectButtons()}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, marginTop: 2 }}>
        <FormControl sx={{ marginLeft: 2, marginRight: 2 }}>
          <FormLabel id="value-type-group-label">Value Type</FormLabel>
          <RadioGroup
            aria-label="value-type-group-label"
            defaultValue="dice"
            name="value-button-group">
            <FormControlLabel onChange={() => handleValueTypeChange(DICE)} value="dice" control={<Radio />} label="Dice" sx={{ marginTop: -1 }} />
            <FormControlLabel onChange={() => handleValueTypeChange(ATTRIBUTE)} value="attribute" control={<Radio />} label="Attribute" sx={{ marginTop: -1 }} />
            <FormControlLabel onChange={() => handleValueTypeChange(NUMBER)} value="number" control={<Radio />} label="Number" sx={{ marginTop: -1 }} />
          </RadioGroup>
        </FormControl>
      </Box>
      {getValueButtons()}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, minHeight: "2rem", marginTop: 2}} >
        <Typography sx={{textAlign: "center", marginTop: 0.5}}>{displayValue}</Typography>
      </Box>
      <StyledButton onClick={handleCloseAddGearValueDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddGearValueDlg;