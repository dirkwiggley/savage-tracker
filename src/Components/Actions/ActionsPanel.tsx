import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, IconButton, Input, Paper, Snackbar, Stack, TextField, Tooltip, Typography } from "@mui/material";
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import Turns from "./Turns";
import { AppContext } from "../AppContextProvider";
import { EffectNameType, EffectPropType } from "../Effects/Effects";
import UpPanel from "../UpPanel";
import DownPanel from "../DownPanel";

export const AGI = "AGI";
export const SMA = "SMA";
export const SPI = "SPI";
export const STR = "STR";
export const VIG = "VIG";
export type AttributeNameType = typeof AGI | typeof SMA | typeof SPI | typeof STR | typeof VIG;


const ActionsPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [turnCounter, setTurnCounter] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<String | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    let newCounter = 0;
    if (char.effects) {
      char.effects.forEach(effect => {
        if (effect.duration.counter && (effect.duration.counter > newCounter)) {
          newCounter = effect.duration.counter;
        }
      });
      setTurnCounter(newCounter);
    }
  }, [char]);

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }

  const incTurnCounter = () => {
    setTurnCounter(turnCounter + 1);
  }

  const decTurnCounter = () => {
    if (turnCounter > 0) {
      setTurnCounter(turnCounter - 1);
    }
    let newChar = {...char};
    let newEffects = new Array<EffectPropType>();
    let effectsEnded = new Array<EffectNameType>();
    newChar.effects.forEach(effect => {
      if (effect.duration.counter) {
        effect.duration.counter -= 1;
        if (effect.duration.counter > 0) {
          newEffects.push(effect);
        } else {
          effectsEnded.push(effect.name);
        }
      } else {
        newEffects.push(effect);
      }
    });
    newChar.effects = newEffects;
    setChar(newChar);
    if (effectsEnded.length > 0) {
      let newMsg = "Effect(s) ended: ";
      for (let i = 0; i < effectsEnded.length; i++) {
        newMsg += effectsEnded[i];
        if (i < effectsEnded.length - 1) {
          newMsg += ", ";
        }
      }
      setSnackbarMsg(newMsg);
      setOpenSnackbar(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarMsg(null);
    setOpenSnackbar(false);
  }

  const getMobile = () => {
    return (
      <MobileBox>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMsg}
        />
        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>

        <UpPanel nav='/effects_panel' text='Effects' />

        <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Actions</Typography>
            </Box>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", marginBottom: "10px" }}>
              <Tooltip title={"Attack"}>
                <Button style={{ width: "60px", height: "60px", background: "#34d5eb", borderRadius: "60px 0 0 60px", marginRight: 10, color: "black" }}>Attack</Button>
              </Tooltip>
              <Tooltip title={"Skill Check"}>
                <Button style={{ width: "60px", height: "60px", background: "white", borderRadius: "0", marginRight: 10, color: "black" }}>Skill</Button>
              </Tooltip>
              <Tooltip title={"Defend"}>
                <Button style={{ width: "60px", height: "60px", background: "#eb5c34", borderRadius: "0 60px 60px 0", color: "black" }}>Defend</Button>
              </Tooltip>
            </div>

            <Divider style={{ marginTop: 10, marginBottom: 10 }} />

            <Turns incTurnCounter={incTurnCounter} decTurnCounter={decTurnCounter} turnCount={turnCounter} />
          </Stack>

          <Divider style={{ marginTop: 10, marginBottom: 5 }} />

          <DownPanel nav='/gear_panel' text='Gear' />
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

export default ActionsPanel;