import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "../_components/signin-form";
import Link from "next/link";

const SignInPage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Fill out the below in order to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-center text-muted-foreground">
          Don&lsquo;t have any account?{" "}
          <Link href="/signup" className="text-indigo-500">
            Create Now
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
