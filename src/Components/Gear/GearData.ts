import { AttributeNameType, isAttributeName } from "../Attributes/AttribPanel";
import { CharDataType } from "../CharStore/CharData";
import { DiceNameType } from "../Dice";

export const COMBAT_MELEE = "Melee";
export const COMBAT_SHOOTING = "Shooting";
export const COMBAT_THROWING = "Throwing";
export const COMBAT_AREA = "Area";
export const MOVEMENT = "Movement";
export const CASTING = "Casting";
export const SKILL_CHECK = "Skill Check";
export const DEFENSE = "Defense";
export type WhenType = typeof COMBAT_MELEE | typeof COMBAT_SHOOTING | typeof COMBAT_THROWING | typeof COMBAT_AREA | typeof MOVEMENT | typeof CASTING | typeof SKILL_CHECK | typeof DEFENSE;
export const ALL_WHEN_TYPES: Array<WhenType> = [COMBAT_MELEE, COMBAT_SHOOTING, COMBAT_THROWING, COMBAT_AREA, MOVEMENT, CASTING, SKILL_CHECK];
export const GEAR_TOUGHNESS = "Toughness";
export const GEAR_ARMOR = "Armor";
export const GEAR_MELEE_DAMAGE = "Melee Damage";
export const GEAR_SHOOTING_DAMAGE = "Shooting Damage";
export const GEAR_THROWING_DAMAGE = "Throwing Damage";
export const GEAR_AREA_DAMAGE = "Area Damage";
export const GEAR_PARRY = "Parry";
export const GEAR_DODGE = "Dodge";
export const GEAR_SKILL = "Skill";
export type GearEffectType = typeof GEAR_TOUGHNESS | typeof GEAR_ARMOR | typeof GEAR_MELEE_DAMAGE | typeof GEAR_SHOOTING_DAMAGE | typeof GEAR_THROWING_DAMAGE | typeof GEAR_AREA_DAMAGE | typeof GEAR_PARRY | typeof GEAR_DODGE | typeof GEAR_SKILL;
export const allGearEffectTypes: Array<GearEffectType> = [GEAR_TOUGHNESS, GEAR_ARMOR, GEAR_MELEE_DAMAGE, GEAR_SHOOTING_DAMAGE, GEAR_THROWING_DAMAGE, GEAR_AREA_DAMAGE, GEAR_PARRY, GEAR_DODGE, GEAR_SKILL ];
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

export const getWhenUsed = (gearEffectType: GearEffectType): WhenType => {
  switch (gearEffectType) {
    case GEAR_TOUGHNESS:
      return DEFENSE;
    case GEAR_ARMOR:
      return DEFENSE;
    case GEAR_MELEE_DAMAGE:
      return COMBAT_MELEE;
    case GEAR_SHOOTING_DAMAGE:
      return COMBAT_SHOOTING;
    case GEAR_THROWING_DAMAGE:
      return COMBAT_THROWING;
    case GEAR_AREA_DAMAGE:
      return COMBAT_AREA;
    case GEAR_PARRY:
      return DEFENSE;
    case GEAR_DODGE:
      return DEFENSE;
    case GEAR_SKILL:
      return SKILL_CHECK;
    default:
      return COMBAT_MELEE;
  }
}
export const AllAttackTypes: Array<GearEffectType> = [GEAR_MELEE_DAMAGE, GEAR_SHOOTING_DAMAGE, GEAR_THROWING_DAMAGE, GEAR_AREA_DAMAGE];
export const AllDefenseTypes: Array<GearEffectType> = [GEAR_TOUGHNESS, GEAR_ARMOR, GEAR_PARRY, GEAR_DODGE];
export const AllSkillTypes: Array<GearEffectType> = [GEAR_SKILL];

export type EffectValueType = number | DiceType | AttributeNameType;

export type GearEffectConfig = {
  typeName: GearEffectType;
  values: Array<EffectValueType>;
}

export type GearType = {
  name: string;
  effects: Array<GearEffectConfig>;
  equipped: boolean;
}

export const findGearEffectCfgIndexByTypeName = (effectConfigs: Array<GearEffectConfig> | null, gearEffectTypeName: GearEffectType | undefined): number | undefined => {
  if (!effectConfigs || effectConfigs.length === 0 || gearEffectTypeName === undefined) return;
  if (!allGearEffectTypes.includes(gearEffectTypeName!)) return;
  return effectConfigs.findIndex(effectCfg => { return effectCfg.typeName === gearEffectTypeName; });
}

export const findGearEffectCfgValueByType = (gearEffectConfig: GearEffectConfig, value: string): EffectValueType | undefined => {
  if (!gearEffectConfig || !gearEffectConfig.values || gearEffectConfig.values.length === 0) return;

  if (isDiceType(value)) {
    for (let i = 0; i < gearEffectConfig.values.length; i++) {
      let currentValue = gearEffectConfig.values[i] as DiceType;
      const diceName: DiceNameType = currentValue.diceName;
      const diceNumber: number = currentValue.quantity;
      if (diceName === value.diceName && diceNumber > 0) return currentValue;
    }
  } else if (isAttributeName(value)) {
    for (let i = 0; gearEffectConfig.values.length; i++) {
      let currentValue = gearEffectConfig.values[i] as AttributeNameType;
      if (currentValue === value) return currentValue;
    }
  } else if (typeof Number(value) === "number") {
    for (let i = 0; gearEffectConfig.values.length; i++) {
      let currentValue = gearEffectConfig.values[i] as number;
      if (currentValue === Number(value)) return currentValue;
    }
  } else {
    console.error("Invalid effectValueType");
  }
  return;
}

export const isValidGearEffectCfg = (gearEffectConfig: GearEffectConfig): boolean => {
  if (!gearEffectConfig.typeName || !(gearEffectConfig.typeName.length > 2)) return false;
  if (!gearEffectConfig.values || gearEffectConfig.values.length === 0) return false;
  return true;
}

export const getToughnessAndArmor = (char: CharDataType) => {
  let toughness = 0;
  let armor = 0;
  if (char.gear && char.gear.length > 1) {
    for (let i = 0; i < char.gear.length; i++) {
      const gearEffect = char.gear[i];
      if (gearEffect.equipped) {
        for (let x = 0; x < gearEffect.effects.length; x++) {
          let currentEffect = gearEffect.effects[x];
          let value: number = currentEffect.values[0] as number;
          if (currentEffect.typeName === GEAR_TOUGHNESS) {
            toughness += value;
          } else if (currentEffect.typeName === GEAR_ARMOR) {
            armor += value;
          }
        }
      }
    }
  }
  return { toughness: toughness, armor: armor };
}

export const getArmor = (char: CharDataType) => {
  let armor = 0;
  if (char.gear && char.gear.length > 0) {
    for (let i = 0; i < char.gear.length; i++) {
      const gearEffect = char.gear[i];
      if (gearEffect.equipped) {
        for (let x = 0; x < gearEffect.effects.length; x++) {
          let currentEffect = gearEffect.effects[x];
          let value: number = currentEffect.values[0] as number;
          if (currentEffect.typeName === GEAR_ARMOR) {
            armor += value;
          }
        }
      }
    }
  }
  return armor;
}

export const getShield = (char: CharDataType) => {
  let shield = 0;
  if (char.gear && char.gear.length > 0) {
    for (let i = 0; i < char.gear.length; i++) {
      const gearEffect = char.gear[i];
      if (gearEffect.equipped) {
        for (let x = 0; x < gearEffect.effects.length; x++) {
          let currentEffect = gearEffect.effects[x];
          let value: number = currentEffect.values[0] as number;
          if (currentEffect.typeName === GEAR_PARRY) {
            shield += value;
          }
        }
      }
    }
  }
  return shield;
}
