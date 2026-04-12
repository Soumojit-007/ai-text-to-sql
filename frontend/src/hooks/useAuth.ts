import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () =>{
    const {token , setToken ,logout} = useAuthStore();

    return{
        isAuthenticated: !!token,
        token,
        login: setToken,
        logout,
    }
}