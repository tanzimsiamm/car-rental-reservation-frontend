/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useCreateCarMutation } from "../../../../redux/features/car/carApi";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TCar } from "../../../../types";

type TModalProps = {
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateCarModal({ open, setOpen} : TModalProps) {

  const { register, handleSubmit } = useForm();
  const [createCar, { isLoading }] = useCreateCarMutation();

  // console.log(res)

  const onSubmit = async (data: any ) => {
    
  const carData : TCar = {
    name : data.name,
    carType : data.carType,
    isElectric : data.isElectric === 'yes'? true : false,
    color : data.color,
    location : data.location,
    pricePerHour : parseInt(data.pricePerHour),
    description : data.description,
    features : data.features.toUpperCase().split(','),
    images : [ data.image1, data.image2, data.image3],
  }

  // Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque non aperiam sed voluptatem est nobis, tempore vel magni nemo voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque non aperiam sed voluptatem est nobis, tempore vel magni nemo voluptas?

  try {
    const response =  await createCar(carData).unwrap();

  if(response?.success){
    // close the modal 
    setOpen(false)
    // show a toast 
    toast.success('New Car has been created')
  }
  }catch(error){
    toast.error('Something went wrong')
    console.log(error)
  }
 
  }


  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">  
       
       <form className="w-[400px] md:w-[600px] p-7 bg-white rounded-md relative" onSubmit={handleSubmit(onSubmit)}>

        {/* loading white layer  */}
      {isLoading && <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-md flex justify-center items-center"> 
        <ClipLoader
           color='#000002'
           loading={isLoading}
          //  cssOverride={override}
           size={60}
           aria-label="Loading Spinner"
           speedMultiplier={0.8} />
      </div>}

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Car Name</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("name")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Car Type</label>
         <select className="w-full outline p-2 mt-3 outline-black/20 rounded-sm outline-1 text-xs md:text-sm " {...register("carType")} >
         <option disabled selected>Select</option>
              <option value='compact'>Compact</option>
              <option value='suv'>SUVs</option>
              <option value='luxury'>Luxury</option>
              <option value='pickup/truck'>Pickups / Trucks</option>
              <option value='electric'>Electric</option>
              <option value='convertibles'>Convertibles</option>
        </select>

        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Electric</label>
         <select className="w-full outline p-2 mt-3 outline-black/20 rounded-sm outline-1 text-xs md:text-sm " {...register("isElectric")} >
              <option disabled selected>Select</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
        </select>

        </div>
     
        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Color</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("color")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Location</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("location")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Price Per Hour</label>
        <input type="number" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("pricePerHour")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Features <span className="text-sm inter-regular text-lime-600"> (Each feature must be separated by comma)</span> </label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("features")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold">Description</label>
        <input type="text" className="outline-none border-b-2 border-gray-700 focus:border-blue-600 w-full py-1 rounded-sm" {...register("description")} />
        </div>

        <div className="flex flex-col justify-start items-start mb-3">
        <label className="font-semibold mb-3">Images (URL)</label>
        <input type="text" className="outline-none border-b-2 border-gray-600 focus:border-blue-600 w-full py-1 rounded-sm" {...register("image1")} placeholder="image 1"/>
        <input type="text" className="outline-none border-b-2 border-gray-600 focus:border-blue-600 w-full py-1 rounded-sm" {...register("image2")} placeholder="image 2"/>
        <input type="text" className="outline-none border-b-2 border-gray-600 focus:border-blue-600 w-full py-1 rounded-sm" {...register("image3")} placeholder="image 3"/>

        {/* {maxImageError &&  <span className="text-red-500 font-semibold text-sm mt-1">{maxImageError}</span> } */}
        
        </div>
       


<button type="submit" className="px-8 text-sm lg:text-base mt-6 mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-black hover:bg-gray-800 "> Create</button>

<button onClick={() => setOpen(!open)} className="px-8 text-sm lg:text-base mr-3 py-2 md:py-2 font-semibold text-white rounded transition bg-red-600 hover:bg-red-700 "> Close </button>
</form>
       
       </section>
  )
}
