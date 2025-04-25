import { useState } from "react";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import SearchResultBox from "../home/banner/SearchResultBox";

type TModalProps = {
  setFilterQuery: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

export default function SearchBanner({ setFilterQuery }: TModalProps) {
  const [searchValue, setSearchValue] = useState("");
  const { data } = useGetCarsQuery({
    status: "available",
    location: searchValue,
  });
  const searchedCars: TCar[] = data?.data || [];

  return (
    <section className="bg-gray-100">
      <div className="relative h-[200px] md:h-[250px] lg:h-[300px] bg-gradient-to-b from-zinc-900 via-amber-600/90 to-amber-500/80 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 h-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full">
          {/* Headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            Explore Our Cars
          </h1>

          {/* Subtext */}
          <p
            className="text-base md:text-lg text-gray-200 max-w-lg"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)" }}
          >
            Find the perfect car for your next adventure with our wide range of
            vehicles.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="flex items-center h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-yellow-500 transition-all duration-300 overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setFilterQuery((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }));
                }}
                className="h-full w-full outline-none text-zinc-800 text-base placeholder:text-gray-500 bg-transparent"
                type="text"
                placeholder="Search cars by location..."
                aria-label="Search cars by location"
              />
            </div>

            {/* Search Results (Dropdown) */}
            {searchValue && (
              <div className="absolute left-0 right-0 top-full mt-2 z-40">
                <SearchResultBox searchedCars={searchedCars} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
