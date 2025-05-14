import Post from '@/components/Post'
import { useGetAllPost } from '@/hooks/post.hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, isError, error, data} = useGetAllPost()

  if(isPending) return <span>Fetching posts . . .</span>
  if(isError) return <span>Error: {error.message}</span>

  return (
    <>
      {/* {data.response.map((post) =>{

      })} */}
      <Post/>
    </>
  )
}
