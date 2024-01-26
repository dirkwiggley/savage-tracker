import { Box, Button, Divider, Paper, Snackbar, Stack, Tooltip, Typography, } from "@mui/material";
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
import StockGearDlg from "./StockGear";

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
  const [openStockGearDlg, setOpenStockGearDlg] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<String | null>(null);
  const [currentStep, setCurrentStep] = useState<stepType>(UNKNOWN_STEP);
  const [gearName, setGearName] = useState<string | null>(null);
  const [gearEffectCfgs, setGearEffectCfgs] = useState<Array<GearEffectConfig>>([]);
  const [removeGear, setRemoveGear] = useState<boolean>(false);

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
    const handleClickCustom = () => {
      setCurrentStep(NAME_STEP);
    }

    const handleCloseNewGearNameDlg = (newGearName: string | null = null) => {
      if (newGearName && newGearName !== "") {
        setGearName(newGearName);
        setCurrentStep(EFFECT_STEP);
      } else {
        setCurrentStep(UNKNOWN_STEP);
      }
      setOpenNewGearNameDlg(false);
    }

    const handleCloseAddEffectDlg = (effects: Array<GearEffectConfig> | null = null) => {
      if (effects) {
        setGearEffectCfgs(effects);
        setCurrentStep(VALUE_STEP);
      } else {
        setGearEffectCfgs([]);
        setOpenAddGearEffectDlg(false);
        setCurrentStep(UNKNOWN_STEP);
      }
    }

    const handleCloseGearValueDlg = (newGear: GearType | null = null) => {
      if (newGear) {
        let newChar = { ...char };
        newChar.gear.push(newGear);
        setChar(newChar);
        setOpenAddGearValueDlg(false);
      }
      setCurrentStep(UNKNOWN_STEP);
      setGearEffectCfgs([]);
    }

    const handleOpenStockGearDlg = () => {
      setOpenStockGearDlg(true);
    }

    const handleCloseStockGearDlg = () => {
      setOpenStockGearDlg(false);
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

    const handleClickRemove = () => {
      setRemoveGear(!removeGear);
    }

    const handleGearClick = (gearName: string) => {
      if (removeGear) {
        handleRemoveGear(gearName);
      } else {
        toggleEquipGear(gearName);
      }
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
              <GearDisplay gear={gear} clickHandler={() => handleGearClick(gear.name)} />
            </div>)
        });
      }
      return <>{gearArray}</>;
    }

    const getCustomGearBtn = () => {
      if (char.locked) return null;
      return (
        <Button
          onClick={handleClickCustom}
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
          <Typography variant="body2" fontWeight={900}>Custom Gear</Typography>
        </Button>
      );
    }

    const getStockGearBtn = () => {
      if (char.locked) return null;
      return (
        <Button
          onClick={handleOpenStockGearDlg}
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
          <Typography variant="body2" fontWeight={900}>Stock Gear</Typography>
        </Button>
      );
    }

    const getRemoveGearBtnColor = () => {
      if (removeGear) return grey[400];
      return grey[300];
    }

    const getRemoveGearBtn = () => {
      if (char.locked) return null;
      return (
        <Button
          onClick={handleClickRemove}
          variant="contained"
          style={{
            marginLeft: 5,
            marginRight: 5,
            marginTop: "10px",
            backgroundColor: getRemoveGearBtnColor(),
            color: "black",
            borderRadius: "15px 15px 15px 15px"
          }}
        >
          <Typography variant="body2" fontWeight={900}>Remove Gear</Typography>
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

    const getStockGearDlg = () => {
      if (openStockGearDlg)
        return <StockGearDlg
          openDlg={openStockGearDlg}
          closeDlg={handleCloseStockGearDlg} />
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

            {getStockGearDlg()}
            {getDialog()}
            {getGear()}

            {getStockGearBtn()}
            {getCustomGearBtn()}
            {getRemoveGearBtn()}
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