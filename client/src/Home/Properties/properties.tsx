import "./style.scss"
import Filter from "../Filter/filter"
import PropertyItem from "./property-item"
import { useQuery } from "@tanstack/react-query";
import { Empty, Spin } from "antd";
import { getProperties } from "../../API/property";
import { useEffect, useRef, useState } from "react";

export default function Properties(){
    const searchRef = useRef();
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [filterList, setFilterList] = useState<any>(null);

    // Properties
    const {data:properties,isLoading,error} = useQuery({
        queryFn: () => getProperties(),
        queryKey: ["properties"],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    });

    const handleSearch = () => {
        const {filter}:any = searchRef.current;
        const activeFilters = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== null)
        );
        if(Object.entries(activeFilters).length){
            // console.log(activeFilters);
            // console.log(properties);
            setLoadingSearch(true);
            setFilterList(properties.filter((item:any) => {
                return Object.entries(activeFilters).every(([key, value]) => {
                    if(key=="category"){
                        // console.log(item["category"].includes(value));
                        return item["category"].includes(value);
                    }
                    if (Array.isArray(value)) {
                        if (key === "price") {
                            return item.price >= value[0] && item.price <= value[1];
                        }
                        return value.includes(item[key]);
                    }
                    return item[key] === value;
                });
            }));
            setTimeout(()=>setLoadingSearch(false),100);
        }
    }

    const handleReset = () => {
        if(filterList){
            setLoadingSearch(true);
            const {setFilter}:any = searchRef.current;
            setFilter({
                state: null,
                city: null,
                type: null,
                price: null,
                rooms: null,
                category: null
            })
            setFilterList(null);
            setTimeout(()=>setLoadingSearch(false),100);
        }
    }
    
    return (
        <div id="properties">
            <Filter sRef={searchRef} onClick={handleSearch} onReset={handleReset}/>
            <div className="items">
                {(isLoading || loadingSearch) && (
                    <Spin size="large" />
                )}
                {error && <h1>There is an error to load items</h1>}
                {(!loadingSearch&&filterList==null) && properties?.map((property:any,idx:number)=>(
                    // <Skeleton loading={isLoading} active avatar>
                        <PropertyItem key={idx} data={property} />
                    // </Skeleton> 
                ))}
                {(!loadingSearch&&filterList!=null) &&
                    filterList?.map((property:any,idx:number)=>(
                        // <Skeleton loading={isLoading} active avatar>
                            <PropertyItem key={idx} data={property} />
                        // </Skeleton> 
                    ))
                }
                {(!loadingSearch&&(filterList?.length==0||properties?.length==0))&&
                    <Empty description="we couldn't find anything matching your filters" />
                }
            </div>
        </div>
    )
}