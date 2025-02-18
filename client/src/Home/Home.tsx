
import { useEffect } from "react";
import Header from "./Header/header";
import Properties from "./Properties/properties";
import { useLocation } from "react-router-dom";
import { useSearch } from "../hooks/searchContext";

function Home() {
    const {setGlobalSearch} = useSearch();
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname === "/search"){
            setGlobalSearch(null);
        }
    },[location]);
    return (
        <div id="home-page">
            {location.pathname!="/search" && <Header /> }
            <Properties />
        </div>
    );
}

export default Home;
