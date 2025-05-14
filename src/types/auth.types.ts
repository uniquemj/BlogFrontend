
export interface LoginCredentials{
    email: string,
    password: string
}

export interface RegisterInfo{
    fullname: string,
    email: string,
    password: string
}

export interface UserResponse{
    _id: string,
    fullname: string,
    email: string
}

export interface LoginResponse{
    message: string,
    token: string,
    user: UserResponse
}

export interface RegisterResponse{
    message: string,
    response: UserResponse
}