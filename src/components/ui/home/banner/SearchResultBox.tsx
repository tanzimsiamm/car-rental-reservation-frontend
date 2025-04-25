import { useState } from "react";
import { TCar } from "../../../../types";
import CarDetailModal from "./CarDetailModal";

const SearchResultBox = ({ searchedCars }: { searchedCars: TCar[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carId, setCarId] = useState("");

  return (
    <div className="bg-gray-100 shadow-lg rounded-b-md w-full max-h-52 absolute top-9 left-0 right-0 flex flex-col gap-1 text-left overflow-y-auto z-40">
      {searchedCars?.length ? (
        searchedCars.map((car: TCar) => (
          <span
            onClick={() => {
              setIsOpen(true);
              setCarId(car._id!);
            }}
            key={car._id}
            className="block bg-white hover:bg-gray-200 text-zinc-800 px-4 py-2 rounded-sm cursor-pointer select-none transition"
          >
            {car.name}
          </span>
        ))
      ) : (
        <p className="text-lg text-gray-500 text-center py-6">No Cars Found</p>
      )}

      {isOpen && <CarDetailModal setIsOpen={setIsOpen} carId={carId} />}
    </div>
  );
};

export default SearchResultBox;
