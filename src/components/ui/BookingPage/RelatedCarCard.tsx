
import { Link } from "react-router-dom";
import { AiOutlineMinus } from "react-icons/ai";
import { TCar } from "../../../types";

export default function RelatedCarCard({ car } : { car : TCar}) {

 const {_id, name, images, pricePerHour} = car;


  return (
    <Link to={`/booking/${_id}`} className="w-full">
    <div className="rounded-3xl w-full h-full flex flex-col bg-[#171A21] hover:bg-gray-900 hover:border border-gray-600">

<div className="p-6 pb-0 flex items-center justify-center flex-grow">
<img className=" p-[2px] w-44 h-32 lg:h-24 xl:h-40 object-contain "  src={images[0]} />
</div>

<div className="pt-0">
 <h5
   className="mb-3 xl:text-lg font-medium leading-tight text-zinc-300  text-center uppercase flex items-center gap-2 justify-center">
<AiOutlineMinus/> {name} <AiOutlineMinus/> 
 </h5>

 <h4 className="inter-regular my-3 py-2 text-zinc-400 bg-[#0F121B] text-center text-sm xl:text-base">Starting at <span className="text-amber-400"> {` $${pricePerHour}/ Hour`} </span> </h4>


</div>
</div></Link>
  )
}
