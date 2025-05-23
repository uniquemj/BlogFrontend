import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import PostDetail from "@/components/PostDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/validations/post.validate";
import { useCreatePost } from "@/hooks/post.hooks";

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      headline: "",
      image: "",
      description: "",
      articleBody: "",
    },
    resolver: zodResolver(postSchema),
  });

  const { isPending, mutate } = useCreatePost();
  const postInfo = watch();
  const handleRedirect = () => {
    navigate({
      to: "/",
    });
  };

  if (isPending) return <span>Creating . . .</span>;
  return (
    <div className="grid grid-cols-2 w-full">
      <div className="flex justify-center">
        <Card className="w-4/5 h-[550px]">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>Write Your Thoughts. . .</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit((data) => {
                mutate(data);
              })}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    {...register("headline")}
                    id="headline"
                    placeholder="Headline of your Post"
                  />
                  {errors.headline ? (
                    <p className="text-red-400">* {errors.headline.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    {...register("image")}
                    id="image"
                    placeholder="Image URL for image."
                  />
                  {errors.image ? (
                    <p className="text-red-400">* {errors.image.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">
                    Description{" "}
                    <span className="text-gray-400">{`(optional)`}</span>
                  </Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    placeholder="Type your post description"
                  />
                  {errors.description ? (
                    <p className="text-red-400">
                      * {errors.description.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="articleBody">Body</Label>
                  <Textarea
                    {...register("articleBody")}
                    id="articleBody"
                    placeholder="Type your post body"
                  />
                  {errors.articleBody ? (
                    <p className="text-red-400">
                      * {errors.articleBody.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
              <CardFooter className="flex justify-between">
                <Button onClick={() => handleRedirect()} variant="outline">
                  Back to Home
                </Button>
                <Button onClick={() => console.log("hello")} type="submit">
                  Create
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center  flex-col">
        <h1 className="font-bold text-2xl">Preview of your post:</h1>
        <PostDetail postInfo={postInfo} />
      </div>
    </div>
  );
}
