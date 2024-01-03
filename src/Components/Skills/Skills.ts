import { DiceInfoType } from "../Dice";

export const ATHLETICS = "Athletics";
export const COMMON_KNOWLEDGE = "Common Knowledge";
export const FAITH = "Faith";
export const FIGHTING = "Fighting";
export const GAMBLING = "Gambling";
export const HEALING = "Healing";
export const INTIMIDATION = "Intimidation";
export const NOTICE = "Notice";
export const OCCULT = "Occult";
export const PERFORMANCE = "Performance";
export const PERSUASION = "Persusaion";
export const REPAIR = "Repair";
export const RESEARCH = "Research";
export const RIDING = "Riding";
export const SCIENCE = "Science";
export const SHOOTING = "Shooting";
export const SPELLCASTING = "Spellcasting";
export const STEALTH = "Stealth";
export const SURVIVAL = "Survival";
export const TAUNT = "Taunt";
export const THIEVERY = "Thievery";
export type SkillNameType = typeof ATHLETICS | typeof COMMON_KNOWLEDGE | typeof FIGHTING | typeof FAITH | typeof GAMBLING | 
  typeof INTIMIDATION | typeof NOTICE | typeof OCCULT | typeof PERFORMANCE | typeof PERSUASION | typeof REPAIR | 
  typeof RESEARCH | typeof RIDING | typeof SCIENCE | typeof SHOOTING | typeof SPELLCASTING | typeof STEALTH | 
  typeof SURVIVAL | typeof TAUNT | typeof THIEVERY;
export const allSkillNames: Array<SkillNameType> = [ATHLETICS, COMMON_KNOWLEDGE, FIGHTING, FAITH, GAMBLING, INTIMIDATION,
  NOTICE, OCCULT, PERFORMANCE, PERSUASION, REPAIR, RESEARCH, RIDING, SCIENCE, SHOOTING, SPELLCASTING, STEALTH, SURVIVAL,
  TAUNT, THIEVERY];
export type SkillInfoType = {
  name: SkillNameType;
  die: DiceInfoType;
}

