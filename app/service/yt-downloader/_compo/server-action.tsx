"use server";

import axios from "axios";

export const serverAction = async (data: { url: string }) => {
  const response = await fetch(
    `${process.env.PUBLIC_NEXT_URL}/api/v1/video-downloader`,
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
