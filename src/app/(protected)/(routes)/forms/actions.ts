"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session || !session.session.userId) {
    return null;
  }

  return session.user;
};

interface FormInputType {
  title: string;
  slug: string;
  customDomain?: string | undefined;
  brandLogo?: string | undefined;
  brandTitle: string;
  isActive: boolean;
  isVideoForm: boolean;
}

export const CreateNewForm = async (values: FormInputType) => {
  const user = await getSession();

  if (!user) {
    return {
      status: 403,
      error: "Not Authenticated",
    };
  }

  const existingForm = await prisma.form.findFirst({
    where: {
      userId: user.id,
      slug: values.slug.toLowerCase(),
    },
  });

  if (existingForm) {
    return {
      error: "This slug is already used",
      status: 401,
    };
  }

  const form = await prisma.form.create({
    data: {
      title: values.title,
      slug: values.slug.toLowerCase(),
      customDomain: values.customDomain,
      brandLogo: values.brandLogo,
      brandTitle: values.brandTitle,
      isActive: values.isActive,
      isVideoForm: values.isVideoForm,
      userId: user.id,
    },
  });

  return {
    status: 201,
    data: form,
    message: "Form created successfully",
  };
};

export const UpdateFeedbackForm = async (
  values: FormInputType,
  formId: string
) => {
  const user = await getSession();

  if (!user) {
    return {
      status: 403,
      error: "Not Authenticated",
    };
  }

  const updatedForm = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      title: values.title,
      slug: values.slug.toLowerCase(),
      customDomain: values.customDomain,
      brandLogo: values.brandLogo,
      brandTitle: values.brandTitle,
      isActive: values.isActive,
      isVideoForm: values.isVideoForm,
    },
  });

  if (!updatedForm) {
    return {
      error: "Error while updating",
      status: 401,
    };
  }

  return {
    status: 200,
    data: updatedForm,
    message: "Form updated successfully",
  };
};
