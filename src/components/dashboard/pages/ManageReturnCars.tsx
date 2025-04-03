
import { useState } from "react"
import { ClipLoader } from "react-spinners";
import { MdModeEdit } from "react-icons/md";
import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import UpdateCarModal from "../components/modal/UpdateCarModal";


export default function ManageReturnCars(){

    const [openUpdateModal, setOpenUpdateModal ] = useState<boolean>(false);
    const { data, isLoading } = useGetCarsQuery({ status : 'unavailable'});
    const [updateProductId, setUpdateProductId ] = useState('')

    const cars: TCar[] = data?.data || []

    


  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt"> 


   <div className="flex justify-center items-center mb-3">
   <h2 className="text-2xl md:text-4xl carter-one-regular text-zinc-300 ">Booked CARS</h2>
   </div>

   <div className="text-right mb-7">

   {/* update product modal  */}
   {openUpdateModal && <UpdateCarModal carId={updateProductId} open={openUpdateModal} setOpen={setOpenUpdateModal}/>}
    
   </div>


<div className="flex flex-col ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
          <thead className=" inter-regular ">
            <tr className="bg-amber-600 h-8 text-white/95 text-[12px] md:text-base ">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600 rounded-l-2xl">
               Image
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
              Name
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
              Location
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
              Car Type
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
            Price(1H)
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600">
           Status
              </th>
             
              
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 border-zinc-600"> Action </th>
            
            </tr>
          </thead>
          <tbody className="relative">

          {isLoading && <ClipLoader
           color='#FBBF24'
           loading={isLoading}
          className="absolute top-14 left-2/4"
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />}
          
          {cars?.map(car =>  <tr key={car._id} className="border-b ">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium border-zinc-500 flex items-center justify-center">
                <img src={car.images[0]} className="w-[52px] h-[52px] md:w-20 md:h-20 object-contain rounded-full" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                {car.name}
              </td>

              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                {car.location}
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-zinc-400 text-start md:text-center px-6 py-4 border-zinc-500">
                {car.carType}
              </td>

              <td
                className="whitespace-nowrap font-medium text-lime-500 text-sm md:text-lg border-r px-6 py-4 border-zinc-500">
                {car.pricePerHour}$
              </td>
              <td
                className="whitespace-nowrap font-medium text-zinc-400 text-sm md:text-lg border-r px-6 py-4 border-zinc-500">
                {car.status}
              </td>
              
              
              <td className="whitespace-nowrap font-medium border-r text-sm md:text-lg  px-6 py-4 border-zinc-500">
             
             <button className={`bg-blue-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-blue-700 text-[12px] md:text-base `}
             onClick={() => {
              setUpdateProductId(car._id!)
              setOpenUpdateModal(true)
              }} > 
            <MdModeEdit/></button>
    
               </td>

         
            
            </tr>)}
         
          </tbody>
        </table>
        {!cars?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Cars </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

