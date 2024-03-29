import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddGearValueDlgProps = {
  openDlg: boolean,
  closeDlg: (gearName: string | null) => void;
}

const NewGearNameDlg = (props: AddGearValueDlgProps) => {
  const { openDlg, closeDlg } = props;

  const [name, setName] = useState<string>("");

  const handleCloseNewGearNameDlg = () => {
    closeDlg(null);
  }

  const handleNameChange = (newName: string) => {
    setName(newName);
  }
  
  const handleInputKeyUp = (e: any) => {
    let value = e.target.value;
    setName(value);
    let code = e.keyCode;
    if (code === 13) {
      handleCloseNewGearNameDlg();
    }
  }

  const handleSelect = () => {
    closeDlg(name);
  }

  return (
    <Dialog 
      onClose={handleCloseNewGearNameDlg} 
      open={openDlg}
    >
      <DialogTitle style={{ marginTop: 0, marginBottom: -15 }}>Gear Name</DialogTitle>
      <DialogContent style={{ marginTop: 15 }}>
        <TextField 
          id="gear_name" 
          variant={"standard"} 
          label="Gear Name" 
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          onKeyUp={(e) => handleInputKeyUp(e)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '7px',
              height: 50,
              border: '1px solid #F0F0F0',
              color: "black",
              ':hover': {
                border: '0.5px solid black !important',
                boxShadow: '-1px 1px 4px 4px #F0F0F0'
              },
              ':focus-within': { border: '0.5px solid #black !important', color: "black" }
            },
            '& .MuiOutlinedInput-root.Mui-disabled': {
              ':hover': {
                border: '1px solid #F0F0F0 !important',
                boxShadow: 'none'
              }
            },
            cssLabel: {
              color: "#F0F0F0",
              "&.Mui-focused": {
                color: "black"
              },
            }
          }}
        />
      </DialogContent>

      <StyledButton onClick={handleSelect} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Select</StyledButton>
      <StyledButton onClick={handleCloseNewGearNameDlg} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Cancel</StyledButton>
    </Dialog>
  );

}
export default NewGearNameDlg;