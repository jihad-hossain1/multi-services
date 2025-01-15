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
    <div className="">
      <button
        className=" font-bold py-1 text-xs px-4 rounded border border-gray-300 hover:shadow-lg shadow-sm "
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
