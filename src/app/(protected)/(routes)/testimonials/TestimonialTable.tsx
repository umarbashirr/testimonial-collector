"use client";

import React from "react";
import Image from "next/image";

import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TestimonialActionButtons } from "./TestimonialActionButtons";
import { Form as FormType, Testimonial } from "@prisma/client";
import { Input } from "@/components/ui/input";

type TestimonialWithForm = Testimonial & {
  formRef: FormType;
};

export const TestimonialTable = ({
  testimonials,
}: {
  testimonials: TestimonialWithForm[] | null;
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredTestimonials = React.useMemo(() => {
    if (!searchQuery || searchQuery === "") {
      return testimonials;
    }
    return (
      testimonials?.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.email &&
            e.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
          e.formRef.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || null
    );
  }, [testimonials, searchQuery]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Input
        placeholder="Search by name, email or form title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md ml-auto"
      />
      <div className="border rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Serial</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Form Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials &&
              filteredTestimonials.map(
                (testimonial: TestimonialWithForm, index: number) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar || ""}
                          alt={testimonial.name + " avatar"}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="bg-secondary w-10 h-10 flex items-center justify-center rounded-full ">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </TableCell>

                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.email || "N/A"}</TableCell>
                    <TableCell>{testimonial.phoneNumber || "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 fill-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] whitespace-pre-wrap">
                      {testimonial.content}
                    </TableCell>
                    <TableCell>{testimonial.formRef.title}</TableCell>
                    <TableCell>
                      <Badge
                        className="capitalize"
                        variant={
                          testimonial.status === "pending"
                            ? "outline"
                            : testimonial.status === "rejected"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {testimonial.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <TestimonialActionButtons testimonial={testimonial} />
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
