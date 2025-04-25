import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { TCar } from "../types";
import { useGetCarsQuery } from "../redux/features/car/carApi";
import SearchBanner from "../components/ui/cars/SearchBanner";
import Container from "../components/layout/Container";
import CarCard from "../components/ui/cars/CarCard";

export default function Cars() {
  const [filterQuery, setFilterQuery] = useState({});
  const { data, isFetching } = useGetCarsQuery(filterQuery);
  const cars: TCar[] = data?.data || [];

  return (
    <section className="bg-gray-100 relative z-0">
      <SearchBanner setFilterQuery={setFilterQuery} />
      <Container>
        <section className="my-6 md:my-8 lg:my-12">
          {isFetching && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-[1000]">
              <ClipLoader
                color="#F59E0B"
                size={60}
                aria-label="Loading cars"
                speedMultiplier={0.8}
              />
            </div>
          )}

          <div className="flex justify-between md:justify-end my-6 gap-4 flex-wrap">
            <select
              onChange={(e) =>
                setFilterQuery((prev) => ({
                  ...prev,
                  sortByCost: e.target.value,
                }))
              }
              className="w-full md:w-48 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-zinc-800 text-sm md:text-base p-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              aria-label="Sort cars by cost"
            >
              <option disabled selected>
                Sort by Cost
              </option>
              <option value="1">Low to High</option>
              <option value="-1">High to Low</option>
            </select>

            <select
              onChange={(e) =>
                setFilterQuery((prev) => ({
                  ...prev,
                  costRange: e.target.value,
                }))
              }
              className="w-full md:w-48 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-zinc-800 text-sm md:text-base p-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              aria-label="Filter cars by cost range"
            >
              <option disabled selected>
                Filter by Cost
              </option>
              <option value="0-20">0 - 20$</option>
              <option value="20-40">20 - 40$</option>
              <option value="40-60">40 - 60$</option>
              <option value="60-80">60 - 80$</option>
              <option value="80-100">80 - 100$</option>
              <option value="0-0">Custom</option>
            </select>

            <select
              onChange={(e) =>
                setFilterQuery((prev) => ({ ...prev, carType: e.target.value }))
              }
              className="w-full md:w-48 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-zinc-800 text-sm md:text-base p-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              aria-label="Filter cars by type"
            >
              <option disabled selected>
                Filter by Car Type
              </option>
              <option value="compact">Compact</option>
              <option value="suv">SUVs</option>
              <option value="luxury">Luxury</option>
              <option value="pickup/truck">Pickups / Trucks</option>
              <option value="electric">Electric</option>
              <option value="convertibles">Convertibles</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8 mb-12">
            {cars?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          {(!cars || !cars.length) && (
            <p
              className="text-lg md:text-xl text-gray-500 text-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              role="alert"
            >
              No <span className="text-yellow-500 font-semibold">Cars</span>{" "}
              Found
            </p>
          )}
        </section>
      </Container>
    </section>
  );
}
