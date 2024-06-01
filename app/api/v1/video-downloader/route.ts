import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 404 });
  }

  try {
    const info = await ytdl.getInfo(url);

    const downloadUrl = ytdl.chooseFormat(info.formats, {
      quality: "highest",
    }).url;

    const thumbnail =
      info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;

    const duration = parseInt(info.videoDetails.lengthSeconds, 10);

    const formats = info.formats.map((format) => {
      const bitrate = format.bitrate || format.averageBitrate; // in bits per second
      const fileSize = bitrate
        ? (bitrate * duration) / 8 / (1024 * 1024)
        : null; // size in MB
      return {
        qualityLabel: format.qualityLabel,
        container: format.container,
        mimeType: format.mimeType,
        url: format.url,
        fileSize: fileSize ? fileSize.toFixed(2) : "N/A", // formatted size in MB
      };
    });

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
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
