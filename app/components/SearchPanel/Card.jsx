import { useState } from "react";
import Stars from "./Stars";
import "@radix-ui/themes/styles.css";
import CardLoader from "./CardLoader";
import { Tooltip, Popover } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import PopoverContent from "./PopoverContent";

const Card = ({ data, wish, cart, state }) => {
  const [isWished, setWish] = useState(wish);
  const [inCart, setCart] = useState(cart);
  const id = sessionStorage.getItem("id");

  const FetchWish = () => {
    // if (!isWished) {
    //   fetch(
    //     `https://server.byte-burst.xyz/?action=addtowish&user=${id}&item=${data.id}`
    //   );
    // } else {
    //   fetch(
    //     `https://server.byte-burst.xyz/?action=removefromwish&user=${id}&item=${data.id}`
    //   );
    // }
  };

  const FetchCart = () => {
    // if (!inCart) {
    //   fetch(
    //     `https://server.byte-burst.xyz/?action=addtocart&user=${id}&item=${data.id}`
    //   );
    // } else {
    //   fetch(
    //     `https://server.byte-burst.xyz/?action=removefromcart&user=${id}&item=${data.id}`
    //   );
    // }
  };

  return (
    <>
      {state ? (
        <div className="w-[300px] text-center items-center justify-between flex flex-col py-2 my-5 shadow-lg hover:ring-[2px] duration-300 cursor-pointer ring-red-400 rounded-xl h-[430px]">
          <img
            className="max-w-[270px]  min-h-[220px] object-cover max-h-[250px]"
            src={`${data.image_url}`}
          ></img>

          <Popover.Root>
            <Popover.Trigger>
              <div>
                <Stars data={data.ratings} />

                <h1 className=" text-[1.3rem] tracking-wide font-bold ">
                  {data.name}
                </h1>

                <p className="text-red-400 text-lg font-bold">{data.price} $</p>
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <PopoverContent
                data={data}
                isWished={isWished}
                setWish={setWish}
                setCart={setCart}
                inCart={inCart}
              />{" "}
            </Popover.Content>
          </Popover.Root>
          <div className="flex gap-10 border-t-2 pt-2 w-full justify-center text-slate-500  duration-0">
            <i
              onClick={() => {
                setWish((prev) => !prev);
                FetchWish();
              }}
              className={`p-2 rounded-full ${
                isWished
                  ? "fa-solid fa-heart text-red-400 ring-1 ring-red-400"
                  : "fa-regular fa-heart"
              }`}
            ></i>
            <i
              onClick={() => {
                setCart((prev) => !prev);
                FetchCart();
              }}
              className={`fa-solid fa-cart-shopping p-2 rounded-full ${
                inCart ? "text-red-400 ring-1 ring-red-400" : ""
              }`}
            ></i>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default Card;
