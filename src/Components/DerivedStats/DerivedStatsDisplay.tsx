import { Box, Button, Typography } from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import {D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo} from '../Dice';
import {AGI, SMA, SPI, STR, VIG, AttributeNameType } from "../Attributes/AttribPanel";
import { grey } from "@mui/material/colors";

export const PACE = "Pace";
export const PARRY = "Parry";
export const TOUGHNESS = "Toughness";
export type DerivedStatNames = typeof PACE | typeof PARRY | typeof TOUGHNESS;

export type DerivedStatTypes = {
  name: DerivedStatNames,
  value: number,
  armor?: number,
  modifier?: number
}

export interface typeDerivedPropDisplayType extends DerivedStatTypes {
  incStat: (name: DerivedStatNames) => void,
  decStat: (name: DerivedStatNames) => void,
  locked: boolean
}

const DerivedStatsDisplay = (props: typeDerivedPropDisplayType) => {
  const { name, value, armor, locked, incStat, decStat } = props;

  const getBtns = () => {
    if (!locked) {
      return (
        <>
          <Button onClick={() => incStat(name)} variant="contained" style={{marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "15px 0 0 15px"}}>
            <AddCircleTwoToneIcon fontSize="large" />
          </Button>
          <Button onClick={() => decStat(name)} variant="contained" style={{marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "0 15px 15px 0"}}>
            <RemoveCircleTwoToneIcon fontSize="large" />
          </Button>
        </>
      );
    }
  }

  const getValueDisplay = () => {
    if (armor) {
      return `${value}(${armor})`
    } else {
      return value
    }
  }

  return (
    <div style={{display: "flex", marginTop: 5}}>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", padding: 5, width: "75px" }}>
        <Typography style={{ textAlign: "center" }}>{name}</Typography>
      </Box>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", padding: 5, width: "45px" }}>
        <Typography style={{ textAlign: "center" }}>{getValueDisplay()}</Typography>
      </Box>
      {getBtns()}
    </div>
  );
}

export default DerivedStatsDisplay;