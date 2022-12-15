import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API_URL } from "../utils/env";
import { useRouter } from "next/router";

export const BusinessContext = createContext();

export const BusinessContextProvider = ({ children }) => {
  return (
    <BusinessContext.Provider value={{}}>{children}</BusinessContext.Provider>
  );
};
