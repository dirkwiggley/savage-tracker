import * as React from "react";

import { CharDataType } from "./CharData";

// Set up the storage here with useState
export const useCharStore = (initial: CharDataType | null) =>
  React.useState<CharDataType | null>(initial);
type useCharStoreHookType = ReturnType<typeof useCharStore>;
// Just a reminder that creating a context of useCharStoreHookType returns an
// array with the following 2 elements
// type CharStoreType = useCharStoreHookType[0];
// type SetCharStoreType = useCharStoreHookType[1];

const CharContext = React.createContext<useCharStoreHookType | null>(null);

export const useCharContext = () => React.useContext(CharContext)!;

export const CharProvider = ({ children }: { children: React.ReactNode }) => (
  <CharContext.Provider value={useCharStore(null)}>
    {children}
  </CharContext.Provider>
);
