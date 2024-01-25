import { Box, Button,Divider, Paper, Snackbar, Stack, Tooltip, Typography, } from "@mui/material";
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import GearDisplay from "./GearDisplay";
import { useContext, useEffect, useState } from "react";
import { GearEffectConfig, GearEffectType, GearType } from "./GearData";
import { AppContext } from "../AppContextProvider";
import AddGearEffectDlg from "./AddGearEffectDlg";
import UpPanel from "../UpPanel";
import LockCharacterBtn from "../LockCharacterBtn";
import NewGearNameDlg from "./NewGearNameDlg";
import AddGearValueDlg from "./AddGearValueDlg";

const NAME_STEP = "name_step";
const EFFECT_STEP = "effect_step";
const VALUE_STEP = "value_step";
const UNKNOWN_STEP = "unknown_step";
type stepType = typeof NAME_STEP | typeof EFFECT_STEP | typeof VALUE_STEP | typeof UNKNOWN_STEP; 

const GearPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [openNewGearNameDlg, setOpenNewGearNameDlg] = useState<boolean>(false);
  const [openAddGearEffectDlg, setOpenAddGearEffectDlg] = useState<boolean>(false);
  const [openAddGearValueDlg, setOpenAddGearValueDlg] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<String | null>(null);
  const [currentStep, setCurrentStep] = useState<stepType>(UNKNOWN_STEP);
  const [gearName, setGearName] = useState<string | null>(null);
  const [gearEffectCfgs, setGearEffectCfgs] = useState<Array<GearEffectConfig>>([]);

  useEffect(() => {
    switch (currentStep) {
      case NAME_STEP:
        setGearName(null);
        setOpenNewGearNameDlg(true);
        setOpenAddGearEffectDlg(false);
        setOpenAddGearValueDlg(false);
        break;
      case EFFECT_STEP:
        setOpenNewGearNameDlg(false);
        setOpenAddGearEffectDlg(true);
        setOpenAddGearValueDlg(false);
        break;
      case VALUE_STEP:
        setOpenNewGearNameDlg(false);
        setOpenAddGearEffectDlg(false);
        setOpenAddGearValueDlg(true);
        break;
      default:
        setGearName(null);
        setOpenNewGearNameDlg(false);
        setOpenAddGearEffectDlg(false);
        setOpenAddGearValueDlg(false);
        return;
    }
  }, [currentStep]);

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }

  const getMobile = () => {
    const handleClickAdd = () => {
      setCurrentStep(NAME_STEP);
    }

    const handleCloseNewGearNameDlg = (newGearName: string | null = null) => {
      if (newGearName) {
        setGearName(newGearName);
      }
      setOpenNewGearNameDlg(false);
      setCurrentStep(EFFECT_STEP);
    }

    const handleCloseAddEffectDlg = (effects: Array<GearEffectConfig> | null = null) => {
      if (effects) {
        setGearEffectCfgs(effects);
        setCurrentStep(VALUE_STEP);
      } else {
        setOpenAddGearEffectDlg(false);
      }
    }

    const handleAddGear = (gear: GearType) => {
      let hasGear: boolean = false;
      char.gear.forEach(gear => {
        if (gear.name === gear.name) {
          hasGear = true;
        }
      });
      if (hasGear) {
        setSnackbarMsg(`You already have gear named ${gear.name}, please pick a new name.`);
        setOpenSnackbar(true);
      } else {
        let newChar = {...char};
        newChar.gear.push(gear);
        setChar(newChar);
      }
    }

    const handleCloseGearValueDlg = (newGear: GearType | null = null) => {
      if (newGear) {
        let newChar = {...char};
        newChar.gear.push(newGear);
        setChar(newChar);
        setOpenAddGearValueDlg(false);
      } 
      setCurrentStep(UNKNOWN_STEP);
    }

    const toggleEquipGear = (gearName: string) => {
      let newChar = { ...char };
      newChar.gear.forEach(gear => {
        if (gear.name === gearName) {
          gear.equipped = !gear.equipped;
          if (gear.equipped) {
            setSnackbarMsg("Gear equipped");
          } else {
            setSnackbarMsg("Gear unequipped");
          }
          setOpenSnackbar(true);
        }
      });
      setChar(newChar);
    }

    const handleRemoveGear = (gearName: string) => {
      let newChar = { ...char };
      let newGear: Array<GearType> = newChar.gear.filter(gear => gear.name !== gearName);
      newChar.gear = newGear;
      setChar(newChar);
    }

    const handleCloseSnackbar = () => {
      setSnackbarMsg(null);
      setOpenSnackbar(false);
    }
  
    const getGear = () => {
      const gearArray: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
      if (char.gear) {
        char.gear.forEach((gear, index) => {
          gearArray.push(
            <div key={index} style={{ marginLeft: 5 }}>
              <GearDisplay gear={gear} clickHandler={toggleEquipGear} />
            </div>)
        });
      }
      return <>{gearArray}</>;
    }

    const getAddGearBtn = () => {
      if (char.locked) return null;
      return (
        <Button
          onClick={handleClickAdd}
          variant="contained"
          style={{
            marginLeft: 5,
            marginRight: 5,
            marginTop: "10px",
            backgroundColor: grey[300],
            color: "black",
            borderRadius: "15px 15px 15px 15px"
          }}
        >
          <Typography variant="body2" fontWeight={900}>Add Gear</Typography>
        </Button>
      );
    }

    const getDialog = () => {
      switch (currentStep) {
        case NAME_STEP:
          return <NewGearNameDlg 
                  openDlg={openNewGearNameDlg} 
                  closeDlg={handleCloseNewGearNameDlg} />
        case EFFECT_STEP:
          return <AddGearEffectDlg 
                  openDlg={openAddGearEffectDlg}
                  gearEffectCfgs={gearEffectCfgs}
                  closeDlg={handleCloseAddEffectDlg} />
        case VALUE_STEP:
          return <AddGearValueDlg 
                  openDlg={openAddGearValueDlg} 
                  closeDlg={handleCloseGearValueDlg} 
                  gearName={gearName ? gearName : ""} 
                  gearEffectCfgs={gearEffectCfgs ? gearEffectCfgs : []} />
        default:
          return null;
      }
    }

    return (
      <MobileBox>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMsg}
        />

        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <UpPanel nav='/action_panel' text='Actions' />

          <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Gear</Typography>
            </Box>

            {getDialog()}
            {/* <NewGearNameDlg 
              openDlg={openNewGearNameDlg} 
              closeDlg={handleCloseNewGearNameDlg} />
            <AddGearEffectDlg 
              openDlg={openAddGearEffectDlg} 
              closeDlg={handleCloseAddEffectDlg} />
            <AddGearValueDlg 
              openDlg={openAddGearValueDlg} 
              closeDlg={handleCloseGearValueDlg} 
              gearName={gearName ? gearName : ""} 
              gearEffectCfgs={gearEffectCfgs ? gearEffectCfgs : []} /> */}
            {getGear()}

            {getAddGearBtn()}

            <LockCharacterBtn />

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

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

export default GearPanel;