import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Pencil, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { getSession } from "./actions";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form } from "@prisma/client";
import Image from "next/image";
import { CopyToClipboardAction } from "./CopyToClipboardAction";

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
      <div className="border rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Custom Domain</TableHead>
              <TableHead>Branded Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Testimonial Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms?.map((form: Form, index: number) => (
              <TableRow key={form.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{form.title}</TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center">
                    <Link
                      href={process.env.BETTER_AUTH_URL + "/form/" + form.slug}
                      target="_blank"
                      className="underline"
                    >
                      {process.env.BETTER_AUTH_URL + "/form/" + form.slug}
                    </Link>
                    <CopyToClipboardAction
                      url={`${process.env.BETTER_AUTH_URL}/form/${form.slug}`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {form.customDomain ? form.customDomain : "N/A"}
                </TableCell>
                <TableCell>
                  <Image
                    src={form.brandLogo || ""}
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{form.brandTitle}</TableCell>
                <TableCell>
                  <Badge variant={form.isActive ? "outline" : "destructive"}>
                    {form.isActive ? "Active" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {form.isVideoForm ? "Video Testimonial" : "Text Testimonial"}
                </TableCell>
                <TableCell>
                  <Button size={"icon"} asChild variant={"outline"}>
                    <Link href={`/forms/edit/${form.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormsArchive;
