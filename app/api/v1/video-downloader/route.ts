import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import axios from "axios";
import { PassThrough } from "stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";



// Set ffmpeg path
// ffmpeg.setFfmpegPath(ffmpegPath);

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  // console.log("🚀 ~ ffmpegPath:", ffmpegPath);
  
  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 404 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestvideo",
    });
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
    });

    const downloadUrl = videoFormat.url;
    const thumbnail =
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
    const duration = parseInt(info.videoDetails.lengthSeconds, 10);

    const formats = info.formats.map((format) => {
      const bitrate = format.bitrate || format.averageBitrate;
      const fileSize = bitrate
        ? (bitrate * duration) / 8 / (1024 * 1024)
        : null;
      return {
        qualityLabel: format.qualityLabel,
        container: format.container,
        mimeType: format.mimeType,
        url: format.url,
        fileSize: fileSize ? fileSize.toFixed(2) : "N/A",
      };
    });

    // Check if separate audio and video streams are needed
    if (videoFormat.hasAudio || audioFormat.url === videoFormat.url) {
      return NextResponse.json(
        {
          downloadUrl: downloadUrl,
          info: {
            formats: formats,
            details: {
              title: info.videoDetails.title,
              description: info.videoDetails.description,
            },
            thumbnail: thumbnail,
          },
        },
        { status: 200 }
      );
    }

    // If separate streams, merge them
    const videoStream = await axios.get(videoFormat.url, {
      responseType: "stream",
    });
    const audioStream = await axios.get(audioFormat.url, {
      responseType: "stream",
    });
    const passThrough = new PassThrough();

    ffmpeg()
      .input(videoStream.data)
      .input(audioStream.data)
      .outputOptions("-c:v copy")
      .outputOptions("-c:a aac")
      .format("mp4")
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        passThrough.end();
      })
      .on("end", () => {
        console.log("FFmpeg processing finished");
      })
      .pipe(passThrough);

    const headers = {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${info.videoDetails.title}.mp4"`,
    };

    return  NextResponse.json(passThrough, { headers });
  } catch (error) {
    console.error("Download error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import ytdl from "ytdl-core";

// export async function POST(request: NextRequest) {
//   const { url } = await request.json();

//   if (!ytdl.validateURL(url)) {
//     return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 404 });
//   }

//   try {
//     const info = await ytdl.getInfo(url);

//     const downloadUrl = ytdl.chooseFormat(info.formats, {
//       quality: "highest",
//     }).url;

//     const thumbnail =
//       info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;

//     const duration = parseInt(info.videoDetails.lengthSeconds, 10);

//     const formats = info.formats.map((format) => {
//       const bitrate = format.bitrate || format.averageBitrate; // in bits per second
//       const fileSize = bitrate
//         ? (bitrate * duration) / 8 / (1024 * 1024)
//         : null; // size in MB
//       return {
//         qualityLabel: format.qualityLabel,
//         container: format.container,
//         mimeType: format.mimeType,
//         url: format.url,
//         fileSize: fileSize ? fileSize.toFixed(2) : "N/A", // formatted size in MB
//       };
//     });

//     return NextResponse.json(
//       {
//         downloadUrl: downloadUrl,
//         info: {
//           formats: formats,
//           details: {
//             title: info.videoDetails.title,
//             description: info.videoDetails.description,
//           },
//           thumbnail: thumbnail,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
