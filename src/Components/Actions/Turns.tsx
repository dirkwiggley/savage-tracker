import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

type TurnPropType = {
  turnCount: number
  incTurnCounter: () => void;
  decTurnCounter: () => void;
}

const Turns = (props: TurnPropType) => {
  const {incTurnCounter, decTurnCounter, turnCount} = props;

  return (
    <Box boxShadow={3} sx={{ borderRadius: "5px" }}>
      <Paper variant="outlined" style={{ backgroundColor: grey[200] }}>
        <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ marginTop: 1 }}>Turn Counter: </Typography>
          </Box>
          <TextField sx={{ width: "50px", marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }} variant="outlined" value={turnCount}></TextField>

        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <IconButton onClick={decTurnCounter} >
            <RemoveCircleTwoToneIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={incTurnCounter} >
            <AddCircleTwoToneIcon fontSize="large" />
          </IconButton>
        </div>
      </Paper>
    </Box>

  );
}

export default Turns;