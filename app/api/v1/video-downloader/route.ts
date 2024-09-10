import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import emojiStrip from "emoji-strip";
import ffmpeg from "ffmpeg-static";
// import clipboardy from "clipboardy";
import { exec } from "child_process";
import { execSync } from "child_process";
import chalk from "chalk";

const removeSpecialCharacters = (str: string): string => {
  return str.replace(/[<>:"/\\|?*]+/g, "");
};

const createDirectoryIfNotExists = (directory: string): void => {
  if (typeof directory !== "string") {
    throw new Error("Directory path must be a string");
  }

  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  } catch (error) {
    console.error("Error creating directory", error);
    throw new Error("Failed to create directory");
  }
};

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 404 });
  }

  try {
    const info = await ytdl.getInfo(url);

    const videoTitle = info.videoDetails.title;

    const audioFormats = ytdl
      .filterFormats(info.formats, "audioonly")
      .filter((format) => format.hasAudio);
    const videoFormats = ytdl
      .filterFormats(info.formats, "videoandaudio")
      .filter((format) => format.hasAudio && format.hasVideo);

    if (!videoFormats.length) {
      return NextResponse.json(
        { error: "Download link not found" },
        { status: 404 }
      );
    }

    const videoDownloadLinks = videoFormats.map((format) => ({
      url: format.url,
      quality: format.qualityLabel,
    }));


    const audioDownloadLinks = audioFormats.map((format) => {
     
      return {
        url: format.url,
        quality: format.audioBitrate,
        
      };
    });

    const thumbnail =
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;

    return NextResponse.json(
      {
        video: videoDownloadLinks,
        audio: audioDownloadLinks,
        title: videoTitle,
        thumbnail: thumbnail,
        formats: info.formats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Download error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

