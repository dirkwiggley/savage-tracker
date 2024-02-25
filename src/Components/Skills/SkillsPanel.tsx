import { Box, Button, Dialog, DialogTitle, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { styled } from '@mui/material/styles';
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import { incDice, decDice, D4 } from '../Dice';
import { SkillNameType, allSkillNames } from "./Skills";
import SkillDisplay from './SkillsDisplay';
import { useContext, useEffect, useState } from "react";
import { CharDataType } from "../CharStore/CharData";
import { AppContext } from "../AppContextProvider";
import DownPanel from "../DownPanel";
import UpPanel from "../UpPanel";
import LockCharacterBtn from "../LockCharacterBtn";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

const StyledCloseButton = styled(Button)(({ theme }) => ({
  maxWidth: "45%",
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

const SkillsPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [openAddSkillDlg, setOpenAddSkillDlg] = useState<boolean>(false);
  const [skillToAdd, setSkillToAdd] = useState<SkillNameType | null | undefined>();
  const [removeSkills, setRemoveSkills] = useState<boolean>(false);
  const [openModDlg, setOpenModDlg] = useState<boolean>(false);
  const [modSkill, setModSkill] = useState<SkillNameType | null | undefined>();
  const [openRemoveSkillDlg, setOpenRemoveSkillDlg] = useState<boolean>(false);

  useEffect(() => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let charSkills = newChar.skills;
      if (skillToAdd) {
        charSkills?.push({ name: skillToAdd, diceName: D4 });
        setChar(newChar);
        setSkillToAdd(null);
      }
    }
  }, [skillToAdd]);

  const getSkills = () => {
    const skills: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    char?.skills.forEach(skill => {
      if (char.locked) {
        skills.push(
          <div key={skill.name} style={{ marginLeft: 5 }}>
            <SkillDisplay name={skill.name} diceName={skill.diceName} clickHandler={() => {}} />
          </div>
        )
      } else {
        skills.push(
          <div key={skill.name} style={{ marginLeft: 5 }}>
            <SkillDisplay name={skill.name} diceName={skill.diceName} clickHandler={handleClickSkill} />
          </div>
        )
      }
    });
    return <>{skills}</>;
  }

  const handleClickSkill = (name: SkillNameType) => {
    setModSkill(name);
    if (removeSkills) {
      setOpenRemoveSkillDlg(true);
    } else {
      setOpenModDlg(true);
    }
  }

  const handleCloseModDlg = () => {
    setOpenModDlg(false);
    setModSkill(null);
  }

  const incSkill = (name: SkillNameType) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let incSkill = newChar.skills?.find(skill => name === skill.name);
      if (incSkill) {
        let newDiceName = incDice(incSkill?.diceName!);
        if (newDiceName !== incSkill?.diceName) {
          incSkill.diceName = newDiceName;
          setChar(newChar);
        }
      } else {
        console.error("Could not find skill to increment");
      }
    }
  }

  const decSkill = (name: SkillNameType) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let decSkill = newChar.skills?.find(skill => name === skill.name);
      if (decSkill) {
        let newDiceName = decDice(decSkill?.diceName!);
        if (newDiceName !== decSkill?.diceName) {
          decSkill.diceName = newDiceName;
          setChar(newChar);
        }
      } else {
        console.error("Could not find skill to decrement");
      }
    }
  }

  const removeSkill = () => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      newChar.skills?.forEach((skill, index) => {
        if (skill.name === modSkill) {
          newChar!.skills?.splice(index, 1);
        }
      });
      setModSkill(null);
      setOpenRemoveSkillDlg(false);
      setChar(newChar);
    }
  }

  const handleCloseAddSkillDlg = () => {
    setOpenAddSkillDlg(false);
  }

  const handleCloseRemoveSkillDlg = () => {
    setOpenRemoveSkillDlg(false);
  }

  const addSkill = (name: SkillNameType) => {
    setSkillToAdd(name);
  }

  const getAddSkillDlg = () => {
    const charSkills: Array<SkillNameType> = new Array<SkillNameType>();
    char?.skills.forEach(skill => {
      charSkills.push(skill.name);
    });
    let addSkillList: Array<SkillNameType> = new Array<SkillNameType>();
    allSkillNames.forEach(skillName => {
      if (!charSkills.includes(skillName)) {
        addSkillList.push(skillName);
      }
    });

    const skillButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    addSkillList.forEach((skill, index) => {
      skillButtons.push(
        <StyledButton key={index} onClick={() => addSkill(skill)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{skill}</StyledButton>
      );
    });
    return (
      <Dialog onClose={handleCloseAddSkillDlg} open={openAddSkillDlg}>
        <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Skills to add</DialogTitle>
        <>
          {skillButtons}
        </>
        <StyledButton variant="contained" onClick={handleCloseAddSkillDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
      </Dialog>
    );
  }

  const getRemoveSkillDlg = () => {
    return (
      <Dialog onClose={handleCloseRemoveSkillDlg} open={openRemoveSkillDlg}>
        <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Remove {modSkill}?</DialogTitle>
        <StyledButton onClick={removeSkill} sx={{ marginTop: 1, marginBottom: 1 }}>Remove</StyledButton>
        <StyledButton onClick={handleCloseRemoveSkillDlg} sx={{ marginTop: 1, marginBottom: 1 }}>Cancel</StyledButton>
      </Dialog>
    );
  }

  const getModDlg = () => {
    const skill = char?.skills.find(skill => skill.name === modSkill);
    const skillName = skill?.name;
    const diceName = skill?.diceName;
    return (
      <Dialog onClose={handleCloseModDlg} open={openModDlg}>
        <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>{modSkill} {diceName}</DialogTitle>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <IconButton onClick={() => decSkill(skillName!)}>
            <RemoveCircleTwoToneIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => incSkill(skillName!)}>
            <AddCircleTwoToneIcon fontSize="large" />
          </IconButton>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <StyledCloseButton onClick={handleCloseModDlg} sx={{ marginTop: 1, marginBottom: 1 }}>Close</StyledCloseButton>
        </div>
      </Dialog>
    );
  }

  const handleAddSkills = () => {
    setOpenAddSkillDlg(true);
  }

  const handleRemoveSkills = () => {
    setRemoveSkills(!removeSkills);
  }

  const getRemoveSkillsBtnColor = () => {
    if (removeSkills) {
      return grey[500];
    } else {
      return grey[300];
    }
  }

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }
  const getAddRemoveBtns = () => {
    if (char.locked) return null;
    return (
      <div style={{ display: "flex", marginTop: "10px", alignContent: "center", alignItems: "center" }}>
        <Button onClick={handleAddSkills} variant="contained" style={{ marginLeft: 5, marginRight: 5, marginTop: 5, backgroundColor: grey[300], color: "black", width: "100%", borderRadius: "15px" }}>
          <Typography variant="body2">Add</Typography>
        </Button>
        <Button onClick={handleRemoveSkills} variant="contained" style={{ marginLeft: 5, marginRight: 15, marginTop: 5, backgroundColor: getRemoveSkillsBtnColor(), color: "black", width: "100%", borderRadius: "15px" }}>
          <Typography variant="body2">Remove</Typography>
        </Button>
      </div>
    );
  }

  const getMobile = () => {
    return (
      <MobileBox>
        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <UpPanel nav='/token_panel' text='Tokens' />

          <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            {getAddSkillDlg()}
            {getModDlg()}
            {getRemoveSkillDlg()}

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Skills</Typography>
            </Box>

            {getSkills()}
            {getAddRemoveBtns()}

            <LockCharacterBtn />

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

            <DownPanel nav='/effects_panel' text='Effects' />
          </Stack>
        </Paper>
      </MobileBox>
    );
  }

  return (
    <>
      {getMobile()}
      {getNonMobile()}
    </>
  );
}

export default SkillsPanel;