import { Box, Tooltip, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { useNavigate } from "react-router-dom";

type UpPanelPropsType = {
  nav: string
  text: string
}

const UpPanel = (props: UpPanelPropsType) => {
  const { nav, text } = props;

  let navigate = useNavigate();

  return (
    <Tooltip title={"Scroll Down"}>
      <Box onClick={() => navigate(nav)} bgcolor={grey[300]} sx={{ textAlign: "center", width: "100vw" }}>
        <IconButton sx={{ borderRadius: 0 }}>
          <ArrowCircleUpTwoToneIcon fontSize="large" />
        </IconButton>
        <Typography>{text}</Typography>
      </Box>
    </Tooltip>
  );
}
export default UpPanel;