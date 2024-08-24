"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { spanning } from "@/public/inpoter";

const generateUniqueCode = () => {
    // Convert Uint8Array to a regular array and then map it to a base 36 string
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((byte) => byte.toString(36))
        .join("")
        .slice(0, 16); // Adjust the length to your needs
};

const CodeShare = () => {
    const [code, setCode] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [osInfo, setOsInfo] = useState({});
    

    const handleGenerateCode = async () => {
        // Generate a random URL code
        const newCode = generateUniqueCode();
        setCode(newCode);
        try {
            setLoading(true);
            const response = await fetch(`/api/v1/code-share`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: newCode,
                    type: "lmTmLnk",
                    osInfo: osInfo,
                }),
            });

            setLoading(false);
            const data = await response.json();
            console.log("🚀 ~ handleGenerateCode ~ data:", data);

            if (data?.result) {
                setLoading(false);
                router.push(
                    `${window.location.origin}/service/code-share/${data?.result?.link}`,
                );
            }
            if (data?.error) {
                setLoading(false);
                setErrors((prevErrors) => [...prevErrors, data.error]);
            }
        } catch (error) {
            setLoading(false);
            console.error((error as Error).message);
        }
    };


    useEffect(() => {
        const fetchOsInfo = async () => {
            const response = await fetch("https://log-server-orpin.vercel.app/api/logs");
            const data = await response.json();
            console.log("🚀 ~ fetchOsInfo ~ data:", data)
            setOsInfo(data);
        };

        fetchOsInfo();
    }, []);
    return (
        <div className='min-h-[60vh] flex flex-col justify-center items-center'>
            {errors?.map((error: string, index: number) => (
                <p key={index} className='text-red-500 m-5'>
                    {error}
                </p>
            ))}
            <div className='text-center'>
                <button
                    disabled={loading}
                    onClick={handleGenerateCode}
                    className='flex gap-2 items-center text-violet-50 bg-violet-800 rounded-md shadow hover:shadow-lg py-2 px-5'
                >
                    {loading ? (
                        <Image
                            src={spanning}
                            width={20}
                            height={20}
                            className='animate-spin'
                            alt='share'
                        />
                    ) : (
                        "Share Code"
                    )}
                </button>
                <h4>For Free</h4>
            </div>
        </div>
    );
};

export default CodeShare;
