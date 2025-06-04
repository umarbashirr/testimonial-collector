"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CopyToClipboardAction = ({ url }: { url: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyToClipboard = () => {
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
    toast("Copied to clipboard!", {
      description: "Form link copied",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={handleCopyToClipboard}
        >
          {isCopied ? (
            <Check className="w-4 h-4 animate-in" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy Now</TooltipContent>
    </Tooltip>
  );
};
