import { useState, createContext, useEffect } from "react";

export const BusinessContext = createContext();

export const BusinessContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <BusinessContext.Provider value={{ loading }}>
      {children}
    </BusinessContext.Provider>
  );
};
