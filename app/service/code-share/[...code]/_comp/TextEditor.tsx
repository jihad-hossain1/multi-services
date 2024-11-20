"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { copySvg, copyS, share2 } from "@/public/inpoter";
import Image from "next/image";
import Modal from "@/components/modal/Modal";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import useAuth from "@/helpers/hook/useAuth";
import Loader from "@/components/svg/loader";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
const customHeaders =  process.env.NEXTAUTH_SECRET as string

export const TextEditor = ({ params }: { params: { code: string[] } }) => {
    const [content, setContent] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [isContentChanged, setIsContentChanged] = useState(false);
    const [isFetchingContent, setIsFetchingContent] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const lastContentRef = useRef(content);
    const abortControllerRef = useRef<AbortController | null>(null);
    const { loading } = useAuth();

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
        if (!isContentChanged || content === lastContentRef.current) return;

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
                    "Custom-Header": customHeaders,
                },
                body: JSON.stringify({
                    content,
                    code: params?.code[0],
                    type: "lmTmLnk",
                }),
                signal: abortController.signal,
            });

            const data = await response.json();
            lastContentRef.current = content;
            setContent(data?.result?.content || "");
            setIsContentChanged(false);
        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Failed to update content:", error);
            }
        }
    }, [isContentChanged, content, params?.code]);

    useEffect(() => {
        if (isContentChanged) {
            const timerId = setTimeout(() => {
                sendContentOnServer();
            }, 6000);

            return () => clearTimeout(timerId);
        }
    }, [content, sendContentOnServer, isContentChanged]);

    const fetchContent = useCallback(async () => {
        setIsFetchingContent(true);
        const type = "lmTmLnk";
        const response = await fetch(`/api/v1/code-share?code=${params?.code[0]}&type=${type}`);
        const data = await response.json();
        setContent(data?.result?.content || "");
        lastContentRef.current = data?.result?.content || "";
        setIsFetchingContent(false);
    }, [params?.code]);

    useEffect(() => {
        if (params?.code[0] && isFetchingContent) {
            fetchContent();
        }
    }, [fetchContent, isFetchingContent, params?.code]);

    const handleShareLink = () => {
        openModal();
        const link = `${window.location.origin}/service/code-share/${params?.code[0]}`;
        setShareLink(link);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value !== content) {
            setContent(value || "");
            setIsContentChanged(true);
        }
    };

    if (loading) return <div>
        <Loader />
    </div>
    return (
        <main>
            <h4 className="text-center m-4 my-2 font-bold text-2xl md:text-4xl">
                Share your Code Link
            </h4>
            <h4 className="text-center m-4 my-2 text-sm">
                        <span>
                            You can share the link with your friends. Limited to{" "}
                            <strong>5 links per 24.</strong>
                        </span>
                    </h4>
                    <h4 className="text-center m-4 my-2 text-sm">
                        <strong>Save your link and share</strong> it with your friends.{" "}
                        <a className="text-blue-500 hover:underline" href="/auth/login">
                            Login required
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
                {/* {loading ? (
                    <div>Loading...</div>
                ) : (
                    authenticated && (
                        <input
                            type="text"
                            placeholder="Your Link Name"
                            className="max-w-[500px] border p-2"
                            value={formData?.xname}
                            onChange={(e) => setFormData({ ...formData, xname: e.target.value })}
                        />
                    )
                )} */}
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
                            {linkCopied ? (
                                <span className="link_copy_success">
                                    <Image
                                        src={copyS}
                                        width={24}
                                        height={24}
                                        alt="copy"
                                    />
                                </span>
                            ) : (
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareLink);
                                        setLinkCopied(true);
                                        toast.success("Link Copied! Check Your Clipboard", {
                                            style: {
                                                padding: "10px",
                                                color: "#000",
                                                borderRadius: "5px",
                                                border: "1px solid yellow",
                                            },
                                            duration: 3000,
                                            icon: "📋",
                                            position: "bottom-center",
                                        });
                                        setTimeout(() => {
                                            setLinkCopied(false);
                                        }, 2000);
                                    }}
                                    className="link-copy-btn"
                                >
                                    <Image
                                        src={copySvg}
                                        width={24}
                                        height={24}
                                        alt="copy"
                                    />
                                </button>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        </main>
    );
};
