"use server";

import prisma from "@/lib/prisma";

type FeedbackData = {
  name: string;
  email: string;
  rating: number;
  content: string;
  phoneNumber?: string | undefined;
  avatar?: string | undefined;
  video?: string | undefined;
};

export const CreateFeedbackForm = async (
  values: FeedbackData,
  formId: string
) => {
  try {
    const feedback = await prisma.testimonial.create({
      data: {
        ...values,
        formId,
      },
    });

    if (!feedback) {
      return {
        status: 401,
        error: "Failed to submit feedback",
      };
    }

    // TODO: Send email to admin that he received new testimonial

    return {
      status: 201,
      message: "Feedback Submitted Successfully!",
      data: feedback,
    };
  } catch (error: unknown) {
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
