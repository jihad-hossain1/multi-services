"use client";

import { motion } from "framer-motion";
import CodeSVG from "@/components/svg/code";
import MediaSVG from "@/components/svg/media";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const cardTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

export default function CommonService() {
  const services = [
    {
      name: "Code Share",
      description: "Share code with other users",
      url: "/service/code-share",
      icon: <CodeSVG className="w-10 h-10 " stroke="#199255" />,
    },
    {
      name: "SVG to JSX",
      description: "Convert your SVG to JSX Component",
      url: "/service/svg-jsx-convert",
      icon: <CodeSVG className="w-10 h-10 " stroke="#f2c94c" />,
    },
    {
      name: "Image Compress",
      description: "Compress your images",
      url: "/service/image-process",
      icon: <MediaSVG className="w-10 h-10 " stroke="#f2c94c" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {services.map((service) => (
        <motion.div
          key={service.name}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={cardTransition}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          className="bg-primary_light border border-primary_light_2 rounded-lg shadow-md"
        >
          <Link
            href={service.url}
            className="flex flex-col items-center p-6 text-center"
          >
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.1 }}
              transition={cardTransition}
            >
              {service.icon}
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-primary_dark mb-2"
              whileHover={{ color: "#3b82f6" }}
              transition={cardTransition}
            >
              {service.name}
            </motion.h3>
            <motion.p
              className="text-primary_dark"
              whileHover={{ color: "#1f2937" }}
              transition={cardTransition}
            >
              {service.description}
            </motion.p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
