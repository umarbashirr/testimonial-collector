"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form as FormType, Testimonial } from "@prisma/client";
import { TestimonialActionButtons } from "./TestimonialActionButtons";
import { Star } from "lucide-react";
import { format } from "date-fns";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

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
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
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
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={testimonial.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>{testimonial.formRef.title}</TableCell>
                    <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                    <TableCell>
                      {format(testimonial.createdAt, "dd MMM yyyy")}
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
