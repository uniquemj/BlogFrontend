import type { PostInfo} from '@/types/post.types'
import type {ColumnDef} from '@tanstack/react-table'
import Dropdown from '@/components/Dropdown'



export const columns: ColumnDef<PostInfo>[] = [
    {
        accessorKey: "headline",
        header: "Headline",
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({row}) =>{
            const imageurl = row.original.image
            return (
                <img src = {imageurl} className='w-[100px] h-[100px]'/>
            )
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) =>{
            const description = row.original.description
            return (
                <p>{description? description.slice(0, 20): ""} . . .</p>
            )
        }
    },
    {
        accessorKey: "articleBody",
        header: "Body",
        cell: ({row}) => {
            const articleBody = row.original.articleBody
            return (
                <p>{articleBody.slice(0, 50)} . . .</p>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            
            const post = row.original
            return(
                <>
                    <Dropdown id ={post._id}/>
                </>
            )
        }
    }
]