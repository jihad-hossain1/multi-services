"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { spanning } from "@/public/inpoter";
import useAuth from "@/helpers/hook/useAuth";

const generateUniqueCode = () => {
  // Convert Uint8Array to a regular array and then map it to a base 36 string
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((byte) => byte.toString(36))
    .join("")
    .slice(0, 16); // Adjust the length to your needs
};

const CodeShare = () => {
  const [code, setCode] = useState("");
  const [localUid, setLocalUid] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [osInfo, setOsInfo] = useState({});
  const path = usePathname();

  const { auth } = useAuth();
  // console.log("🚀 ~ CodeShare ~ auth:", auth)

  const handleGenerateCode = async () => {
    // Generate a random URL code
    const newCode = generateUniqueCode();
    setCode(newCode);
    try {
      const localUserBody = {
        code: newCode,
        type: "lmTmLnk",
        osInfo: osInfo,
        uid: localUid,
      };
      const savedUserBody = {
        code: newCode,
        userid: auth?.userId,
        type: "permanent",
      };
      const jsonBody = auth?.userId ? savedUserBody : localUserBody;

      setLoading(true);
      setErrors([]);
      const response = await fetch(`/api/v1/code-share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      });

      setLoading(false);
      const data = await response.json();
      console.log("🚀 ~ handleGenerateCode ~ data:", data);

      if (data?.result) {
        setTimeout(() => {
          router.push(`/service/code-share/${data?.result?.link}`);
        }, 1500);
      }
      if (data?.error) {
        setErrors((prevErrors) => [
          ...prevErrors,
          "Something went wrong, please try again ",
        ]);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    const fetchOsInfo = async () => {
      const response = await fetch(
        "https://log-server-orpin.vercel.app/api/logs"
      );
      const data = await response.json();
      setOsInfo(data);
    };

    fetchOsInfo();
  }, []);

  const setUidOnLocal = useCallback(() => {
    const service_uid = generateUniqueCode();
    const get_uid = localStorage.getItem("service_uid");

    if (get_uid === null) {
      localStorage.setItem("service_uid", service_uid);
    }

    if (get_uid) {
      setLocalUid(get_uid);
    }
  }, [setLocalUid]);

  useEffect(() => {
    setUidOnLocal();
  }, [setUidOnLocal]);

  return (
    <>
      {errors?.map((error: string, index: number) => (
        <p key={index} className="text-red-500 m-5">
          {error}
        </p>
      ))}
      <button
        disabled={loading}
        onClick={handleGenerateCode}
        className="flex gap-2 items-center text-violet-50 bg-violet-800 rounded-md shadow hover:shadow-lg py-2 px-5"
      >
        {loading ? (
          <Image
            src={spanning}
            width={20}
            height={20}
            className="animate-spin"
            alt="share"
          />
        ) : path == '/profile' ? '+' : "Share Code"}
      </button>
     {
        path == '/profile' ? null :  <h4>For Free</h4>
     }
    </>
  );
};

export default CodeShare;
