import { Box, Button, Typography } from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { grey } from "@mui/material/colors";
import { useState } from "react";

export const HEALTH = "Health";
export const BENNIES = "Bennies";
export const POWER = "Power";
export type TokenNames = typeof HEALTH | typeof BENNIES | typeof POWER;

export type TokenPropTypes = {
  name: TokenNames,
  value: number,
  setValue: (newValue: number) => void,
  modChar: boolean,
}

const TokenDisplay = (props: TokenPropTypes) => {
  const { name, value, setValue, modChar } = props;

  const add = () => {
    setValue(value + 1);
  }

  const remove = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  }

  const getBtns = () => {
    if (modChar) {
      return (
        <>
          <Button onClick={remove} variant="contained" style={{ marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "15px 0 0 15px" }}>
            <RemoveCircleTwoToneIcon fontSize="large" />
          </Button>
          <Button onClick={add} variant="contained" style={{ marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "0 15px 15px 0" }}>
            <AddCircleTwoToneIcon fontSize="large" />
          </Button>
        </>
      );
    }
  }

  return (
    <div style={{ display: "flex", marginTop: 5 }}>
      <Box bgcolor={"white"} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 5, paddingLeft: 3, paddingRight: 3, width: "60px" }}>
        <Typography style={{ textAlign: "center", height: "25px"}}>{name}</Typography>
      </Box>
      <Box bgcolor={"white"} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 5, width: "40px" }}>
        <Typography style={{ textAlign: "center", height: "25px"}}>{value}</Typography>
      </Box>
      {getBtns()}
    </div>
  );
}

export default TokenDisplay;