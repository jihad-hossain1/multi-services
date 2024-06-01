"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serverAction } from "./server-action";

export interface VideoInfo {
  downloadUrl: string;
  info: {
    formats: {
      qualityLabel: string;
      container: string;
      mimeType: string;
      url: string;
    }[];
    details: {
      title: string;
      description: string;
    };
    thumbnail: string;
  };
}

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await serverAction({ url });
      setLoading(false);
      setVideoInfo(response);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center my-20">
          YouTube Video Downloader
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            required
            className="bg-transparent  border border-violet-500 rounded-md p-2 focus:outline-none"
            type="text"
            placeholder="Enter YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="max-w-lg m-auto mt-3">
            <button
              type="submit"
              disabled={loading}
              className=" bg-violet-500 w-full text-white rounded-md px-7 py-2"
            >
              {loading ? "Loading..." : "Get Download Link"}
            </button>
          </div>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {videoInfo && (
          <div className="my-10">
            <div className="flex flex-col items-center justify-center">
              <div>
                <Image
                  className="m-auto object-cover rounded-lg shadow-lg"
                  src={videoInfo?.info?.thumbnail}
                  alt={videoInfo?.info?.details?.title}
                  width={400}
                  height={400}
                />
              </div>
              <h2 className="text-xl font-semibold">
                {videoInfo?.info?.details?.title}
              </h2>
            </div>
            {/* <p>{videoInfo.info.details.description}</p> */}
            <div className="flex flex-col gap-2">
              {videoInfo?.info?.formats?.map((format: any, index) => (
                <div key={index} className="grid lg:grid-cols-2 gap-4">
                  <h4>
                    <span>{index + 1}.</span> {videoInfo?.info?.details?.title}
                  </h4>
                  <div>
                    <p>
                      {format?.qualityLabel || format?.container} -{" "}
                      {format?.mimeType?.split(";")[0]} -{" "}
                      <span className="bg-orange-500 text-white rounded-md  text-xs py-1 px-2">
                        {format?.fileSize}
                      </span>{" "}
                      MB
                    </p>
                    <Link
                      target="_blank"
                      href={format?.url}
                      className="bg-violet-800 px-3 rounded-md shadow-sm hover:shadow-lg py-1"
                      download={videoInfo?.info?.details?.title}
                    >
                      Download
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloader;
