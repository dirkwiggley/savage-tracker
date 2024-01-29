import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Box, Button, Dialog, DialogTitle, Snackbar, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AllAttackTypes, allGearEffectTypes, COMBAT_AREA, COMBAT_MELEE, COMBAT_SHOOTING, COMBAT_THROWING, DiceType, GearEffectConfig, GearEffectType, GearType, getWhenUsed, WhenType } from "../Gear/GearData";
import { ATHLETICS, FIGHTING, SHOOTING, SPELLCASTING, SkillNameType, UNKNOWN } from "../Skills/Skills";
import { D4_MINUS2, DiceNameType, isDiceType } from "../Dice";
import { isAttributeNameType } from "../Attributes/AttribPanel";
import { BONUS, EffectType, PENALTY, PREVENTS } from "../Effects/Effects";
import { AttributeNameType } from "./ActionsPanel";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: grey[400],
  borderRadius: 25,
  '&:hover': {
    backgroundColor: grey[500],
  }
}));

type AttackDlgProps = {
  openDlg: boolean,
  gearList: Array<GearType>,
  closeDlg: () => void
}

type GearNameWhenType = {
  gearName: string,
  whenType: WhenType,
  effectCfg: GearEffectConfig
};

type EffectItem = {
  name: string,
  type: EffectType,
  value: number
}

const AttackDlg = (props: AttackDlgProps) => {
  const { openDlg, gearList, closeDlg } = props;
  const [char, setChar] = useContext(AppContext)!;
  const [gearSelected, setGearSelected] = useState<GearNameWhenType | null>();
  const [attackRoll, setAttackRoll] = useState<string>("");
  const [damageRoll, setDamageRoll] = useState<string>("");

  const getBtnColor = (gearNameWhenType: GearNameWhenType) => {
    if (gearNameWhenType.gearName === gearSelected?.gearName && gearNameWhenType.whenType === gearSelected.whenType) return grey[600];
    else return grey[400];
  }

  const gearButtons = useMemo(() => {
    const gearBtns: Array<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = [];

    let attackBtnInfo: Array<GearNameWhenType> = [];
    gearList.forEach(gear => {
      gear.effects.forEach(effect => {
        if (AllAttackTypes.includes(effect.typeName)) {
          attackBtnInfo.push(
            {
              gearName: gear.name,
              whenType: getWhenUsed(effect.typeName),
              effectCfg: effect
            }
          )
        }
      })
    });
    // gearList.forEach((gear, index) => {
    attackBtnInfo.forEach((btnInfo, index) => {
      const gear = gearList.find(gear => { return gear.name === btnInfo.gearName });
      if (gear !== null) {
        gearBtns.push(
          <StyledButton
            key={index}
            onClick={() => handleAttack(btnInfo)}
            variant="contained"
            sx={{
              marginTop: 1, marginLeft: 1, marginRight: 1,
              backgroundColor: getBtnColor(btnInfo)
            }}>
            {gear!.name} - {btnInfo.whenType}
          </StyledButton>
        );
      }
    });
    return gearBtns;
  }, [gearList, gearSelected]);

  const handleAttack = (gearNameWhenType: GearNameWhenType) => {
    setGearSelected(gearNameWhenType);
    const when = gearNameWhenType?.whenType;
    let skillName: SkillNameType = UNKNOWN;
    if (COMBAT_MELEE === when) {
      skillName = FIGHTING;
    } else if (COMBAT_SHOOTING === when) {
      skillName = SHOOTING;
    } else if (COMBAT_THROWING === when) {
      skillName = ATHLETICS;
    } else if (COMBAT_AREA === when) {
      skillName = SPELLCASTING;
    }
    let skillsDie = findCharSkillDie(skillName);
    const modifiers = getAttackModifiers(gearNameWhenType);
    if (modifiers && modifiers.length > 0 && modifiers[0].type === PREVENTS) {
      setAttackRoll(`Attack is not possible while under the ${modifiers[0].name} effect`);
    } else {
      let total: number = 0;
      modifiers.forEach(modifier => {
        if (modifier.type === BONUS) {
          total += modifier.value;
        } else if (modifier.type === PENALTY) {
          total -= modifier.value;
        }
      });
      let displayValue = `Best of: ${skillsDie} (skill) or d6 (wild die)`;
      if (total > 0) {
        displayValue += ` +${total} (bonus)`;
      } else if (total < 0) {
        displayValue += ` ${total} (penalty)`;
      }
      setAttackRoll(displayValue);
    }
  }

  const findCharSkillDie = (skillName: SkillNameType): DiceNameType => {
    let skill = char.skills.find(skill => {
      return skill.name === skillName;
    });

    let diceName: DiceNameType = D4_MINUS2
    if (skill) {
      diceName = skill.diceName;
    }
    return diceName;
  }

  const getAttackModifiers = (gearWhen: GearNameWhenType) => {
    let charEffects: Array<EffectItem> = [];
    char.effects.forEach(effectProp => {
      let effectName = effectProp.name;
      for (let i = 0; i < effectProp.effects.length; i++) {
        const effect = effectProp.effects[i];
        if (effect.effectType === PREVENTS) {
          charEffects = [{ name: effectName, type: PREVENTS, value: 0 }];
          break;
        }
        if (effect.when === gearWhen.whenType) {
          let item: EffectItem = {
            name: effectName,
            type: effect.effectType,
            value: effect.value
          }
          charEffects.push(item);
        }
      }
    });
    return charEffects;
  }

const getAttributeDice = (attributeName: AttributeNameType) => {
  let selectedAttribute = char.attributes.find(attribute => {
    return attribute.name === attributeName;
  });
  return selectedAttribute?.diceName;
}

const handleDamage = () => {
  setAttackRoll("");
  let displayValue = "";
  gearSelected!.effectCfg.values.forEach(value => {
    if (isDiceType(value)) {
      displayValue = `${(value as DiceType).quantity}${(value as DiceType).diceName} ` + displayValue;
    } else if (isAttributeNameType(value)) {
      displayValue += ` + ${getAttributeDice(value)} (${value})`;
    } else if (typeof value === 'number' && value > 0) {
      displayValue += " +" + value;
    } else if (typeof value === 'number' && value < 0) {
      displayValue += value;
    }
    setDamageRoll(displayValue);
  });
  setGearSelected(null);
}

const handleCloseAttackDlg = () => {
  setAttackRoll("");
  setDamageRoll("");
  closeDlg();
}

const getDisplayValue = (): string => {
  if (attackRoll !== "") {
    return attackRoll;
  } else if (damageRoll !== "") {
    return damageRoll;
  }
  return "";
}

return (
  <Dialog onClose={handleCloseAttackDlg} open={openDlg}>
    <DialogTitle style={{ marginTop: -10, marginBottom: -20 }}>Select Attack Method</DialogTitle>
    <>
      {gearButtons}
    </>
    <Box sx={{
      maxWidth: "90%",
      border: "1px solid black",
      marginTop: 2,
      marginBottom: 1,
      marginLeft: 1,
      marginRight: 1,
      paddingLeft: 1,
      paddingRight: 1,
      minHeight: "2em"
    }}>
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical"
        }}>
        {getDisplayValue()}
      </Typography>
    </Box>
    <StyledButton onClick={handleDamage} disabled={!gearSelected} sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Show Damage</StyledButton>
    <StyledButton onClick={handleCloseAttackDlg} sx={{ marginBottom: 1, marginLeft: 1, marginRight: 1 }}>Close</StyledButton>
  </Dialog>
);
}

export default AttackDlg;