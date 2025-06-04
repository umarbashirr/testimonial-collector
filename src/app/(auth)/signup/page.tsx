import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { SignUpForm } from "../_components/signup-form";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Fill out the below in order to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-center text-muted-foreground">
          Already have any account?{" "}
          <Link href="/signin" className="text-indigo-500">
            Sign In Now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
