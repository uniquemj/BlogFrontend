import { login, logout, register } from "@/services/auth.api";
import { useAuth } from "@/store/auth.store";
import type { LoginCredentials, LoginResponse, RegisterInfo, RegisterResponse} from "@/types/auth.types";
import { type ErrorMessage } from "@/types/error.types";
import { useMutation} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";


export const useLogin = () => {
    const {setUserId, setUserFullName, setIsAuthenticated}  = useAuth()
    const navigate = useNavigate();
    return useMutation<LoginResponse, ErrorMessage, LoginCredentials>({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onSuccess: (data) => {
            setIsAuthenticated()
            setUserId(data.user._id)
            setUserFullName(data.user.fullname)
            navigate({
                to: '/'
            })
            toast.success(`Welcome to BlogSansar`, {duration: 1500})
        },
        onError: (error: ErrorMessage) =>{
            toast.error(error.response.data.message)
        }
    })
}

export const useLogout = () => {
    const { setUserId, setUserFullName, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            setIsAuthenticated()
            sessionStorage.setItem("USER_TOKEN", "")
            setUserFullName("")
            setUserId("")
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
            toast.success("User Registered Successfully")
        },
        onError: (error: ErrorMessage) =>{
            toast.error(error.response.data.message)
        }
    })
}