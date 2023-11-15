import { useState, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

const MiniCartElement = ({ data, Setcount, index }) => {
  const [state, setState] = useState(true);
  const [price, setPrice] = useState(data.price);

  return (
    state && (
      <div
        className={`w-full ${
          state === 1 ? "line-through opacity-30" : ""
        } h-fit flex-col md:h-[80px] md:gap-5 px-3 ring-gray-300  my-3 py-[5%] ring-1 rounded-md justify-evenly flex md:flex-row items-center flex-wrap`}
      >
        <p className="tracking-wide w-[150px]">{data.name}</p>
        <p className="text-red-400  w-[120px] font-bold text-right">
          {data.price} $ <br />{" "}
        </p>
      </div>
    )
  );
};

export default MiniCartElement;
