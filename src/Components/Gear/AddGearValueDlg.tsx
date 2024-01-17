import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Box, Button, Dialog, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, DiceType, EffectValueType, GearEffectConfig, GearEffectType, GearType, getWhenUsed } from "../CharStore/CharData";
import { AttributeNameType, allAttributeNames, isAttributeName } from "../Attributes/AttribPanel";
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
  gearEffects: Array<GearEffectType>,
  closeDlg: (values?: Array<GearType> | null) => void;
}

const AddGearValueDlg = (props: AddGearValueDlgProps) => {
  const { openDlg, closeDlg, gearName, gearEffects } = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearValues, setGearValues] = useState<Array<EffectValueType> | null>(null);
  const [currentEffect, setCurrentEffect] = useState<GearEffectType | null>(gearEffects[0]);
  const [currentValueType, setCurrentValueType] = useState<ValueType>(DICE);
  const [gear, setGear] = useState<GearType | null>(null)
  const [currentValueButtons, setCurrentValueButtons] = useState<Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> | null>(null);

  useEffect(() => {    
    setCurrentEffect(gearEffects[0]);
    let newGear: GearType = {
      name: gearName,
      effects: [
      ],
      equipped: false
    };
    setGear(newGear)
  },[gearEffects]);

  const valueButtons = useMemo(() => {
    const valueButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allGearEffectTypes.forEach((effectType, index) => {
      valueButtons.push(
        <StyledButton key={index} onClick={() => handleAddEffect(effectType)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>
      );
    });
    return <>valueButtons</>;
  }, [char]);

  const getEffectButtons = () => {
    const eButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    gearEffects.forEach((effect, index) => {
      eButtons.push(
        <StyledButton key={index} onClick={() => setCurrentEffect(effect)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effect}</StyledButton>
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

  const findCfgByEffectType = (gearTypeName: GearEffectType | null): GearEffectConfig | null=> {
    if (!gearTypeName) return null;

    const len = (gear && gear.effects) ? gear.effects.length : 0;
    for (let i = 0; i < len; i++) {
      let currentEffectTypeName = gear!.effects[i].typeName;
      if (currentEffectTypeName === currentEffect) {
        return gear!.effects[i]
      }
    }
    return null;
  }

  const handleAddValue = (value: string) => {
    let newGear = gear ? {...gear} : {
      name: gearName,
      effects: [],
      equipped: false
    };
  
    if (isDiceType(value)) {
      let gearEffectConfig: GearEffectConfig | null = findCfgByEffectType(currentEffect);
      if (gearEffectConfig === null) {
        let effectCfg: GearEffectConfig = {
          typeName: currentEffect!,
          value: [
            {
              diceName: value as unknown as DiceNameType,
              quantity: 1
            }  
          ],
          whenUsed: getWhenUsed(currentEffect!)
        };
        newGear.effects!.push(effectCfg);
      }
      setGear(newGear);
      console.log(gearEffectConfig, null, 2);
    } else if (isAttributeName(value)) {

    } else if (typeof value === 'number') {

    } else {
      console.error("Invalid value type");
    }
  }

  const handleAddDiceValue = (diceName: DiceNameType) => {

  }

  const handleAddEffect = (effectType: GearEffectType) => {

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
        break;
      case "dice":
        return getDiceButtons;
        break;
      case "attribute":
        return getAttributeButtons;
        break;
      default:
        console.error("Invlaide value type");
    }
  }
  return (
    <Dialog onClose={handleCloseAddGearValueDlg} open={openDlg}>

      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Value to add</DialogTitle>

      {getEffectButtons()}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, marginTop: 2 }}>
        <FormControl sx={{marginLeft: 2, marginRight: 2}}>
          <FormLabel id="value-type-group-label">Value Type</FormLabel>
          <RadioGroup
            aria-label="value-type-group-label"
            defaultValue="dice"
            name="value-button-group">
            <FormControlLabel onChange={() => handleValueTypeChange(DICE)} value="dice" control={<Radio />} label="Dice" sx={{marginTop: -1}} />
            <FormControlLabel onChange={() => handleValueTypeChange(ATTRIBUTE)} value="attribute" control={<Radio />} label="Attribute" sx={{marginTop: -1}} />
            <FormControlLabel onChange={() => handleValueTypeChange(NUMBER)} value="number" control={<Radio />} label="Number" sx={{marginTop: -1}} />
          </RadioGroup>
        </FormControl>
      </Box>
      {getValueButtons()}

      <Box sx={{ border: "1px solid black", marginLeft: 2, marginRight: 2, minHeight: "2rem", marginTop: 2 }} >

      </Box>
      <StyledButton onClick={handleCloseAddGearValueDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddGearValueDlg;