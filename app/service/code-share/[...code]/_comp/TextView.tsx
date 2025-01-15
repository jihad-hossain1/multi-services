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

export const TextView = ({ auth_link_json }: {
    auth_link_json: any
}) => {
    const [content, setContent] = useState(auth_link_json?.content);
    const [shareLink, setShareLink] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);


    const { auth, loading, authenticated } = useAuth();

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



    const handleShareLink = () => {
        openModal();
        const link = `${window.location.origin}/service/code-share/${auth_link_json?.link}`;
        setShareLink(link);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value !== content) {
            setContent(value || "");
        }
    };

    if (loading) return <div>
        <Loader />
    </div>
    return (
        <main className="w-11/12 mx-auto">
            <h4 className="text-center m-4 my-2 font-bold text-2xl md:text-4xl">
                Share your Code Link
            </h4>
            {!authenticated && (
                <>
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
                </>
            )}
            {authenticated && (
                <h4>
                    <strong>Save your link and share</strong> it with your friends. max limit 20{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Upgrade Now
                    </a>
                </h4>
            )}
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
