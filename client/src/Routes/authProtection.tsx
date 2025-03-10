import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";

type props = PropsWithChildren;

export default function AuthProtection({children}:props){
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user===null){
            navigate("/",{replace:true});
        }
        if(user && !user?.isActive==true){
            navigate("/setup-profile",{replace:true});
        }
    },[navigate,user]);

    return children;
}