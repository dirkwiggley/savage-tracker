import { AGI, AttributeNameType, SMA, SPI, STR, VIG } from "../Attributes/AttribPanel";
import { AttribPropTypes } from "../Attributes/AttribDisplay";
import { DerivedStatNames, DerivedStatTypes, PACE, PARRY, TOUGHNESS } from "../DerivedStats/DerivedStatsDisplay";
import { BENNIES, HEALTH, POWER, TokenNames, TokenPropTypes } from "../Tokens/TokenDisplay";
import { D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2, DiceNameType, Dice_Id_Range, DiceInfoType, diceInfo } from "../Dice";
import { SkillNameType, SkillInfoType, FIGHTING, SHOOTING, ATHLETICS, COMMON_KNOWLEDGE, NOTICE, PERSUASION, STEALTH } from "../Skills/Skills";
import {SkillPropTypes} from '../Skills/SkillsDisplay';
import { EffectPropType } from "../Effects/Effects";

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
  const effectConfig: GearEffectConfig = { typeName: GEAR_ATTACK_DAMAGE, value: [diceType, STR], whenUsed: COMBAT_MELEE}
  newChar.gear = [
    {
      name: "Dagger", 
      effects: [
        { 
          typeName: GEAR_ATTACK_DAMAGE, value: 
          [
            { 
              diceName: D4, 
              quantity: 1
            }, 
            STR
          ], 
          whenUsed: COMBAT_MELEE
        },
        { 
          typeName: GEAR_ATTACK_DAMAGE, value: 
          [
            { 
              diceName: D4, 
              quantity: 1
            }, 
            STR
          ], 
          whenUsed: COMBAT_THROWING
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

export const COMBAT_MELEE = "combat melee";
export const COMBAT_SHOOTING = "combat shooting";
export const COMBAT_THROWING = "combat throwing";
export const MOVEMENT = "movement";
export const CASTING = "casting";
export const SKILL_CHECK = "skill check";
export type WhenType = typeof COMBAT_MELEE | typeof COMBAT_SHOOTING | typeof COMBAT_THROWING | typeof MOVEMENT | typeof CASTING | typeof SKILL_CHECK;
export const ALL_WHEN_TYPES: Array<WhenType> = [COMBAT_MELEE, COMBAT_SHOOTING, COMBAT_THROWING, MOVEMENT, CASTING, SKILL_CHECK];
export const GEAR_TOUGHNESS = "Toughness";
export const GEAR_ARMOR = "Armor";
export const GEAR_ATTACK_DAMAGE = "Attack Damage";
export const GEAR_PARRY = "Parry";
export const GEAR_DODGE = "Dodge";
export const GEAR_SKILL = "Skill";
export type GearEffectType = typeof GEAR_TOUGHNESS | typeof GEAR_ARMOR | typeof GEAR_ATTACK_DAMAGE | typeof GEAR_PARRY | typeof GEAR_DODGE | typeof GEAR_SKILL;
export const allGearEffectTypes: Array<GearEffectType> = [GEAR_TOUGHNESS, GEAR_ARMOR, GEAR_ATTACK_DAMAGE, GEAR_PARRY, GEAR_DODGE, GEAR_SKILL ];
export type DiceType = {
  diceName: DiceNameType;
  quantity: number;
}
export const isDiceType = (obj: any): obj is DiceType => {
  if (obj.diceName !== undefined &&  obj.quantity !== undefined) { 
    return true; 
  }
  return false;
}
export type EffectValueType = number | DiceType | AttributeNameType;

export type GearEffectConfig = {
  typeName: GearEffectType;
  value: Array<EffectValueType>;
  whenUsed: WhenType;
}
export type GearType = {
  name: string;
  effects: Array<GearEffectConfig>;
  equipped: boolean;
}