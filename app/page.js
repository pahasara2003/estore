"use client";
import Hero from "./components/Hero/Hero";
import { useState, useEffect } from "react";
import Wishlist from "./components/Dialog/Wishlist";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="py-1 bg-slate-800">
      <form
        className="flex justify-center py-5 px-3"
        action="/search"
        method="GET"
      >
        <Input
          placeholder="Search our products"
          name="word"
          className="max-w-[600px] mx-1 rounded-none bg-white  h-[45px] text-lg px-5 text-slate-400 "
        />
        <Button className="h-[45px] rounded-none bg-red-400">Search</Button>
      </form>
      <Hero />
    </div>
  );
};

export default Home;
