"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { data } from "jquery";

const CartCard = ({ data }) => {
  return (
    <Card className="min-h-[100px] shadow-none  items-center justify-evenly  flex flex-wrap">
      <CardContent className="w-[120px]  py-2">
        <Image src={data.image_url} className="h-[100px] object-contain" />
      </CardContent>
      <CardHeader className="w-[200px]">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.specifications}</CardDescription>
      </CardHeader>
      <CardContent className="w-[150px]">
        <Label className="text-[1.2rem] font-bold">{data.price} $</Label>
      </CardContent>

      <CardFooter>
        <Button className="mt-3">
          <FaTrash />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Page = () => {
  const [Data, setData] = useState(false);

  useEffect(() => {
    const credentials = JSON.parse(sessionStorage.getItem("cred"));
    fetch("/api/wishlist", {
      headers: {
        Authorization: credentials,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <>
      {Data && (
        <div className="max-w-[700px] m-auto">
          <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">
            Wishlist
          </h1>
          <div className="max-w-[600px] m-auto px-3 flex flex-col gap-1">
            {Data.map((d, i) => {
              return <CartCard data={d.products} key={i} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
