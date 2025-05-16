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
import { updatePostSchema } from "@/validations/post.validate";
import { useUpdatePost } from "@/hooks/post.hooks";
import { getPostById } from "@/services/post.api";

export const Route = createFileRoute("/post/update/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { postId } = Route.useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: async () => {
      const data = await getPostById(postId);
      return {
        headline: data.response.headline,
        image: data.response.image,
        description: data.response.description,
        articleBody: data.response.articleBody,
      };
    },
    resolver: zodResolver(updatePostSchema),
  });

  const { isPending, mutate } = useUpdatePost();
  const postInfo = watch();

  const handleRedirect = () => {
    navigate({
      to: "/",
    });
  };

  if (isPending) return <span>Updating . . .</span>;
  return (
    <div className="grid grid-cols-2 w-full">
      <div className="flex justify-center">
        <Card className="w-4/5 h-[550px]">
          <CardHeader>
            <CardTitle>Update Post</CardTitle>
            <CardDescription>Write Your Thoughts. . .</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit((data) => {
                mutate({ postId, data });
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
                  Update
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
