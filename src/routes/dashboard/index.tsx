import { createFileRoute } from '@tanstack/react-router'
import {columns} from '@/components/columns';
import { useOwnPost } from '@/hooks/post.hooks';
import { DataTable } from '@/components/data-table';
import type { PostInfo } from '@/types/post.types';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isPending, data} = useOwnPost()

  if(isPending) return <h1>Fetching your post . . .</h1>
  return (
    <div className='container mx-10 py-10'>
      <DataTable columns={columns} data={data?.response as PostInfo[]} />
    </div>
  )
}
