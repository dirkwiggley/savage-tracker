import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { useNavigate } from "react-router-dom";

type DownPanelPropsType = {
  nav: string
  text: string
}

const DownPanel = (props: DownPanelPropsType) => {
  const {nav, text} = props;

  let navigate = useNavigate();

  return (
    <Tooltip title={"Scroll Down"}>
      <Box onClick={() => navigate(nav)} bgcolor={grey[300]} sx={{ textAlign: "center", width: "100vw" }}>
        <IconButton sx={{ borderRadius: 0 }}>
          <ArrowCircleDownTwoToneIcon fontSize="large" />
        </IconButton>
      <Typography>{text}</Typography>
      </Box>
    </Tooltip>
  );
}
export default DownPanel;