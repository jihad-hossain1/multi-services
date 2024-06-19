"use server";

export const qualityServer = async (data: { url: string; quality: string }) => {
  const response = await fetch(
    `${process.env.PUBLIC_NEXT_URL}/api/v1/video-downloader/download/high-video`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    }
  );
  const result = await response.json();

  return result;
};
