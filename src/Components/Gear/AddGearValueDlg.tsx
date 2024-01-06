import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { allGearEffectTypes, EffectValueType, GearEffectConfig, GearEffectType, GearType } from "../CharStore/CharData";
import { AttributeNameType, allAttributeNames } from "../Attributes/AttribPanel";
import { DiceNameType, allDiceNames } from "../Dice";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddGearValueDlgProps = {
  openDlg: boolean,
  gearName: string,
  gearEffects: Array<GearEffectType>,
  closeDlg: (values?: Array<GearType> | null) => void;
}

const AddGearValueDlg = (props: AddGearValueDlgProps) => {
  const { openDlg, closeDlg, gearName, gearEffects } = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearValues, setGearValues] = useState<Array<EffectValueType> | null>(null);
  const [currentEffect, setCurrentEffect] = useState<GearEffectType | null>(null);

  const valueButtons = useMemo(() => {
    const valueButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allGearEffectTypes.forEach((effectType, index) => {
      valueButtons.push(
        <StyledButton key={index} onClick={() => handleAddEffect(effectType)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{effectType}</StyledButton>
      );
    });
    return <>valueButtons</>;
  }, [char]);

  const getValueButtons = useMemo(() => {
    const attribButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allAttributeNames.forEach((attribute, index) => {
      <StyledButton key={index} onClick={() => handleAddValue(attribute)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{attribute}</StyledButton>
    });
    return attribButtons;
  }, [char]);

  const getDiceButtons = useMemo(() => {
    const diceButtons: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    allDiceNames.forEach((diceName, index) => {
      <StyledButton key={index} onClick={() => handleAddDiceValue(diceName)} variant="contained" sx={{ marginTop: 1, marginLeft: 1, marginRight: 1 }}>{diceName}</StyledButton>
    });
    return diceButtons;
  }, [char]);

  const handleAddValue = (attribute: AttributeNameType) => {

  }

  const handleAddDiceValue = (diceName: DiceNameType) => {

  }

  const handleAddEffect = (effectType: GearEffectType) => {

  }

  const handleCloseAddGearValueDlg = () => {
    closeDlg();
  }

  return (
      <Dialog onClose={handleCloseAddGearValueDlg} open={openDlg}>

        <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Pick Value to add</DialogTitle>

        {valueButtons}

        <StyledButton onClick={handleCloseAddGearValueDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
      </Dialog>
  );
}

export default AddGearValueDlg;