"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Form as FormType } from "@prisma/client";
import { CreateFeedbackForm } from "./actions";
import { useRouter } from "next/navigation";

const FeedbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional(),
  video: z.string().optional(),
  content: z.string().min(10, "Please enter at least 10 characters"),
  rating: z.number().min(1).max(5),
});

type FeedbackData = z.infer<typeof FeedbackSchema>;

export function FeedbackForm({ formData }: { formData?: FormType | null }) {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number>(5);

  const form = useForm<FeedbackData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      avatar: "",
      content: "",
      video: "",
      rating: 5,
    },
  });

  const onSubmit = async (data: FeedbackData) => {
    const { error, message } = await CreateFeedbackForm(
      data,
      formData?.id || ""
    );

    if (error) {
      return toast.error(error);
    }

    toast.success(message);
    router.push(`/form/${formData?.slug}/confirmation`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="you@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (optional)</FormLabel>
              <FormControl>
                <Input type="tel" {...field} placeholder="+91 0000 000 000" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formData?.isVideoForm && (
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  {...field}
                  disabled
                  placeholder="https://image..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your message or feedback"
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setSelectedRating(star);
                        field.onChange(star);
                      }}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={star <= selectedRating ? "currentColor" : "none"}
                        className={`w-8 h-8 ${
                          star <= selectedRating
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } stroke-current stroke-2`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.198c.969 0 1.371 1.24.588 1.81l-3.397 2.465a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.397-2.465a1 1 0 00-1.176 0l-3.397 2.465c-.784.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.229 9.394c-.783-.57-.38-1.81.588-1.81h4.198a1 1 0 00.951-.69l1.286-3.967z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {form.formState.isSubmitting ? "Please wait..." : "Submit Feedback"}
        </Button>
      </form>
    </Form>
  );
}
