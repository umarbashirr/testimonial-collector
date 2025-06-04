import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FeedbackForm } from "./feedback-form";

const fetchForm = async (slug: string) => {
  const form = await prisma.form.findFirst({
    where: {
      slug,
    },
  });

  return form;
};

const RandomFormPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const form = await fetchForm(slug);

  if (!form) {
    redirect("/");
  }

  return (
    <div className="p-10">
      <div className="flex flex-col justify-center items-center gap-4 w-[200px] h-[120px] relative mx-auto">
        <Image
          src={form?.brandLogo || ""}
          alt={form?.brandTitle + "logo"}
          fill
          className=" object-contain"
        />
      </div>
      <h1 className="font-bold mt-6 text-2xl text-center">
        {form?.brandTitle}
      </h1>
      <div className="w-full max-w-2xl mx-auto mt-10">
        <FeedbackForm formData={form} />
      </div>
    </div>
  );
};

export default RandomFormPage;
