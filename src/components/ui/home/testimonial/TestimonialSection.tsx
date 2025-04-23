import SliderBox from "./SliderBox";

export type TReviews = {
  id: number;
  user_img: string;
  user_name: string;
  user_position: string;
  description: string;
  rating: number;
};

const reviews = [
  {
    id: 1,
    user_img: "https://randomuser.me/api/portraits/women/44.jpg",
    user_name: "Emma Thompson",
    user_position: "Marketing Director",
    description:
      "The car rental process was seamless, with a fantastic selection of vehicles and exceptional customer service that made my trip unforgettable.",
    rating: 4.7,
  },
  {
    id: 2,
    user_img: "https://randomuser.me/api/portraits/men/32.jpg",
    user_name: "Aarav Patel",
    user_position: "Entrepreneur",
    description:
      "I was impressed by the quick booking process and the quality of the cars. The team went above and beyond to ensure my needs were met.",
    rating: 4.3,
  },
  {
    id: 3,
    user_img: "https://randomuser.me/api/portraits/men/67.jpg",
    user_name: "Liam Carter",
    user_position: "Travel Blogger",
    description:
      "Renting a car was a breeze, and the vehicle was in top condition. Highly recommend for anyone looking for a reliable rental experience.",
    rating: 3.7,
  },
  {
    id: 4,
    user_img: "https://randomuser.me/api/portraits/women/19.jpg",
    user_name: "Sofia Mendes",
    user_position: "Business Consultant",
    description:
      "From start to finish, the service was outstanding. The car was perfect for my business trip, and the support team was always available.",
    rating: 3.7,
  },
];

const TestimonialSection = () => {
  return (
    <section
      id="testimonial-section"
      className="bg-gray-100 py-12 px-4 lg:py-20"
      aria-labelledby="testimonial-heading"
    >
      <div className="container mx-auto">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(90deg, #F59E0B, #D97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.05em",
            textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
          }}
          id="testimonial-heading"
        >
          What Our Clients Say
        </h2>
        <SliderBox reviews={reviews} />
      </div>
    </section>
  );
};

export default TestimonialSection;