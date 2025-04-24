import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import RelatedCarCard from "./RelatedCarCard";

interface FilterQuery {
  status?: string;
  location?: string;
  carType?: string;
  sortByCost?: string;
}

export default function RelatedCars() {
  const [filterQuery, setFilterQuery] = useState<FilterQuery>({ status: "available" });
  const { data, isFetching } = useGetCarsQuery(filterQuery);
  const cars: TCar[] = data?.data || [];

  const handleFilterChange = (key: keyof FilterQuery, value: string) => {
    setFilterQuery((prev) => {
      const newQuery = { ...prev };
      if (value) {
        newQuery[key] = value;
      } else {
        delete newQuery[key];
      }
      return newQuery;
    });
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Related Cars
        </h2>
        <p
          className="mt-3 text-gray-600 md:text-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Explore our available cars tailored to your needs.
        </p>
      </div>

      <section className="relative">
        {isFetching && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/50">
            <ClipLoader
              color="#F59E0B"
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-8">
          <div className="w-full max-w-xs">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Search by Location
            </label>
            <input
              id="location"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
              placeholder="Search cars by location..."
              onChange={(e) => handleFilterChange("location", e.target.value)}
              aria-label="Search cars by location"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          <div className="w-full max-w-xs">
            <label
              htmlFor="sortByCost"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Sort by Cost
            </label>
            <select
              id="sortByCost"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
              onChange={(e) => handleFilterChange("sortByCost", e.target.value)}
              aria-label="Sort by cost"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="">Sort by Cost</option>
              <option value="1">Low to High</option>
              <option value="-1">High to Low</option>
            </select>
          </div>

          <div className="w-full max-w-xs">
            <label
              htmlFor="carType"
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Filter by Car Type
            </label>
            <select
              id="carType"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300"
              onChange={(e) => handleFilterChange("carType", e.target.value)}
              aria-label="Filter by car type"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="">Filter by Car Type</option>
              <option value="compact">Compact</option>
              <option value="suv">SUVs</option>
              <option value="luxury">Luxury</option>
              <option value="pickup/truck">Pickups / Trucks</option>
              <option value="electric">Electric</option>
              <option value="convertibles">Convertibles</option>
            </select>
          </div>
        </div>

        {cars.length === 0 && !isFetching && (
          <div className="text-center py-12">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No cars found matching your criteria. Try adjusting the filters!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {cars.slice(0, 4).map((car) => (
            <RelatedCarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </section>
  );
}