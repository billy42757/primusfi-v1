import { useGlobalContext } from "@/providers/GlobalContext";
import { PendingData, Prediction } from "@/types/type";
import { useEffect, useState } from "react";
import { categories } from "@/data/data";
import Pagination from "../pagination/Pagination";
import PredictionCard from "./PredictionCard";
import PendingCard from "./PendingCard";
import Navbar from "../Navbar";
import axios from "axios";
import { usePathname } from "next/navigation";
import { AxiosResponse } from "axios";

interface MarketProps {
  showRecentActivity?: boolean;
  onToggleRecentActivity?: () => void;
}

const Market: React.FC<MarketProps> = ({ showRecentActivity = true, onToggleRecentActivity }) => {
  const { markets, activeTab, formatMarketData } = useGlobalContext();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("Trending");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      let marketData: AxiosResponse<any, any> = {
        data: undefined,
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new axios.AxiosHeaders()
        }
      };
      if (pathname === "/fund") {
        marketData = await axios.get(`http://localhost:8080/api/market/get?page=${currentPage}&limit=10&marketStatus=PENDING&marketField=${selectedCategory === "Sports" ? 1 : 0}`);
      } else if (pathname === "/") {
        marketData = await axios.get(`http://localhost:8080/api/market/get?page=${currentPage}&limit=10&marketStatus=ACTIVE&marketField=${selectedCategory === "Sports" ? 1 : 0}`);
      }

      setTotal(marketData.data.total);
      formatMarketData(marketData.data.data);
    })()
  }, [pathname, selectedCategory, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Filter markets based on selected category
  const filteredMarkets = markets.filter(market => {
    if (selectedCategory === "Trending") {
      return true; // Show all markets in Trending
    } else if (selectedCategory === "Sports") {
      return market.marketField === 1; // Show sports markets
    } else if (selectedCategory === "Crypto") {
      return market.marketField === 0 && market.task === "price"; // Show crypto markets
    } else if (selectedCategory === "News") {
      return market.marketField === 0 && market.task !== "price"; // Show news markets
    }
    return true;
  });

  return (
    <div className="flex-1 inline-flex flex-col self-stretch justify-start items-start gap-6">
      <Navbar 
        categories={categories} 
        onCategorySelect={handleCategorySelect} 
        showRecentActivity={showRecentActivity}
        onToggleRecentActivity={onToggleRecentActivity}
      />
      <div className={`grid w-full gap-4 ${
        pathname === "/fund" 
          ? "2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1" 
          : showRecentActivity
            ? "2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1"
            : "2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1"
      }`}>
        {filteredMarkets.map((prediction, index) =>
          activeTab === "ACTIVE" ? (
            <PredictionCard
              key={prediction._id}
              index={markets.indexOf(prediction)}
              currentPage={currentPage}
            />
          ) : (
            <PendingCard
              key={prediction._id}
              index={markets.indexOf(prediction)}
              category={prediction.feedName}
              question={prediction.question}
              volume={prediction.totalInvestment}
              timeLeft={prediction.date}
              comments={0}
              imageUrl={prediction.imageUrl}
            />
          )
        )}
      </div>

      {
        filteredMarkets.length <= 10 ? "" : <Pagination
          totalPages={Math.ceil(filteredMarkets.length / 10)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
};

export default Market;
