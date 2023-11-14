import { useState, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartElement = ({ data, Setcount, index }) => {
  const [state, setState] = useState(true);
  const [price, setPrice] = useState(data.price);
  const id = sessionStorage.getItem("id");

  const Fetch = () => {
    fetch(
      `https://server.byte-burst.xyz/?action=removefromcart&user=${id}&item=${data.Item}`,
      {}
    ).then((res) => {
      if (res.status === 200) {
        setState(false);
      }
    });
  };
  return (
    state && (
      <div
        className={`w-full gap-2 flex-col md:flex-row text-center ${
          state === 1 ? "line-through opacity-30" : ""
        } h-fit md:h-[150px] px-2 ring-gray-300  my-3 py-[5%] ring-1 rounded-md justify-evenly flex items-center flex-wrap`}
      >
        <p className="tracking-wide w-[150px]">{data.name}</p>
        <p className="text-red-400 font-bold text-right">
          {data.price} $ <br />{" "}
          <span className="text-[0.7rem]">Unit price</span>
        </p>
        <div className="mt-2">
          <input
            onChange={(e) => {
              setPrice(e.target.value * data.price);
              Setcount((prev) => {
                return Array.from(prev, (v, i) => {
                  if (index !== i) {
                    return v;
                  } else {
                    return parseFloat(e.target.value * data.price);
                  }
                });
              });
            }}
            type="number"
            min="0"
            max={"5"}
            defaultValue={1}
            className="w-[50px]  ring-1 ring-gray-300 text-slate-500 text-center outline-none"
          />
          <br />
          <p className="text-[0.7rem] my-1 ">Count</p>
        </div>
        <p className="w-[100px] ">
          {parseFloat(price).toFixed(2)} $ <br />{" "}
          <span className="text-[0.7rem]">Subtotal</span>
        </p>
        <FaTrashAlt
          onClick={() => {
            Fetch();
            setState(1);
            Setcount((prev) => {
              return Array.from(prev, (v, i) => {
                if (index !== i) {
                  return v;
                } else {
                  return 0;
                }
              });
            });
          }}
          className="cursor-pointer text-slate-700"
        />
      </div>
    )
  );
};

export default CartElement;
