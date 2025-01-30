import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"

type props = ReactNode;

export default function AuthProtection({children}:props){
    const {user} = useUser();
    const navigate = useNavigate();
    return user?.isActive ?{children} :navigate("/"); 
}