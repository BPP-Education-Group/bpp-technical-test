"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import validateRegistrationForm from "@/lib/utils/validateRegistrationForm";

export async function registerStudent(data: Prisma.RegistrationCreateInput) {
  try {
    await validateRegistrationForm(data);

    const savedRegistration = await prisma.registration.create({
      data,
    });
    return { success: true, data: savedRegistration };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}
