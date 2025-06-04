import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.session && session.session.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
