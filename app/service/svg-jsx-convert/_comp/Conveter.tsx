"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import toast from "react-hot-toast";
import svgson, { INode } from "svgson";
import SaveSVG from "./saveSVG";

const SvgToJsxConverter: React.FC = () => {
  const [svgInput, setSvgInput] = useState<string>("");
  const [jsxOutput, setJsxOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const jsxOutputRef = useRef<HTMLPreElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [jsxName, setJsxName] = useState<string>("SvgComponent");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSvgInput(e.target.value);
    setError("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setSvgInput(result);
          setError("");
        }
      };
      reader.readAsText(file);
    }
  };

  const transformSvgToJsx = (node: INode): string => {
    const { name, attributes, children } = node;

    const jsxAttributes = Object.entries(attributes)
      .map(([key, value]) => {
        const jsxKey = key.replace(/-(\w)/g, (_, c) => c.toUpperCase()); // Convert kebab-case to camelCase
        if (jsxKey === "class") return `className="${value}"`;
        return `${jsxKey}="${value}"`;
      })
      .join(" ");

    const childrenJsx = children.map(transformSvgToJsx).join("");

    return `<${name} ${jsxAttributes} {...props}>${childrenJsx}</${name}>`;
  };

  const convertSvgToJsx = async () => {
    try {
      const svgJson = await svgson.parse(svgInput);
      const jsxBody = transformSvgToJsx(svgJson);
      const jsxComponent = `
  import React from 'react';
  
  const ${jsxName} = (props) => {
    return (
      ${jsxBody}
    );
  }
  
  export default ${jsxName};
      `;
      setJsxOutput(jsxComponent);
    } catch (error) {
      console.error("Error converting SVG to JSX:", error);
      setError(
        "Invalid SVG input. Please ensure your SVG is correctly formatted."
      );
      setJsxOutput("");
    }
  };

  const resetInput = () => {
    setSvgInput("");
    setJsxOutput("");
    setError("");
    setJsxName("SvgComponent");
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        className="border border-primary_light bg-primary_light_4 text-white shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
        type="file"
        name="file"
        onChange={handleFileChange}
        accept="image/svg+xml"
        style={{ marginBottom: "10px" }}
      />

      <textarea
        className="border border-primary_light_4 bg-primary_light text-white"
        value={svgInput}
        onChange={handleInputChange}
        placeholder="Paste your SVG code here"
        rows={10}
        cols={50}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <div style={{ marginBottom: "10px" }}>
        <button
          className="bg-primary_light hover:bg-primary_light_4 text-white font-bold py-1 text-xs px-4 rounded"
          disabled={!svgInput}
          onClick={convertSvgToJsx}
          style={{ marginRight: "10px" }}
        >
          Convert to JSX
        </button>
        <button
          className="bg-[#f44336] hover:bg-[#f44336]/90 text-white font-bold py-1 text-xs px-4 rounded"
          disabled={!jsxOutput}
          onClick={resetInput}
        >
          Reset
        </button>
        <button
          className="bg-[#2ecc71] hover:bg-[#2ecc71]/90 text-white font-bold py-1 text-xs px-4 rounded"
          disabled={!jsxOutput}
          onClick={() => {
            navigator.clipboard.writeText(jsxOutput);
            toast.success("Copied to clipboard", {
              style: {
                padding: "10px",
                color: "green",
                borderRadius: "5px",
                border: "0.5px solid green",
              },
              duration: 3000,
              icon: "📋",
              position: "top-center",
            });
          }}
          style={{ marginLeft: "10px" }}
        >
          Copy
        </button>
        {jsxOutput && <SaveSVG svgContent={jsxOutput} jsxName={jsxName} />}
      </div>
      <div style={{ marginBottom: "10px" }} className="w-fit">
        <label
          htmlFor="name"
          className="text-white border border-primary_light p-1 rounded bg-primary_light_4"
        >
          Component Name
        </label>
        <input
          className="border border-primary_light p-1 rounded  "
          type="text"
          name="name"
          value={jsxName}
          onChange={(e) => setJsxName(e.target.value)}
          placeholder="Component Name"
        />
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <pre
        className={"overflow-auto text-white"}
        ref={jsxOutputRef}
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {jsxOutput || "JSX output will be displayed here"}
      </pre>
    </div>
  );
};

export default SvgToJsxConverter;
