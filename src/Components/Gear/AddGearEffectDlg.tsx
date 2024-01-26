import { useContext, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, Snackbar, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, GearEffectConfig, GearEffectType, getWhenUsed } from "./GearData";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddGearEffectProps = {
  openDlg: boolean,
  gearEffectCfgs: Array<GearEffectConfig>,
  closeDlg: (effects?: Array<GearEffectConfig> | null) => void;
}

const AddGearEffectDlg = (props: AddGearEffectProps) => {
  const {openDlg, gearEffectCfgs, closeDlg} = props;
  const [char, setChar] = useContext(AppContext)!;
  const [newGearEffectCfgs, setNewGearEffectCfgs] = useState<Array<GearEffectConfig>>(gearEffectCfgs);

  const gearEffectCfgsIncludes = (effectType: GearEffectType) => {
    if (!newGearEffectCfgs) return null;
    let isIncluded = false;
    newGearEffectCfgs.forEach(effectCfg => {
      if (effectCfg.typeName === effectType) {
        isIncluded = true;
      }
    });
    return isIncluded;
  }
    
  const effectButtons = useMemo(() => {
    const effectButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allGearEffectTypes.forEach((effectType, index) => {
      if (!newGearEffectCfgs || !(gearEffectCfgsIncludes(effectType))) {
        effectButtons.push(
          <StyledButton key={index} onClick={() => handleAddEffect(effectType)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>
        );
      } else {
        effectButtons.push(<StyledButton key={index} disabled={true} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>)
      }
    });
    return effectButtons;
  }, [char, newGearEffectCfgs]);

  const handleAddEffect = (effectType: GearEffectType) => {
    let newEffectCfg: GearEffectConfig = {
      typeName: effectType,
      values: [],
    }
    const newEffects: Array<GearEffectConfig> = newGearEffectCfgs ? [...newGearEffectCfgs] : [];
    newEffects.push(newEffectCfg);
    setNewGearEffectCfgs(newEffects);
  }

  const handleNext = () => {
    closeDlg(newGearEffectCfgs);
  }

  const handleCloseAddGearEffectDlg =  () => {
    closeDlg();
  }
  
  return (
    <Dialog onClose={handleCloseAddGearEffectDlg} open={openDlg}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Effect to add</DialogTitle>
      <>
        {effectButtons}
      </>
      <StyledButton onClick={handleNext} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Next</StyledButton>
      <StyledButton onClick={handleCloseAddGearEffectDlg} sx={{ marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Cancel</StyledButton>
    </Dialog>
  );
}

export default AddGearEffectDlg;