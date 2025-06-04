import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const IndexPage = () => {
  return (
    <div>
      <div className="landing-hero flex items-center flex-col justify-center py-32 w-full container max-w-3xl text-center mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          Collect Testimonials That Build Trust
        </h1>
        <p className="text-base md:text-lg mt-4">
          Turn client feedback into powerful social proof — without the
          follow-up hassle. Create a form, share the link, and showcase
          testimonials anywhere.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <Button asChild>
            <Link href="/signup">Start Collecting Free</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/features">Our Features</Link>
          </Button>
        </div>
        <ul className="mt-4 flex items-center gap-4 text-sm text-muted-foreground font-medium">
          <li>No Credit Card Required</li>
          <li>Collect client testimonials easily</li>
          <li>Custom-branded forms</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
