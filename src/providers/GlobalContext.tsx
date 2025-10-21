"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MarketStatus, MarketDataType } from "@/types/type";
import SAMPLE_MARKETS from "@/data/sampleMarkets";
// Define ActiveTab type

// Define Global Context Type
interface GlobalContextType {
  activeTab: MarketStatus;
  markets: MarketDataType[];
  setActiveTab: (tab: MarketStatus) => void;
  formatMarketData: (data: MarketDataType[]) => void;
}

// Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Global Provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<MarketStatus>("ACTIVE");
  // Initialize with sample markets for local development/testing
  const [markets, setMarkets] = useState<MarketDataType[]>(SAMPLE_MARKETS);

  const formatMarketData = (data: MarketDataType[]) => {
    setMarkets(data);
  }

  return (
    <GlobalContext.Provider value={{ activeTab, markets, setActiveTab, formatMarketData }}>
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
