"use client";

import { Button } from "@/components/ui/button";
import { Form as FormType, Testimonial } from "@prisma/client";
import { Check, UndoIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateTestimonialStatus } from "./actions";

type TestimonialWithForm = Testimonial & {
  formRef: FormType;
};

export const TestimonialActionButtons = ({
  testimonial,
}: {
  testimonial: TestimonialWithForm;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updateStatus = async (type: "approve" | "reject") => {
    setIsLoading(true);
    try {
      const { message, error, status } = await updateTestimonialStatus(
        testimonial.id,
        type
      );

      if (status > 299) {
        toast.error(error);
        return;
      }

      toast.success(message);
      router.refresh();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }

      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {testimonial.status === "pending" ? (
        <div className="flex items-center gap-4">
          <Button
            size={"sm"}
            variant={"outline"}
            disabled={isLoading}
            onClick={() => updateStatus("approve")}
            className="cursor-pointer"
          >
            <Check className="w-4 h-4" /> Approve
          </Button>
          <Button
            size={"sm"}
            variant={"destructive"}
            disabled={isLoading}
            onClick={() => updateStatus("reject")}
            className="cursor-pointer"
          >
            <X className="w-4 h-4" /> Reject
          </Button>
        </div>
      ) : testimonial.isApproved ? (
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => updateStatus("reject")}
          disabled={isLoading}
          className="flex items-center gap-2 cursor-pointer"
        >
          <UndoIcon className="w-4 h-4" /> Unapprove
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => updateStatus("approve")}
          disabled={isLoading}
          className="flex items-center gap-2 cursor-pointer"
        >
          <UndoIcon className="w-4 h-4" /> Restore
        </Button>
      )}
    </>
  );
};
