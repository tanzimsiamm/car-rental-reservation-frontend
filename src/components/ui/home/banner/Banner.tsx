import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useState } from "react";
import { useGetCarsQuery } from "../../../../redux/features/car/carApi";
import { TCar } from "../../../../types";
import SearchResultBox from "./SearchResultBox";

export default function Banner() {
  const [searchValue, setSearchValue] = useState("");
  const { data } = useGetCarsQuery({
    status: "available",
    location: searchValue,
  });
  const searchedCars: TCar[] = data?.data || [];

  return (
    <section className="bg-gray-100 relative z-0">
      <div
        className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-left space-y-6">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.05em",
                textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.2)",
              }}
            >
              Rent Cars <br /> Worldwide
            </h1>

            <div className="flex-1 ">
              <div className="flex gap-8 mb-8">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-yellow-500">
                    5<span>+</span>
                  </h2>
                  <p className="text-gray-400">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-yellow-500">
                    30<span>+</span>
                  </h2>
                  <p className="text-gray-400">Award Winning</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-400">
              Explore our wide range of cars for your next adventure. Book now
              and hit the road!
            </p>

            <div className="relative w-full max-w-md">
              <div className="flex items-center h-12 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-500">
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
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-full w-full outline-none text-zinc-800 text-base placeholder:text-gray-500"
                  type="text"
                  placeholder="Search by location..."
                  aria-label="Search cars by location"
                />
              </div>
              {searchValue && (
                <div className="absolute top-[3rem] w-full z-[1000]">
                  <SearchResultBox searchedCars={searchedCars} />
                </div>
              )}
            </div>

            <Link to="/cars">
              <button className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 transition-all inline-flex items-center gap-2 overflow-hidden">
                <span className="leading-none">Book Now</span>
                <GoArrowUpRight className="w-5 h-5 leading-none" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
