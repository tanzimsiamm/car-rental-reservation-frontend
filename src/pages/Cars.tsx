
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { TCar } from "../types";
import { useGetCarsQuery } from "../redux/features/car/carApi";
import SearchBanner from "../components/ui/cars/SearchBanner";
import Container from "../components/layout/Container";
import CarCard from "../components/ui/cars/CarCard";


export default function Cars() {

  const [ filterQuery, setFilterQuery ] = useState({})
    const { data , isFetching } = useGetCarsQuery(filterQuery);
    console.log(data)
    const cars : TCar[] = data?.data || [];

     //  {
                // location : 'tangail'
                // carType : 'sedun'
                // costRange : '10-35'
                // sortByCost : -1
                // status : 'unavailable'
        //  }

 
  return (
    <section className="pb-12">
        <SearchBanner setFilterQuery={setFilterQuery} />
      <Container>

     <section className="my-2 md:my-6 lg:my-8 " >
    
      
        {isFetching && <ClipLoader
           color='#FBBF24'
           size={60}
           className="absolute top-72 md:top-2/4 left-2/4"
           aria-label="Loading Spinner"
           speedMultiplier={0.8} /> }

        <section>

          {/* all filtering section  */}
          <div className="flex justify-between md:justify-end my-6 gap-3 flex-wrap-reverse">
            
          <select 
          onChange={(e)=> setFilterQuery(prev => ({...prev, sortByCost: e.target.value}))}
           className=" max-w-xs outline p-2 outline-black/20 rounded-sm outline-1 text-xs md:text-sm">
              <option disabled selected> Sort by Cost</option>
               <option value='1'> Low to High</option>
               <option value='-1'> High to Low</option>
        </select>

          <select
           onChange={(e)=> setFilterQuery(prev => ({...prev, costRange: e.target.value}))}

            className=" max-w-xs outline p-2 outline-black/20 rounded-sm outline-1 text-xs md:text-sm">
              <option disabled selected>Filter by cost</option>
               <option value='0-20'>0 - 20$</option>
               <option value='20-40'>20 - 40$</option>
               <option value='40-60'>40 - 60$</option>
               <option value='60-80'>60 - 80$</option>
               <option value='80-100'>80 - 100$</option>
               <option value='0-0'>Custom</option>
        </select>
        
        <select 
        onChange={(e) => setFilterQuery(prev => ({...prev, carType: e.target.value}))}
         className=" max-w-xs outline p-2 outline-black/20 rounded-sm outline-1 text-xs md:text-sm ">
              <option disabled selected> Filter by Car Type</option>
              <option value='compact'>Compact</option>
              <option value='suv'>SUVs</option>
              <option value='luxury'>Luxury</option>
              <option value='pickup/truck'>Pickups / Trucks</option>
              <option value='electric'>Electric</option>
              <option value='convertibles'>Convertibles</option>
        
        </select>

          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-items-center gap-7  mb-8 md:mb-16 xl:mt-20">
            {cars?.map(car => <CarCard key={car._id} car={car} /> )}
        </div> 

          {/* no cars direction  */}
        { (!cars || !cars.length) && <p className="text-base md:text-lg mt-4 text-center">No Products Found</p>}

        </section>
          
    </section>
</Container>
    </section>
 
  )
}
