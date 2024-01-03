import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const LockCharacterBtn = () => {
  const [char, setChar] = useContext(AppContext)!;

  const handleClickLockChar = () => {
    let newChar = { ...char };
    newChar.locked = !char.locked;
    setChar(newChar);
  }

  const getLockCharBtnText = () => {
    if (char.locked) return "UNLOCK CHARACTER";
    return "LOCK CHARACTER";
  }

  const getButtonColor = () => {
    if (char.locked) return grey[500];
    else return grey[300];
  }
  
  return (
    <div style={{ marginTop: 5, alignContent: "center", alignItems: "center", textAlign: "center" }}>
    <Button
      onClick={handleClickLockChar}
      variant="contained"
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: getButtonColor(),
        color: "black",
        borderRadius: "15px 15px 15px 15px",
        width: "98%"
      }}
    >
      <Typography variant="body2" fontWeight={900}>{getLockCharBtnText()}</Typography>
    </Button>
  </div>
  );
}

export default LockCharacterBtn;