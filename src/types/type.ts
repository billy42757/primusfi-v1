import { init } from "next/dist/compiled/webpack/webpack";

export interface SidebarNavItemProps {
  label:
    | "Home"
    | "FundMarket"
    | "ProposeMarket"
    | "Referral"
    | "Profile"
    | "About";
  href: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

export interface SidebarNavProps {
  isCollapsed: boolean;
}

export interface MarketCarouselItemProps {
  category: string;
  title: string;
  bgImage: string;
  mainImage: string;
  overlayImage: string;
}

// Define Prediction type for active predictions
export interface Prediction {
  category: string;
  question: string;
  volume: string;
  timeLeft: string;
  comments: number;
  yesPercentage: number; // Only for active predictions
  imageUrl: string;
  onVote?: () => void;
}

// Define PendingData type for pending predictions
export interface PendingData {
  category: string;
  question: string;
  volume: string;
  timeLeft: string;
  comments: number;
  imageUrl: string;
}

export interface ProposeType {
  question: string;
  feedName: string;
  dataLink: string;
  task: string;
  date: string;
  ATokenName: string;
  BTokenName: string;
  ATokenSymbol: string;
  BTokenSymbol: string;
  ATokenURL: string;
  BTokenURL: string;
  TokenAmount: number;
  TokenPrice: number
}