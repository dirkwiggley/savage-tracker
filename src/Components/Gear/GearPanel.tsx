import { Box, Button,Divider, Paper, Snackbar, Stack, Tooltip, Typography, } from "@mui/material";
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import GearDisplay from "./GearDisplay";
import { useContext, useEffect, useState } from "react";
import { CharDataType, GearType } from "../CharStore/CharData";
import { AppContext } from "../AppContextProvider";
import AddGearEffectDlg from "./AddGearEffectDlg";
import UpPanel from "../UpPanel";
import LockCharacterBtn from "../LockCharacterBtn";
import NewGearNameDlg from "./NewGearNameDlg";

const NAME_STEP = 0;
const EFFECT_STEP = 1;
const VALUE_STEP = 2;
const UNKNOWN_STEP = 3;
type stepType = typeof NAME_STEP | typeof EFFECT_STEP | typeof VALUE_STEP | typeof UNKNOWN_STEP; 

const GearPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [openNewGearNameDlg, setOpenNewGearNameDlg] = useState<boolean>(false);
  const [openAddGearEffectDlg, setOpenAddGearEffectDlg] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<String | null>(null);
  const [currentStep, setCurrentStep] = useState<stepType>(UNKNOWN_STEP);
  const [gearName, setGearName] = useState<string | null>(null);

  useEffect(() => {
    switch (currentStep) {
      case NAME_STEP:
        setGearName(null);
        setOpenNewGearNameDlg(true);
        break;
      case EFFECT_STEP:
        setOpenAddGearEffectDlg(true);
        break;
      case VALUE_STEP:
        break;
      default:
        setGearName(null);
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

    const handleCloseNewGearNameDlg = () => {
      setOpenNewGearNameDlg(false);
    }

    const handleAddNewGearName = (gearName: string) => {
      setGearName(gearName);
      handleCloseNewGearNameDlg();
      setOpenAddGearEffectDlg(true);
    }

    const handleCloseAddEffectDlg = () => {
      setOpenAddGearEffectDlg(false);
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
      const groups: Array<string> = [];
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

    return (
      <MobileBox>

        <AddGearEffectDlg
          openDlg={openAddGearEffectDlg}
          closeDlg={() => {}}
          addGear={() => {}}
        />
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

            <NewGearNameDlg openDlg={openNewGearNameDlg} closeDlg={handleCloseNewGearNameDlg} addName={handleAddNewGearName} />
            <AddGearEffectDlg openDlg={openAddGearEffectDlg} closeDlg={handleCloseAddEffectDlg} addGear={handleAddGear} />
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