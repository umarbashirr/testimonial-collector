"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export const CopyToClipboardAction = ({ url }: { url: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyToClipboard = () => {
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 4000);
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={handleCopyToClipboard}
        >
          {isCopied ? (
            <CopyCheck className="w-4 h-4 animate-in" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy Now</TooltipContent>
    </Tooltip>
  );
};
