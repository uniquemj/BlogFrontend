import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { PostInfo } from "@/types/post.types";

const Post = ({ postBody }: { postBody: PostInfo }) => {
  const createdAt = `${postBody.createdAt}`.split("T")[0];
  return (
    <>
      <Card className="flex flex-col gap-9 hover:bg-[#e2e2e2] h-[450px]">
        <CardContent className="w-full">
          <div className="pb-4 w-full">
            <img
              src={`${postBody.image}`}
              className="w-full object-fill rounded-[0.8rem] h-[200px]"
            />
          </div>
          <CardTitle className="text-xl pb-3">{postBody.headline.slice(0,8)} . . .</CardTitle>
          <CardDescription className="w-full">
            {postBody.articleBody.slice(0, 20)}. . .
          </CardDescription>
          <div className="w-full flex justify-center items-center py-5">
            <div className="w-full bg-[rgba(0,0,0,0.2)] h-[0.1rem] rounded-3xl "></div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-start flex-col ">
              <h1>Author:</h1>
              <h2>{postBody.author.fullname}</h2>
            </div>

            <div className="flex flex-col items-end ">
              <h1>Posted At:</h1>
              <h2>{`${createdAt}`}</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Post;
