export interface PostResponse<T>{
    message: string,
    response: T
}

export interface AuthorInfo{
    _id: string,
    fullname: string
}

export interface PostInfo{
    _id: string,
    headline: string,
    image: string,
    author: AuthorInfo,
    articleBody: string,
    createdAt: Date,
    updatedAt: Date
}