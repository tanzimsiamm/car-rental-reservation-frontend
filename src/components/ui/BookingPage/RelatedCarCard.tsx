import { Link } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { TCar } from "../../../types";

export default function RelatedCarCard({ car }: { car: TCar }) {
  const { _id, name, images, pricePerHour } = car;

  return (
    <Link
      to={`/booking/${_id}`}
      className="block w-full"
      aria-label={`Book ${name}`}
    >
      <div className="rounded-2xl w-full h-full flex flex-col bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 border border-gray-200 transition-all duration-300">
        <div className="p-6 pb-0 flex items-center justify-center flex-grow">
          <img
            className="w-40 h-24 md:h-28 lg:h-32 xl:h-36 object-contain"
            src={images[0] || "https://via.placeholder.com/150?text=Car+Image"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=Car+Image";
            }}
          />
        </div>

        <div className="pt-0 px-4 pb-4">
          <h5
            className="mb-2 text-base md:text-lg font-semibold text-center uppercase flex items-center gap-2 justify-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <AiOutlineMinus /> {name} <AiOutlineMinus />
          </h5>

          <h4
            className="text-sm md:text-base text-center text-gray-600"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Starting at{" "}
            <span className="text-green-500 font-semibold">
              ${pricePerHour.toFixed(2)}/Hour
            </span>
          </h4>
        </div>
      </div>
    </Link>
  );
}