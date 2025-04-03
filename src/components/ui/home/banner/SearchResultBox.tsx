import { useState } from "react";
import { TCar } from "../../../../types";
import CarDetailModal from "./CarDetailModal";


const SearchResultBox = ({ searchedCars } : { searchedCars : TCar[]}) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ carId, setCarId ] = useState('');


    return (
        <div className="bg-white shadow-2xl rounded-b-md w-full h-52 pt-3 absolute top-9 left-0 right-0 flex flex-col  gap-1 text-left overflow-y-auto">
           
           {searchedCars?.map((car : TCar) =>  <span   onClick={() => { setIsOpen(true); setCarId(car._id!)}}  key={car._id} className="bg-gray-50/40 hover:bg-gray-100 text-zinc-800 select-none px-3 py-2 rounded-sm cursor-pointer"> {car.name}
           </span>
           )}

           {!searchedCars?.length && <p className="text-xl text-gray-600 text-center pt-7"> No Cars Found</p>}

           {isOpen &&  <CarDetailModal  setIsOpen={setIsOpen} carId={carId} />}
         
        </div>
    );
};

export default SearchResultBox;