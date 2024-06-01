import MediaSVG from "@/components/svg/media";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicePage = () => {
  const services = [
    {
      name: "YouTube Downloader",
      description: "Download videos from YouTube",
      url: "/service/yt-downloader",
      icon: <MediaSVG />,
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service) => (
        <div
          key={service.name}
          className="border border-violet-800 p-4 rounded-md shadow-sm hover:shadow "
        >
          <Link href={service.url} className="flex flex-col gap-1 items-center">
            {service?.icon}
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServicePage;
