import {create} from 'zustand'

interface AuthState{
    isAuthenticated: boolean,
    setIsAuthenticated: () => void,
    userId: string | undefined,
    setUserId: (userId: string) => void,
    userFullName: string | undefined,
    setUserFullName: (userFullName: string) => void
}

export const useAuth = create<AuthState>((set)=>({
    isAuthenticated: false,
    setIsAuthenticated: () => set((state: AuthState)=>({isAuthenticated: !state.isAuthenticated})),
    userId: undefined,
    setUserId: (userId)=> set(()=>({userId})),
    userFullName: undefined,
    setUserFullName: (userFullName: string) => set(()=>({userFullName}))
}))