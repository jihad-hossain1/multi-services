"use server";

import axios from "axios";

export const serverAction = async (data: { url: string }) => {
  const response = await axios.post(
    `${process.env.PUBLIC_NEXT_URL}/api/v1/video-downloader`,
    { ...data }
  );
  return response.data;
};
