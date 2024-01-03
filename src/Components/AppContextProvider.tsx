import React, { useEffect } from "react";
import { CHAR_DATA, CharDataType, isCharDataType, getDefaultCharacter } from './CharStore/CharData';

export const AppContext = React.createContext<[CharDataType, (charData: CharDataType) => void] | null>(null);

const CharDataStore = (initial: CharDataType): [CharDataType, (charData: CharDataType) => void] => {
  const [char, setChar] = React.useState<CharDataType>(initial);

  useEffect(() => {
    const charStr = localStorage.getItem(CHAR_DATA);
    if (charStr) {
      const newChar = JSON.parse(charStr);
      if (isCharDataType(newChar)) {
        setChar(newChar);
      }
    }
  }, []);

  const setContextAndLocal = (charData: CharDataType) => {
    localStorage.setItem(CHAR_DATA, JSON.stringify(charData));
    setChar(charData);
  }

  return [char, setContextAndLocal];
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const charDataStore = CharDataStore(getDefaultCharacter());

  return <AppContext.Provider value={[charDataStore[0], charDataStore[1]]}>{children}</AppContext.Provider>;
};

export { AppContextProvider };
