import { getSession } from "@/app/(protected)/(routes)/forms/actions";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Header = async () => {
  const session = await getSession();

  return (
    <div className="m-2 border bg-transparent backdrop-blur-sm rounded-xl p-4 w-full container max-w-7xl mx-auto flex items-center justify-between">
      <Link href="/" className="font-bold text-lg capitalize">
        Review Snap
      </Link>
      <nav className="flex items-center gap-4">
        <Link className="font-semibold capitalize" href="/">
          Home
        </Link>
        <Link className="font-semibold capitalize" href="/">
          Features
        </Link>
        <Link className="font-semibold capitalize" href="/">
          Pricing
        </Link>
        <Link className="font-semibold capitalize" href="/">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {session ? (
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/signin">Login</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
