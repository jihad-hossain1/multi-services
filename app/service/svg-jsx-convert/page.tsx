import React from "react";
import Converter from "./_comp/Conveter";
import "./svg.css";
import Action from "./_comp/action";

async function getIcons() {
  const response = await fetch(process.env.PUBLIC_NEXT_URL + "/api/v1/icons", {
    cache: "no-store",
  });
  const data = await response.json();
  return data?.result;
}

const SvgConverter = async () => {
  const icons = await getIcons();

  function extractSvgContent(content: string | undefined) {
    const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
    const match = content?.match(svgRegex);

    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-center">SVG to JSX Converter</h1>
      <Converter />
      <div>
        <h1 className="text-3xl font-bold text-center">
          Available Icons {icons?.length}{" "}
        </h1>
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-10">
          {icons?.map(
            (icon: {
              id: React.Key | null | undefined;
              content: string | undefined;
              name: string;
            }) => (
              <div
                key={icon.id}
                className="relative border p-4 bg-zinc-50/60 border-gray-700 rounded-md flex flex-col items-center justify-center"
              >
                {/* Safely render the SVG content using dangerouslySetInnerHTML */}
                <div
                  className="w-10 h-10"
                  id="svg"
                  dangerouslySetInnerHTML={{
                    __html: extractSvgContent(icon?.content) || "",
                  }}
                />
                <p className="text-center text-xs py-2">{icon?.name}</p>
                <Action
                  content={{ content: icon?.content, name: icon?.name }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SvgConverter;
