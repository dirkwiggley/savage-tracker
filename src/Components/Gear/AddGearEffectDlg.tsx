import { useContext, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, Snackbar, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, GearEffectConfig, GearEffectType, GearType } from "../CharStore/CharData";
import { AttributeNameType, allAttributeNames } from "../Attributes/AttribPanel";
import { DiceNameType, allDiceNames } from "../Dice";
import { EffectNameType } from "../Effects/Effects";

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
  closeDlg: () => void;
  addGear: (gear: GearType) => void;
}

const AddGearEffectDlg = (props: AddGearEffectDlgProps) => {
  const {openDlg, closeDlg, addGear} = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearEffects, setGearEffects] = useState<Array<GearEffectType> | null>(null);
  const [openAddEffectDlg, setOpenAddEffectDlg] = useState<boolean>(false);

  const effectButtons = useMemo(() => {
    const effectButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allGearEffectTypes.forEach((effectType, index) => {
      effectButtons.push(
        <StyledButton key={index} onClick={() => handleAddEffect(effectType)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>
      );
    });
    return effectButtons;
  }, [char]);

  const attribButtons = useMemo(() => {
    const attribButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allAttributeNames.forEach((attribute, index) => {
      <StyledButton key={index} onClick={() => handleAddValue(attribute)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{attribute}</StyledButton>
    });
    return attribButtons;
  }, [char]);

  const diceButtons = useMemo(() => {
    const diceButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allDiceNames.forEach((diceName, index) => {
      <StyledButton key={index} onClick={() => handleAddDiceValue(diceName)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{diceName}</StyledButton>
    });
    return attribButtons;
  }, [char]);
 
  const handleAddValue = (attribute: AttributeNameType) => {

  }

  const handleAddDiceValue = (diceName: DiceNameType) => {

  }

  const handleCloseEffect = () => {
    setOpenAddEffectDlg(false);
  }

  const handleAddEffect = (effectType: GearEffectType) => {
    const newEffects: Array<GearEffectType> = gearEffects ? [...gearEffects] : [];
    newEffects.push(effectType);
    setGearEffects(newEffects);
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
      <StyledButton onClick={handleCloseAddGearEffectDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AddGearEffectDlg;