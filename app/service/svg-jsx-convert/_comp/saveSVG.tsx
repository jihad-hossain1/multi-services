"use clinet";

import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SaveSVG = ({
  svgContent,
  jsxName,
  setNameIndicator
}: {
  svgContent: string;
  jsxName: string;
  setNameIndicator: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [loading, setLoading] = React.useState(false);
  const blob = new Blob([svgContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const router = useRouter();

  const handleSave = async () => {
    try {
      setLoading(true);
      setNameIndicator(false);
      const response = await fetch("/api/v1/icons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: svgContent, name: jsxName }),
      });

      setLoading(false);
      const data = await response.json();
      // console.log("🚀 ~ handleSave ~ data:", data);

      if (data.error) {
        toast.error(data?.error);
        setNameIndicator(true);
        return;
      }

     if(data?.result){
      toast.success("SVG saved successfully");
      router.refresh();
      revalidateTag("icons");
     }
    } catch (error) {
      setLoading(false);
      console.error("Error saving SVG:", (error as Error).message);
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <a
        className="bg-[#cdd00b]/30 ml-2  text-[#797a0f] font-bold py-1 text-xs px-4 rounded"
        href={url}
        download={`${jsxName}.jsx`}
      >
        Download
      </a>

      <button
        type="button"
        className="bg-[#d70ff6]/20  text-[#d70ff6] font-bold py-1 text-xs px-4 rounded"
        onClick={handleSave}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default SaveSVG;
