import "./style.scss"
import Filter from "../Filter/filter"
import PropertyItem from "./property-item"
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Spin } from "antd";
import { getProperties } from "../../API/home";

export default function Properties(){
    const {data:properties,isLoading,error} = useQuery({
        queryFn: () => getProperties(),
        queryKey: ["properties"],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    })
    return (
        <div id="properties">
            <Filter />
            <div className="items">
                {isLoading && (
                    <Spin size="large" />
                )}
                {error && <h1>There is an error to load items</h1>}
                {properties?.map((property:any,idx:number)=>(
                    // <Skeleton loading={isLoading} active avatar>
                        <PropertyItem key={idx} data={property} />
                    // </Skeleton> 
                ))}
            </div>
        </div>
    )
}