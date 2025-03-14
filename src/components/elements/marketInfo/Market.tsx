import { useGlobalContext } from "@/providers/GlobalContext";
import { useState } from "react";
import Navbar from "../Navbar";
import PredictionCard from "./PredictionCard";
import PendingCard from "./PendingCard";
import Pagination from "../pagination/Pagination";
import { categories } from "@/data/data";
import { PendingData, Prediction } from "@/types/type";

// Sample data (10 items)
export const activePredictions: Prediction[] = [
  {
    category: "Trending",
    question: "Will $BTC rise +2% today?",
    volume: "$19,045",
    timeLeft: "2:47:38",
    comments: 45,
    yesPercentage: 65,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Team A win the championship?",
    volume: "$8,750",
    timeLeft: "1:15:23",
    comments: 50,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Ethereum hit $3,000 this year?",
    volume: "$22,500",
    timeLeft: "5:30:50",
    comments: 38,
    yesPercentage: 72,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will a new tech law be passed this year?",
    volume: "$12,350",
    timeLeft: "3:15:10",
    comments: 21,
    yesPercentage: 55,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will Tesla stock go up by 10%?",
    volume: "$30,120",
    timeLeft: "4:45:15",
    comments: 61,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will LeBron James retire this year?",
    volume: "$15,600",
    timeLeft: "2:12:30",
    comments: 54,
    yesPercentage: 80,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Cardano rise 30% this quarter?",
    volume: "$18,200",
    timeLeft: "3:00:20",
    comments: 45,
    yesPercentage: 67,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will climate change policies get stronger this year?",
    volume: "$25,400",
    timeLeft: "1:45:10",
    comments: 78,
    yesPercentage: 60,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will SpaceX launch a satellite?",
    volume: "$13,250",
    timeLeft: "6:30:05",
    comments: 33,
    yesPercentage: 66,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Messi break a new goal-scoring record?",
    volume: "$5,700",
    timeLeft: "7:12:30",
    comments: 25,
    yesPercentage: 50,
    imageUrl: "https://placehold.co/56x56",
  },
];

// Sample Pending Predictions
export const pendingPredictions: PendingData[] = [
  {
    category: "Crypto",
    question: "Will Ethereum hit $3,000 this year?",
    volume: "$22,500",
    timeLeft: "Pending",
    comments: 38,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will a new tech law be passed this year?",
    volume: "$12,350",
    timeLeft: "Pending",
    comments: 21,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will AI surpass human intelligence by 2030?",
    volume: "$18,750",
    timeLeft: "Pending",
    comments: 55,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Sports",
    question: "Will Manchester United win the Champions League?",
    volume: "$15,900",
    timeLeft: "Pending",
    comments: 33,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Solana flip Ethereum in market cap?",
    volume: "$30,500",
    timeLeft: "Pending",
    comments: 62,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will the next U.S. election result in a recount?",
    volume: "$20,750",
    timeLeft: "Pending",
    comments: 41,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will the S&P 500 reach a new all-time high?",
    volume: "$25,800",
    timeLeft: "Pending",
    comments: 47,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Crypto",
    question: "Will Apple launch a foldable iPhone by 2026?",
    volume: "$14,300",
    timeLeft: "Pending",
    comments: 29,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "Trending",
    question: "Will SpaceX successfully launch humans to Mars?",
    volume: "$50,000",
    timeLeft: "Pending",
    comments: 88,
    imageUrl: "https://placehold.co/56x56",
  },
  {
    category: "News",
    question: "Will the next Marvel movie gross over $1 billion?",
    volume: "$19,600",
    timeLeft: "Pending",
    comments: 52,
    imageUrl: "https://placehold.co/56x56",
  },
];

const Market: React.FC = () => {
  const { activeTab } = useGlobalContext(); // Use Global Context
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("Trending");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleVote = () => {
    console.log(`Voted`);
  };

  // Choose data based on the active tab
  const predictionsToShow =
    activeTab === "ActiveMarket" ? activePredictions : pendingPredictions;

  // Filter predictions based on selected category
  const filteredPredictions =
    selectedCategory === "All"
      ? predictionsToShow
      : predictionsToShow.filter(
          (prediction) => prediction.category === selectedCategory
        );

  return (
    <div className="flex-1 inline-flex flex-col self-stretch justify-start items-start gap-6">
      <Navbar categories={categories} onCategorySelect={handleCategorySelect} />
      {/* <div className="inline-flex self-stretch justify-start items-start gap-2 flex-wrap"> */}
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 gap-2 w-full ">
        {filteredPredictions.map((prediction, index) =>
          activeTab === "ActiveMarket" ? (
            <PredictionCard
              key={index}
              category={prediction.category}
              question={prediction.question}
              volume={prediction.volume}
              timeLeft={prediction.timeLeft}
              comments={prediction.comments}
              yesPercentage={(prediction as Prediction).yesPercentage}
              imageUrl={prediction.imageUrl}
              onVote={() => handleVote()}
            />
          ) : (
            <PendingCard
              key={index}
              category={prediction.category}
              question={prediction.question}
              volume={prediction.volume}
              timeLeft={prediction.timeLeft}
              comments={prediction.comments}
              imageUrl={prediction.imageUrl}
            />
          )
        )}
      </div>

      <Pagination
        totalPages={4}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Market;
