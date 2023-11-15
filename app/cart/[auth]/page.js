import CartCard from "@/components/react/CartCard";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  prisma.$disconnect();

  return (
    <div className="bg-[#f2f2f2] py-1 min-h-[90vh]">
      <div className=" m-auto ">
        <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">Cart</h1>
        <div className=" m-auto px-3 flex gap-4 flex-wrap justify-center">
          {Data.map((d, i) => {
            if (d !== null) {
              return (
                <CartCard
                  data={{ ...d.products, price: d.products.price.toString() }}
                  key={i}
                />
              );
            }
          })}
          {Data.length === 0 && (
            <h1 className="py-10 text-xl font-bold text-slate-500">
              Your wishlist is empty
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
