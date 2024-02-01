import { Button, Dialog, DialogTitle, styled } from "@mui/material";
import { SkillNameType, allNonCombatSkillNames, allSkillNames } from "../Skills/Skills";
import { grey } from "@mui/material/colors";
import { useMemo } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type SkillDlgProps = {
  closeSkillDlg: (skillName?: SkillNameType) => void
}

const SkillDlg = (props: SkillDlgProps) => {
  const { closeSkillDlg } = props;

  const handleCloseShowSkillDlg = (skillName?: SkillNameType) => {
    closeSkillDlg(skillName);
  }

  const skillButtons = useMemo(() => {
    const skillBtns: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allNonCombatSkillNames.forEach((skill, index) => {
      skillBtns.push(
        <StyledButton key={index} onClick={() => handleCloseShowSkillDlg(skill)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{skill}</StyledButton>
      );
    });
    return skillBtns;
  }, []);

  return (
    <Dialog open={true}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Skill Check</DialogTitle>
      <>
        {skillButtons}
      </>
      <StyledButton variant="contained" onClick={() => handleCloseShowSkillDlg()} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default SkillDlg;