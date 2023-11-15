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
import Image from "next/image";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CartCard = ({ data }) => {
  return (
    <Card className="min-h-[100px] max-md:w-[500px] shadow-none  items-center justify-evenly  flex flex-col sm:flex-row">
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
      <CardContent className="w-[150px]">
        <Label className="text-[1.2rem] font-bold">
          {data.price.toString()} $
        </Label>
      </CardContent>

      <CardFooter>
        <Button className="mt-3">
          <FaTrash />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Page = async (params) => {
  const User = jwt.verify(
    params.params.auth.split("%22")[0],
    process.env.SECRET
  );

  const Data = await prisma.carts.findMany({
    where: {
      User: User.user,
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          image_url: true,
          specifications: true,
        },
      },
    },
  });

  return (
    <div className="bg-[#f2f2f2] py-1">
      {Data && (
        <div className=" m-auto ">
          <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">
            Cart
          </h1>
          <div className=" m-auto px-3 flex gap-4 flex-wrap justify-center">
            {Data.map((d, i) => {
              return <CartCard data={d.products} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
