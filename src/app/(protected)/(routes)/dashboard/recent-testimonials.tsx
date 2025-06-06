import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Testimonial as TestimonialType } from "@prisma/client";
import { format } from "date-fns";
import { CheckCircle, Clock, Star, XCircle } from "lucide-react";
import Link from "next/link";

const RecentTestimonials = ({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Testimonials</CardTitle>
        <CardDescription>Latest customer feedback received</CardDescription>
      </CardHeader>
      <CardContent>
        {!testimonials.length ? (
          <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] py-8">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 text-muted-foreground"
            >
              <rect width="48" height="48" rx="12" fill="#F3F4F6" />
              <path
                d="M16 20C16 17.7909 17.7909 16 20 16H28C30.2091 16 32 17.7909 32 20V28C32 30.2091 30.2091 32 28 32H20C17.7909 32 16 30.2091 16 28V20Z"
                stroke="#A1A1AA"
                strokeWidth="2"
              />
              <path
                d="M20 24H28"
                stroke="#A1A1AA"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="24" cy="27" r="1.5" fill="#A1A1AA" />
            </svg>
            <p className="text-sm text-muted-foreground">
              No testimonials received yet.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {testimonials.map((testimonial: TestimonialType) => (
                <div
                  key={testimonial.id}
                  className="flex items-start space-x-4"
                >
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
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(testimonial.status)}
                        <span className="text-xs text-muted-foreground">
                          {format(testimonial.createdAt, "dd MMM yyyy")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/testimonials">View All Testimonials</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTestimonials;
