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

export async function PUT(req, res) {
  const User = await Authenticate(req);
  const Item = req.nextUrl.searchParams.get("item");
  if (User !== undefined && Item !== null) {
    const data = await prisma.carts.create({
      data: {
        User: User.user,
        Item: parseInt(Item),
      },
    });
    return NextResponse.json(data);
  }
}

export async function DELETE(req, res) {
  const User = await Authenticate(req);
  const Item = req.nextUrl.searchParams.get("item");
  if (User !== undefined && Item !== null) {
    const data = await prisma.carts.deleteMany({
      where: {
        User: User.user,
        Item: parseInt(Item),
      },
    });
    prisma.$disconnect();
    return NextResponse.json(data);
  }
}
