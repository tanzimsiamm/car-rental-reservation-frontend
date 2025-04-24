import TeamCard from "./TeamCard";

const teams = [
  {
    userName: "Emma Thompson",
    position: "Chief Operating Officer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    id: 1,
  },
  {
    userName: "Liam Carter",
    position: "Fleet Manager",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    id: 2,
  },
  {
    userName: "Sofia Mendes",
    position: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    id: 3,
  },
  {
    userName: "Aarav Patel",
    position: "Senior Advisor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    id: 4,
  },
  {
    userName: "Olivia Brooks",
    position: "Customer Experience Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    id: 5,
  },
  {
    userName: "Noah Kim",
    position: "Innovation Specialist",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    id: 6,
  },
];

const TeamSection = () => {
  return (
    <section className="bg-gray-100 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #F59E0B, #D97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              textShadow: "1.5px 1.5px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            Meet Our Team
          </h2>
          <p
            className="mt-4 text-gray-500 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our dedicated professionals bring expertise and passion to ensure your journey is exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teams.map((person) => (
            <TeamCard
              key={person.id}
              name={person.userName}
              position={person.position}
              image={person.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;