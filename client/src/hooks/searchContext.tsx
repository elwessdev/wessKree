import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface props {
    children: ReactNode;
}

const searchContext = createContext<any>(null);

export const SearchProvider = ({ children }:props) => {
    const [globalSearch, setGlobalSearch] = useState<any>(null);
    return (
        <searchContext.Provider value={{ globalSearch, setGlobalSearch }}>
            {children}
        </searchContext.Provider>
    );
};
export const useSearch = ()=>{
    const context = useContext(searchContext);
    if (!context) {
        throw new Error("useSearch must be used within a searchProvider");
    }
    return context;
}