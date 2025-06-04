import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const form = searchParams.get("form");

  const testimonials = await prisma.testimonial.findMany({
    where: {
      formRef: {
        slug: form || "",
      },
    },
  });

  return NextResponse.json({ testimonials });
}
