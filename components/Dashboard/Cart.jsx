import { useEffect, useState, useRef } from "react";
import CartElement from "./CartElement";
import Skeleton from "react-loading-skeleton";

const Cart = () => {
  const [Cartlist, setCartlist] = useState(false);
  const [price, setPrice] = useState([]);
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    const Fetch = async () => {
      const response = await fetch(
        `https://server.byte-burst.xyz/?action=mycartlist&user=${id}`
      );
      const data = await response.json();
      setCartlist(data);

      setPrice(Array.from(data, (x) => parseFloat(x.price)));
    };
    Fetch();
  }, []);

  return (
    <div className=" md:w-[70vw] min-h-[400px] flex flex-col md:block md:m-auto justify-center">
      {Cartlist ? (
        <>
          {Cartlist.map((a, i) => {
            return <CartElement data={a} Setcount={setPrice} index={i} />;
          })}

          {price.reduce((acc, current) => acc + current, 0).toFixed(2) !==
          "0.00" ? (
            <p className="bg-red-400 text-xl text-white font-bold text-center py-3">
              Total{" "}
              {price.reduce((acc, current) => acc + current, 0).toFixed(2)} $
            </p>
          ) : (
            <p className=" text-xl font-bold text-center py-3">
              Your cart is empty ...{" "}
            </p>
          )}
        </>
      ) : (
        <>
          <Skeleton height={100} count={3} className="my-3" />
        </>
      )}
    </div>
  );
};

export default Cart;
