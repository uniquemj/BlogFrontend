import { useGetPostById } from '@/hooks/post.hooks'
import { createFileRoute} from '@tanstack/react-router'
import PostDetail from '@/components/PostDetail'
import type { PostInfo } from '@/types/post.types'

export const Route = createFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  const {isPending, data} = useGetPostById(postId)


  if(isPending) return <span>Loading post . . .</span>

  return(
    <>
      <PostDetail postInfo={data?.response as PostInfo}/>
    </>
  )
}
