import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method '${req.method}' not allowed` });
  }

  try {
    const registration: Prisma.RegistrationCreateInput = JSON.parse(req.body);
    const savedRegistration = await prisma.registration.create({
      data: registration,
    });
    res.status(200).json(savedRegistration);
  } catch (err) {
    console.log("error: " + String(err));
    res
      .status(400)
      .json({ message: "Something went wrong", error: String(err) });
  }
};
