import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import MobileBox from "../MobileBox";
import NonMobileBox from "../NonMobilebox";
import { grey } from "@mui/material/colors";

import TokenDisplay, { BENNIES, HEALTH, POWER } from "./TokenDisplay";
import { useContext } from "react";
import { CharTokenType, isCharDataType } from "../CharStore/CharData";
import { AppContext } from "../AppContextProvider";
import DownPanel from "../DownPanel";
import UpPanel from "../UpPanel";
import LockCharacterBtn from "../LockCharacterBtn";

const TokenPanel = () => {
  const [char, setChar] = useContext(AppContext)!;
  
  let navigate = useNavigate();

  const getNonMobile = () => {
    return (
      <NonMobileBox>
        NonMobileBox
      </NonMobileBox>
    )
  }

  const setBennies = (newValue: number) => {
    let newChar = { ...char };
    if (isCharDataType(newChar)) {
      let newTokens: Array<CharTokenType> = [];
      newChar.tokens.forEach(token => {
        if (token.name === BENNIES) {
          let newToken = { ...token };
          newToken.value = newValue;
          newTokens.push(newToken);
        } else {
          newTokens.push({...token});
        }
      });
      newChar.tokens = newTokens;
      setChar(newChar);
    }
  }

  const getHealth = () => {
    const token = char.tokens.find(token => {
      return token.name === HEALTH;
    });
    if (token) {
      return token.value;
    }
    return 0;
  }

  const setHealth = (newValue: number) => {
    let newChar = { ...char };
    if (isCharDataType(newChar)) {
      let newTokens: Array<CharTokenType> = [];
      newChar.tokens.forEach(token => {
        if (token.name === HEALTH) {
          let newToken = { ...token };
          newToken.value = newValue;
          newTokens.push(newToken);
        } else {
          newTokens.push({...token});
        }
      });
      newChar.tokens = newTokens;
      setChar(newChar);
    }
  }

  const getPower = () => {
    const token = char.tokens.find(token => {
      return token.name === POWER;
    });
    if (token) {
      return token.value;
    }
    return 0;
  }

  const setPower = (newValue: number) => {
    let newChar = { ...char };
    if (isCharDataType(newChar)) {
      let newTokens: Array<CharTokenType> = [];
      newChar.tokens.forEach(token => {
        if (token.name === POWER) {
          let newToken = { ...token };
          newToken.value = newValue;
          newTokens.push(newToken);
        } else {
          newTokens.push({...token});
        }
      });
      newChar.tokens = newTokens;
      setChar(newChar);
    }
  }

  const getBennies = () => {
    const token = char.tokens.find(token => {
      return token.name === BENNIES;
    });
    if (token) {
      return token.value;
    }
    return 0;
  }

  const getMobile = () => {
    return (
      <MobileBox>
        <Paper variant="outlined" style={{ marginTop: 85, marginLeft: -8, backgroundColor: grey[400], minWidth: "100vw", maxWidth: "100vw" }}>
          <UpPanel nav='/calc_panel' text="Derived Statistics" />

          <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          <Stack style={{ marginLeft: 5, marginRight: 5 }}>

            <Box bgcolor={grey[300]} style={{ marginLeft: 5, marginRight: 5, marginBottom: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, display: "flex", justifyContent: "center", alignContent: "center" }}>
              <Typography variant="h4" fontWeight={900}>Tokens</Typography>
            </Box>

            <div style={{ marginLeft: 5 }}>
              <TokenDisplay name={HEALTH} value={getHealth()} setValue={setHealth} modChar={!char.locked} />
            </div>
            <div style={{ marginLeft: 5 }}>
              <TokenDisplay name={BENNIES} value={getBennies()} setValue={setBennies} modChar={!char.locked} />
            </div>
            <div style={{ marginLeft: 5 }}>
              <TokenDisplay name={POWER} value={getPower()} setValue={setPower} modChar={!char.locked} />
            </div>

            <LockCharacterBtn />
            
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />

          </Stack>

          <DownPanel nav='/skills_panel' text='Skills' />

        </Paper>
      </MobileBox>
    );
  }

  return (
    <>
      {getMobile()}
      {getNonMobile()}
    </>
  );
}

export default TokenPanel;