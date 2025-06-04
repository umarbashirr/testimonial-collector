import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const ConfirmationPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const url = (await params).slug;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 text-center">
      <div className="border-2 border-green-500 text-green-500 rounded-full p-4 animate-pulse">
        <CheckIcon className="w-16 h-16" />
      </div>

      <h1 className="text-2xl mt-6 font-bold ">Form Submitted Successfully</h1>

      <p className="mt-2  max-w-md">
        Thank you for your feedback. Your response has been recorded. We
        appreciate your time!
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/form/${url}`}>Back to Form</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
