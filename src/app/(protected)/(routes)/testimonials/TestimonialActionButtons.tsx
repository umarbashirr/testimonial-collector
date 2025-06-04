"use client";

import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";
import { updateTestimonialStatus } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Testimonial } from "@prisma/client";
import { Form as FormType } from "@prisma/client";
import { useState } from "react";

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
            size={"icon"}
            variant={"outline"}
            disabled={isLoading}
            onClick={() => updateStatus("approve")}
            className="cursor-pointer"
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button
            size={"icon"}
            variant={"destructive"}
            disabled={isLoading}
            onClick={() => updateStatus("reject")}
            className="cursor-pointer"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ) : testimonial.isApproved ? (
        <Button
          variant={"outline"}
          onClick={() => updateStatus("reject")}
          disabled={isLoading}
          className="flex items-center gap-2 cursor-pointer"
        >
          Revert Status
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => updateStatus("approve")}
          disabled={isLoading}
          className="flex items-center gap-2 cursor-pointer"
        >
          Revert Status
        </Button>
      )}
    </>
  );
};
