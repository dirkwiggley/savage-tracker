import { Box, Button, IconButton, Typography, inputClasses } from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { grey } from "@mui/material/colors";

import { D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo } from '../Dice';
import { AGI, SMA, SPI, STR, VIG, AttributeNameType } from "./AttribPanel";

export type AttribPropTypes = {
  name: AttributeNameType,
  diceName: DiceNameType,
  modifier?: number
}

export interface AttribParentPropTypes extends AttribPropTypes {
  locked: boolean
  incAttr: (attrName: AttributeNameType, diceName: DiceNameType) => void
  decAttr: (attrName: AttributeNameType, diceName: DiceNameType) => void
}

const AttribDisplay = (props: AttribParentPropTypes) => {
  const { name, diceName, locked, incAttr, decAttr } = props;

  const getBtns = () => {
    if (!locked) {
      return (
        <>
          <Button onClick={() => decAttr(name, diceName)} variant="contained" style={{marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "15px 0 0 15px"}}>
            <RemoveCircleTwoToneIcon fontSize="large" />
          </Button>
          <Button onClick={() => incAttr(name, diceName)} variant="contained" style={{marginLeft: 5, backgroundColor: grey[300], color: "black", borderRadius: "0 15px 15px 0"}}>
            <AddCircleTwoToneIcon fontSize="large" />
          </Button>
        </>
      );
    }
  }

  return (
    <div style={{ display: "flex", marginTop: 5 }}>
      <Box bgcolor={"white"} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", padding: 5, width: "50px" }}>
        <Typography style={{ textAlign: "center" }}>{name}</Typography>
      </Box>
      <Box bgcolor={"white"} boxShadow={3} style={{ border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", padding: 5, width: "45px" }}>
        <Typography style={{ textAlign: "center" }}>{diceName}</Typography>
      </Box>
      {getBtns()}
    </div>
  );
}

export default AttribDisplay;