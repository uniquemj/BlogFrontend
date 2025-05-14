import { type RegisterResponse, type LoginCredentials, type LoginResponse, type RegisterInfo } from "@/types/auth.types";
import { api } from "@/utils/api";



export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {

    const response = await api.post<LoginResponse>('/auth/login', credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    sessionStorage.setItem("USER_TOKEN", response.data.token)
    return response.data
}

export const register = async (registerInfo: RegisterInfo) => {
    const response = await api.post<RegisterResponse>('/auth/register', registerInfo, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response.data
}

export const logout = async () => {
    return await api.post<Omit<RegisterResponse, 'response'>>('/auth/logout')
}