import { login, logout, register } from "@/services/auth.api";
import { useAuth } from "@/store/auth.store";
import type { LoginCredentials, LoginResponse, RegisterInfo, RegisterResponse} from "@/types/auth.types";
import { type ErrorMessage } from "@/types/error.types";
import { useMutation} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";


export const useLogin = () => {
    const {setUserId, setUserFullName, setIsAuthenticated}  = useAuth()
    const navigate = useNavigate();
    return useMutation<LoginResponse, ErrorMessage, LoginCredentials>({
        mutationFn: (credentials: LoginCredentials):Promise<LoginResponse> => login(credentials),
        onSuccess: (data) => {
            setIsAuthenticated()
            setUserId(data.user._id)
            setUserFullName(data.user.fullname)
            navigate({
                to: '/'
            })
        },
        onError: (error: ErrorMessage) =>{
            return error
        }
    })
}

export const useLogout = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            setIsAuthenticated()
            sessionStorage.setItem("USER_TOKEN", "")
            navigate({
                to:'/login'
            })
        }
    })
}

export const useRegister = ()=>{
    const navigate = useNavigate();
    return useMutation<RegisterResponse, ErrorMessage, RegisterInfo>({
        mutationFn: (registerInfo: RegisterInfo)=> register(registerInfo),
        onSuccess: ()=>{
            navigate({
                to: '/login'
            })
        },
        onError: (error: ErrorMessage) =>{
            return error
        }
    })
}