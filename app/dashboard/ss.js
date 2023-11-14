"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BsTrash } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const CartCard = ({ a }) => {
  const select = useRef();
  const [display, setDisplay] = useState(true);

  const Delete = async () => {
    const res = await fetch(
      `http://localhost/?action=removerfromcart&user=1&item=${a.id}`
    );
  };

  return (
    <>
      {display && (
        <Card className="w-[80%] shadow-sm max-w-[600px] items-center justify-between flex-wrap m-5 mx-auto flex">
          <CardHeader className="w-[180px]">
            <CardTitle>{a.name}</CardTitle>
            <CardDescription> {a.price} $</CardDescription>
          </CardHeader>
          <CardContent className="mt-3">
            <Select
              defaultValue="1"
              onValueChange={(e) => {
                select.current.innerHTML =
                  (parseInt(e) * parseFloat(a.price)).toFixed(2) + " $";
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Count</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
          <CardContent className="w-[150px]">
            <CardDescription>Subtotal</CardDescription>
            <CardTitle ref={select} className="">
              {a.price} $
            </CardTitle>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              size="icon"
              className="mt-3"
              onClick={() => {
                Delete();
              }}
            >
              <BsTrash size={20} />
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

function Page() {
  const [data, setData] = useState([]);
  const [sum, setsum] = useState([]);
  const Total = useRef(0);

  useEffect(() => {
    fetch("http://localhost/?action=mywishlist&word=phone&user=1")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div>
      {data.map((a, i) => {
        Total.current = Total.current + parseFloat(a.price);
        return <CartCard a={a} key={i} />;
      })}
      <div className="bg-black max-w-[600px] m-auto px-5 py-3 text-center text-[1.5rem] text-white">
        {Total.current}
      </div>
    </div>
  );
}

export default Page;
