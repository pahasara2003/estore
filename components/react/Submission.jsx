"use client";
import { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Submission = () => {
  const [cart, setCart] = useState(false);
  const [wish, setWish] = useState(false);

  return (
    <div className="flex justify-evenly w-full">
      <Button
        value=""
        className={cart ? "bg-red-400" : ""}
        onClick={() => {
          setCart((prev) => !prev);
        }}
      >
        <FaShoppingCart /> &nbsp; {!cart ? "Add to Cart" : "Added"}
      </Button>
      <Button
        onClick={() => {
          setWish((prev) => !prev);
        }}
        variant="secondary"
      >
        {wish ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
      </Button>
    </div>
  );
};

export default Submission;
