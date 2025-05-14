import type { PostInfo, PostResponse } from "@/types/post.types"
import { api } from "@/utils/api"


export const getAllPosts = async() =>{
    const response = await api.get<PostResponse<PostInfo[]>>('/posts')
    return response.data 
}

export const getPostById = async(params: string) =>{
    const response = await api.get<PostResponse<PostInfo>>(`/posts/${params}`)
    return response.data
}

export const createPost = async(postInfo: Omit<PostInfo, '_id createdAt updatedAt author'>) =>{
    const response = await api.post<PostResponse<PostInfo>>(`/posts`, postInfo, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.data
}

export const updatePost = async(id: string, updateInfo: Partial<Omit<PostInfo, '_id createdAt updatedAt author'>>) =>{
    const response = await api.put<PostResponse<PostInfo>>(`/posts/${id}`, updateInfo, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.data
}

export const deletePost = async(id: string) =>{
    const response = await api.delete<PostResponse<PostInfo>>(`/posts/${id}`)
    return response.data
}

export const getOwnPosts = async() =>{
    const response = await api.get<PostResponse<PostInfo>>(`/posts/own`)
    return response.data
}