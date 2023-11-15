import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import WishCard from "@/components/react/WishCard";

const prisma = new PrismaClient();

const Page = async (params) => {
  const User = jwt.verify(
    params.params.auth.split("%22")[0],
    process.env.SECRET
  );

  const Data = await prisma.wishlists.findMany({
    where: {
      user: User.user,
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

  const Cartlist = await prisma.carts.findMany({
    where: {
      User: User.user,
    },
  });

  let CartItems = [];
  Cartlist.forEach((c) => {
    CartItems.push(c.Item);
  });
  prisma.$disconnect();

  return (
    <div className="bg-[#f2f2f2] py-5 min-h-[90vh]">
      {Data && (
        <div className=" m-auto ">
          <h1 className="text-[1.2rem] font-bold text-center py-3 pt-5">
            Wishlist
          </h1>
          <div className=" m-auto px-3 flex gap-4 flex-wrap justify-center">
            {Data.map((d, i) => {
              return (
                <WishCard
                  data={{ ...d.products, price: d.products.price.toString() }}
                  key={i}
                  Cart={CartItems.includes(d.item)}
                />
              );
            })}
            {Data.length === 0 && (
              <h1 className="py-10 text-xl font-bold text-slate-500">
                Your wishlist is empty
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
