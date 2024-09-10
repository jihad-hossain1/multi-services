

import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";
import emojiStrip from "emoji-strip";
import ffmpeg from "ffmpeg-static";
import { exec } from "child_process";
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

const downloadStreamToFile = async (
  stream: any,
  filePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);
    stream.on("end", resolve);
    stream.on("error", reject);
  });
};

const mergeFilesWithFFmpeg = (
  videoFilePath: string,
  audioFilePath: string,
  outputFilePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const mergeCommand = `"${ffmpeg}" -i "${videoFilePath.replace(
      /\\/g,
      "\\\\"
    )}" -i "${audioFilePath.replace(
      /\\/g,
      "\\\\"
    )}" -c:v copy -c:a aac "${outputFilePath.replace(/\\/g, "\\\\")}"`;
    exec(mergeCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error merging files: ${stderr}`));
        reject(new Error(`Error merging files: ${stderr}`));
      } else {
        fs.unlinkSync(videoFilePath);
        fs.unlinkSync(audioFilePath);
        resolve();
      }
    });
  });
};

export async function POST(request: NextRequest) {
  const { url, quality } = await request.json();

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 404 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title;
    const sanitizedTitle = removeSpecialCharacters(emojiStrip(videoTitle));

    // Set the root directory of your project
    const rootDirectory = path.resolve("./");

    const directory = path.join(rootDirectory, "Downloaded_Videos");
    const outDirectory = path.join(rootDirectory, "Downloaded_Videos_Output");

    createDirectoryIfNotExists(directory);
    createDirectoryIfNotExists(outDirectory);

    const videoFilePath = path.join(directory, `${sanitizedTitle}_video.mp4`);
    const audioFilePath = path.join(directory, `${sanitizedTitle}_audio.m4a`);
    const outputFilePath = path.join(outDirectory, `${sanitizedTitle}.mp4`);

    const videoStream = ytdl.downloadFromInfo(info, { format: quality });
    await downloadStreamToFile(videoStream, videoFilePath);

    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
    });
    const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });
    await downloadStreamToFile(audioStream, audioFilePath);

    await mergeFilesWithFFmpeg(videoFilePath, audioFilePath, outputFilePath);

    return NextResponse.json(
      {
        message: "Video downloaded successfully",
        videoPath: outputFilePath,
      },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Download error", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
