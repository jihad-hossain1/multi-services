'use client'

import React, { useCallback, useEffect, useState } from 'react'

const CodeShareBoard = ({ params }: { params: { code: string[] } }) => {
  const [content, setContent] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isFetchingContent, setIsFetchingContent] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const sendContentOnServer = useCallback(async () => {
    if (!isContentChanged) return;

    const response = await fetch(`/api/v1/code-share`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, code: params?.code[0], type: 'lmTmLnk' }),
    });

    const data = await response.json();
    console.log("🚀 ~ sendContentOnServer ~ data:", data);

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
      const response = await fetch(`/api/v1/code-share?code=${params?.code[0]}&type=lmTmLnk`);
      const data = await response.json();
      setContent(data?.result?.content || '');
      setIsFetchingContent(false);
      console.log("🚀 ~ fetchContent ~ data:", data);
    };

    if (params?.code[0] && isFetchingContent) fetchContent();
  }, [isFetchingContent, params?.code]);

  const handleShareLink = () => {
    const link = `${window.location.origin}/service/code-share/${params?.code[0]}`;
    setShareLink(link);
  };

  return (
    <div>
      <button className='text-white bg-green-500 px-4 py-2' onClick={handleCopy}>Copy</button>
      <button className='text-white bg-yellow-500 px-4 py-2' onClick={handleShareLink}>Share Link</button>
      {shareLink && (
        <>
          <span>{shareLink}</span>
          <button 
            onClick={() => navigator.clipboard.writeText(shareLink)} 
            className='text-white bg-red-500 px-4 py-2'
          >
            Copy
          </button>
        </>
      )}
      <textarea
        name="content"
        id="content"
        cols={30}
        className='w-full h-screen bg-transparent border bg-zinc-800 text-white'
        rows={10}
        onChange={e => {
          setContent(e.target.value);
          setIsContentChanged(true);
        }}
        value={content}
      />
    </div>
  );
}

export default CodeShareBoard;
