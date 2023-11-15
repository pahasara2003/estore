import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Authenticate = async (req) => {
  let User;
  const request = await req.headers;
  const token = request.get("authorization").split(" ")[1];
  jwt.verify(token, process.env.SECRET, (err, user) => {
    User = user;
  });
  return User;
};

export async function GET(req, res) {
  const User = await Authenticate(req);
  const data = await prisma.wishlists.findMany({
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
  return NextResponse.json(data);
}
