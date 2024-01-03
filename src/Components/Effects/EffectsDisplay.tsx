import {D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo} from '../Dice';
import { Box, Typography } from '@mui/material';
import { DurationType, EffectNameType } from './Effects';

export type EffectPropTypes = {
  name: EffectNameType,
  duration: DurationType,
}

export interface EffectParentPropTypes extends EffectPropTypes {
  clickHandler: (name: EffectNameType) => void;
}

const EffectDisplay = (props: EffectParentPropTypes) => {
  const {name, duration, clickHandler} = props;

  const getDurationText = () => {
    let text = duration.desc as String;
    if (duration.counter) {
      text = ` ${duration.counter}`;
    } else if (duration.value) {
      text += ` / ${duration.value}`;
    }
    return text;
  }

  return (
    <div style={{display: "flex", marginTop: 5}} onClick={() => clickHandler(name)}>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", padding: 5}}>
        <Typography style={{textAlign: "center", height: "25px" }}>{name}</Typography>
      </Box>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", padding: 5}}>
        <Typography style={{textAlign: "center", height: "25px", marginLeft: "5px", marginRight: "5px" }}>{getDurationText()}</Typography>
      </Box>
    </div>

  );
}

export default EffectDisplay;
