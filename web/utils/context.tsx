import { createContext, useContext } from "react";
import { Config } from "./types";

export const ConfigContext = createContext<Config>({
  siteTitle: "",
  siteUrl: "",
  siteDescription: "",
});

export const useConfigContext = () => useContext(ConfigContext);
