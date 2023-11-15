import { useEffect, useState } from "react";
import MiniCartElement from "./MiniCartElemet";
import Skeleton from "react-loading-skeleton";

const MiniCart = () => {
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
    <div className="min-w-[180px] mx-auto h-fit flex flex-col justify-center">
      {Cartlist ? (
        <>
          {Cartlist.map((a, i) => {
            return <MiniCartElement data={a} Setcount={setPrice} index={i} />;
          })}

          {price.reduce((acc, current) => acc + current, 0).toFixed(2) !==
          "0.00" ? (
            <p className="bg-red-400 text-xl text-white font-bold text-center py-3">
              Total{" "}
              {price.reduce((acc, current) => acc + current, 0).toFixed(2)} $
            </p>
          ) : sessionStorage.getItem("id") !== null ? (
            <p className=" text-xl font-bold text-center py-3">
              Your cart is empty ...{" "}
            </p>
          ) : (
            <p className=" text-xl font-bold text-center py-3">
              Please login first ...{" "}
            </p>
          )}
        </>
      ) : (
        <>
          <Skeleton className="h-full" />
        </>
      )}
    </div>
  );
};

export default MiniCart;
