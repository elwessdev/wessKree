import "./style.scss"
import Filter from "../Filter/filter"
import PropertyItem from "./property-item"
import { useQuery } from "@tanstack/react-query";
import { Affix, Empty, Spin } from "antd";
import { getProperties } from "../../API/property";
import { useRef, useState } from "react";

export default function Properties(){
    const searchRef = useRef();
    // const [top, setTop] = useState<number>(100);
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
        if (!searchRef.current) return;
        const {filter}:any = searchRef.current;
        const activeFilters = Object.fromEntries(
            Object.entries(filter).filter(([_, value]) => value !== null)
        );
        // console.log(activeFilters);
        if(Object.entries(activeFilters).length){
            setLoadingSearch(true);
            setFilterList(properties.filter((item:any) => {
                return Object.entries(activeFilters).every(([key, value]) => {
                    if (key === "category") {
                        return item["category"]?.includes(value);
                    }
                    if (Array.isArray(value)) {
                        if (key === "price") {
                            return Object.values(item.price).some((price) => {
                                return Number(price) >= value[0] && Number(price) <= value[1];
                            });
                        }
                        return value.includes(item[key]);
                    }
                    return item[key] === value;
                });
            }));
            setTimeout(()=>setLoadingSearch(false),150);
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
                price: [0,5000],
                rooms: null,
                category: null
            })
            setFilterList(null);
            setTimeout(()=>setLoadingSearch(false),150);
        }
    }
    
    return (
        <div id="properties">
            <Affix offsetTop={0} style={{width:"100%"}}>
                <Filter sRef={searchRef} onClick={handleSearch} onReset={handleReset}/>
            </Affix>
            <div className="items">
                {(isLoading || loadingSearch) && (
                    <Spin size="large" />
                )}
                {error && (
                    <h1>There is an error to load Properties</h1>
                )}
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