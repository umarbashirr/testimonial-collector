"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Form as FromType } from "@prisma/client";
import { Activity, BarChart3, Check, Link2, Mail, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const DashboardQuickActions = ({
  userForms,
}: {
  userForms: FromType[];
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [wallCopied, setWallCopied] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const handleWallCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setWallCopied(true);
    setTimeout(() => setWallCopied(false), 1000);
  };

  const handleScriptCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 1000);
  };

  const shareTo = (platform: string, url: string, title: string) => {
    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`;
    }
    window.open(shareUrl, "_blank");
  };

  const selectedForm = userForms.find((f) => f.id === selectedFormId);
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");
  const wallCode = selectedForm
    ? `<testimonial-wall
    form="${selectedForm.slug}"
    theme="light"
    layout="masonry"
    limit="10"
  />`
    : "";

  const scriptCode = `<script src="${baseUrl}/embed/testimonial-wall.js"></script>`;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline" asChild>
          <Link href="/forms/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Form
          </Link>
        </Button>
        <Button
          className="w-full justify-start"
          variant="outline"
          onClick={() => setShareModalOpen(true)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Share Form
        </Button>
        <Button
          className="w-full justify-start"
          variant="outline"
          onClick={() => setEmbedModalOpen(true)}
        >
          <Link2 className="mr-2 h-4 w-4" />
          Generate Code To Embed Testimonial Wall
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Activity className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </CardContent>
      <Modal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        title="Share Your Forms"
        description="Select a form to share via social media or copy its link."
      >
        <div className="space-y-4">
          {userForms.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No forms available.
            </div>
          ) : (
            userForms.map((form: FromType) => {
              const url = `${
                typeof window !== "undefined" ? window.location.origin : ""
              }/forms/${form.slug}`;
              const isCopied = copiedId === form.id;
              return (
                <div
                  key={form.id}
                  className="border rounded p-3 flex flex-col gap-2"
                >
                  <div className="font-medium">{form.title}</div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant={isCopied ? "default" : "outline"}
                      className={`relative transition-all duration-300 ${
                        isCopied ? "bg-green-500 text-white scale-105" : ""
                      }`}
                      onClick={() => handleCopy(url, form.id)}
                      disabled={isCopied}
                    >
                      {isCopied ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4 animate-bounce" /> Copied!
                        </span>
                      ) : (
                        "Copy Link"
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareTo("twitter", url, form.title)}
                    >
                      Twitter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareTo("facebook", url, form.title)}
                    >
                      Facebook
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareTo("linkedin", url, form.title)}
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Modal>
      <Modal
        open={embedModalOpen}
        onOpenChange={(open) => {
          setEmbedModalOpen(open);
          if (!open) setSelectedFormId(null);
        }}
        title="Get Embed Code for Testimonial Wall"
        description="Pick a form to generate its embed code."
      >
        <div className="space-y-4">
          {userForms.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No forms available.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {userForms.map((form) => (
                  <Button
                    key={form.id}
                    size="sm"
                    variant={selectedFormId === form.id ? "default" : "outline"}
                    className={
                      selectedFormId === form.id ? "bg-primary text-white" : ""
                    }
                    onClick={() => setSelectedFormId(form.id)}
                  >
                    {form.title}
                  </Button>
                ))}
              </div>
              {selectedForm && (
                <div className="mt-4 space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">Embed Code</label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border p-2 font-mono text-xs bg-muted resize-none"
                        rows={6}
                        value={wallCode}
                        readOnly
                      />
                      <Button
                        size="sm"
                        className={`absolute top-2 right-2 transition-all duration-300 ${
                          wallCopied ? "bg-green-500 text-white scale-105" : ""
                        }`}
                        onClick={() => handleWallCopy(wallCode)}
                        disabled={wallCopied}
                      >
                        {wallCopied ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4 animate-bounce" /> Copied!
                          </span>
                        ) : (
                          "Copy"
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Script Include
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border p-2 font-mono text-xs bg-muted resize-none"
                        rows={2}
                        value={scriptCode}
                        readOnly
                      />
                      <Button
                        size="sm"
                        className={`absolute top-2 right-2 transition-all duration-300 ${
                          scriptCopied
                            ? "bg-green-500 text-white scale-105"
                            : ""
                        }`}
                        onClick={() => handleScriptCopy(scriptCode)}
                        disabled={scriptCopied}
                      >
                        {scriptCopied ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4 animate-bounce" /> Copied!
                          </span>
                        ) : (
                          "Copy"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </Card>
  );
};
