"use server";

import prisma from "@/lib/prisma";
import { getSession } from "../forms/actions";

export const updateTestimonialStatus = async (
  id: string,
  status: "approve" | "reject"
) => {
  try {
    const user = await getSession();

    if (!user) {
      return {
        status: 403,
        error: "Not Authenticated",
      };
    }

    const testimonialUpdate = await prisma.testimonial.update({
      where: {
        id: id,
        formRef: {
          userId: user.id,
        },
      },
      data: {
        status: status === "approve" ? "approved" : "rejected",
        isApproved: status === "approve",
      },
    });

    if (!testimonialUpdate) {
      return {
        status: 401,
        error: "Failed to update testimonial status",
      };
    }

    return {
      status: 200,
      message: "Status updated successfully",
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return {
        status: 500,
        error: error.message,
      };
    }

    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
};
