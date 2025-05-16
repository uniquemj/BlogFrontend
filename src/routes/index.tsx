import Post from "@/components/Post";
import { useGetAllPost } from "@/hooks/post.hooks";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, error, data } = useGetAllPost();
  const navigate = useNavigate();

  if (isPending) return <span>Fetching posts . . .</span>;
  if (isError) return <span>Error: {error.message}</span>;

  const handleRedirect = (params: string) => {
    navigate({
      to: "/post/$postId",
      params: { postId: params },
    });
  };
  return (
    <div className="px-9 grid md:grid-cols-2 xl:grid-cols-4 justify-center gap-5 ">
      {data.response.length > 0 ? (
        data.response.map((post) => (
          <div key={post._id} onClick={() => handleRedirect(post._id)}>
              <Post key={post._id} postBody={post} />
          </div>
        ))
      ) : (
        <h1 className="text-center col-span-4">Nothing to see here . . .</h1>
      )}
    </div>
  );
}
