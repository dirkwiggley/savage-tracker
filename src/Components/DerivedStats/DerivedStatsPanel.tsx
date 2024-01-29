import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";

import DerivedStatsDisplay, { DerivedStatNames, DerivedStatTypes, PACE, PARRY, TOUGHNESS } from "./DerivedStatsDisplay";
import { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import { FIGHTING } from "../Skills/Skills";
import { findDiceNumberValue } from "../Dice";
import { VIG } from "../Attributes/AttribPanel";
import { CharDataType } from "../CharStore/CharData";
import DownPanel from "../DownPanel";
import UpPanel from "../UpPanel";
import LockCharacterBtn from "../LockCharacterBtn";
import { getArmor, getShield, getToughnessAndArmor } from "../Gear/GearData";

const DerivedStatsPanel = () => {
  const [char, setChar] = useContext(AppContext)!;

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }

  // TODO: 
  const calcPace = (): number => {
    const pace = char.derivedStats.find(stat => stat.name === PACE);
    let value = pace!.value;
    if (pace?.modifier) {
      value += pace.modifier;
    }
    return value;
  }

  // TODO:
  const calcParry = (): number => {
    const fighting = char.skills.find(skill => skill.name === FIGHTING);
    const parry = char.derivedStats.find(stat => stat.name === PARRY);
    let modifier = parry!.modifier ? parry!.modifier : 0;
    if (fighting) {
      const fightingValue = findDiceNumberValue(fighting.diceName);
      let value = Math.round(fightingValue / 2) + 2;
      return value + modifier;
    };
    return 2 + modifier;
  }

  const calcToughness = (): number => {
    const vigor = char.attributes.find(attr => attr.name === VIG);
    const toughness = char.derivedStats.find(stat => stat.name === TOUGHNESS);
    let modifier = toughness!.modifier ? toughness!.modifier : 0;
    const gearToughnessAndArmor = getToughnessAndArmor(char);
    if (vigor) {
      const vigorValue = findDiceNumberValue(vigor.diceName);
      let value = Math.round(vigorValue / 2) + 2;
      return value + modifier + gearToughnessAndArmor.toughness + gearToughnessAndArmor.armor;
    }
    return -1;
  }

  const incStat = (derivedName: DerivedStatNames) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let derivedStat: DerivedStatTypes = newChar.derivedStats!.find(stat => stat.name === derivedName)!;
      if (derivedStat.modifier) {
        derivedStat.modifier += 1;
      } else {
        derivedStat.modifier = 1;
      }
      setChar(newChar);
    }
  }

  const decStat = (derivedName: DerivedStatNames) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let derivedStat: DerivedStatTypes = newChar.derivedStats!.find(stat => stat.name === derivedName)!;
      if (derivedStat.modifier) {
        derivedStat.modifier -= 1;
      } else {
        derivedStat.modifier = -1;
      }
      setChar(newChar);
    }
  }

  const getMobile = () => {
    return (
      <MobileBox>
        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <UpPanel nav='/' text='Attributes' />

          <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Derived Statistics</Typography>
            </Box>

            <div style={{ marginLeft: 5 }}>
              <DerivedStatsDisplay name={PACE} value={calcPace()} locked={char.locked} incStat={() => incStat(PACE)} decStat={() => decStat(PACE)} />
            </div>
            <div style={{ marginLeft: 5 }}>
              <DerivedStatsDisplay name={PARRY} value={calcParry()} shield={getShield(char)} locked={char.locked} incStat={() => incStat(PARRY)} decStat={() => decStat(PARRY)} />
            </div>
            <div style={{ marginLeft: 5 }}>
              <DerivedStatsDisplay name={TOUGHNESS} value={calcToughness()} armor={getArmor(char)} locked={char.locked} incStat={() => incStat(TOUGHNESS)} decStat={() => decStat(TOUGHNESS)} />
            </div>

            <LockCharacterBtn />

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          </Stack>

          <DownPanel nav='/token_panel' text='Tokens' />

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

export default DerivedStatsPanel;