"use client";
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Submission = ({ id }) => {
  const [cart, setCart] = useState(() => false);
  const [wish, setWish] = useState(() => false);

  return (
    <div className="flex justify-evenly w-full">
      <Button
        value=""
        className={cart ? "bg-red-400" : ""}
        onClick={() => {
          if (!cart) {
            setCart((prev) => !prev);
            fetch(`/api/addCart?item=${id}`, {
              method: "PUT",
              headers: {
                Authorization: JSON.parse(sessionStorage.getItem("cred")),
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          } else {
            setCart((prev) => !prev);
            fetch(`/api/addCart?item=${id}`, {
              method: "DELETE",
              headers: {
                Authorization: JSON.parse(sessionStorage.getItem("cred")),
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }
        }}
      >
        <FaShoppingCart /> &nbsp; {!cart ? "Add to Cart" : "Added"}
      </Button>
      <Button
        onClick={() => {
          if (!wish) {
            setWish((prev) => !prev);

            fetch(`/api/addWish?item=${id}`, {
              method: "PUT",
              headers: {
                Authorization: JSON.parse(sessionStorage.getItem("cred")),
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          } else {
            setWish((prev) => !prev);

            fetch(`/api/addWish?item=${id}`, {
              method: "DELETE",
              headers: {
                Authorization: JSON.parse(sessionStorage.getItem("cred")),
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
          }
        }}
        variant="secondary"
      >
        {wish ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
      </Button>
    </div>
  );
};

export default Submission;
