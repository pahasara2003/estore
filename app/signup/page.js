"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const [message, setMessage] = useState("Sign in to use our service");
  const form = useRef();

  const submit = () => {
    const formData = new FormData(form.current);
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });

    if (json.password !== json.reenter) {
      setMessage("Passwords must match");
    } else {
      fetch(`/api/signup`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setMessage("Account Registered");
        });
    }
  };

  return (
    <form
      className="bg-[#f2f2f2] py-5"
      id="my"
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Card className="m-10  mx-auto md:w-[620px] w-full  ">
        <CardHeader>
          <CardTitle className="text-[1.8rem] mt-10 mx-auto">Sign Up</CardTitle>
        </CardHeader>
        <p className="text-center">{message}</p>
        <CardContent className="flex  flex-wrap gap-5 p-10">
          <Input
            placeholder="First Name"
            name="firstName"
            className="w-[250px] m-auto h-[40px]"
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            className="w-[250px] m-auto h-[40px]"
          />
          <Input
            placeholder="Email"
            name="email"
            className="w-[250px] m-auto h-[40px]"
          />
          <Input
            placeholder="Telephone"
            name="telephone"
            className="w-[250px] m-auto h-[40px]"
          />
          <Textarea
            placeholder="Your Address"
            name="address"
            className="md:w-[98%] w-[250px] m-auto h-[80px]"
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            className="w-[250px] m-auto h-[40px]"
          />
          <Input
            placeholder="Re enter password"
            type="password"
            name="reenter"
            className="w-[250px] m-auto h-[40px]"
          />
          <Input
            placeholder="Postal Code"
            name="postcode"
            className="w-[250px] m-auto h-[40px]"
          />
        </CardContent>

        <CardFooter>
          <Button className="m-auto">Sign Up</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;
