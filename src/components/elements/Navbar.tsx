import React, { useState, useRef, useEffect } from "react";
import Icon from "./Icons";
import { IconName } from "./Icons/Icons";
import SearchInputItem from "./marketInfo/SearchInputItem";

const searchInputs = [
  { title: "Volume", minPlaceholder: "Min", maxPlaceholder: "Max" },
  { title: "Expiry Time", minPlaceholder: "Start", maxPlaceholder: "End" },
  { title: "Yes Probability", minPlaceholder: "Min", maxPlaceholder: "Max" },
  { title: "No Probability", minPlaceholder: "Min", maxPlaceholder: "Max" },
];

type Category = {
  name: string;
  active: boolean;
  icon: IconName;
  color: string;
};

type NavbarProps = {
  categories: Category[];
  onCategorySelect: (category: string) => void; // Function to pass back selected category
};

const Navbar: React.FC<NavbarProps> = ({ categories, onCategorySelect }) => {
  // Keep track of the selected category using state
  const [activeCategory, setActiveCategory] = useState<string>("Trending");
  const [showFilter, setShowFilter] = useState<boolean>(false); // State to toggle the filter visibility
  const filterRef = useRef<HTMLDivElement | null>(null); // Reference to the filter section
  const searchPadRef = useRef<HTMLDivElement | null>(null); // Reference to the search input pad

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category); // Pass back to parent component if needed
  };

  const handleFilterClick = () => {
    setShowFilter((prevState) => !prevState); // Toggle the filter visibility
  };

  // Close the search input pad if clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(e.target as Node) && // Click outside filter
      searchPadRef.current &&
      !searchPadRef.current.contains(e.target as Node) // Click outside search pad
    ) {
      setShowFilter(false); // Close the filter pad if clicked outside
    }
  };

  // Attach and clean up the event listener on mount and unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-[#1a1a1a] relative">
      <div className="flex items-center lg:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelect(category.name)}
            className={`sm:px-5 px-3 pb-3 border-b-[1.5px] inline-flex cursor-pointer justify-start items-center gap-1
      transition-all duration-300 ease-in-out relative group
      ${
        activeCategory === category.name
          ? "border-[#07b3ff] text-[#07b3ff]"
          : "border-transparent text-[#838587] hover:text-[#07b3ff]/80"
      }`}
          >
            {/* Hover underline animation */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#07b3ff] transition-all duration-300 ease-in-out group-hover:w-full" />

            <div className="w-5 h-5 relative overflow-hidden">
              <Icon
                name={category.icon}
                color={activeCategory === category.name ? "#07b3ff" : "#838587"}
                className={`transition-all duration-300 ease-in-out hover:text-[#07b3ff]`}
              />
            </div>
            <div className={`justify-start md:text-xl text-base font-medium leading-7 ${activeCategory === category.name ? "" : "hidden md:flex"}`}>
              {category.name}
            </div>
          </div>
        ))}
      </div>

      <div
        data-active={showFilter ? "On" : "Off"}
        ref={filterRef} // Attach the ref to the filter section
        className={`sm:px-4 sm:py-2.5 px-2.5 py-1 bg-[#282828] rounded-2xl cursor-pointer outline-1 outline-offset-[-1px] 
    outline-[#313131] flex justify-start items-center gap-2 transition-all duration-300 ease-in-out 
    hover:bg-[#343434] hover:shadow-md active:scale-95 active:bg-[#3c3c3c]`}
        onClick={handleFilterClick} // Toggle the filter visibility when clicked
      >
        <div className="w-4 h-4 relative overflow-hidden">
          <Icon name="Filter" color="white" />
        </div>
        <div className="justify-start hidden lg:flex text-white text-base font-medium font-satoshi leading-normal group-hover:text-[#07b3ff] transition-all duration-300">
          Filter
        </div>
      </div>

      {/* Conditionally render the SearchInputPad based on showFilter state */}
      {showFilter && (
        <div
          ref={searchPadRef} // Attach the ref to the search input pad
          className="z-1 p-5 right-[0px] top-[70px] absolute bg-[#1e1e1e] rounded-[20px] shadow-[0px_12px_24px_0px_rgba(5,8,17,1.00)] outline-1 outline-offset-[-1px] outline-[#313131] inline-flex flex-col justify-start items-center gap-4"
        >
          {searchInputs.map((input, index) => (
            <SearchInputItem
              key={index}
              title={input.title}
              minPlaceholder={input.minPlaceholder}
              maxPlaceholder={input.maxPlaceholder}
            />
          ))}
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div
              className="flex-1 px-4 cursor-pointer py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] 
  outline-[#838587] flex justify-center items-center gap-1 transition-all duration-300 
  hover:bg-[#383838] hover:text-white hover:shadow-md active:scale-95"
            >
              <div
                className="justify-center text-[#838587] text-sm font-medium font-satoshi leading-[14px] 
    transition-all duration-300 group-hover:text-white"
              >
                Reset
              </div>
            </div>

            <div
              className="flex-1 px-4 py-2.5 cursor-pointer bg-[#07b3ff] rounded-[100px] flex justify-center 
  items-center gap-1 transition-all duration-300 hover:bg-[#059bdf] hover:shadow-lg active:scale-95"
            >
              <div className="justify-center text-[#111111] text-sm font-medium font-satoshi leading-[14px]">
                Fund Now
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
