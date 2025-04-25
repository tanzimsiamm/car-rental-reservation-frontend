const TeamCard = ({
  name,
  position,
  image,
}: {
  name: string;
  position: string;
  image: string;
}) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative h-[280px] md:h-[200px] lg:h-[260px] xl:h-[320px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
          style={{ filter: "brightness(0.95)" }}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=Image+Not+Found";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-2xl"></div>
      </div>

      <div className="p-6 text-center">
        <h2
          className="text-xl md:text-lg lg:text-xl xl:text-2xl font-semibold text-zinc-800 mb-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {name}
        </h2>
        <h4
          className="text-sm lg:text-base text-yellow-500"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {position}
        </h4>
      </div>
    </div>
  );
};

export default TeamCard;
