import { Link } from "react-router-dom";
import { TCar } from "../../../types";

export default function CarCard({ car }: { car: TCar }) {
  const { _id, name, images, pricePerHour } = car;

  return (
    <div className="rounded-2xl w-full h-full flex flex-col bg-white/80 backdrop-blur-sm border border-amber-500/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Section */}
      <div className="p-6 pb-0 flex items-center justify-center flex-grow">
        <div className="relative group">
          <img
            className="w-48 h-48 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            src={images[0]}
            alt={`${name} image`}
          />
          <div className="absolute inset-0 rounded-lg shadow-inner group-hover:shadow-lg transition-shadow duration-300"></div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 pt-4 text-center">
        <h5
          className="mb-3 text-xl font-bold"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
          }}
        >
          {name}
        </h5>
        <h4 className="my-3 py-2 bg-gray-100/50 rounded-md text-gray-500">
          Starting at{" "}
          <span className="text-yellow-500 font-semibold">
            ${pricePerHour}/Hour
          </span>
        </h4>

        {/* Buttons */}
        <div className="flex justify-center gap-0">
          <Link to={`/cars/${_id}`} className="w-full">
            <button className="w-full px-6 py-2 text-white bg-red-600 rounded-l-xl hover:bg-red-700 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-transform duration-200 text-sm font-semibold border-r border-gray-300">
              Details
            </button>
          </Link>
          <Link to={`/booking/${_id}`} className="w-full">
            <button className="w-full px-6 py-2 text-white bg-red-600 rounded-r-xl hover:bg-red-700 hover:scale-105 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-transform duration-200 text-sm font-semibold">
              Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}