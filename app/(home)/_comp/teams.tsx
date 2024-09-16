/* eslint-disable @next/next/no-img-element */
"use client";

// components/TeamCard.tsx
import React from "react";

import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
        <p className="text-gray-600">{member.role}</p>
      </div>
    </motion.div>
  );
};

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://via.placeholder.com/400x300?text=John+Doe",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://via.placeholder.com/400x300?text=Jane+Smith",
  },
  {
    name: "Alice Johnson",
    role: "Designer",
    image: "https://via.placeholder.com/400x300?text=Alice+Johnson",
  },
  {
    name: "Bob Brown",
    role: "Developer",
    image: "https://via.placeholder.com/400x300?text=Bob+Brown",
  },
];

const OurTeam: React.FC = () => {
  return (
    <section className="py-10 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
