"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = () => {
  const search = useSearchParams();
  console.log(search.get("word"));
  return (
    <div className="py-1">
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
    </div>
  );
};

export default page;
