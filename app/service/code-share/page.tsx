import React from "react";
import CodeShare from "./_comp/CodeShare";

const Sharepage = async () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <div className="text-center">
        <CodeShare />
      </div>
    </div>
  );
};

export default Sharepage;
