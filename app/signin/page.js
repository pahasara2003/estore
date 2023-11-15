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

const Page = () => {
  const [message, setMessage] = useState("Sign in to use our service");
  const form = useRef();

  const submit = () => {
    const formData = new FormData(form.current);
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });

    fetch(`/api/auth`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.auth !== undefined) {
          setMessage("Login successful");
          sessionStorage.setItem("cred", JSON.stringify(data.auth));
          window.location.href = "/dashboard";
        } else {
          setMessage(data.text);
        }
      });
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
      <Card className="m-10  mx-auto w-[500px] h-[500px]">
        <CardHeader>
          <CardTitle className="text-[1.8rem] mt-10 mx-auto">Sign In</CardTitle>
        </CardHeader>
        <p className="text-center">{message}</p>
        <CardContent className="flex  flex-col gap-5 p-10">
          <Input
            placeholder="Username"
            name="username"
            className="w-[80%] m-auto h-[40px]"
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            className="w-[80%] m-auto h-[40px]"
          />
        </CardContent>

        <CardFooter>
          <Button className="m-auto">Sign In</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;
