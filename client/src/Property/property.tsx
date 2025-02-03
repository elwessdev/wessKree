import "./style.scss"
import { useParams } from "react-router-dom";
import Gallery from "./components/gallery.tsx";
import Title from "./title.tsx";
import Features from "./components/features.tsx";
import Owner from "./components/owner.tsx";
import About from "./components/about.tsx";
import Apply from "./components/apply.tsx";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { propertyDetails } from "../API/property.ts";


// Icons
// import { TbPhotoSquareRounded } from "react-icons/tb";


export default function Property(){
    const {id} = useParams();
    const {data,isLoading,error} = useQuery({
        queryFn: () => propertyDetails(id),
        queryKey: ["propertyDetails"],
        refetchOnWindowFocus: true
    })
    // console.log(data);
    return (
        <div id="property">
            {error && <h1>There is an error to load property details</h1>}
            {isLoading && (
                <Spin size="large" />
            )}
            {data && (
                <>
                    <Title 
                        title={data?.title}
                        state={data?.state}
                        city={data?.city}
                        neighborhood={data?.neighborhood}
                        zip={data?.zip}
                    />
                    <Gallery
                        imgs={data?.imgs}
                    />
                    <div className="btm-prt">
                        <div className="details">
                            <About
                                area={`${data?.area.width}x${data?.area.length}`}
                                furnishing={data?.furnishingStatus}
                                category={data?.category}
                                status={"active"}
                                description={data?.description}
                            />
                            <Owner
                                user={data?.user}
                            />
                            <div className="line"></div>
                            <Features
                                features={data?.features}
                            />
                        </div>
                        <Apply />
                    </div>
                </>
            )}
        </div>
    )
}