"use server";

import { prisma } from "@/lib/prisma";
import validateRegistrationForm from "@/lib/utils/validateRegistrationForm";
import { Prisma } from "@prisma/client";

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
