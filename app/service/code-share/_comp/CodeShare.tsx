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
      if (data?.limit_error) {
        setErrors((prevErrors) => [
          ...prevErrors,
          "Link creation limit reached. Please try to update your limit.",
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

  useEffect(() => {
    if (errors?.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  }, [errors?.length]);
  return (
    <div className="flex flex-col">
      <div className={path == "/profile" ? "hidden" : "block"}>
        {errors?.map((error: string, index: number) => (
          <p key={index} className="text-red-500 m-5">
            {error}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center relative">
        <button
          disabled={loading}
          onClick={handleGenerateCode}
          className="w-fit border flex gap-2 items-center text-violet-50 bg-violet-800 rounded-md shadow hover:shadow-lg py-2 px-5"
        >
          {loading ? (
            <Image
              src={spanning}
              width={20}
              height={20}
              className="animate-spin"
              alt="share"
            />
          ) : (
            <span className="text-nowrap">Create Link</span>
          )}
        </button>
        {path == "/profile/links" ? (
          <>
            {errors?.length > 0 ? (
              <div
                className={
                  errors?.length > 0 ? "absolute top-0 right-0 z-20 " : "hidden"
                }
              >
                {errors?.map((error: string, index: number) => (
                  <div
                    key={index}
                    className="shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-red-100 p-4 rounded"
                  >
                    <h4 className="text-red-500 text-nowrap">{error}</h4>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        ) : path == "/profile/links" ? null : (
          <h4>For Free</h4>
        )}
      </div>
    </div>
  );
};

export default CodeShare;
