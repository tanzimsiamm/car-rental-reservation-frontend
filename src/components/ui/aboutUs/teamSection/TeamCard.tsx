
const TeamCard = ({ name, position, image}: 
    { name: string; position : string; image: string}) => {

    return (
        <div>

            <div className="h-[280px] md:h-[160px] lg:h-[240px] xl:h-[330px]">
                <img src={image} style={{borderRadius: '65px'}} className="w-full h-full object-cover opacity-90 px-7 py-6 md:px-4 md:py-3 lg:px-6  lg:py-7 xl:px-12 xl:py-10" />
             </div>

            <div className="border-l-2 border-gray-300 px-6 md:px-4 lg:px-7 xl:px-12 py-2 xl:py-5 pb-1 ml-9  border-t-2 rounded-3xl">

            <h2 className={`text-xl md:text-sm lg:text-lg xl:text-[22px]  lg:mb-1 xl:mb-2 text-zinc-400 `}> {name} </h2>
             <h4 className={`text-xs lg:text-sm xl:text-base text-amber-500`}> {position} </h4>
            </div>
  
        </div>
    );
};

export default TeamCard;