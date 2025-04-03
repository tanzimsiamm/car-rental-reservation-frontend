const Card = ({
  service,
}: {
  service: { id: number; title: string; description: string; logo: string };
}) => {
  const darkMode = true;

  const { title, id, description, logo } = service;

  return (
    <div
      className={`flex flex-col gap-2 lg:gap-4 xl:gap-4 py-9 md:py-5 lg:py-10 xl:py-16 px-5 lg:px-7 xl:px-10 rounded-3xl ${
        darkMode
          ? id === 2
            ? "bg-amber-500"
            : "bg-[#171A21]"
          : "bg-primary-gold"
      }`}
    >
      <div
        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center ${
          darkMode
            ? id === 2
              ? "bg-white"
              : "bg-primary-gold"
            : id === 2
            ? "bg-white"
            : ""
        }`}
      >
        {" "}
        <img src={logo} className="w-12 lg:w-[75px]" />{" "}
      </div>

      <h4
        className={`text-lg md:text-xl lg:text-xl xl:text-[27px] inter-medium ${
          darkMode ? (id === 2 ? "text-black" : "text-zinc-300") : ""
        }`}
      >
        {" "}
        {title}{" "}
      </h4>
      <p
        className={`text-sm lg:text-base xl:text-lg ${
          darkMode ? (id === 2 ? "text-black" : "text-zinc-400") : ""
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default Card;
