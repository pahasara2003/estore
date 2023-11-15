import React from "react";
import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

const Stars = ({ data }) => {
  const q = Math.floor(data);
  const r = Math.round((data % 1) * 10);
  const w = [];

  for (let i = 0; i < 5; i++) {
    if (i < q) {
      w.push(<FaStar key={Math.random()} className="text-yellow-400" />);
    } else if (i - q < 1) {
      w.push(
        <FaRegStarHalfStroke
          key={Math.random()}
          className="text-yellow-400 text-lg"
        />
      );
    } else {
      w.push(<FaRegStar key={Math.random()} className="text-slate-400" />);
    }
  }

  return (
    <div className="flex items-center gap-2 py-1 w-full justify-center  ">
      {w.map((i, n) => i)}
      <span>({data.toString()})</span>
    </div>
  );
};

export default Stars;
