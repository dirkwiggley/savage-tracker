export const D4_MINUS2 = "d4-2";
export const D4_MINUS1 = "d4-1";
export const D4 = "d4";
export const D6 = "d6";
export const D8 = "d8";
export const D10 = "d10";
export const D12 = "d12";
export const D12_PLUS1 = "d12+1";
export const D12_PLUS2 = "d12+2";
export type DiceNameType = typeof D4_MINUS2 | typeof D4_MINUS1 | typeof D4 | typeof D6 | typeof D8 | typeof D10 | typeof D12 | typeof D12_PLUS1 | typeof D12_PLUS2;
export type Dice_Id_Range = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const allDiceNames: Array<DiceNameType> = [D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2]
export const isDiceType = (diceName: string) => {
  const diceTypes = [D4_MINUS2, D4_MINUS1, D4, D6, D8, D10, D12, D12_PLUS1, D12_PLUS2];
  return diceTypes.includes(diceName);
}
export type DiceInfoType = {
  id: Dice_Id_Range;
  name: DiceNameType;
  numberValue: number;
  modifier: number;
}
export const diceInfo: Array<DiceInfoType> = [
  {id: 0, name: D4_MINUS2, numberValue: 4, modifier: -2},
  {id: 1, name: D4_MINUS1, numberValue: 4, modifier: -1},
  {id: 2, name: D4, numberValue: 4, modifier: 0},
  {id: 3, name: D6, numberValue: 6, modifier: 0},
  {id: 4, name: D8, numberValue: 8, modifier: 0},
  {id: 5, name: D10, numberValue: 10, modifier: 0},
  {id: 6, name: D12, numberValue: 12, modifier: 0},
  {id: 7, name: D12_PLUS1, numberValue: 12, modifier: 1},
  {id: 8, name: D12_PLUS2, numberValue: 12, modifier: 2},
]
const findDiceId = (name: DiceNameType): number => {
  const dieInfo = diceInfo.find(info => info.name === name);
  if (!dieInfo) throw new Error("Invalid dice name");
  return dieInfo.id;
}
const findDiceName = (id: number): DiceNameType => {
  const dieInfo = diceInfo.find(info => info.id === id);
  if (!dieInfo) throw new Error("Invalid dice name");
  return dieInfo.name;
}
export const findDiceNumberValue = (name: DiceNameType) => {
  for (let i = 0; i < diceInfo.length; i++) {
    if (diceInfo[i].name === name) {
      return diceInfo[i].numberValue;
    }
  }
  return -1;
}
export const decDice = (name: DiceNameType): DiceNameType => {
  const dieId = findDiceId(name);
  // Don't dec D4_MINUS2
  if (dieId === 0) {
    return name;
  }
  return findDiceName(dieId-1);
}
export const incDice = (name: DiceNameType): DiceNameType => {
  const dieId = findDiceId(name);
  // Don't inc D12_PLUS2
  if (dieId === 8) {
    return name;
  }
  return findDiceName(dieId+1);
}