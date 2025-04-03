import { useState } from "react";
import TeamCard from "./TeamCard";

const teams = [
  {
    userName: "Imtiaz Sarkar Shimul",
    position: "Senior Advisor",
    image: "/Screenshot (712).png",
    id: 1,
  },
  {
    userName: "Khan Mohammad Iqra",
    position: "Site Manager",
    image: "/52e58987bcc42c63c37abd7a5ab35575.jpg",
    id: 2,
  },
  {
    userName: "Shamim Ahmed",
    position: "Senior Designer",
    image: "/7152f0516abb4f83bc37d1b03e5dd237.jpg",
    id: 3,
  },
  {
    userName: "Sogir Sikder",
    position: "Senior Advisor",
    image: "/Screenshot (711).png",
    id: 4,
  },
  {
    userName: "Tanim Pramanik",
    position: "Site Manager",
    image: "/Screenshot (710).png",
    id: 5,
  },
  {
    userName: "Maksudur Rahman",
    position: "3D Visual Designer",
    image: "/a7a12ce815dca51a03017beda3103ba1.jpg",
    id: 6,
  },
];

const TeamSection = () => {
  const [teamData] = useState(teams);

  return (
    <div className="my-28 xl:my-44">
      <h2 className="text-3xl lg:text-4xl carter-one-regular text-center text-gray-300 mb-12">
        Team Members
      </h2>

      {/* grid container  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-9">
        {teamData?.map((person) => (
          <TeamCard
            key={person.id}
            name={person.userName}
            position={person.position}
            image={person.image}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
