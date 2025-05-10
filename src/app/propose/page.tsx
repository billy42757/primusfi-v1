"use client";

import Icon from "@/components/elements/Icons";
import { pendingPredictions } from "@/components/elements/marketInfo/Market";
import PendingCard from "@/components/elements/marketInfo/PendingCard";
import Pagination from "@/components/elements/pagination/Pagination";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { ranges } from "@/data/data";
import { ProposeType } from "@/types/type";
import axios from "axios";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { marketField } from "@/data/data";
import { findJsonPathsForKey, uploadToPinata } from "@/utils";
import { createMarket } from "@/components/prediction_market_sdk";
import { customizeFeed } from "@/components/oracle_service/simulateFeed";
import { errorAlert, infoAlert, warningAlert } from "@/components/elements/ToastGroup";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/providers/GlobalContext";
import { ClipLoader } from "react-spinners";

// Add number formatting function
const formatNumber = (num: number): string => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
  return num.toString();
};

export default function Propose() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [active, setActive] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const wallet = useWallet()
  const [isChecked, setIsChecked] = useState(false);
  const [marketFieldIndex, setMarketFieldIndex] = useState(0);
  const [marketFieldContentIndex, setMarketFieldContentIndex] = useState(0);
  const [marketFieldOpen, setMarketFieldOpen] = useState(false);
  const [needDataError, setNeededDataError] = useState(false);
  const [range, setRange] = useState(0);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [marketFieldContentOpen, setMarketFieldContentOpen] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const router = useRouter()
  const { markets } = useGlobalContext();
  const anchorWallet = useAnchorWallet();

  // useEffect(() => {
  //   document.getElementsByTagName("body")[0].addEventListener("click", (e) => {
  //     setMarketFieldOpen(false);
  //     setMarketFieldContentOpen(false);
  //   })
  // });
  const [error, setError] = useState({
    question: "",
    feedName: "",
    imageUrl: "",
    dataLink: "",
    date: "",
    ATokenName: "",
    BTokenName: "",
    ATokenSymbol: "",
    BTokenSymbol: "",
    ATokenURL: "",
    BTokenURL: "",
    TokenAmount: "",
    TokenPrice: "",
    value: "",
    checkbox: "",
    description: ""
  });
  const [data, setData] = useState<ProposeType>({
    // Provide default values based on the ProposeType structure
    marketField: marketFieldIndex,
    apiType: marketFieldContentIndex,
    question: "",
    imageUrl: "",
    feedName: "",
    dataLink: "",
    date: "",
    task: "",
    ATokenName: "",
    BTokenName: "",
    ATokenSymbol: "",
    BTokenSymbol: "",
    ATokenURL: "",
    BTokenURL: "",
    TokenAmount: 0,
    TokenPrice: 0,
    value: 0,
    range: 0,
    creator: "",
    description: ""
  });
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      setError((prevError) => ({
        ...prevError,
        imageUrl: "",
      })); // Reset error state for imageUrl

      const file = event.target.files[0];

      if (!file) {
        errorAlert("Invalid file!");
        console.log("Invalid file!");
        return
      }
      setUploading(true);
      const imageUrl = await uploadToPinata(file);

      if (!imageUrl) {
        errorAlert("Failed uploading image!");
        console.log("Invalid upload!");
        return
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
      setData((prevData) => ({
        ...prevData,
        imageUrl: imageUrl,
      }));
      infoAlert("Image uploaded successfully!");
      setUploading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setError((prevError) => ({
      ...prevError,
      checkbox: ""
    }));
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  }

  const onSubmit = async () => {
    try {
      const market_detail = marketField[marketFieldIndex].content[marketFieldContentIndex];
      const need_key = market_detail.needed_data;
      const params = [];

      if (!wallet || !wallet.publicKey || !anchorWallet) {
        warningAlert("Please connect wallet!");
        return
      }

      setActive(false);

      for (let index = 0; index < need_key.length; index++) {
        const element = need_key[index];
        const elem_val = document.getElementById(element.name) as HTMLInputElement;

        if (elem_val.value === "") {
          setNeededDataError(true);
          setActive(true);
          return
        }
        params.push(elem_val.value)
      }

      const api_link = market_detail.api_link(...params);
      const response = await axios.get(api_link);
      const task = market_detail.task ? market_detail.task : findJsonPathsForKey(JSON.stringify(response.data), params[0])[0];

      data.dataLink = api_link;
      data.task = task;
      data.creator = wallet.publicKey.toBase58() || "";
      data.range = range;
      data.marketField = marketFieldIndex;
      data.apiType = marketFieldContentIndex;
      console.log("data:", data);

      const res = await axios.post("http://localhost:8080/api/market/create", { data, isChecked });
      const market_id = res.data.result;

      const cluster = process.env.CLUSTER === "Mainnet" ? "Mainnet" : "Devnet";
      const feed_result = await customizeFeed({ url: data.dataLink, task, name: data.feedName, cluster, wallet: anchorWallet });

      const create_result = await createMarket({
        marketID: market_id,
        tokenAmount: data.TokenAmount,
        tokenPrice: data.TokenPrice,
        nameA: data.ATokenName,
        nameB: data.BTokenName,
        symbolA: data.ATokenSymbol,
        symbolB: data.BTokenSymbol,
        urlA: data.ATokenURL,
        urlB: data.BTokenURL,
        date: data.date,
        value: data.value,
        range: data.range,
        feed: feed_result.feedKeypair!,
        wallet,
        anchorWallet
      });

      console.log("create result:", create_result);

      const update_res = await axios.post("http://localhost:8080/api/market/add", { data: { ...create_result, id: market_id } });

      if (update_res.status === 200) {
        infoAlert("Market created successfully!");
        router.push(`/fund`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Error message
        console.error('Message:', error.message);

        // HTTP status code
        console.error('Status:', error.response?.status);

        // Error response data (optional)
        console.error('Error data:', error.response?.data);

        if (error.response?.status === 401) {
          setError({
            question: error.response?.data.question || "",
            feedName: error.response?.data.feedName || "",
            dataLink: error.response?.data.dataLink || "",
            imageUrl: error.response?.data.imageUrl || "",
            date: error.response?.data.date || "",
            ATokenName: error.response?.data.ATokenName || "",
            BTokenName: error.response?.data.BTokenName || "",
            ATokenSymbol: error.response?.data.ATokenSymbol || "",
            BTokenSymbol: error.response?.data.BTokenSymbol || "",
            ATokenURL: error.response?.data.ATokenURL || "",
            BTokenURL: error.response?.data.BTokenURL || "",
            TokenAmount: error.response?.data.TokenAmount || "",
            TokenPrice: error.response?.data.TokenPrice || "",
            checkbox: isChecked ? "" : "Please accept the terms and conditions",
            value: error.response?.data.value || "",
            description: error.response?.data.description || "",
          });

        } else if (error.response?.status === 500) {
          console.log("Axios Error:", error.response?.data);
        }
      } else {
        console.error('Unexpected error:', error);
        infoAlert(JSON.stringify(error));
      }
    }

    setActive(true);
  }
  return (
    <div className="px-[50px] flex-col 2xl:flex-row self-stretch inline-flex justify-start items-start gap-[50px] overflow-auto relative">
      <div className="flex-1 p-8 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-center items-center gap-8 relative">
        {active ? "" : <div className="absolute flex justify-center items-center w-full h-full bg-[#1e1e1e]/50 backdrop-blur-sm z-20 rounded-2xl">
          <ClipLoader
            color="#ffffff"
            size={300}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>}
        
        {/* Header Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
            Create Your Prediction Market
          </div>
          <div className="justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
            Fill in the blanks to create your market!
          </div>
        </div>

        {/* Main Form Section */}
        <div className="self-stretch flex flex-col gap-8">
          {/* Top Section: Image, Category, and Data Source */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Image Upload */}
            <div className="flex flex-col gap-4 lg:w-1/4">
              <div className="text-white text-xl font-medium">Step 1: Add a Market Image</div>
              <div className="flex flex-col gap-2">
                <label className="w-[200px] h-[200px] bg-[#111111] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] flex flex-col justify-center items-center gap-4 relative hover:bg-[#1a1a1a] transition-colors">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  )}
                  <FiUpload size={24} color="gray" />
                  <div className="text-[#838587] text-sm font-medium text-center px-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {isUploading ? "Uploading..." : "Click to upload image"}
                  </div>
                </label>
                <div className="text-[#838587] text-xs">*File format jpg, png, img. max size 5mb</div>
                <div className={`text-red text-sm ${error.imageUrl !== "" ? "" : "invisible"}`}>*Invalid Image</div>
              </div>
            </div>

            {/* Right Column: Category and Data Source */}
            <div className="flex flex-col gap-8 lg:w-3/4">
              {/* Market Category Selection */}
              <div className="flex flex-col gap-4">
                <div className="text-white text-xl font-medium">Step 2: Choose Your Market Category</div>
                <button 
                  className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                  onClick={() => setMarketFieldOpen(!marketFieldOpen)}
                >
                  {marketField[marketFieldIndex].name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {marketFieldOpen && (
                  <div className="w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131]">
                    {marketField.map((field, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                        onClick={() => {
                          setMarketFieldIndex(index);
                          setMarketFieldOpen(false);
                          setMarketFieldContentIndex(0);
                        }}
                      >
                        {field.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* API Selection */}
              <div className="flex flex-col gap-4">
                <div className="text-white text-xl font-medium">Step 3: Select Your Data Source</div>
                <button 
                  className="w-full text-[#838587] px-4 py-3.5 text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" 
                  onClick={() => setMarketFieldContentOpen(!marketFieldContentOpen)}
                >
                  {marketField[marketFieldIndex].content[marketFieldContentIndex].api_name}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {marketFieldContentOpen && (
                  <div className="w-full bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131]">
                    {marketField[marketFieldIndex].content.map((field, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                        onClick={() => {
                          setMarketFieldContentIndex(index);
                          setMarketFieldContentOpen(false);
                        }}
                      >
                        {field.api_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#313131]"></div>

          {/* Question Building Section */}
          <div className="flex flex-col gap-8">
            <div className="text-white text-xl font-medium">Step 4: Build Your Prediction Question</div>
            
            {/* Question Preview Card */}
            <div className="flex flex-col gap-4 p-6 bg-[#111111] rounded-2xl border border-[#313131]">
              <div className="text-white text-xl font-medium">Your Question Preview</div>
              <div className="text-[#838587] text-lg">
                Will ${data.feedName || "___"} {
                  data.range === 0 ? "reach a per token price of $" : 
                  data.range === 1 ? "reach a market cap of $" : "___"
                }
                <span className="text-[#07b3ff]">
                  {data.value ? formatNumber(Number(data.value)) : "___"}
                </span> by <span className="text-[#07b3ff]">{data.date || "___"}</span>?
              </div>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                {/* Token Ticker */}
                <div className="flex flex-col gap-2">
                  <div className="text-[#838587] text-lg">Token Ticker</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#07b3ff] text-lg">$</span>
                    <input
                      type="text"
                      className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors"
                      placeholder="e.g. BTC, ETH, etc."
                      name="feedName"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className={`text-red ${error.feedName !== "" ? "" : "invisible"}`}>*Please enter a token ticker</div>
                </div>

                {/* Contract Address (if needed) */}
                {marketField[marketFieldIndex].content[marketFieldContentIndex].needed_data.map((field, index) => (
                  field.name === "ca" && (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="text-[#838587] text-lg">Contract Address</div>
                      <input
                        type="text"
                        id={field.name}
                        className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors"
                        placeholder="Enter contract address"
                        name={field.name}
                        onChange={() => setNeededDataError(false)}
                      />
                      <div className={`text-red ${needDataError ? "" : "invisible"}`}>*Please fill out this field</div>
                    </div>
                  )
                ))}

                {/* Resolution Date */}
                <div className="flex flex-col gap-2">
                  <div className="text-[#838587] text-lg">Resolution Date</div>
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors"
                    name="date"
                    onChange={onInputChange}
                  />
                  <div className={`text-red ${error.date !== "" ? "" : "invisible"}`}>*Invalid Resolution Date</div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {/* Prediction Type Selection */}
                <div className="flex flex-col gap-2">
                  <div className="text-[#838587] text-lg">Prediction Type</div>
                  <div className="flex gap-4">
                    <button
                      className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                        data.range === 0
                          ? "bg-[#07b3ff] text-[#111111]"
                          : "bg-[#111111] text-[#838587] hover:bg-[#1a1a1a]"
                      }`}
                      onClick={() => setData(prev => ({ ...prev, range: 0 }))}
                    >
                      Price Target
                    </button>
                    <button
                      className={`flex-1 px-4 py-3.5 text-lg font-medium rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] transition-colors ${
                        data.range === 1
                          ? "bg-[#07b3ff] text-[#111111]"
                          : "bg-[#111111] text-[#838587] hover:bg-[#1a1a1a]"
                      }`}
                      onClick={() => setData(prev => ({ ...prev, range: 1 }))}
                    >
                      Market Cap
                    </button>
                  </div>
                </div>

                {/* Target Value */}
                <div className="flex flex-col gap-2">
                  <div className="text-[#838587] text-lg">Target Value</div>
                  <input
                    type="number"
                    className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors"
                    placeholder="Enter target value"
                    name="value"
                    onChange={onInputChange}
                    min={0}
                  />
                  <div className={`text-red ${error.value !== "" ? "" : "invisible"}`}>*Invalid Prediction Value</div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <div className="text-[#838587] text-lg">Description</div>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3.5 text-[#838587] text-lg font-medium bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] hover:bg-[#1a1a1a] transition-colors resize-none"
                    placeholder="Describe your prediction market..."
                    name="description"
                    onChange={onInputChange}
                  />
                  <div className={`text-red ${error.description !== "" ? "" : "invisible"}`}>*Please fill out this field</div>
                </div>
              </div>
            </div>

            {/* Terms and Submit Section */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  onClick={handleCheckboxChange}
                />
                <div className="text-[#838587] text-lg">
                  I agree to the{" "}
                  <span className="text-[#3fd145] underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </div>
              </div>
              <div className={`text-red ${error.checkbox !== "" ? "" : "invisible"}`}>
                *Please accept the terms and conditions
              </div>

              {/* Submit Button */}
              <button
                className="w-full px-6 py-4 text-xl font-medium text-[#111111] bg-[#07b3ff] rounded-2xl shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] hover:bg-[#0697e5] transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={onSubmit}
              >
                Create Market
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
