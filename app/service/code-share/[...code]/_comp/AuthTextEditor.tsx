"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { copySvg, copyS, share2 } from "@/public/inpoter";
import Image from "next/image";
import Modal from "@/components/modal/Modal";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import useAuth from "@/helpers/hook/useAuth";
import Loader from "@/components/svg/loader";
const customHeaders = process.env.NEXT_PUBLIC_NEXT_SECRET as string
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export const AuthTextEditor = ({ params }: { params: { code: string[] } }) => {
    const [content, setContent] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [isFetchingContent, setIsFetchingContent] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const lastContentRef = useRef(content);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [formData, setFormData] = useState<any>({
        xname: "",
        status: "",
        secure: false,
    });
    const lastFormDataRef = useRef(formData);

    const { auth, loading } = useAuth();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopySuccess(true);
        toast.success("Text Copied! Check your clipboard", {
            style: {
                padding: "10px",
                color: "#000",
                borderRadius: "5px",
                border: "1px solid yellow",
            },
            duration: 3000,
            icon: "📋",
        });

        setTimeout(() => {
            setCopySuccess(false);
        }, 2000);
    };

    const sendContentOnServer = useCallback(async () => {
        const contentChanged = content !== lastContentRef.current;
        const formDataChanged = JSON.stringify(formData) !== JSON.stringify(lastFormDataRef.current);

        if (!contentChanged && !formDataChanged) return;

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            const response = await fetch(`/api/v1/code-share`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    code: params?.code[0],
                    type: "permanent",
                    email: auth?.email,
                    userid: auth?.userId,
                    xname: formData?.xname,
                    status: formData?.status,
                    secure: formData?.secure,
                }),
                signal: abortController.signal,
            });

            const data = await response.json();
            lastContentRef.current = content;
            lastFormDataRef.current = formData;
            setContent(data?.result?.content || "");
        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Failed to update content:", error);
            }
        }
    }, [auth?.email, auth?.userId, content, formData, params?.code]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            sendContentOnServer();
        }, 5000);

        return () => clearTimeout(timerId);
    }, [content, formData, sendContentOnServer]);

    // fetch content based on params id
    const fetchContent = useCallback(async () => {
        setIsFetchingContent(true);
        const type = "permanent";
        const response = await fetch(
            `/api/v1/code-share?code=${params?.code[0]}&type=${type}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Custom-Header": customHeaders,

                },
            }
        );
        const data = await response.json();
        setContent(data?.result?.content || "");
        lastContentRef.current = data?.result?.content || "";
        setFormData({
            xname: data?.result?.xname || "",
            status: data?.result?.status || "",
            secure: data?.result?.secure || false,
        });
        lastFormDataRef.current = {
            xname: data?.result?.xname || "",
            status: data?.result?.status || "",
            secure: data?.result?.secure || false,
        };
        setIsFetchingContent(false);
    }, [params?.code]);

    // fetch content based on params id
    useEffect(() => {
        if (params?.code[0] && isFetchingContent) fetchContent();
    }, [fetchContent, isFetchingContent, params?.code]);

    const handleShareLink = () => {
        openModal();
        const link = `${window.location.origin}/service/code-share/${params?.code[0]}`;
        setShareLink(link);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value !== content) {
            setContent(value || "");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );

    return (
        <main className="w-11/12 mx-auto">
            <h4 className="text-center m-4 my-2 font-bold text-2xl md:text-4xl">
                Share your Code Link
            </h4>
            <h4>
                <strong>Save your link and share</strong> it with your friends. max limit 20{" "}
                <a href="#" className="text-blue-500 hover:underline">
                    Upgrade Now
                </a>
            </h4>
            <div>
                <div className="flex justify-end gap-4">
                    <div className="flex gap-2">
                        <button
                            className={
                                copySuccess
                                    ? "text-white bg-green-500 px-4 py-2 rounded-md"
                                    : "text-white bg-green-100 border shadow-[0px_0px_2px_rgba(0,0,0,0.25)] px-4 py-2 rounded-md"
                            }
                            onClick={handleCopy}
                        >
                            <Image
                                src={copySuccess ? copyS : copySvg}
                                width={24}
                                height={24}
                                alt="copy"
                            />
                        </button>

                        <button
                            className="bg-gray-50 border shadow-[0px_0px_2px_rgba(0,0,0,0.25)] px-4 py-2"
                            onClick={handleShareLink}
                        >
                            <Image
                                src={share2}
                                width={24}
                                height={24}
                                alt="share"
                            />
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    auth && (
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Your Link Name"
                                className="max-w-[500px] border p-2"
                                value={formData?.xname}
                                name="xname"
                                onChange={handleInputChange}
                            />

                            <div className="flex gap-2">
                                <label htmlFor="secure-checkbox">
                                    <strong>Private</strong>
                                </label>
                                <input
                                    type="checkbox"
                                    id="secure-checkbox"
                                    name="secure"
                                    checked={formData?.secure}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="status-checkbox">
                                    <strong>In Active</strong>
                                </label>
                                <input
                                    type="checkbox"
                                    id="status-checkbox"
                                    name="status"
                                    checked={formData?.status === "INACTIVE"}
                                    onChange={(e) =>
                                        setFormData((prevFormData: any) => ({
                                            ...prevFormData,
                                            status: e.target.checked ? "INACTIVE" : "",
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    )
                )}
                <div className="mt-4 border border-gray-400 shadow-[0px_0px_5px_rgba(0,0,0,0.25)] rounded-sm p-2">
                    <Editor
                        height="90vh"
                        theme="vs-dark"
                        language="javascript"
                        value={content}
                        onChange={handleEditorChange}
                    />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="This is your share link Expires in 24 hours"
                    size="lg"
                    closeOnOverlayClick={true}
                >
                    {shareLink && (
                        <div className="flex gap-2">
                            <span>{shareLink}</span>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareLink);
                                    setLinkCopied(true);
                                    setTimeout(() => setLinkCopied(false), 2000);
                                }}
                            >
                                {linkCopied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )}
                </Modal>
            </div>
        </main>
    );
};

export default AuthTextEditor;
