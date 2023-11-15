"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

const WishCard = ({ data, Cart }) => {
  const [display, setDisplay] = useState(true);
  const [cart, setCart] = useState(Cart);
  console.log(Cart);

  return (
    <>
      {display !== false && (
        <Card
          className={`min-h-[100px] sm:w-[700px] shadow-none  items-center justify-evenly  flex flex-col sm:flex-row ${
            display === null && "line-through"
          }`}
        >
          <CardContent className="w-[120px]  py-2">
            <Image
              height={100}
              width={70}
              src={`/${data.image_url}`}
              alt={data.name}
              className="h-[100px] object-contain"
            />
          </CardContent>
          <CardHeader className="w-[200px]">
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.specifications}</CardDescription>
          </CardHeader>
          <CardContent className="w-[100px]">
            <Label className="text-[1rem] font-bold">
              {data.price.toString()} $
            </Label>
          </CardContent>

          <CardFooter className="w-[170px] flex gap-5">
            <Button
              className="mt-3"
              variant={cart ? "secondary" : ""}
              onClick={() => {
                if (!cart) {
                  setCart((prev) => !prev);
                  fetch(`/api/addCart?item=${data.id}`, {
                    method: "PUT",
                    headers: {
                      Authorization: JSON.parse(sessionStorage.getItem("cred")),
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => console.log(data));
                } else {
                  setCart((prev) => !prev);
                  fetch(`/api/addCart?item=${data.id}`, {
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
              {cart ? <TiTick /> : <FaShoppingBag />}
            </Button>
            <Button
              className="mt-3"
              onClick={() => {
                setDisplay(null);
                fetch(`/api/addWish?item=${data.id}`, {
                  method: "PUT",
                  headers: {
                    Authorization: JSON.parse(sessionStorage.getItem("cred")),
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.count >= 1) {
                      setDisplay(false);
                    }
                  });
              }}
            >
              <FaTrash />
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WishCard;
