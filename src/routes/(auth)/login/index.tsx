import { createFileRoute, Link} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLogin } from "@/hooks/auth.hooks";



export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, isError, error, mutate} = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = { email, password };
    mutate(credentials);
    setEmail("");
    setPassword("");
  };

  if (isPending) return <span>Loggin in...</span>;

  if (isError) return <span>Error on login: {error.response.data.message} </span>;


  return (
    <div>
      <Card className="w-[350px] ">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <form className="flex flex-col gap-6">
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your Email."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Your Password."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button
              onClick={(e) => handleLogin(e)}
              className="bg-blue-400 w-full hover:cursor-pointer hover:bg-white hover:border-solid hover:border-blue-400 hover:border-2 hover:text-blue-400"
            >
              Login
            </Button>
            <CardDescription>
              Don't have account?{" "}
              <Link to="/register" className="text-blue-400 underline">
                Click here.
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
