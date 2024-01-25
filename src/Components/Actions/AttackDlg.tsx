import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Button, Dialog, DialogTitle, Snackbar, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AllAttackTypes, allGearEffectTypes, GearEffectConfig, GearEffectType, GearType, getWhenUsed, WhenType } from "../Gear/GearData";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AttackDlgProps = {
  openDlg: boolean,
  gearList: Array<GearType>,
  closeDlg: () => void
}

type GearNameWhenType = {
  gearName: string,
  whenType: WhenType,
  effectCfg: GearEffectConfig
};

const AttackDlg = (props: AttackDlgProps) => {
  const {openDlg, gearList, closeDlg} = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearSelected, setGearSelected] = useState<GearNameWhenType | null>();

  const getBtnColor = (gearNameWhenType: GearNameWhenType) => {
    if (gearNameWhenType.gearName === gearSelected?.gearName && gearNameWhenType.whenType === gearSelected.whenType) return grey[600];
    else return grey[400];
  }

  const gearButtons = useMemo(() => {
    const gearBtns: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];

    let attackBtnInfo: Array<GearNameWhenType> = [];
    gearList.forEach(gear => {
      gear.effects.forEach(effect => {
        if (AllAttackTypes.includes(effect.typeName)) {
          attackBtnInfo.push(
            {
              gearName: gear.name,
              whenType: getWhenUsed(effect.typeName),
              effectCfg: effect
            }
          )
        }
      })
    });
    // gearList.forEach((gear, index) => {
    attackBtnInfo.forEach((btnInfo, index) => {
      const gear = gearList.find(gear => { return gear.name === btnInfo.gearName });
      if (gear !== null) {
        gearBtns.push(
          <StyledButton 
            key={index} 
            onClick={() => handleAttack(btnInfo)} 
            variant="contained" 
            sx={{ 
              marginTop: 1, marginLeft: 1, marginRight: 1,
              backgroundColor: getBtnColor(btnInfo) }}>
              {gear!.name} - {btnInfo.whenType}
          </StyledButton>
        );
      }
    });
    return gearBtns;
  }, [gearList, gearSelected]);

  const handleAttack = (gearNameWhenType: GearNameWhenType) => {
    setGearSelected(gearNameWhenType);
    alert(gearSelected?.whenType);
  }

  const handleDamage = () => {
    setGearSelected(null);
  }

  const handleCloseAttackDlg =  () => {
    closeDlg();
  }
  
  const getSelectedGear = (): GearType | null => {
    gearList.find(gear => {
      if (gear.name === gearSelected?.gearName) return gear;
    });
    return null;
  }

  return (
    <Dialog onClose={handleCloseAttackDlg} open={openDlg}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Select Attack Method</DialogTitle>
      <>
        {gearButtons}
      </>
      <StyledButton onClick={handleDamage} disabled={!gearSelected} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Show Damage</StyledButton>
      <StyledButton onClick={handleCloseAttackDlg} sx={{ marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
    </Dialog>
  );
}

export default AttackDlg;