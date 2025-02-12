import { useQuery } from "@tanstack/react-query";
import { memo } from "react"
import { getApplications } from "../../API/request";
import { Spin } from "antd";


const Applies = ()=>{
    const {data,isLoading,error} = useQuery({
        queryFn: () => getApplications(),
        queryKey: ["applications"],
        refetchOnWindowFocus: true
    })
    console.log(data);
    return (
        <div className="appliesList ll">
            {error && (
                <p>Error</p>
            )}
            {isLoading && (
                <Spin size="large" />
            )}
            {/* {data && (<>test</>)} */}
            {new Array(5).fill(0).map(()=>(
                    <div className="pp">
                        <img src="https://res.cloudinary.com/dvttfm7ns/image/upload/v1738786998/why-choose-mern-stack-for-developing-web-apps_r3ayho.webp" alt="osama img" />
                        <p>
                            <span>Osama11</span>
                            <span>Ask Question for test test</span>
                            {/* <span>Apply</span> */}
                        </p>
                </div>
            ))}
        </div>
    )
}
export default memo(Applies);