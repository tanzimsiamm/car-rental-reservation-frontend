
import { Link } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { TCar } from "../../../types";

export default function CarCard({ car } : { car : TCar}) {

 const {_id, name, images, pricePerHour} = car;


  return (
    <div className="rounded-3xl w-full h-full flex flex-col bg-[#171A21]">

   <div className="p-6 pb-0 flex items-center justify-center flex-grow">
   <img className=" p-[2px] w-64 h-64 object-contain "  src={images[0]} />
   </div>
  
  <div className="pt-0">
    <h5
      className="mb-3 text-lg font-medium leading-tight text-zinc-300  text-center uppercase flex items-center gap-2 justify-center">
  <AiOutlineMinus/> {name} <AiOutlineMinus/> 
    </h5>
 
    <h4 className="inter-regular my-3 py-2 text-zinc-400 bg-[#0F121B] text-center">Starting at <span className="text-amber-400"> {` $${pricePerHour}/ Hour`} </span> </h4>

    <div className="flex justify-center items-center w-full flex-grow-1">
    <Link to={`/cars/${_id}`} className="w-full" > <button style={{borderBottomLeftRadius: '15px'}} className="bg-[#282A36] w-full px-14 md:px-6 py-2 md:py-[5px] xl:px-14 text-zinc-300 font-semibold transition-all whitespace-nowrap hover:bg-[#0F121B] text-sm md:text-base border border-zinc-600">Details </button></Link>

    <Link to={`/booking/${_id}`} className="w-full" > <button style={{borderBottomRightRadius: '15px'}} className="bg-[#0F121B] w-full px-14 md:px-6 py-2 md:py-[5px] xl:px-14 text-zinc-300 font-semibold transition-all whitespace-nowrap hover:bg-[#0F121B] text-sm md:text-base border border-zinc-600">Book </button></Link>


    </div>

  </div>
</div>
  )
}
