

type TModalProps = {
    setFilterQuery : React.Dispatch<React.SetStateAction<Record<string, unknown>>>
    }
    
    
    export default function SearchBanner( { setFilterQuery } : TModalProps) {
    
      return (
       <div className="hero h-180px] lg:h-[200px] xl:h-[220px] mb-3 md:mb-8" style={{backgroundImage: 'url(https://st4.depositphotos.com/1006839/20724/i/450/depositphotos_207249444-stock-photo-front-view-generic-brandless-moder.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-4xl space-y-2 lg:space-y-5">
          <h1 className=" text-3xl lg:text-5xl carter-one-regular">All CARS</h1>
          <p className="text-sm md:text-base">Experience the extraordinary with our range of signature dishes meticulousl.</p>
          
    <div className='max-w-md mx-auto'>
        <div className="relative flex items-center mx-auto w-64 md:w-72 lg:w-full h-10 lg:h-12 rounded-sm focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
    
            <input onChange={(e) => setFilterQuery(prev => ({...prev, location: e.target.value}))}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search cars by location..." /> 
        </div>
    </div>
        </div>
      </div>
    </div>
      )
    }
    