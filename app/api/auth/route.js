import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const request = await req.json();
  const data = await prisma.userTable.findMany({
    where: {
      EMAIL: request.email,
    },
  });
  prisma.$disconnect();
  return NextResponse.json(data);
}
