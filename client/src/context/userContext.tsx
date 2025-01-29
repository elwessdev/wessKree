import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
    state: string;
    city: string;
    isActive: boolean;
}
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userDetails: () => void
}
interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}:UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    // const navigate = useNavigate();

    const userDetails = async () => {
        try {
            const res = await axios.get<User>("/api/auth/getUser", { withCredentials: true });
            console.log("getUser: ", res.data);
            setUser(res.data);
        } catch (err) {
            console.log("getUser error:", err.response);
        }
    };

    useEffect(() => {
        userDetails();
    }, []);
    // useEffect(() => {
    //     if (user && !user.isActive) {
    //         navigate("/setup-profile");
    //         console.log("test");
    //     }
    // }, [user, navigate]);

    return (
    <UserContext.Provider value={{ user, setUser, userDetails }}>
        {children}
    </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);