import { AttributeNameType, isAttributeName } from '../Attributes/AttribPanel';
import { GearType, DiceType, isDiceType, EffectValueType } from './GearData';
import { Box, Tooltip, Typography } from '@mui/material';

export interface GearParentPropTypes {
  gear: GearType,
  clickHandler: (gearName: string) => void;
}

const GearDisplay = (props: GearParentPropTypes) => {
  const { gear, clickHandler } = props;

  const getTitle = () => {
    return "Generic gear"
  }

  const getGearDescription = (): string => {
    let effectString = "";
    for (let index = 0; index < gear.effects.length; index++) {
      const effect = gear.effects[index];
      effectString += effect.typeName + ": ";
      effect.values?.forEach((value: EffectValueType, index: number) => {
        if (index > 0) {
          effectString += " + ";
        }
        if (isDiceType(value)) {
          effectString += value.quantity + value.diceName;
        } else if (typeof value === "number") {
          effectString += value;
        } else if (isAttributeName(value)) {
          effectString += value;
        } else {
          console.error("Bad gear type");
          alert("Bad Gear Type");
        }
      });
      if (index < gear.effects.length - 1) {
        effectString += " | ";
      }
    }
    return effectString;
  }

  const getGearColor = () => {
    if (gear.equipped) {
      return "#5CED73";
    }
    return "white";
  }

  return (
    <Tooltip title={getTitle()}>
      <div style={{ display: "flex", marginTop: 5 }} onClick={() => clickHandler(gear.name)}>
        <Box bgcolor={getGearColor()} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", padding: 5 }}>
          <Typography style={{ textAlign: "center", height: "25px" }}>{gear.name}</Typography>
        </Box>
        <Box bgcolor={getGearColor()} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", padding: 5 }}>
          <Typography style={{ textAlign: "center", marginLeft: "5px", marginRight: "5px" }}>{getGearDescription()}</Typography>
        </Box>
      </div>
    </Tooltip>

  );
}

export default GearDisplay;
