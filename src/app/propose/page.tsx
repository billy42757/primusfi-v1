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
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-white text-[40px] font-medium font-rubik leading-[48px]">
            Market Proposition
          </div>
          <div className="justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
            Create your market and start earning!
          </div>
        </div>
        <div className="self-stretch inline-flex flex-col lg:flex-row  justify-start items-start gap-8">
          <div className="rounded-2xl inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
              Market Photo
            </div>
            <label className="xl:w-[280px] xl:h-[280px] w-[150px] h-[150px] px-4 py-2.5 bg-[#111111] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] outline-[#313131] flex flex-col justify-center items-center gap-4 relative">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
              )}
              <div className="w-4 h-4 relative overflow-hidden">
                <FiUpload size={16} color="gray" />
              </div>
              <div className="self-stretch text-center justify-start text-[#838587] text-lg font-medium font-satoshi leading-7">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {isUploading ? "Uploading" : "Upload photo"}
              </div>
            </label>
            <div className="self-stretch justify-start text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
              *File format jpg, png, img. max size 5mb
            </div>
            <div className={`text-red ${error.imageUrl !== "" ? "" : "invisible"}`}>*Invalid Image</div>
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="self-stretch flex flex-col justify-start items-start relative gap-2 mb-8">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Market Field
              </div>
              <button className="self-stretch  hover:cursor-pointer text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center" type="button" onClick={() => setMarketFieldOpen(!marketFieldOpen)}>
                {marketField[marketFieldIndex].name}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {marketFieldOpen ? <div id="dropdown" className="z-10  w-full self-stretch hover:cursor-pointer text-[#838587] px-3 py-2 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center absolute top-[100%] left-0">
                <ul className="py-2 w-full">
                  {
                    marketField.map((field, index) =>
                      <li className="w-full hover:bg-[#313131] rounded-md" onClick={() => { setMarketFieldIndex(index); setMarketFieldOpen(false); setMarketFieldContentIndex(0); }} key={index + field.name} >
                        <span className="block px-4 py-2 ">{field.name}</span>
                      </li>
                    )
                  }
                </ul>
              </div> : ""}
            </div>

            <div className="self-stretch flex flex-col justify-start items-start relative gap-2 mb-8">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                API Selection
              </div>
              <button className="self-stretch  hover:cursor-pointer text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center" type="button" onClick={() => setMarketFieldContentOpen(!marketFieldContentOpen)}>
                {marketField[marketFieldIndex].content[marketFieldContentIndex].api_name}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {marketFieldContentOpen ? <div id="dropdown" className="z-10  w-full self-stretch hover:cursor-pointer text-[#838587] px-3 py-2 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center absolute top-[100%] left-0">
                <ul className="py-2 w-full">
                  {
                    marketField[marketFieldIndex].content.map((field, index) =>
                      <li className="w-full hover:bg-[#313131] rounded-md" onClick={() => { setMarketFieldContentIndex(index); setMarketFieldContentOpen(false); }} key={index + field.api_name} >
                        <span className="block px-4 py-2 ">{field.api_name}</span>
                      </li>
                    )
                  }
                </ul>
              </div> : ""}
            </div>

            {
              marketField[marketFieldIndex].content[marketFieldContentIndex].needed_data.map((field, index) =>
                <div className="self-stretch flex flex-col justify-start items-start gap-2" key={index + field.name}>
                  <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                    {field.name}
                  </div>
                  <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                    <input type="text" id={field.name} className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder={field.placeholder} name={field.name} onChange={() => setNeededDataError(false)} />
                  </div>
                  <div className={`text-red ${needDataError ? "" : "invisible"}`}>*Please fill out this field</div>
                </div>
              )
            }

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                MarketQuestion
              </div>
              <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                <input className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="e.g. Will ETH hit $5K by June 2025?" name="question" onChange={onInputChange} />
              </div>
              {/* <div className={`text-red ${error.question ? "" : "invisible"}`}>{error.question}</div> */}
              <div className={`text-red ${error.question !== "" ? "" : "invisible"}`}>*Invalid question</div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Feed Name
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="flex-1 justify-start px-4 py-3.5 text-[#838587] md:text-lg text-sm font-medium font-satoshi leading-7 outline-none" placeholder="BTC prediction" min={0} name="feedName" onChange={onInputChange} />
                  <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                    <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                      <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`self-stretch justify-start ${error.feedName !== "" ? "text-red" : "text-[#838587]"} font-medium font-satoshi leading-relaxed`}>
                {error.feedName !== "" ? "*Invalid Feed Name" : "*Max length 32 characters"}
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Prediction Value
              </div>
              <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                <input type="number" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="150" name="value" onChange={onInputChange} min={0} />
              </div>
              <div className={`text-red ${error.value !== "" ? "" : "invisible"}`}>*Invalid Prediction Value</div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start relative gap-2 mb-8">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Select Prediction Range
              </div>
              <button className="self-stretch  hover:cursor-pointer text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center" type="button" onClick={() => setRangeOpen(!rangeOpen)}>
                {ranges[range]}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {rangeOpen ? <div id="dropdown" className="z-10  w-full self-stretch hover:cursor-pointer text-[#838587] px-3 py-2 md:text-lg text-sm font-medium font-satoshi leading-7 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center absolute top-[100%] left-0">
                <ul className="py-2 w-full">
                  {
                    ranges.map((range, index) =>
                      <li className="w-full hover:bg-[#313131] rounded-md" onClick={() => { setRange(index); setRangeOpen(false); }} key={index + range} >
                        <span className="block px-4 py-2 ">{range}</span>
                      </li>
                    )
                  }
                </ul>
              </div> : ""}
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Resolution date
              </div>
              <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                <input type="date" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="December 24, 2025" name="date" onChange={onInputChange} />
              </div>
              <div className={`text-red ${error.date !== "" ? "" : "invisible"}`}>*Invalid Resoution Date</div>
            </div>

            {/* ----------------- Input for token metadata ----------------------------- */}
            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Yes Token name
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="Bitcoin-Yes" name="ATokenName" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.ATokenName !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  No Token name
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="Bitcoin-No" name="BTokenName" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.BTokenName !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Yes Token Symbol
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="YesPre" name="ATokenSymbol" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.ATokenSymbol !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>

              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  No Token name
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="NoPre" name="BTokenSymbol" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.BTokenSymbol !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Yes token image url
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="https://myimage" name="ATokenURL" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.ATokenURL !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  No token image url
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="text" className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="https://myimage" name="BTokenURL" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.BTokenURL !== "" ? "" : "invisible"}`}>*Invalid Token Name</div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2">
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Amount of each token
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="number" min={0} className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="100000000" name="TokenAmount" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.TokenAmount !== "" ? "" : "invisible"}`}>*Invalid Token Amount</div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full md:w-1/2">
                <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                  Price of token
                </div>
                <div className="self-stretch bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-center">
                  <input type="number" min={0} className="outline-none flex-1 justify-start text-[#838587] px-4 py-3.5 md:text-lg text-sm font-medium font-satoshi leading-7" placeholder="0.001SOL" name="TokenPrice" onChange={onInputChange} />
                </div>
                <div className={`text-red ${error.TokenPrice !== "" ? "" : "invisible"}`}>*Invalid Token Price</div>
              </div>
            </div>
            {/* ----------------- End of input for token metadata ----------------------------- */}

            <div className="self-stretch h-[200px] flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-white text-lg font-medium font-satoshi leading-relaxed">
                Description
              </div>
              <div className="self-stretch flex-1 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex justify-between items-start">
                <textarea rows={5} className="flex-1 justify-start text-[#838587] md:text-xl px-4 py-3.5 text-sm font-medium font-satoshi leading-7 w-full outline-none" name="description" placeholder="Description..." onChange={onInputChange} ></textarea>
                <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                  <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                    <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-red ${error.description !== "" ? "" : "invisible"}`}>*Please fillout this field.</div>

            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" onClick={() => handleCheckboxChange()} />
              <div className="justify-start">
                <span className="text-[#838587] text-lg font-medium font-satoshi leading-relaxed">
                  By clicking ‘Submit’ you agree to out{" "}
                </span>
                <span className="text-[#3fd145] text-lg font-medium font-satoshi underline leading-relaxed">
                  Terms & Conditions
                </span>
              </div>
            </div>
            <div className={`text-red ${error.checkbox !== "" ? "" : "invisible"}`}>*Please check the box to agree to the terms and conditions.</div>

            <div
              data-size="Big"
              data-type="Prime"
              className="w-[300px] px-6 cursor-pointer py-3.5 opacity-60 bg-[#07b3ff] rounded-2xl shadow-[inset_0px_3px_0px_0px_rgba(255,255,255,0.16)] inline-flex justify-center items-center gap-2 transition-all duration-200 ease-in-out transform hover:opacity-100 hover:bg-[#0697e5] active:scale-95" onClick={() => onSubmit()}
            >
              <div className="justify-start text-[#111111] text-xl font-medium font-satoshi leading-7"  >
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="2xl:w-[428px] w-auto  p-8 bg-[#1e1e1e] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-center items-center gap-8">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <div className="flex-1 justify-start text-white text-2xl font-medium font-rubik leading-loose">
              Existing markets
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-3">
            <div className="flex-1 px-4 py-2.5 bg-[#111111] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative overflow-hidden">
                <IoSearchOutline size={16} color="gray" />
              </div>
              <input className="flex-1 justify-start text-[#838587] text-base font-medium font-satoshi leading-normal outline-none" placeholder="Search" />
              <div className="w-4 h-4 relative opacity-0 overflow-hidden">
                <div className="w-3.5 h-3.5 left-[1.33px] top-[0.67px] absolute">
                  <div className="w-3.5 h-3.5 left-0 top-0 absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#838587]" />
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#282828] rounded-2xl outline-1 outline-offset-[-1px] outline-[#313131] flex justify-start items-center gap-2">
              <div className="w-4 h-4 relative overflow-hidden">
                <Icon name="Filter" />
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-2xl grid md:grid-cols-2 xl:grid-cols-3 gap-2 2xl:inline-flex justify-start items-start 2xl:gap-4 flex-wrap content-start">
            {markets.map((prediction, index) => (
              <PendingCard
                key={index}
                index={index}
                category={prediction.feedName}
                question={prediction.question}
                volume={prediction.totalInvestment}
                timeLeft={prediction.date}
                comments={0}
                imageUrl={prediction.imageUrl}
              />
            ))}
          </div>
          <div className="self-stretch inline-flex justify-center items-center gap-4">
            <Pagination
              totalPages={4}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
