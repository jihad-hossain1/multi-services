'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const generateUniqueCode = () => {
    // Convert Uint8Array to a regular array and then map it to a base 36 string
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((byte) => byte.toString(36))
        .join('')
        .slice(0, 16); // Adjust the length to your needs
};


const CodeSharePage = () => {
    const [code, setCode] = useState('');
    const router = useRouter();



    const handleGenerateCode = async () => {
        // Generate a random URL code
        const newCode = generateUniqueCode();
        setCode(newCode);
        try {
            const response = await fetch(`/api/v1/code-share`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: newCode, type: 'lmTmLnk' }),
            });

            const data = await response.json();

            console.log("🚀 ~ handleGenerateCode ~ data:", data)

            if(data?.result){
                router.push(`${window.location.origin}/service/code-share/${data?.result?.link}`);
            }
            
        } catch (error) {
            console.error((error as Error).message);
        }
    };


    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
            <div className="text-center">
                <button
                    onClick={handleGenerateCode}
                    className="text-violet-50 bg-violet-800 rounded-md shadow hover:shadow-lg py-2 px-5"
                >
                    Share Code
                </button>
                <h4>For Free</h4>
            </div>
        </div>
    );
};

export default CodeSharePage;
