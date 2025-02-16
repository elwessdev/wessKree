import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id?: string;
    username?: string;
    publicName?: string;
    email?: string;
    photo?: string;
    state?: string;
    city?: string;
    isActive?: boolean;
    pfpId?:string;
    _id?: string;
    contact: {
        phone: string,
        whatsapp: string
    }
}
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userDetails: () => void,
    logout: () => void
}
interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: UserProviderProps) => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User|null>(null);
    const navigate = useNavigate();

    const userDetails = async () => {
        try {
            const res = await axios.get<User>(`${import.meta.env.VITE_API_URL}/user/getUser`);
            setUser(res.data);
            console.log("get user",res.data);
            if (res.data&&!res.data.isActive){
                navigate("/setup-profile");
            }
        } catch (err:any) {
            console.log("getUser error:", err.response?.data?.message);
            // navigate("/");
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`);
            if (res.status === 200) {
                queryClient.invalidateQueries({queryKey: ["homeProperties"]});
                setUser(null);
                navigate("/");
            }
        } catch (err:any) {
            console.log("logout error:", err.response);
        }
    };

    useEffect(() => {
        userDetails();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, userDetails, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}