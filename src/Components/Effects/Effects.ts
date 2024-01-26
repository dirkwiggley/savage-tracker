import { COMBAT_AREA, COMBAT_MELEE, COMBAT_SHOOTING, COMBAT_THROWING, DEFENSE, SKILL_CHECK, WhenType } from "../Gear/GearData";

export const BOUND = "Bound";
export const COVER_LIGHT = "Light Cover";
export const COVER_MEDIUM = "Medium Cover";
export const COVER_HEAVY = "Heavy Cover";
export const COVER_NEAR_TOTAL = "Near Total Cover";
export const DISTRACTED = "Distracted";
export const DEFEND = "Defend";
export const ENTANGLED = "Entangled";
export const FATIGUED = "Fatigued";
export const FATIGUED_EXHAUSTED = "Fatigued-Exhausted";
export const FATIGUED_INCAPACITATED = "Fatigued-Incapacitated";
export const GANG_UP_1 = "Gang Up 1";
export const GANG_UP_2 = "Gang Up 2";
export const GANG_UP_3 = "Gang Up 3";
export const GANG_UP_4 = "Gang Up 4";
export const ILLUMINATION_DIM = "Illumination-Dim";
export const ILLUMINATION_DARK = "Illumination-Dark";
export const ILLUMINATION_PITCH_DARK = "Illumination-Pitch Dark";
export const JOKER = "Joker";
export const MULTI_ACTION_1 = "Multi Action 1";
export const MULTI_ACTION_2 = "Multi Action 2";
export const PRONE = "Prone";
export const RANGE_SHORT = "Range Short";
export const RANGE_MEDIUM = "Range Medium";
export const RANGE_LONG = "Range Long";
export const RANGE_EXTREME = "Range Extreme";
export const SHAKEN = "Shaken";
export const STUNNED = "Stunned";
export const THE_DROP = "The Drop";
export const VULNERABLE = "Vulnerable";
export const WOUNDED_1 = "Wounded-1";
export const WOUNDED_2 = "Wounded-2";
export const WOUNDED_3 = "Wounded-3";
export const WOUNDED_4 = "Wounded-4";
export type EffectNameType = typeof SHAKEN | typeof DEFEND | typeof WOUNDED_1 | typeof WOUNDED_2 | typeof WOUNDED_3 | typeof WOUNDED_4 | 
  typeof DISTRACTED | typeof FATIGUED_INCAPACITATED | typeof THE_DROP | typeof GANG_UP_1 | typeof GANG_UP_2 | 
  typeof GANG_UP_3 | typeof GANG_UP_4 | typeof ILLUMINATION_DIM | typeof ILLUMINATION_DARK | 
  typeof ILLUMINATION_PITCH_DARK | typeof MULTI_ACTION_1 | typeof MULTI_ACTION_2 | typeof RANGE_SHORT | 
  typeof RANGE_MEDIUM | typeof RANGE_LONG | typeof RANGE_EXTREME | typeof PRONE | typeof STUNNED | typeof JOKER | typeof VULNERABLE | 
  typeof FATIGUED | typeof FATIGUED_EXHAUSTED | typeof BOUND | typeof ENTANGLED | typeof COVER_LIGHT | typeof COVER_MEDIUM | 
  typeof COVER_HEAVY | typeof COVER_NEAR_TOTAL;

// export const SITUATION_ATTACK = "Attack";
// export const SITUATION_ATTACK_MELEE = "Melee";
// export const SITUATION_ATTACK_SHOOTING = "Shooting";
// export const SITUATION_ATTACK_THROWING = "Throwing"
// export const SITUATION_ATTACK_AREA = "Area"
// export const SITUATION_SKILL = "Skill";
// export const SITUATION_DEFEND = "Defend";
// export const SITUATION_DEFEND_MELEE = "Defend Melee";
// export const SITUATION_DEFEND_RANGED = "Defend Ranged";
// export type EffectSituationName = typeof SITUATION_ATTACK | typeof SITUATION_ATTACK_MELEE | typeof SITUATION_ATTACK_SHOOTING | 
//   typeof SITUATION_ATTACK_THROWING | typeof SITUATION_ATTACK_AREA | typeof SITUATION_SKILL | typeof SITUATION_DEFEND | 
//   typeof SITUATION_DEFEND_MELEE | typeof SITUATION_DEFEND_RANGED;

export const BONUS = "Bonus";
export const PENALTY = "Penalty";
export const PREVENTS = "Prevents";
export const OTHER = "Other";
export type EffectType = typeof BONUS | typeof PENALTY | typeof PREVENTS | typeof OTHER;

export type EffectSituationType = {
  when: WhenType;
  value: number;
  effectType: EffectType;
}

const DURATION_INSTANT = "Instant";
const DURATION_TURNS = "Turns";
const DURATION_HOURS = "Hours";
const DURATION_DAYS = "Days";
const DURATION_SPECIAL = "Special";
export type DurationNamesType = typeof DURATION_INSTANT | typeof DURATION_TURNS | typeof DURATION_HOURS | typeof DURATION_DAYS | typeof DURATION_SPECIAL;
export type DurationType = {
  desc: DurationNamesType;
  value?: number;
  counter?: number;
}
export type EffectPropType = {
  name: EffectNameType;
  effects: Array<EffectSituationType>;
  duration: DurationType;
  remove?: Array<EffectNameType>;
}

export const effectsArray: Array<EffectPropType> = [
  {name: SHAKEN, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
    {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
    {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
    {when: COMBAT_AREA, effectType: PREVENTS, value: 0},
    {when: SKILL_CHECK, effectType: PREVENTS, value: 0},
    {when: DEFENSE, effectType: OTHER, value: 0},
  ]},
  {name: DEFEND, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: OTHER, value: 0},
    {when: COMBAT_SHOOTING, effectType: OTHER, value: 0},
    {when: COMBAT_THROWING, effectType: OTHER, value: 0},
    {when: COMBAT_AREA, effectType: PREVENTS, value: 0},
    {when: SKILL_CHECK, effectType: OTHER, value: 0},
    {when: DEFENSE, effectType: BONUS, value: 4},
  ]},
  {name: WOUNDED_1, duration: {desc: DURATION_SPECIAL}, remove: [
      WOUNDED_2, WOUNDED_3, WOUNDED_4],
    effects: [
    {when: COMBAT_MELEE, effectType: PENALTY, value: 1},
    {when: COMBAT_SHOOTING, effectType: PENALTY, value: 1},
    {when: COMBAT_THROWING, effectType: PENALTY, value: 1},
    {when: COMBAT_AREA, effectType: PENALTY, value: 1},    
    {when: SKILL_CHECK, effectType: PENALTY, value: 1},
    {when: DEFENSE, effectType: PENALTY, value: 1},
  ]},
  {name: WOUNDED_2, duration: {desc: DURATION_SPECIAL}, remove: [
    WOUNDED_1, WOUNDED_3, WOUNDED_4],
    effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 1},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
      {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 2},
    {when: DEFENSE, effectType: PENALTY, value: 2},
  ]},
  {name: WOUNDED_3, duration: {desc: DURATION_SPECIAL}, remove: [
    WOUNDED_1, WOUNDED_2, WOUNDED_4], 
    effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 3},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 3},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 3},
      {when: COMBAT_AREA, effectType: PENALTY, value: 3},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 3},
    {when: DEFENSE, effectType: PENALTY, value: 3},
  ]},
  {name: WOUNDED_4, duration: {desc: DURATION_SPECIAL}, remove: [
    WOUNDED_1, WOUNDED_2, WOUNDED_3], 
    effects: [
      {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
      {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
      {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
      {when: COMBAT_AREA, effectType: PREVENTS, value: 0},    
      {when: SKILL_CHECK, effectType: PREVENTS, value: 0},
    {when: DEFENSE, effectType: PREVENTS, value: 0},
  ]},
  {name: DISTRACTED, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: PENALTY, value: 2},
    {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
    {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
    {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
    {when: SKILL_CHECK, effectType: PENALTY, value: 2},
  ]},
  {name: VULNERABLE, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: DEFENSE, effectType: PENALTY, value: 2},
  ]},
  {name: FATIGUED, duration: {desc: DURATION_SPECIAL}, remove: [
    FATIGUED_EXHAUSTED, FATIGUED_INCAPACITATED],
    effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 1},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 1},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 1},
      {when: COMBAT_AREA, effectType: PENALTY, value: 1},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 1},
  ]},
  {name: FATIGUED_EXHAUSTED, duration: {desc: DURATION_SPECIAL}, 
    remove: [FATIGUED, FATIGUED_INCAPACITATED], effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 2},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
      {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 2},
  ]},
  {name: FATIGUED_INCAPACITATED, duration: {desc: DURATION_SPECIAL}, 
    remove: [FATIGUED, FATIGUED_EXHAUSTED], effects: [
      {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
      {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
      {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
      {when: COMBAT_AREA, effectType: PREVENTS, value: 0},    
      {when: SKILL_CHECK, effectType: PREVENTS, value: 0},
  ]},
  {name: THE_DROP, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: BONUS, value: 4},
    {when: COMBAT_SHOOTING, effectType: BONUS, value: 4},
    {when: COMBAT_THROWING, effectType: BONUS, value: 4},
    {when: COMBAT_AREA, effectType: BONUS, value: 4},    
  ]},
  {name: GANG_UP_1, duration: {desc: DURATION_SPECIAL}, remove: [
    GANG_UP_2, GANG_UP_3, GANG_UP_4], effects: [
      {when: COMBAT_MELEE, effectType: BONUS, value: 1},
      {when: COMBAT_SHOOTING, effectType: BONUS, value: 1},
      {when: COMBAT_THROWING, effectType: BONUS, value: 1},
      {when: COMBAT_AREA, effectType: BONUS, value: 1},    
    ]},
  {name: GANG_UP_2, duration: {desc: DURATION_SPECIAL}, remove: [
    GANG_UP_1, GANG_UP_3, GANG_UP_4], effects: [
      {when: COMBAT_MELEE, effectType: BONUS, value: 2},
      {when: COMBAT_SHOOTING, effectType: BONUS, value: 2},
      {when: COMBAT_THROWING, effectType: BONUS, value: 2},
      {when: COMBAT_AREA, effectType: BONUS, value: 2},    
  ]},
  {name: GANG_UP_3, duration: {desc: DURATION_SPECIAL}, remove: [
    GANG_UP_1, GANG_UP_2, GANG_UP_4], effects: [
      {when: COMBAT_MELEE, effectType: BONUS, value: 3},
      {when: COMBAT_SHOOTING, effectType: BONUS, value: 3},
      {when: COMBAT_THROWING, effectType: BONUS, value: 3},
      {when: COMBAT_AREA, effectType: BONUS, value: 3},    
  ]},
  {name: GANG_UP_4, duration: {desc: DURATION_SPECIAL}, remove: [
    GANG_UP_1, GANG_UP_2, GANG_UP_3], effects: [
      {when: COMBAT_MELEE, effectType: BONUS, value: 4},
      {when: COMBAT_SHOOTING, effectType: BONUS, value: 4},
      {when: COMBAT_THROWING, effectType: BONUS, value: 4},
      {when: COMBAT_AREA, effectType: BONUS, value: 4},    
  ]},
  {name: ILLUMINATION_DIM, duration: {desc: DURATION_SPECIAL}, 
    remove: [ILLUMINATION_DARK, ILLUMINATION_PITCH_DARK], effects: [
    {when: COMBAT_MELEE, effectType: PENALTY, value: 2},
    {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
    {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
    {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
    {when: SKILL_CHECK, effectType: PENALTY, value: 2},
  ]},
  {name: ILLUMINATION_DARK, duration: {desc: DURATION_SPECIAL}, 
    remove: [ILLUMINATION_DIM, ILLUMINATION_PITCH_DARK], effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 4},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 4},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 4},
      {when: COMBAT_AREA, effectType: PENALTY, value: 4},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 4},
  ]},
  {name: ILLUMINATION_PITCH_DARK, duration: {desc: DURATION_SPECIAL}, 
    remove: [ILLUMINATION_DIM, ILLUMINATION_DARK], effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 6},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 6},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 6},
      {when: COMBAT_AREA, effectType: PENALTY, value: 6},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 6},
  ]},
  {name: MULTI_ACTION_1, duration: {desc: DURATION_INSTANT, value: 1}, 
    remove: [MULTI_ACTION_2], effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 2},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
      {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 2},
  ]},
  {name: MULTI_ACTION_2, duration: {desc: DURATION_INSTANT, value: 1}, 
    remove: [MULTI_ACTION_1], effects: [
      {when: COMBAT_MELEE, effectType: PENALTY, value: 4},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 4},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 4},
      {when: COMBAT_AREA, effectType: PENALTY, value: 4},    
      {when: SKILL_CHECK, effectType: PENALTY, value: 4},
  ]},
  {name: RANGE_SHORT, duration: {desc: DURATION_SPECIAL, value: 0}, 
    remove: [RANGE_MEDIUM, RANGE_LONG, RANGE_EXTREME], effects: [
      {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 0},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 0},
      {when: COMBAT_AREA, effectType: PENALTY, value: 0},    
  ]},
  {name: RANGE_MEDIUM, duration: {desc: DURATION_SPECIAL, value: 0}, 
  remove: [RANGE_SHORT, RANGE_LONG, RANGE_EXTREME], effects: [
    {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
    {when: COMBAT_SHOOTING, effectType: PENALTY, value: 2},
    {when: COMBAT_THROWING, effectType: PENALTY, value: 2},
    {when: COMBAT_AREA, effectType: PENALTY, value: 2},    
  ]},
  {name: RANGE_LONG, duration: {desc: DURATION_SPECIAL, value: 0}, 
    remove: [RANGE_SHORT, RANGE_MEDIUM, RANGE_EXTREME], effects: [
      {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 4},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 4},
      {when: COMBAT_AREA, effectType: PENALTY, value: 4},    
  ]},
  {name: RANGE_EXTREME, duration: {desc: DURATION_SPECIAL, value: 0},
    remove: [RANGE_SHORT, RANGE_MEDIUM, RANGE_LONG], effects: [
      {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
      {when: COMBAT_SHOOTING, effectType: PENALTY, value: 8},
      {when: COMBAT_THROWING, effectType: PENALTY, value: 8},
      {when: COMBAT_AREA, effectType: PENALTY, value: 8},    
  ]},
  {name: PRONE, duration: {desc: DURATION_SPECIAL, value: 0}, effects: [
    {when: COMBAT_MELEE, effectType: PENALTY, value: 2},
    // {when: SITUATION_DEFEND_MELEE, effectType: PENALTY, value: 2},
    // {when: SITUATION_DEFEND_RANGED, effectType: BONUS, value: 4},
  ]},
  {name: STUNNED, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
    {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
    {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
    {when: COMBAT_AREA, effectType: PREVENTS, value: 0},    
    {when: SKILL_CHECK, effectType: PENALTY, value: 0},
    {when: DEFENSE, effectType: PENALTY, value: 0},
  ]},
  {name: JOKER, duration: {desc: DURATION_INSTANT}, effects: [
    {when: COMBAT_MELEE, effectType: BONUS, value: 2},
    {when: COMBAT_SHOOTING, effectType: BONUS, value: 2},
    {when: COMBAT_THROWING, effectType: BONUS, value: 2},
    {when: COMBAT_AREA, effectType: BONUS, value: 2},    
    {when: SKILL_CHECK, effectType: BONUS, value: 2},
  ]},
  {name: BOUND, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
    {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
    {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
    {when: COMBAT_AREA, effectType: PREVENTS, value: 0},    
    {when: SKILL_CHECK, effectType: PENALTY, value: 0},
    {when: DEFENSE, effectType: PENALTY, value: 0},
  ]},
  {name: ENTANGLED, duration: {desc: DURATION_SPECIAL}, effects: [
    {when: COMBAT_MELEE, effectType: PREVENTS, value: 0},
    {when: COMBAT_SHOOTING, effectType: PREVENTS, value: 0},
    {when: COMBAT_THROWING, effectType: PREVENTS, value: 0},
    {when: COMBAT_AREA, effectType: PREVENTS, value: 0},    
    {when: SKILL_CHECK, effectType: PREVENTS, value: 0},
    {when: DEFENSE, effectType: PREVENTS, value: 0},
  ]},
  {name: COVER_LIGHT, duration: {desc: DURATION_SPECIAL}, remove: [
      COVER_MEDIUM, COVER_HEAVY, COVER_NEAR_TOTAL],
    effects: [
      {when: DEFENSE, effectType: BONUS, value: 2},
  ]},
  {name: COVER_MEDIUM, duration: {desc: DURATION_SPECIAL}, remove: [
    COVER_LIGHT, COVER_HEAVY, COVER_NEAR_TOTAL],
    effects: [
    {when: DEFENSE, effectType: BONUS, value: 4},
  ]},
  {name: COVER_HEAVY, duration: {desc: DURATION_SPECIAL}, remove: [
    COVER_LIGHT, COVER_MEDIUM, COVER_NEAR_TOTAL],
    effects: [
    {when: DEFENSE, effectType: BONUS, value: 6},
  ]},
  {name: COVER_NEAR_TOTAL, duration: {desc: DURATION_SPECIAL}, remove: [
    COVER_LIGHT, COVER_MEDIUM, COVER_HEAVY],
    effects: [
    {when: DEFENSE, effectType: BONUS, value: 8},
  ]},
]

export const getEffect = (name: EffectNameType): EffectPropType | undefined => {
  return effectsArray.find(effect => { return effect.name === name});
}

export const ALL_EFFECT_NAMES: Array<EffectNameType> = [
  BOUND, COVER_LIGHT, COVER_MEDIUM, COVER_HEAVY, COVER_NEAR_TOTAL, DISTRACTED,
  DEFEND, ENTANGLED, FATIGUED, FATIGUED_EXHAUSTED, FATIGUED_INCAPACITATED, 
  GANG_UP_1, GANG_UP_2, GANG_UP_3, GANG_UP_4, ILLUMINATION_DIM, ILLUMINATION_DARK,
  ILLUMINATION_PITCH_DARK, JOKER, MULTI_ACTION_1, MULTI_ACTION_2, PRONE, 
  RANGE_SHORT, RANGE_MEDIUM, RANGE_LONG, RANGE_EXTREME, SHAKEN, STUNNED, THE_DROP,
  VULNERABLE, WOUNDED_1, WOUNDED_2, WOUNDED_3, WOUNDED_4
]