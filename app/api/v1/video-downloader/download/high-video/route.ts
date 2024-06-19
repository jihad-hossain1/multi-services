// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: "Method Allowed" }, { status: 405 });
// }

// import fs from "fs";
// import ytdl from "ytdl-core";
// import chalk from "chalk";
// import emojiStrip from "emoji-strip";
// import { exec } from "child_process";
// import ffmpeg from "ffmpeg-static";
// import clipboardy from "clipboardy";

// clipboardy.writeSync("");

// const removeSpecialCharacters = (str) => {
//   return str.replace(/[<>:"/\\|?*]+/g, "");
// };

// const createDirectoryIfNotExists = (directory) => {
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory);
//   }
// };

// const downloadYouTubeVideo = async (url) => {
//   try {
//     const videoInfo = await ytdl.getInfo(url);
//     const videoTitle = videoInfo.videoDetails.title;
//     const sanitizedTitle = removeSpecialCharacters(emojiStrip(videoTitle));
//     console.log(chalk.yellow(`\nBaixando vídeo: ${videoTitle}`));

//     const videoFilePath = `./Downloaded Videos/${sanitizedTitle}_video.mp4`;
//     const audioFilePath = `./Downloaded Videos/${sanitizedTitle}_audio.m4a`;
//     const outputFilePath = `./Downloaded Videos/${sanitizedTitle}.mp4`;

//     if (fs.existsSync(outputFilePath)) {
//       console.error(
//         chalk.red(`\nArquivo "${outputFilePath}" já existe. Pulando.`)
//       );
//       return;
//     }

//     const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
//       quality: "highestvideo",
//     });
//     const videoStream = ytdl.downloadFromInfo(videoInfo, {
//       format: videoFormat,
//     });
//     videoStream.pipe(fs.createWriteStream(videoFilePath));
//     await new Promise((resolve) => videoStream.on("end", resolve));

//     const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
//       quality: "highestaudio",
//     });
//     const audioStream = ytdl.downloadFromInfo(videoInfo, {
//       format: audioFormat,
//     });
//     audioStream.pipe(fs.createWriteStream(audioFilePath));
//     await new Promise((resolve) => audioStream.on("end", resolve));

//     const mergeCommand = `"${ffmpeg}" -i "${videoFilePath}" -i "${audioFilePath}" -c:v copy -c:a aac "${outputFilePath}"`;
//     exec(mergeCommand, (error, stdout, stderr) => {
//       if (error) {
//         console.error(chalk.red(`Erro ao mesclar: ${error}`));
//       } else {
//         console.log(chalk.green(`\nVídeo baixado: ${videoTitle}`));
//         fs.unlinkSync(videoFilePath);
//         fs.unlinkSync(audioFilePath);
//       }
//     });
//   } catch (error) {
//     console.error(chalk.red(`Erro ao processar o vídeo: ${error}`));
//   }
// };

// const DownloadVideo = async () => {
//   createDirectoryIfNotExists("./Downloaded Videos");
//   let lastURL = "";

//   setInterval(async () => {
//     const currentClipboard = clipboardy.readSync();
//     if (currentClipboard !== lastURL && ytdl.validateURL(currentClipboard)) {
//       lastURL = currentClipboard;
//       await downloadYouTubeVideo(currentClipboard);
//     }
//   }, 1000);
// };

// export default DownloadVideo;

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
        console.log(chalk.green(stdout));
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
  } catch (error) {
    console.error("Download error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
