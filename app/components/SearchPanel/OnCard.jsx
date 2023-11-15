import { useState } from "react";
import PopoverContent from "./PopoverContent";

const OnCard = ({ data, wish, cart }) => {
  const [isWished, setWish] = useState(wish);
  const [inCart, setCart] = useState(cart);
  return (
    <div className="mt-10">
      <PopoverContent
        data={data}
        isWished={isWished}
        setWish={setWish}
        setCart={setCart}
        inCart={inCart}
      />
    </div>
  );
};

export default OnCard;
