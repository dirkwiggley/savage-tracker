import { Dialog, DialogTitle, DialogContent, Button, styled, Divider, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { EffectNameType } from "./Effects";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AddCounterDlgType = {
  effectName: EffectNameType | null
  openAddCounterDlg: boolean
  handleAddCounter: () => void
  handleNoCounter: () => void
  counter: number
  incCounter: () => void
  decCounter: () => void
}

const AddCounterDlg = (props: AddCounterDlgType) => {
  const { effectName, openAddCounterDlg, handleAddCounter, handleNoCounter, counter, incCounter, decCounter } = props;

  const getEnabledBoxShadow = () => {
    if (counter > 0) return "3";
    return "0";
  }

  const defaultClose = () => {
    handleNoCounter();
  }

  return (
    <Dialog onClose={defaultClose} open={openAddCounterDlg}>
      <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Add a counter to the effect {effectName} ?</DialogTitle>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Box sx={{ border: "1px solid black", margin: 3 }}>
          <Typography variant={"h4"} style={{ textAlign: "center", paddingLeft: 10, paddingRight: 10 }}>{counter}</Typography>
        </Box>
      </div>
      <div style={{ display: "flex" }}>
      <Button
          onClick={decCounter}
          variant="contained"
          disabled={counter === 0}
          style={{
            marginLeft: 3,
            marginRight: 5,
            backgroundColor: grey[300],
            color: "black",
            borderRadius: "15px 0 0 15px",
            width: "49%",
            boxShadow: "3"
          }}>
          <RemoveCircleTwoToneIcon fontSize="large" />
        </Button>
        <Button
          onClick={incCounter}
          variant="contained"
          style={{
            marginLeft: 5,
            marginRight: 3,
            backgroundColor:
              grey[300],
            color: "black",
            borderRadius: "0 15px 15px 0",
            width: "49%",
            boxShadow: "3"
          }}>
          <AddCircleTwoToneIcon fontSize="large" />
        </Button>
      </div>

      <Divider style={{ marginTop: 10 }} />
      <StyledButton
        onClick={handleAddCounter}
        sx={{
          margin: 1,
          boxShadow: getEnabledBoxShadow()
        }}
        disabled={counter === 0}>
        Yes
      </StyledButton>
      <StyledButton
        onClick={() => handleAddCounter()}
        sx={{
          margin: 1,
          boxShadow: "3"
        }}>
        No
      </StyledButton>
    </Dialog>

  )
}
export default AddCounterDlg;