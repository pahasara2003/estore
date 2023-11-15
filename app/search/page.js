import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import Submission from "@/components/react/Submission";
import Stars from "@/components/react/Stars";

const prisma = new PrismaClient();

const Page = async (params) => {
  const word = params.searchParams.word;
  const data = await prisma.products.findMany({
    where: {
      OR: [
        {
          name: {
            contains: word,
          },
        },
        {
          type: {
            contains: word,
          },
        },
        {
          specifications: {
            contains: word,
          },
        },
      ],
    },
  });

  prisma.$disconnect();
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

      <div className="flex flex-wrap min-h-[90vh] bg-[#f2f2f2] mt-5 py-5 justify-center gap-5">
        {data.map((d) => {
          return (
            <Card className="w-[300px]" key={Math.random()}>
              <CardHeader className="mb-2 h-[220px]">
                <Image
                  width={280}
                  height={10}
                  src={`/${d.image_url}`}
                  alt="Image"
                  className="m-auto object-contain h-[150px]"
                />
              </CardHeader>
              <CardContent className=" h-[150px]">
                <Stars data={d.ratings} />
                <p className="text-red-400 font-bold text-[1.4rem] text-center">
                  {d.price.toString()} $
                </p>
                <CardTitle className="font-bold text-lg text-center">
                  {d.name}
                </CardTitle>
                <CardDescription>{d.specifications}</CardDescription>
              </CardContent>

              <CardFooter>
                <Submission id={d.id} />
              </CardFooter>
            </Card>
          );
        })}
        {data.length === 0 && (
          <h1 className="py-10 text-xl font-bold text-slate-500">
            Sorry... we dont have such products
          </h1>
        )}
      </div>
    </div>
  );
};

export default Page;
