import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const request = await req.json();

  const data = await prisma.userTable.findMany({
    where: {
      EMAIL: request.username,
    },
  });
  prisma.$disconnect();
  if (data[0] !== undefined) {
    if (bcrypt.compareSync(request.password, data[0].PWD)) {
      return NextResponse.json({
        auth: `Bearer ${jwt.sign({ user: data[0].id }, process.env.SECRET)}`,
      });
    } else {
      return NextResponse.json({
        text: "Invalid password",
      });
    }
  } else {
    return NextResponse.json({
      text: "Invalid username",
    });
  }
}
