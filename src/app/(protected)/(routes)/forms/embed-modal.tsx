"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Form } from "@prisma/client";
import { Check, Code, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EmbedModalProps {
  form: Form;
}

export function EmbedModal({ form }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const wallCode = `<testimonial-wall
  form="${form.slug}"
  theme="light"
  layout="masonry"
  limit="10"
/>`;

  const scriptCode = `<script src="${baseUrl}/embed/testimonial-wall.js"></script>`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Code className="w-4 h-4 mr-2" />
          Embed
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Embed “{form.title}”
          </DialogTitle>
          <DialogDescription>
            Copy and paste this code to embed your testimonial wall.
          </DialogDescription>
        </DialogHeader>
        <div className=" overflow-x-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">HTML Embed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                  <code>{wallCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={async () => {
                    await navigator.clipboard.writeText(wallCode);
                    setCopied(true);
                    toast("Copied to clipboard!", {
                      description: "HTML embed code copied.",
                    });
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Script Include</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="max-w-full overflow-x-auto bg-muted p-4 rounded-lg text-xs">
                  <code className="whitespace-pre">{scriptCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={async () => {
                    await navigator.clipboard.writeText(scriptCode);
                    setCopied(true);
                    toast("Copied to clipboard!", {
                      description: "Script code copied.",
                    });
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Available Props</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <strong>theme:</strong> <code>light</code> | <code>dark</code>
            </div>
            <div>
              <strong>layout:</strong> <code>masonry</code> | <code>grid</code>=
              | <code>list</code>=
            </div>
            <div>
              <strong>max-items:</strong> number of testimonials to show --
              default 10
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
