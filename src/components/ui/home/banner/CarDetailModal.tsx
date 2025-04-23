import { ClipLoader } from "react-spinners";
import { useGetSingleCarQuery } from "../../../../redux/features/car/carApi";
import { TCar } from "../../../../types";

type TModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  carId: string;
};

export default function CarDetailModal({ setIsOpen, carId }: TModalProps) {
  const { data, isLoading: dataLoading } = useGetSingleCarQuery(carId);
  const car: TCar = data?.data;

  if (dataLoading) {
    return (
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-gray-100/80 rounded-md flex justify-center items-center">
        <ClipLoader
          color="#27272A"
          size={35}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
        />
      </div>
    );
  }

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] p-6 bg-gray-100 rounded-xl shadow-lg">
        {/* Detail section */}
        <div className="flex flex-col items-center">
          {/* Car image */}
          <div className="mb-4">
            <img
              className="w-44 h-44 object-contain rounded-lg border-4 border-white shadow-md p-2"
              src={car?.images[0]}
              alt={`${car?.name} image`}
            />
          </div>

          {/* Car details */}
          <div className="text-center">
            <h5 className="text-2xl font-semibold text-zinc-800 mb-3">
              {car?.name}
            </h5>
            <h5 className="text-xl flex items-center justify-center gap-2 mb-3">
              <span className="text-gray-500 italic">Cost:</span>
              <span className="text-yellow-500 font-bold">
                ${car?.pricePerHour}/hr
              </span>
            </h5>
            <div className="text-lg text-gray-500 mb-2">
              Location: {car?.location}
            </div>
            <div className="text-lg">
              Status:{" "}
              <span
                className={`${
                  car?.status === "available"
                    ? "text-emerald-500"
                    : "text-red-600"
                } font-semibold`}
              >
                {car?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
        >
          Close
        </button>
      </div>
    </section>
  );
}