import { getAllPosts, getOwnPosts, getPostById } from "@/services/post.api"
import { useAuth } from "@/store/auth.store"
import {useQuery } from "@tanstack/react-query"

export const useGetAllPost = () =>{
    return useQuery({
        queryKey: ['posts'],
        queryFn: ()=>getAllPosts()
    })
}

export const useGetPostById = (id: string) =>{
    return useQuery({
        queryKey: ['posts', id],
        queryFn: ()=>getPostById(id)
    })
}

export const useOwnPost = () =>{
    const {userId} = useAuth()
    return useQuery({
        queryKey: ['posts',userId],
        queryFn: ()=>getOwnPosts()
    })
}