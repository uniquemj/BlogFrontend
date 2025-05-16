import { createPost, deletePost, getAllPosts, getOwnPosts, getPostById, updatePost } from "@/services/post.api"
import type { ErrorMessage } from "@/types/error.types"
import type { PostInfo, PostInput, PostResponse } from "@/types/post.types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"



export const useGetAllPost = () => {
    return useQuery<PostResponse<PostInfo[]>, ErrorMessage>({
        queryKey: ['posts'],
        queryFn: () => getAllPosts()
    })
}

export const useGetPostById = (id: string) => {
    return useQuery<PostResponse<PostInfo>, ErrorMessage>({
        queryKey: ['posts', id],
        queryFn: () => getPostById(id)
    })
}

export const useOwnPost = () => {
    return useQuery<PostResponse<PostInfo[]>, ErrorMessage>({
        queryKey: ['posts', 'own'],
        queryFn: () => getOwnPosts(),
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation<PostResponse<PostInfo>, ErrorMessage, PostInput>({
        mutationFn: (postInfo: PostInput) => createPost(postInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            navigate({
                to: '/'
            })
            toast.success("Post created successfully.")
        },
        onError: (error: ErrorMessage) => {
            toast.error(error.response.data.message)
        }
    })
}


export const useUpdatePost = () => {
    const navigate = useNavigate()
    return useMutation<PostResponse<PostInfo>, ErrorMessage, { postId: string, data: Partial<PostInput> }>({
        mutationFn: ({ postId, data }) => updatePost(postId, data),
        onSuccess: () => {
            navigate({
                to: '/dashboard'
            })
            toast.success("Post Updated.")
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation<PostResponse<PostInfo>, ErrorMessage, string>({
        mutationFn: (id: string) => deletePost(id),
        onSuccess: () =>{
            toast.success("Post deleted.")
            console.log("Refetching ['posts', 'own']")
            queryClient.invalidateQueries({queryKey: ['posts', 'own']})
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}