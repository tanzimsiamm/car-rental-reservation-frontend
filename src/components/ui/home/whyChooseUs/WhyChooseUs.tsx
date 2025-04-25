import { Link } from "react-router-dom";
import {
  TruckIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import Card from "./Card";

const services = [
  {
    id: 1,
    title: "Diverse Vehicle Selection",
    description:
      "Explore a wide range of cars, from budget-friendly compacts to premium SUVs and luxury models.",
    icon: TruckIcon,
  },
  {
    id: 2,
    title: "Top-Notch Customer Support",
    description:
      "Our dedicated team ensures a smooth rental experience with 24/7 assistance.",
    icon: LifebuoyIcon,
  },
  {
    id: 3,
    title: "Secure Booking Process",
    description:
      "Book with confidence using our safe and transparent transaction system.",
    icon: ShieldCheckIcon,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="bg-gray-100 py-12"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
            textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
          }}
          id="why-choose-us-heading"
        >
          Why Rent With Us
        </h2>
        <p
          className="text-base md:text-lg text-gray-500 text-center max-w-lg mx-auto mt-4 mb-10 md:mb-12 lg:mb-16"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Enjoy a seamless car rental experience with our trusted services.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {services.map((service) => (
            <Card key={service.id} service={service} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/about">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
