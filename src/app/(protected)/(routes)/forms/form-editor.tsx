"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/lib/uploadthing";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CreateNewForm, UpdateFeedbackForm } from "./actions";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Form as FormType } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  customDomain: z.string().optional(),
  brandLogo: z.string().url("Must be a valid URL").optional(),
  brandTitle: z.string().min(2, "Brand title is required"),
  isActive: z.boolean(),
  isVideoForm: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export function FormEditor({ initialData }: { initialData?: FormType | null }) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (initialData && initialData.title) || "",
      slug: (initialData && initialData.slug) || "",
      customDomain: (initialData && initialData.customDomain) || "",
      brandLogo: (initialData && initialData.brandLogo) || "",
      brandTitle: (initialData && initialData.brandTitle) || "",
      isActive: (initialData && initialData.isActive) || true,
      isVideoForm: (initialData && initialData.isVideoForm) || false,
    },
  });

  const onSubmit = async (formData: FormData) => {
    // Replace with API call
    if (!initialData) {
      const { error, message } = await CreateNewForm(formData);

      if (error) {
        return toast.error(error);
      }

      toast.success(message);
      toast.success("Redirecting you to archive page...");
      router.push("/forms");
    } else {
      const { error, message } = await UpdateFeedbackForm(
        formData,
        initialData.id
      );

      if (error) {
        return toast.error(error);
      }

      toast.success(message);
      toast.success("Redirecting you to archive page...");
      router.push("/forms");
    }
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="w-full">
        <label className="mb-2 font-semibold text-sm text-primary">
          Branded Logo
        </label>
        <UploadDropzone
          disabled={form.formState.isSubmitting}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            form.setValue("brandLogo", res[0].ufsUrl);
            console.log("Files: ", res);
            toast.success("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`ERROR! ${error.message}`);
          }}
        />
        {form.watch("brandLogo") && (
          <div className="mt-4 relative w-full h-[300px]">
            <Image
              src={form.getValues("brandLogo") || ""}
              alt="Image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
      <Separator orientation="vertical" className="w-full h-full" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full border rounded-lg p-6"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter form title"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your-form-slug"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Custom Domain */}
          <FormField
            control={form.control}
            name="customDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Domain (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="form.yourdomain.com"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brand Logo */}
          <FormField
            control={form.control}
            name="brandLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Logo URL (optional)</FormLabel>
                <FormControl>
                  <Input {...field} disabled placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brand Title */}
          <FormField
            control={form.control}
            name="brandTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your Brand Name"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isActive Switch */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isVideoForm Switch */}
          <FormField
            control={form.control}
            name="isVideoForm"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Video Form</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {form.formState.isSubmitting
              ? "Please wait..."
              : initialData
              ? "Update Now"
              : "Create Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
