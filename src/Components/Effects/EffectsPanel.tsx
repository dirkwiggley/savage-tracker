import { useNavigate } from "react-router-dom";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Paper, Stack, Tooltip, Typography, styled } from "@mui/material";
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { EffectNameType, EffectPropType, effectsArray, getEffect } from "./Effects";
import EffectsDisplay from "./EffectsDisplay";
import AddEffectDlg from "./AddEffectDlg";
import { useContext, useEffect, useState } from "react";
import { CharDataType } from "../CharStore/CharData";
import { AppContext } from "../AppContextProvider";
import AddCounterDlg from "./AddCounterDlg";
import UpPanel from "../UpPanel";
import DownPanel from "../DownPanel";
import LockCharacterBtn from "../LockCharacterBtn";

const EffectsPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [openAddEffectDlg, setOpenAddEffectDlg] = useState<boolean>(false);
  const [openAddCounterDlg, setOpenAddCounterDlg] = useState<boolean>(false);
  const [addEffectName, setAddEffectName] = useState<EffectNameType | null>(null);
  const [effectCounter, setEffectCounter] = useState<number>(0);
  const [processEffect, setProcessEffect] = useState<boolean>(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (addEffectName) {
      setOpenAddCounterDlg(true);
    }
  }, [addEffectName]);

  useEffect(() => {
    if (processEffect) {

      setAddEffectName(null);
      setEffectCounter(0);
      setProcessEffect(false);
    }
  }, [processEffect]);

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }

  const getMobile = () => {
    const handleClickAdd = () => {
      setOpenAddEffectDlg(true);
    }

    const handleCloseClickAdd = () => {
      setOpenAddEffectDlg(false);
    }

    const handleAddEffect = (effectName: EffectNameType) => {
      setAddEffectName(effectName);
    }

    const handleRemoveEffect = (effectName: EffectNameType) => {
      let newChar = { ...char };
      let newEffects: Array<EffectPropType> = newChar.effects.filter(effect => effect.name !== effectName);
      newChar.effects = newEffects;
      setChar(newChar);
    }

    const getEffects = () => {
      const charEffArray: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
      const groups: Array<string> = [];
      if (char.effects) {
        char.effects.forEach((effect, index) => {
          const newGroup = effect.name.slice(0, 4);
          if (!groups.includes(newGroup)) {
            groups.push(newGroup);
            if (char.locked) {
              charEffArray.push(
                <div key={index} style={{ marginLeft: 5 }}>
                  <EffectsDisplay name={effect.name} duration={effect.duration} clickHandler={() => { }} />
                </div>)
            } else {
              charEffArray.push(
                <div key={index} style={{ marginLeft: 5 }}>
                  <EffectsDisplay name={effect.name} duration={effect.duration} clickHandler={() => handleRemoveEffect(effect.name)} />
                </div>)
            }
          }
        })
      }
      return <>{charEffArray}</>;
    }

    const getAddEffectsBtn = () => {
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
          <Typography variant="body2" fontWeight={900}>Add Effects</Typography>
        </Button>
      );
    }

    const handleNoCounter = () => {
      setProcessEffect(false);
      setOpenAddCounterDlg(false);
      setEffectCounter(0);
    }

    const handleAddCounter = () => {
      const effectName = addEffectName;
      if (effectName) {
        const newEffect = getEffect(effectName);
        if (newEffect) {
          if (effectCounter) {
            newEffect.duration.counter = effectCounter;
          }
          let newChar: CharDataType = { ...char };
          if (newEffect.remove) {
            newEffect.remove.forEach(removeName => {
              for (let i = 0; i < newChar.effects.length; i++) {
                if (removeName === newChar.effects[i].name) {
                  newChar.effects.splice(1);
                  break;
                }
              }
            })
          }
          newChar.effects.push(newEffect);
          setChar(newChar);
        }
        setAddEffectName(null);
        setEffectCounter(0);
        setOpenAddCounterDlg(false);
      }
    }

    const incCounter = () => {
      setEffectCounter(effectCounter + 1);
    }

    const decCounter = () => {
      if (effectCounter > 0) {
        setEffectCounter(effectCounter - 1);
      }
    }

    return (
      <MobileBox>

        <AddCounterDlg
          effectName={addEffectName}
          handleAddCounter={handleAddCounter}
          openAddCounterDlg={openAddCounterDlg}
          counter={effectCounter}
          incCounter={incCounter}
          decCounter={decCounter}
          handleNoCounter={handleNoCounter}
        />

        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <UpPanel nav='/skills_panel' text='Skills' />

          <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Effects</Typography>
            </Box>

            <AddEffectDlg openDlg={openAddEffectDlg} closeDlg={handleCloseClickAdd} addEffect={handleAddEffect} />
            {getEffects()}

            {getAddEffectsBtn()}

            <LockCharacterBtn />
            
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          </Stack>

          <DownPanel nav='/action_panel' text='Actions' />

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

export default EffectsPanel;