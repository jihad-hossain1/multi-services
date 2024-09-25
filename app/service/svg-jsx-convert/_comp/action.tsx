"use client";

import React from "react";

const Action = ({ content }: { content: any }) => {
  //   const [loading, setLoading] = React.useState(false);
  const blob = new Blob([content?.content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  function handleSave() {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${content?.name}.jsx`;
    a.click();
  }

  return (
    <div>
      <button
        className="bg-[#cdd00b]/20  text-[#a2a41b] font-bold py-1 text-xs px-4 rounded"
        // href={url}
        // download={`Component.jsx`}
        onClick={handleSave}
      >
        Download
      </button>
    </div>
  );
};

export default Action;
