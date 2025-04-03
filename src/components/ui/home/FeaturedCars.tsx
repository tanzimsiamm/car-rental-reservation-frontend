import { useGetCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "../../../types";
import CarCard from "../cars/CarCard";



function FeaturedCars() {
   const { data } = useGetCarsQuery(undefined);
   const cars : TCar[] = data?.data || [];

  return (
   <>
     <div className={`mb-14 mt-24 md:mt-8 lg:mt-14`}>
    <h1 className="text-zinc-400 text-center text-3xl lg:text-5xl carter-one-regular my-2">Featured Cars</h1>
     <p className="text-center text-sm md:text-lg max-w-[1040px] mx-auto text-zinc-400 mt-0 md:mt-2 mb-10 md:mb-16 lg:mb-20 font-play" >Experience the extraordinary with our range of signature products.  promising.</p>


<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-7  mb-8 md:mb-16 pb-16">
    {cars?.slice(0,8).map(car => <CarCard key={car._id} car={car} /> )}
</div> 
        
    
    </div>
   </>
  );
}

export default FeaturedCars;


