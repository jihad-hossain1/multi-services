
import svgson, { INode } from "svgson";


export const transformSvgToJsx = (node: INode): string => {
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

 export const convertSvgToJsx = async (svgInput: string, setJsxOutput: any, jsxName: string, setError: any) => {
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



  export function extractSvgContent(content: string | undefined) {
    const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
    const match = content?.match(svgRegex);

    if (match) {
      return match[0];
    } else {
      return null;
    }
  }