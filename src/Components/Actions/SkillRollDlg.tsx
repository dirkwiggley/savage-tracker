import { Dialog, DialogTitle, DialogContent, Box, DialogActions, styled, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import { D4, D4_MINUS2 } from "../Dice";
import { PREVENTS, BONUS, PENALTY } from "../Effects/Effects";
import { SKILL_CHECK } from "../Gear/GearData";
import { SkillNameType } from "../Skills/Skills";
import { grey } from "@mui/material/colors";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type SkillRollDlgProps = {
  skillName: SkillNameType
  closeSkillRollDlg: () => void
}

const SkillRollDlg = (props: SkillRollDlgProps) => {
  const {skillName, closeSkillRollDlg} = props;
  const [char] = useContext(AppContext)!;


  const skill = char.skills.find(skill => {
    return skill.name === skillName;
  });
  let modifier: number = 0;
  let diceName = D4;
  if (skill) {
    diceName = skill.diceName;
  } else {
    modifier = -2;
  }
  for (let x = 0; x < char.effects.length; x++) {
    const effectCfg = char.effects[x];
    for (let y = 0; y < effectCfg.effects.length; y++) {
      const currentEffect = effectCfg.effects[y];
      if (currentEffect.when === SKILL_CHECK) {
        if (currentEffect.effectType === PREVENTS) {
          diceName = `Can not be made under the effect of ${effectCfg.name}`;
          modifier = 0;
          break;
        } else if (currentEffect.effectType === BONUS) { 
          modifier += currentEffect.value;
        } else if (currentEffect.effectType === PENALTY) {
          modifier -= currentEffect.value;
        }
      }
    }
  }
  return (
    <Dialog open={true} onClose={closeSkillRollDlg} >
      <DialogTitle>Skill Roll</DialogTitle>
      <DialogContent>
        <Box style={{ border: "1px solid line", textAlign: "center" }}>
          <Typography>
            {skillName} : {diceName} {modifier !== 0 ? modifier > 0 ? `+ ${modifier}` : modifier : null}
          </Typography>
        </Box>
        <StyledButton variant="contained" onClick={closeSkillRollDlg} sx={{marginTop: 2}}>Close</StyledButton>
      </DialogContent>
    </Dialog>
  )
}

export default SkillRollDlg;