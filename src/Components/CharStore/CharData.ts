import { AGI, AttributeNameType, SMA, SPI, STR, VIG, allAttributeNames, isAttributeName } from "../Attributes/AttribPanel";
import { AttribPropTypes } from "../Attributes/AttribDisplay";
import { DerivedStatNames, DerivedStatTypes, PACE, PARRY, TOUGHNESS } from "../DerivedStats/DerivedStatsDisplay";
import { BENNIES, HEALTH, POWER, TokenNames, TokenPropTypes } from "../Tokens/TokenDisplay";
import { D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo } from "../Dice";
import { SkillNameType, SkillInfoType, FIGHTING, SHOOTING, ATHLETICS, COMMON_KNOWLEDGE, NOTICE, PERSUASION, STEALTH } from "../Skills/Skills";
import {SkillPropTypes} from '../Skills/SkillsDisplay';
import { EffectPropType } from "../Effects/Effects";
import { COMBAT_MELEE, COMBAT_THROWING, DiceType, GEAR_MELEE_DAMAGE, GEAR_THROWING_DAMAGE, GearType } from "../Gear/GearData";

export type CharDataType = {
  charName: string;
  attributes: Array<AttribPropTypes>;
  derivedStats: Array<DerivedStatTypes>;
  tokens: Array<CharTokenType>;
  skills: Array<SkillPropTypes>;
  effects: Array<EffectPropType>;
  gear: Array<GearType>;
  locked: boolean;
}

export type CharTokenType = {
  name: TokenNames,
  value: number,
}

export const getDefaultCharacter = (): CharDataType => {
  let newChar: CharDataType = {
    charName: "Default",
    attributes: new Array<AttribPropTypes>(),
    derivedStats: new Array<DerivedStatTypes>(),
    tokens: new Array<CharTokenType>(),
    skills: new Array<SkillPropTypes>(),
    effects: new Array<EffectPropType>(),
    gear: new Array<GearType>(),
    locked: false,
  };
  newChar.attributes = [
    { name: AGI, diceName: D4 },
    { name: SMA, diceName: D4 },
    { name: SPI, diceName: D4 },
    { name: STR, diceName: D4 },
    { name: VIG, diceName: D4 },
  ];
  newChar.derivedStats = [
    { name: PACE, value: 6 },
    { name: PARRY, value: 6 },
    { name: TOUGHNESS, value: 6 },
  ];
  newChar.tokens = [
    { name: HEALTH, value: 4 },
    { name: BENNIES, value: 3 },
    { name: POWER, value: 0 },
  ];
  newChar.skills = [
    { name: ATHLETICS, diceName: D4 },
    { name: COMMON_KNOWLEDGE, diceName: D4 },
    { name: NOTICE, diceName: D4 },
    { name: PERSUASION, diceName: D4 },
    { name: STEALTH, diceName: D4 },
  ];
  newChar.effects = [];
  const diceType: DiceType = { diceName: D4, quantity: 1};
  newChar.gear = [
    {
      name: "Hands", 
      effects: [
        { 
          typeName: GEAR_MELEE_DAMAGE, 
          values: [
            STR
          ]
        }        
      ],
      equipped: true
    },
    {
      name: "Improvised Weapon", 
      effects: [
        { 
          typeName: GEAR_MELEE_DAMAGE, 
          values: [
            { 
              diceName: D4, 
              quantity: 1
            }, 
            STR
          ]
        },
        { 
          typeName: GEAR_THROWING_DAMAGE, 
          values: [
            { 
              diceName: D4, 
              quantity: 1
            }, 
            STR
          ], 
        }        
      ],
      equipped: true
    }
  ];
  return newChar;
};

export const CHAR_DATA = "charData";

export const isCharDataType = (arg: any): arg is CharDataType => {
  let checkChar: CharDataType | null = null;
  if (typeof arg === "string") {
    checkChar = JSON.parse(arg as string) as CharDataType;
  } else {
    checkChar = arg;
  }
  return (
    checkChar !== null &&
    checkChar.charName !== null &&
    typeof checkChar.charName === "string" &&
    checkChar.attributes !== null &&
    // typeof checkChar.attributes === typeof Array<AttribPropTypes> &&
    checkChar.derivedStats !== null &&
    // typeof checkChar.derivedStats === typeof Array<DerivedStatTypes> &&
    checkChar.tokens !== null &&
    // typeof checkChar.tokens === typeof Array<TokenPropTypes> &&
    checkChar.skills !== null //&&
    // typeof checkChar.skills === typeof Array<SkillPropTypes>
  );
};
