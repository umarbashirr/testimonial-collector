"use client";

import type { Form as FormType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Form } from "@prisma/client";
import Image from "next/image";
import { CopyToClipboardAction } from "./CopyToClipboardAction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EmbedModal } from "./embed-modal";

export const FormsTable = ({ forms }: { forms: FormType[] | null }) => {
  return (
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
                    href={
                      process.env.NEXT_PUBLIC_APP_URL + "/form/" + form.slug
                    }
                    target="_blank"
                    className="underline"
                  >
                    {process.env.NEXT_PUBLIC_APP_URL + "/form/" + form.slug}
                  </Link>
                  <CopyToClipboardAction
                    url={`${process.env.NEXT_PUBLIC_APP_URL}/form/${form.slug}`}
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
                <div className="flex gap-2">
                  <Button size="sm" asChild variant="outline">
                    <Link href={`/forms/edit/${form.id}`}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <EmbedModal form={form} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
