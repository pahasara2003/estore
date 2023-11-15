import { FaTag } from "react-icons/fa6";
import { useState } from "react";

const Tag = ({ name }) => {
  const [tagged, tag] = useState(false);
  return (
    <p
      onClick={() => {
        tag((prev) => !prev);
      }}
      className={`cursor-pointer flex items-center rounded-full ${
        tagged ? "ring-red-400 ring-2" : ""
      } m-1 md:m-2 px-3 md:py-2 gap-2 `}
    >
      <FaTag className="text-slate-500" />
      {name}
    </p>
  );
};

export default Tag;
