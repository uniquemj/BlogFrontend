import type { PostInfo } from "@/types/post.types";

const PostDetail = ({ postInfo }: { postInfo: Partial<PostInfo> }) => {
  return (
    <div className="w-4/5">
      <div className="flex justify-center">
        <img src={postInfo.image} className="w-full h-[350px]" />
      </div>
      <div className="w-full py-6 grid grid-cols-3 items-center ">
        <h1 className="font-bold text-5xl leading-[3rem] col-span-2 ">{postInfo.headline}</h1>
        <div className="flex justify-end">
          <h1>By: {postInfo?.author?.fullname}</h1>
        </div>
      </div>
      <div className="py-4 leading-2">
        {postInfo.description ? (
          <div className="pb-6">
            <p className="text-gray-400 leading-6">"{postInfo.description}"</p>
          </div>
        ) : (
          ""
        )}
        <p className="leading-6">{postInfo.articleBody}</p>
      </div>
    </div>
  );
};

export default PostDetail;
