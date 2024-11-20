
'use client';

import { useState } from "react";

import { jwtVerify, SignJWT } from "jose";
import Cookies from "js-cookie";


const getCookiesData = async (token, skey) => {
    if(!token){
        return alert('api url not found')
    }
    const { payload } = await jwtVerify(token, skey);
    return payload
}

const FileUpload = () => {
    const cookieApiUrl = Cookies.get("apiUrl");
    const secretKey = new TextEncoder().encode("your-secret-key");
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [responses, setResponses] = useState([]);
    const [discordCdn, setDiscordCdn] = useState(null);

    const uploadFile = async (file) => {
        const url = await getCookiesData(cookieApiUrl,secretKey);

        if(!cookieApiUrl || !url){
            return alert('Please Set first Api Url')
        }
        
        const formData = new FormData();
        formData.append("file", file); // Append each file to FormData

        try {
            if(!url?.discordCdn){
                return alert("Reload the page and set discord api, try again")
            }

            const response = await fetch(url?.discordCdn, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload ${file.name}`);
            }

            const jsonResponse = await response.json();
            return jsonResponse; // Return the response for this file
        } catch (err) {
            console.error("Error:", err);
            setError((prev) => `${prev}\n${err.message}`); // Accumulate errors
            return null; // Return null if there's an error
        }
    };

    const uploadFiles = async () => {
        setUploading(true);
        setError("");
        setResponses([]);

        const uploadPromises = files.map(uploadFile); // Create an array of promises for each file

        try {
            const results = await Promise.all(uploadPromises); // Wait for all uploads to complete
            const successfulUploads = results.filter((res) => res !== null);
            setResponses(successfulUploads); // Set the successful responses
        } catch (err) {
            console.error("Error during uploads:", err);
            setError(err.message);
        } finally {
            setUploading(false);
            setFiles([]); // Clear files after upload
        }
    };

    const handleApiUrlSet = async () => {
        if (!discordCdn?.trim()) {
            alert('Provide Discord Api Link');
            return;
        }
        // check valid discord link
        if (!discordCdn.startsWith('https://discord.com/api/webhooks')) {
            return alert('Provide Valid Url')
        }
        // Sign formData
        const signedUserInfo = await new SignJWT({ discordCdn })
            .setProtectedHeader({ alg: "HS256" })
            .sign(secretKey);

        Cookies.set("apiUrl", signedUserInfo, { expires: 1 });

        setTimeout(() => {
            const mailFromCookie = Cookies.get("apiUrl");
            if(mailFromCookie) {
                setDiscordCdn(null)
            }
        }, 2000);
    }

    const handleResetApi = async()=>{
        Cookies.remove("apiUrl")
        alert('Susscessfull')
        return
    }

    const handleShowApi = async()=>{
        const url = await getCookiesData(cookieApiUrl,secretKey)
        if(url?.discordCdn){
            return alert(`${url?.discordCdn}`)
        }
        return alert('No api found')
    }

    return (
        <div className="min-h-[70vh] container mx-auto">
            <h1 className="text-2xl text-center my-4">Select files to upload</h1>
            <div className="flex gap-3 item-center">
                <button className="px-3 py-1 rounded bg-red-500 text-white text-xs" onClick={()=>handleResetApi()}>Reset Api</button>
                <button onClick={()=>handleShowApi()} className="px-3 py-1 rounded bg-green-500 text-white text-xs">Show Api</button>
            </div>
            <div>
                <div className="w-full flex flex-col gap-2">

                    <h1>Paste Your discord webhook url</h1>
                    <input className="my-2 border focus:outline-none py-1 px-2 " type="text" name="" id="" onChange={(e) => setDiscordCdn(e.target.value)} value={discordCdn} />
                    <div>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleApiUrlSet}>Set Webhook Url</button>
                    </div>
                </div>
            </div>
            <input
                className="my-2 border"
                type="file"
                id="file-selector"
                multiple
                onChange={(e) => {
                    setFiles(Array.from(e.target.files));
                }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul className="list-disc">
                {files.map((file, index) => (
                    <li key={index}>
                        {file.name} - {file.size} bytes
                    </li>
                ))}
            </ul>
            <div className="my-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={uploadFiles}
                    disabled={uploading || files.length === 0}
                >
                    {uploading ? "Uploading..." : "Upload files"}
                </button>
            </div>
            <div>
                <h2>Responses</h2>
                <div>
                    {responses?.map((response, index) => (
                        <div key={index}>
                            {response?.attachments && response?.attachments?.length > 0 ? (
                                response?.attachments?.map((attachment, attIndex) => (
                                    <div key={attIndex}>
                                        <div>
                                            Response URL:{" "}
                                            <button
                                                style={{
                                                    color: "blue",
                                                    marginLeft: "10px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    navigator.clipboard.writeText(attachment?.url)
                                                }
                                            >
                                                Copy Link
                                            </button>{" "}
                                            <span
                                                style={{ color: "blue", cursor: "pointer" }}
                                                onClick={() =>
                                                    window.open(attachment?.url)
                                                }
                                            >
                                                {attachment?.url}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No attachments found in the response.</div>
                            )}
                            {/* <div>{JSON.stringify(response)}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;