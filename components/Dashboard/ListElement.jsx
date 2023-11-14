import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ListElement = ({ data, isCart }) => {
  const [state, setState] = useState(true);
  const [inCart, setCart] = useState(isCart);
  const id = sessionStorage.getItem("id");

  const FetchCart = () => {
    if (!inCart) {
      fetch(
        `https://server.byte-burst.xyz/?action=addtocart&user=${id}&item=${data.item}`
      ).then((res) => {
        setCart(true);
      });
    } else {
      fetch(
        `https://server.byte-burst.xyz/?action=removefromcart&user=${id}&item=${data.item}`
      ).then((res) => {
        setCart(false);
      });
    }
  };

  const Fetch = () => {
    fetch(
      `https://server.byte-burst.xyz/?action=removefromwish&user=${id}&item=${data.item}`
    ).then((res) => {
      if (res.status === 200) {
        setState(false);
      }
    });
  };
  console.log(data);
  return (
    state && (
      <div
        className={`w-[60%] md:w-full ${
          state === 1 ? "line-through opacity-30" : ""
        } h-fit md:h-[120px] text-center flex-col gap-3 md:flex-row  ring-gray-300  my-3 py-[5%] ring-1 rounded-md justify-evenly flex items-center`}
      >
        {
          <img
            src={`../${data.image_url}`}
            className="w-[100px] max-h-[60px] object-cover hidden md:inline-block"
          />
        }
        <p className="tracking-wide w-[150px]">{data.name}</p>
        <p className="text-red-400 font-bold w-[100px]">{data.price} $</p>

        <p
          onClick={() => {
            FetchCart();
            setCart(1);
          }}
          className={`p-1 cursor-pointer w-[150px] ${
            inCart === true
              ? "text-blue-400 ring-1 bg-white ring-blue-400"
              : "bg-blue-400 text-white"
          }`}
        >
          {inCart === 1
            ? "Changing"
            : inCart === true
            ? "Remove from Cart"
            : "Add to Cart"}
        </p>

        <FaTrashAlt
          onClick={() => {
            Fetch();
            setState(1);
          }}
          className="cursor-pointer text-slate-700"
        />
      </div>
    )
  );
};

export default ListElement;
