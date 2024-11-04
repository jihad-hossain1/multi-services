import CodeSVG from "@/components/svg/code";
import MediaSVG from "@/components/svg/media";
import Link from "next/link";
import React from "react";

const ServicePage = () => {
  const services = [
    // {
    //   name: "YouTube Downloader",
    //   description: "Download videos from YouTube",
    //   url: "/service/yt-downloader",
    //   icon: <MediaSVG className="size-10" />,
    // },
    {
      name: "Code Share",
      description: "Share code with other users",
      url: "/service/code-share",
      icon: <CodeSVG className="size-10" />,
    },
    {
      name: "SVG to JSX",
      description: "Convert your SVG to JSX Component",
      url: "/service/svg-jsx-convert",
      icon: <CodeSVG className="size-10" />,
    },
    {
      name: "Image Compress",
      description: "Compress your images",
      url: "/service/image-process",
      icon: <MediaSVG className="w-10 h-10 " stroke="#f2c94c" />,
    },
    {
      name: "Bangla Content Write",
      description: "Egnlish to Bangla Content Write",
      url: "/service/write",
      icon: <MediaSVG className="w-10 h-10 " stroke="#f2c94c" />,
    },
    {
      name: "Free File Upload",
      description: "Free file uploader from discord api",
      url: "/service/free-upload-file",
      icon: <MediaSVG className="w-10 h-10 " stroke="#f2c94c" />,
    },
  ];
  return (
    <main className="min-h-[60vh]">
      <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.name}
            className=" transition-all duration-300 border border-gray-300 p-4 rounded-md shadow-[0px_0px_2px_rgba(0,0,0,0.25)] hover:shadow-[0px_0px_5px_rgba(0,0,0,0.25)] bg-white"
          >
            <Link
              href={service.url}
              className="flex flex-col gap-1 items-center"
            >
              {service?.icon}
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ServicePage;
