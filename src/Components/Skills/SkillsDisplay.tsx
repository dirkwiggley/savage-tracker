import {DiceNameType} from '../Dice';
import { Box, Typography } from '@mui/material';

import {SkillNameType} from './Skills';

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
