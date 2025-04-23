import { Link } from "react-router-dom";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import CarCard from "../cars/CarCard";

function FeaturedCars() {
  const { data } = useGetCarsQuery(undefined);
  const cars: TCar[] = data?.data || [];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
            textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
          }}
          id="featured-cars-heading"
        >
          Our Featured Cars
        </h2>
        <p
          className="text-base md:text-lg text-gray-500 text-center max-w-lg mx-auto mt-4 mb-10 md:mb-12 lg:mb-16"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Discover our top vehicles for your next adventure, curated for style and performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8 mb-12">
          {cars?.slice(0, 8).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/cars">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300">
              View All Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCars;