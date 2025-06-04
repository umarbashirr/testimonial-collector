import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { getSession } from "./actions";
import { FormsTable } from "./FormsTable";

const fetchForms = async () => {
  const user = await getSession();

  if (!user) {
    return null;
  }

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
  });

  return forms;
};

const FormsArchive = async () => {
  const forms = await fetchForms();

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold mb-1">Forms</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage all your testimonial forms
          </p>
        </div>
        <Button asChild>
          <Link
            href="/forms/create"
            className="flex items-center justify-center text-center"
          >
            <PlusCircleIcon className="w-4 h-4" />
            Add New Form
          </Link>
        </Button>
      </div>
      <FormsTable forms={forms} />
    </div>
  );
};

export default FormsArchive;
