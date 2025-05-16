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
import { useRegister } from "@/hooks/auth.hooks";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "@/validations/auth.validate";

export const Route = createFileRoute("/(auth)/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(registerUserSchema)
  })
  const { isPending, mutate} = useRegister();

  if (isPending) return <span>Loggin in...</span>;
  
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px] ">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl">Create an Account.</CardTitle>
        </CardHeader>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit((data)=>{
          mutate(data)
        })}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname">FullName</Label>
                <Input
                  type="text"
                  {...register("fullname")}
                  placeholder="Your Fullname"
                />
                {errors.fullname?<p className="text-red-400">{errors.fullname.message}</p>: ""}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="Your Email."
                />
                {errors.email?<p className="text-red-400">{errors.email.message}</p>: ""}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="Your Password."
                />
                {errors.password? <p className="text-red-400">{errors.password.message}</p>:""}
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button type="submit"
              className="bg-blue-400 w-full hover:cursor-pointer hover:bg-white hover:border-solid hover:border-blue-400 hover:border-2 hover:text-blue-400"
            >
              Create
            </Button>
            <CardDescription>
              Already Have account?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Click here.
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
