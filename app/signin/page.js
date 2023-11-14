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

const page = () => {
  const [message, setMessage] = useState("Sign in to use our service");
  const form = useRef();

  const submit = () => {
    const formData = new FormData(form.current);
    const json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });

    fetch(`http://localhost:3000/sign`, {
      method: "POST",
      body: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    }).then(async (data) => {
      const status = data.status;

      if (status === 200) {
        setMessage("Login successful");
        const json = await data.json();
        sessionStorage.setItem("cred", JSON.stringify(json));
        window.location.href = "/dashboard";
      }
      if (status === 403) {
        setMessage("Incorrect username");
      }
      if (status === 406) {
        setMessage("Incorrect password");
      }
    });
  };

  return (
    <form
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

export default page;
