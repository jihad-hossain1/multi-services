import React from "react";
import Converter from "./_comp/Conveter";

async function getIcons() {
  const response = await fetch(process.env.PUBLIC_NEXT_URL + "/api/v1/icons", {
    next: { tags: ["icons"] },
  });
  const data = await response.json();
  return data;
}

const SvgConverter = async () => {
  const icons = await getIcons();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">SVG to JSX Converter</h1>
      <Converter />
      <div>
        <h1 className="text-3xl font-bold text-center">Available Icons</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {icons?.result?.map(
            (icon: {
              id: React.Key | null | undefined;
              content: string | undefined;
              name:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            }) => (
              <div key={icon.id}>
                <img
                  src={icon.content}
                  alt={icon.name as string}
                  width={100}
                  height={100}
                />
                <p className="text-center">{icon.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SvgConverter;
