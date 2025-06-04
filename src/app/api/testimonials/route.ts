import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const form = searchParams.get("form");
  const limit = searchParams.get("limit") || "10";

  const testimonials = await prisma.testimonial.findMany({
    where: {
      formRef: {
        slug: form || "",
      },
    },
    take: parseInt(limit),
  });

  return NextResponse.json({ testimonials });
}
