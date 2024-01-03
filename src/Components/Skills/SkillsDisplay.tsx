import {D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo} from '../Dice';
import { Box, Typography } from '@mui/material';

import {ATHLETICS, COMMON_KNOWLEDGE, FAITH, FIGHTING, GAMBLING, HEALING, INTIMIDATION, NOTICE, OCCULT, PERFORMANCE, 
  PERSUASION, REPAIR, RESEARCH, RIDING, SCIENCE, SHOOTING, SPELLCASTING, STEALTH, SURVIVAL, TAUNT, THIEVERY, SkillNameType,
  allSkillNames, SkillInfoType} from './Skills';

export type SkillPropTypes = {
  name: SkillNameType,
  diceName: DiceNameType
}

export interface SkillParentPropTypes extends SkillPropTypes {
  clickHandler: (name: SkillNameType) => void;
}

const SkillDisplay = (props: SkillParentPropTypes) => {
  const {name, diceName, clickHandler} = props;

  return (
    <div style={{display: "flex", marginTop: 5}} onClick={() => clickHandler(name)}>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", padding: 5}}>
        <Typography style={{ textAlign: "center", height: "25px"}}>{name}</Typography>
      </Box>
      <Box bgcolor={"white"} boxShadow={3} style={{border: "1px solid black", display: "flex", justifyContent: "center", padding: 5, width: "45px"}}>
      <Typography style={{ textAlign: "center", height: "25px"}}>{diceName}</Typography>
      </Box>
    </div>

  );
}

export default SkillDisplay;
