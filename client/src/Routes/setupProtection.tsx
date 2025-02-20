import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/userContext";

type props = PropsWithChildren;

export default function SetupProtection({children}:props){
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user===null){
            navigate("/",{replace:true});
        }
    },[navigate,user]);

    return children;
}