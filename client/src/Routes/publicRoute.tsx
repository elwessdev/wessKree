import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";

type props = PropsWithChildren;

export default function PublicRoute({children}:props){
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user!=null){
            if(user?.isActive==true){
                navigate("/setup-profile",{replace:true});
            }
            if(user?.username){
                navigate("/",{replace:true});
            }
        }
    },[navigate,user]);
    
    return children;
}