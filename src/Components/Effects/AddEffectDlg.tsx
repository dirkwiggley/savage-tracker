import { useContext, useMemo, useState } from "react";
import { ALL_EFFECT_NAMES, EffectPropType, EffectNameType } from "./Effects";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddEffectDlgProps = {
  openDlg: boolean,
  closeDlg: () => void;
  addEffect: (name: EffectNameType) => void;
}

const AddEffectDlg = (props: AddEffectDlgProps) => {
  const {openDlg, closeDlg, addEffect} = props;
  const [char, setChar] = useContext(AppContext)!;
  
  const allEffectNames: Array<EffectNameType> = ALL_EFFECT_NAMES;
  const charEffectNames: Array<EffectNameType> = [];
  const addEffectNameList: Array<EffectNameType> = [];

  char?.effects?.forEach(effect => {
    charEffectNames.push(effect.name);
  });

  allEffectNames.forEach(effectName => {
    if (!charEffectNames.includes(effectName)) {
      addEffectNameList.push(effectName);
    }
  });
  
  const effectButtons = useMemo(() => {
    const effectButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    const currentEffectNames: Array<EffectNameType> = [];
    if (char.effects) {
      char.effects.forEach(effect => {
        currentEffectNames.push(effect.name);
      });
      addEffectNameList.forEach((effectName, index) => {
        if (!currentEffectNames.includes(effectName)) {
          effectButtons.push(
            <StyledButton key={index} onClick={() => addEffect(effectName)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectName}</StyledButton>
          );
        }
      });
    }
    return effectButtons;
  }, [char]);
  
  const handleCloseAddEffectDlg =  () => {
    closeDlg();
  }
  
  return (
    <Dialog onClose={handleCloseAddEffectDlg} open={openDlg}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Effects to add</DialogTitle>
      <>
        {effectButtons}
      </>
      <StyledButton onClick={handleCloseAddEffectDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddEffectDlg;