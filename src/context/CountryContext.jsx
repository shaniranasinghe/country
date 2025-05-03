import React, { createContext, useState } from "react";

export const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [session, setSession] = useState({}); // For session management

  return (
    <CountryContext.Provider value={{ session, setSession }}>
      {children}
    </CountryContext.Provider>
  );
}
