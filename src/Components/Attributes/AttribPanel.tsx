import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";

import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";
import AttribDisplay, { AttribPropTypes } from "./AttribDisplay";
import { D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo } from '../Dice';
import { CHAR_DATA, CharDataType, getDefaultCharacter } from "../CharStore/CharData";
import { useContext, useEffect, useMemo, useState } from "react";
import { decDice, incDice } from '../Dice';
import { AppContext } from "../AppContextProvider";
import DownPanel from "../DownPanel";
import LockCharacterBtn from "../LockCharacterBtn";

export const AGI = "AGI";
export const SMA = "SMA";
export const SPI = "SPI";
export const STR = "STR";
export const VIG = "VIG";
export type AttributeNameType = typeof AGI | typeof SMA | typeof SPI | typeof STR | typeof VIG;
export const allAttributeNames: Array<AttributeNameType> = [AGI, SMA, SPI, STR, VIG];
export const isAttributeName = (value: string): value is AttributeNameType => {
   return allAttributeNames.includes(value as AttributeNameType);
}
const AttribPanel = () => {
  const [char, setChar] = useContext(AppContext)!;

  const incAttr = (attrName: AttributeNameType, diceName: DiceNameType) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let attr: AttribPropTypes = newChar.attributes!.find(attribute => attribute.name === attrName)!;
      attr.diceName = incDice(diceName);
      setChar(newChar);
    }
  }

  const decAttr = (attrName: AttributeNameType, diceName: DiceNameType) => {
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      let attr: AttribPropTypes = newChar.attributes!.find(attribute => attribute.name === attrName)!;
      attr.diceName = decDice(diceName);
      setChar(newChar);
    }
  }

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        <Box style={{ border: "1px solid line", textAlign: "center", marginTop: 20 }}>
          <Typography variant={"h3"}>This application currently only runs under mobile devices. Either adjust your viewing settings to conform to a mobile form factor reopen this application on a mobile device. </Typography>
        </Box>
      </NonMobileBox>
    )
  }

  const attribs = useMemo(() => {
    const attributes: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];
    char?.attributes?.forEach(attr =>
      attributes.push(
        <div key={attr.name} style={{ marginLeft: 5 }}>
          <AttribDisplay name={attr.name} diceName={attr.diceName} locked={char.locked} incAttr={incAttr} decAttr={decAttr} />
        </div>
      ));
    return <>{attributes}</>;
  }, [char]);

const getMobile = () => {
    return (
      <MobileBox>
        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Attributes</Typography>
            </Box>

            {attribs}

            <LockCharacterBtn />

            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          </Stack>

          <DownPanel nav='/calc_panel' text='Derived Statistics' />

        </Paper>
      </MobileBox>
    );
  }

  return (
    <>
      {getMobile()}
      {getNonMobile()}
    </>
  )
}

export default AttribPanel;