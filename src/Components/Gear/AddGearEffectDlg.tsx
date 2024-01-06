import { useContext, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, Snackbar, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, GearEffectConfig, GearEffectType, GearType } from "../CharStore/CharData";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddGearEffectDlgProps = {
  openDlg: boolean,
  closeDlg: (effects?: Array<GearEffectType> | null) => void;
  addGear: (gear: GearType) => void;
}

const AddGearEffectDlg = (props: AddGearEffectDlgProps) => {
  const {openDlg, closeDlg, addGear} = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearEffects, setGearEffects] = useState<Array<GearEffectType> | null>(null);

  const effectButtons = useMemo(() => {
    const effectButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allGearEffectTypes.forEach((effectType, index) => {
      if (!gearEffects?.includes(effectType)) {
        effectButtons.push(
          <StyledButton key={index} onClick={() => handleAddEffect(effectType)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>
        );
      }
    });
    return effectButtons;
  }, [char, gearEffects]);

  const handleAddEffect = (effectType: GearEffectType) => {
    const newEffects: Array<GearEffectType> = gearEffects ? [...gearEffects] : [];
    newEffects.push(effectType);
    setGearEffects(newEffects);
  }

  const handleCloseAddGearEffectDlg =  () => {
    closeDlg(gearEffects);
  }
  
  return (
    <Dialog onClose={handleCloseAddGearEffectDlg} open={openDlg}>

      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Effect to add</DialogTitle>
      <>
        {effectButtons}
      </>
      <StyledButton onClick={handleCloseAddGearEffectDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddGearEffectDlg;