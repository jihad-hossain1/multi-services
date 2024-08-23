"use client";

import React, { useCallback, useEffect, useState } from "react";
import { copySvg, copyS, shareSvg, share2 } from "@/public/inpoter";
import Image from "next/image";
import Modal from "@/components/modal/Modal";

const CodeShareBoard = ({ params }: { params: { code: string[] } }) => {
    const [content, setContent] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [isContentChanged, setIsContentChanged] = useState(false);
    const [isFetchingContent, setIsFetchingContent] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopySuccess(true);

        setTimeout(() => {
            setCopySuccess(false);
        }, 2000);
    };

    const sendContentOnServer = useCallback(async () => {
        if (!isContentChanged) return;

        const response = await fetch(`/api/v1/code-share`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
                code: params?.code[0],
                type: "lmTmLnk",
            }),
        });

        await response.json();

        // Reset the content changed flag after sending the update
        setIsContentChanged(false);
    }, [content, params?.code, isContentChanged]);

    useEffect(() => {
        if (isContentChanged) {
            const timerId = setTimeout(() => {
                sendContentOnServer();
            }, 6000); // 6 seconds

            // Cleanup the timer if content changes again before 6 seconds
            return () => clearTimeout(timerId);
        }
    }, [content, sendContentOnServer, isContentChanged]);

    useEffect(() => {
        const fetchContent = async () => {
            setIsFetchingContent(true);
            const response = await fetch(
                `/api/v1/code-share?code=${params?.code[0]}&type=lmTmLnk`,
            );
            const data = await response.json();
            setContent(data?.result?.content || "");
            setIsFetchingContent(false);
        };

        if (params?.code[0] && isFetchingContent) fetchContent();
    }, [isFetchingContent, params?.code]);

    const handleShareLink = () => {
        openModal();
        const link = `${window.location.origin}/service/code-share/${params?.code[0]}`;
        setShareLink(link);
    };

    return (
        <main className="">
            <h4 className="text-center m-4 my-2 font-bold text-2xl">Share your Code Link </h4>
            <div className='relative'>
            <div className='absolute top-16 right-4 flex flex-col gap-2'>
                <button
                    className={
                        copySuccess
                            ? "text-white bg-green-500 px-4 py-2 rounded-md"
                            : "text-white bg-green-50 px-4 py-2 rounded-md"
                    }
                    onClick={handleCopy}
                >
                    {copySuccess ? (
                        <Image src={copyS} width={24} height={24} alt='copy' />
                    ) : (
                        <Image
                            src={copySvg}
                            width={24}
                            height={24}
                            alt='copy'
                        />
                    )}
                </button>

                <button
                    className='bg-gray-50 border shadow-[0px_0px_5px_rgba(0,0,0,0.25)] px-4 py-2'
                    onClick={handleShareLink}
                >
                    <Image src={share2} width={24} height={24} alt='share' />
                </button>
            </div>

            <div className='mt-4'>
                <textarea
                    autoFocus={true}
                    name='content'
                    id='content'
                    cols={30}
                    className='text_area'
                    rows={10}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setIsContentChanged(true);
                    }}
                    value={content}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title='Enhanced Modal'
                // footer={footer}
                size='lg'
                closeOnOverlayClick={true}
            >
                {shareLink && (
                    <div className='flex gap-2'>
                        <span>{shareLink}</span>
                        {
                          linkCopied ? <span
                          className='link_copy_success'
                      >
                          <Image
                              src={copyS}
                              width={24}
                              height={24}
                              alt='copy'
                          />
                      </span> 
                      :
                      <button
                            onClick={() =>
                                {
                                  navigator.clipboard.writeText(shareLink)
                                  setLinkCopied(true)

                                  setTimeout(() => {
                                    setLinkCopied(false)
                                  }, 2000)
                                }
                            }
                            className='link-copy'
                        >
                            <Image
                                src={copyS}
                                width={24}
                                height={24}
                                alt='copy'
                            />
                        </button>
                        }
                    </div>
                )}
            </Modal>
        </div>
        </main>
    );
};

export default CodeShareBoard;
