import { Box, Button, Dialog, DialogContentText, DialogTitle, Input, Paper, Tooltip, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CHAR_DATA, CharDataType, getDefaultCharacter, isCharDataType } from "./CharStore/CharData";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContextProvider";
import MobileBox from "./MobileBox";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

const Header = () => {
  const [char, setChar] = useContext(AppContext)!;
  const [openResetDlg, setOpenResetDlg] = useState<boolean>(false);
  const [openIntroDlg, setOpenIntroDlg] = useState<boolean>(true);
  const [editCharName, setEditCharName] = useState<boolean>(false);

  const reset = () => {
    console.log("Resetting local storage data");
    localStorage.removeItem("charData");
    let defaultChar = getDefaultCharacter();
    setChar(defaultChar);
    setOpenResetDlg(false);
  }

  const handleCloseResetDlg = () => {
    setOpenResetDlg(false);
  }

  const handleCloseIntroDlg = () => {
    setOpenIntroDlg(false);
  }

  const updateCharName = () => {
    const inputElement = document.getElementById("charNameInput") as HTMLInputElement;
    let newChar = { ...char } as CharDataType;
    if (newChar) {
      newChar["charName"] = inputElement.value;
      setChar(newChar);
    }
  }

  const getCharNameElement = () => {
    if (editCharName) {
      return (
        <form onSubmit={updateCharName}>
          <input id="charNameInput" style={{ width: "100%" }}></input>
        </form>
      );
    } else {
      return (
        <Typography onClick={() => setEditCharName(true)}>{char?.charName ? char.charName : "Character Name"}</Typography>
      );
    }
  }

  return (
    <MobileBox>
      <Paper variant="outlined" style={{ margin: 0, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw", position: "absolute", left: 0, top: 0 }}>

        <Dialog onClose={handleCloseIntroDlg} open={openIntroDlg}>
          <DialogTitle >Introduction</DialogTitle>
          <DialogContentText style={{marginLeft: 10, marginRight: 10, marginBottom: 5}}>Welcome to the Savage Worlds character tracker. This app is designed for players of the Table Top RPG Savage Worlds to help them keep track of their character during a session. There is no back end server keeping any of the data required here. It is all stored locally on your mobile device. Note that you can reset the character data to a default by clicking on the "Savage Character Tracker" header. Also do refresh your browser when initally launching the app as there are frequent updates.</DialogContentText>
          <StyledButton onClick={handleCloseIntroDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
        </Dialog>

        <Dialog onClose={handleCloseResetDlg} open={openResetDlg}>
          <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Reset Character?</DialogTitle>
          <StyledButton onClick={reset} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Yes</StyledButton>
          <StyledButton onClick={handleCloseResetDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>No</StyledButton>
        </Dialog>

        <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
          <Box bgcolor={grey[300]} style={{ borderRadius: 10, paddingLeft: 10, paddingRight: 10 }} onClick={() => setOpenResetDlg(true)}>
            <Tooltip title={"Click here to reset your character"}>
              <Typography variant="h6">Savage Character Tracker</Typography>
            </Tooltip>
          </Box>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginTop: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5 }}>
            {getCharNameElement()}
          </Box>
        </div>
      </Paper>
    </MobileBox>
  );
}

export default Header;