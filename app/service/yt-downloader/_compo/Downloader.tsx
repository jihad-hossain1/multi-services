"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serverAction } from "./server-action";
import { qualityServer } from "./qualityServer";

export interface VideoInfo {}

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<any | null>(null);
  // console.log("🚀 ~ Downloader ~ videoInfo:", videoInfo);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [convloading, setConvLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await serverAction({ url });
      setLoading(false);
      if (response?.error) return setError(response?.error);

      setVideoInfo(response);
    } catch (err: any) {
      console.log(err);
      setError(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleQuality = async (
    quality: string,
    _url: string,
    index: number
  ) => {
    setTabIndex(index);
    console.log(quality, _url);
    try {
      setConvLoading(true);
      const response = await qualityServer({ url: _url, quality });
      console.log("🚀 ~ handleQuality ~ response:", response);
      setConvLoading(false);
      if (response?.error) return setError(response?.error);
    } catch (error) {}
  };
  return (
    <div className="py-10">
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
          <div className="max-w-lg m-auto mt-3">
            <Image
              src={videoInfo?.thumbnail}
              alt={videoInfo?.title}
              width={200}
              height={200}
              className="rounded-md w-full"
            />
            <h2 className="text-xl font-bold">Title</h2>
            <p>{videoInfo?.title}</p>
            <div>
              <h2 className="text-xl font-bold">Video</h2>
              <div className="flex flex-col gap-1 mt-3">
                {videoInfo?.video?.map((video: any) => (
                  <div key={video?.url} className="flex  gap-1 items-center">
                    <Link
                      target="_blank"
                      href={video?.url}
                      className="bg-violet-500 w-full text-white rounded-md px-3 py-1"
                    >
                      Download
                    </Link>
                    <p>{video?.quality}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4>Convert to Format</h4>
              <div className="flex flex-col gap-2">
                {videoInfo?.formats?.map((format: any, index: any) => (
                  <div
                    key={index}
                    className="flex  gap-1 items-center justify-between border rounded p-3"
                  >
                    <div>
                      <h4>format : {format?.qualityLabel}</h4>
                      <h4>Type: {format.container}</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        disabled={convloading}
                        onClick={() =>
                          handleQuality(format?.quality, url, index)
                        }
                      >
                        {convloading && index === tabIndex
                          ? "Loading..."
                          : "Convert"}
                      </button>
                      <a href={format?.url} target="_blank">
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mt-3">Audio</h2>
              <div className="flex flex-col gap-1 mt-3">
                {videoInfo?.audio?.map((audio: any) => (
                  <div key={audio?.url} className="flex  gap-1 items-center">
                    <Link
                      target="_blank"
                      href={audio?.url}
                      className="bg-violet-500 w-full text-white rounded-md px-3 py-1"
                    >
                      Download
                    </Link>
                    <p>{audio?.quality}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloader;
