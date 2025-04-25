import {
  TruckIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

interface IconMap {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const icons: IconMap = {
  "Diverse Vehicle Selection": TruckIcon,
  "Top-Notch Customer Support": LifebuoyIcon,
  "Secure Booking Process": ShieldCheckIcon,
};

const Card = ({
  service,
}: {
  service: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
}) => {
  const { title, description } = service;
  const Icon = icons[title];

  return (
    <div className="flex-1 bg-white/90 backdrop-blur-sm border border-amber-500/50 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-yellow-500 transition-all duration-300 p-6 text-center">
      {Icon && (
        <Icon
          className="w-12 h-12 mx-auto mb-4 text-yellow-500"
          aria-hidden="true"
        />
      )}
      <h3
        className="text-xl font-semibold text-zinc-800 mb-2"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="text-gray-500 text-sm md:text-base"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {description}
      </p>
    </div>
  );
};

export default Card;
