import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req, res) {
  const request = await req.json();

  const data = await prisma.userTable.create({
    data: {
      FirstName: request.firstName,
      LastName: request.lastName,
      EMAIL: request.email,
      TEL: request.telephone,
      ADDR: request.address,
      POSTCODE: parseInt(request.postcode),
      PWD: bcrypt.hashSync(request.password, 10),
    },
  });
  return NextResponse.json(data);
}
