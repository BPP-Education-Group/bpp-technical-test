import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validateRegistrationForm from "../../../lib/utils/validateRegistrationForm";

const prisma = new PrismaClient({
  log: ["error"],
});

export async function POST(request: NextRequest) {
  try {
    const requestBody: Prisma.RegistrationCreateInput = await request.json();
    await validateRegistrationForm(requestBody);

    const savedRegistration = await prisma.registration.create({
      data: requestBody,
    });

    return NextResponse.json(savedRegistration, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong", error: String(err) },
      { status: 500 }
    );
  }
}
