"use client";
import { useState, useEffect } from "react";
import ProfileTitle from "../components/ProfileTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [Data, setData] = useState(false);

  useEffect(() => {
    const credentials = JSON.parse(sessionStorage.getItem("cred"));

    fetch("http://localhost:3000/api/profile", {
      headers: {
        Authorization: credentials.auth,
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
          <ProfileTitle name={Data.firstName} />
          <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">
            Billing Details
          </h1>
          <div className="max-w-[600px] m-auto px-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Last Name</AccordionTrigger>
                <AccordionContent>{Data.lastName}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Email Address</AccordionTrigger>
                <AccordionContent>{Data.email}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Telephone</AccordionTrigger>
                <AccordionContent>{Data.tel}</AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Personal Address</AccordionTrigger>
                <AccordionContent>{Data.addr}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Postal Code</AccordionTrigger>
                <AccordionContent>{Data.postcode}</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="m-10 float-right">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when youre
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
