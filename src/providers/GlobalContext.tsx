"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define ActiveTab type
type ActiveTabType = "ActiveMarket" | "PendingMarket";

// Define Global Context Type
interface GlobalContextType {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
}

// Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Global Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>("ActiveMarket");

  return (
    <GlobalContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use Global Context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
