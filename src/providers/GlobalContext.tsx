"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MarketStatus } from "@/types/type";
// Define ActiveTab type
type MarketDataType = {
  "_id": string,
  "marketField": number,
  "apiType": number,
  "task": string,
  "creator": string,
  "tokenA": string,
  "tokenB": string,
  "market": string,
  "question": string,
  "feedName": string,
  "value": number,
  "tradingAmountA": number,
  "tradingAmountB": number,
  "tokenAPrice": number,
  "tokenBPrice": number,
  "initAmount": number,
  "range": number,
  "date": string,
  "marketStatus": string,
  "imageUrl": string,
  "createdAt": string,
  "__v": number,
  "playerACount": number,
  "playerBCount": number,
  "totalInvestment": number,
  "description": string,
  "comments": number
}

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
  const [markets, setMarkets] = useState<MarketDataType[]>([
    // Sample Active Markets
    {
      _id: "1",
      marketField: 0,
      apiType: 0,
      task: "price",
      creator: "sample_creator_1",
      tokenA: "tokenA_1",
      tokenB: "tokenB_1",
      market: "market_1",
      question: "Will Bitcoin reach $100,000 by December 2024?",
      feedName: "BTC",
      value: 100000,
      tradingAmountA: 5000,
      tradingAmountB: 5000,
      tokenAPrice: 1000000000000,
      tokenBPrice: 1000000000000,
      initAmount: 10000,
      range: 0,
      date: "2024-12-31",
      marketStatus: "ACTIVE",
      imageUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 65,
      playerBCount: 35,
      totalInvestment: 15000,
      description: "This market will resolve to Yes if Bitcoin reaches $100,000 by December 31, 2024",
      comments: 0
    },
    {
      _id: "2",
      marketField: 0,
      apiType: 0,
      task: "price",
      creator: "sample_creator_2",
      tokenA: "tokenA_2",
      tokenB: "tokenB_2",
      market: "market_2",
      question: "Will Ethereum reach $5,000 by Q3 2024?",
      feedName: "ETH",
      value: 5000,
      tradingAmountA: 3000,
      tradingAmountB: 3000,
      tokenAPrice: 500000000000,
      tokenBPrice: 500000000000,
      initAmount: 6000,
      range: 0,
      date: "2025-09-30",
      marketStatus: "ACTIVE",
      imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 45,
      playerBCount: 55,
      totalInvestment: 20,
      description: "This market will resolve to Yes if Ethereum reaches $5,000 by September 30, 2024",
      comments: 0
    },
    {
      _id: "3",
      marketField: 1,
      apiType: 0,
      task: "sports",
      creator: "sample_creator_3",
      tokenA: "tokenA_3",
      tokenB: "tokenB_3",
      market: "market_3",
      question: "Will the Lakers win their next game?",
      feedName: "NBA",
      value: 0,
      tradingAmountA: 2000,
      tradingAmountB: 2000,
      tokenAPrice: 200000000000,
      tokenBPrice: 200000000000,
      initAmount: 4000,
      range: 0,
      date: "2024-04-15",
      marketStatus: "ACTIVE",
      imageUrl: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 70,
      playerBCount: 30,
      totalInvestment: 5,
      description: "This market will resolve to Yes if the Lakers win their next game",
      comments: 0
    },
    {
      _id: "4",
      marketField: 1,
      apiType: 0,
      task: "sports",
      creator: "sample_creator_4",
      tokenA: "tokenA_4",
      tokenB: "tokenB_4",
      market: "market_4",
      question: "Will Manchester United score at least 2 goals in their next match?",
      feedName: "Premier League",
      value: 2,
      tradingAmountA: 1500,
      tradingAmountB: 1500,
      tokenAPrice: 150000000000,
      tokenBPrice: 150000000000,
      initAmount: 3000,
      range: 0,
      date: "2024-04-20",
      marketStatus: "ACTIVE",
      imageUrl: "https://resources.premierleague.com/premierleague/badges/70/t1.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 40,
      playerBCount: 60,
      totalInvestment: 28,
      description: "This market will resolve to Yes if Manchester United scores 2 or more goals in their next match",
      comments: 0
    },
    // Sample Pending Markets
    {
      _id: "5",
      marketField: 0,
      apiType: 0,
      task: "price",
      creator: "sample_creator_5",
      tokenA: "tokenA_5",
      tokenB: "tokenB_5",
      market: "market_5",
      question: "Will Solana reach $200 by Q4 2024?",
      feedName: "SOL",
      value: 200,
      tradingAmountA: 0,
      tradingAmountB: 0,
      tokenAPrice: 0,
      tokenBPrice: 0,
      initAmount: 5000,
      range: 0,
      date: "2024-12-31",
      marketStatus: "PENDING",
      imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 0,
      playerBCount: 0,
      totalInvestment: 0,
      description: "This market will resolve to Yes if Solana reaches $200 by December 31, 2024",
      comments: 0
    },
    {
      _id: "6",
      marketField: 0,
      apiType: 0,
      task: "price",
      creator: "sample_creator_6",
      tokenA: "tokenA_6",
      tokenB: "tokenB_6",
      market: "market_6",
      question: "Will Cardano reach $2 by 2025?",
      feedName: "ADA",
      value: 2,
      tradingAmountA: 0,
      tradingAmountB: 0,
      tokenAPrice: 0,
      tokenBPrice: 0,
      initAmount: 4000,
      range: 0,
      date: "2025-01-01",
      marketStatus: "PENDING",
      imageUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 0,
      playerBCount: 0,
      totalInvestment: 0,
      description: "This market will resolve to Yes if Cardano reaches $2 by January 1, 2025",
      comments: 0
    },
    {
      _id: "7",
      marketField: 1,
      apiType: 0,
      task: "sports",
      creator: "sample_creator_7",
      tokenA: "tokenA_7",
      tokenB: "tokenB_7",
      market: "market_7",
      question: "Will the Warriors score at least 120 points in their next game?",
      feedName: "NBA",
      value: 120,
      tradingAmountA: 0,
      tradingAmountB: 0,
      tokenAPrice: 0,
      tokenBPrice: 0,
      initAmount: 3000,
      range: 0,
      date: "2024-04-25",
      marketStatus: "PENDING",
      imageUrl: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 0,
      playerBCount: 0,
      totalInvestment: 0,
      description: "This market will resolve to Yes if the Warriors score 120 or more points in their next game",
      comments: 0
    },
    {
      _id: "8",
      marketField: 1,
      apiType: 0,
      task: "sports",
      creator: "sample_creator_8",
      tokenA: "tokenA_8",
      tokenB: "tokenB_8",
      market: "market_8",
      question: "Will Liverpool win their next Premier League match?",
      feedName: "Premier League",
      value: 0,
      tradingAmountA: 0,
      tradingAmountB: 0,
      tokenAPrice: 0,
      tokenBPrice: 0,
      initAmount: 3500,
      range: 0,
      date: "2024-04-30",
      marketStatus: "PENDING",
      imageUrl: "https://resources.premierleague.com/premierleague/badges/70/t14.png",
      createdAt: new Date().toISOString(),
      __v: 0,
      playerACount: 0,
      playerBCount: 0,
      totalInvestment: 0,
      description: "This market will resolve to Yes if Liverpool wins their next Premier League match",
      comments: 0
    }
  ]);

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
