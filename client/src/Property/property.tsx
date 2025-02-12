import "./style.scss"
import { useParams } from "react-router-dom";
import Gallery from "./components/gallery.tsx";
import Title from "./components/title.tsx";
import Features from "./components/features.tsx";
import Owner from "./components/owner.tsx";
import About from "./components/about.tsx";
import Apply from "./components/apply.tsx";
import { Affix, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { propertyDetails } from "../API/property.ts";
import Nearby from "./components/nearby.tsx";
import { useEffect, useRef, useState } from "react";


// Icons
// import { TbPhotoSquareRounded } from "react-icons/tb";


export default function Property(){
    const {id}:any = useParams();
    const nearRef = useRef<any>(null);

    const [loading,setLoading]=useState<boolean>();
    const {data,isLoading,error} = useQuery({
        queryFn: () => propertyDetails(id),
        queryKey: ["propertyDetails",id],
        enabled: !!id,
        // refetchOnWindowFocus: true
    })
    useEffect(()=>{
        // console.log(data);
        setLoading(true);
        const load = setTimeout(()=>setLoading(false),200);
        return () => {
            clearTimeout(load);
        }
    },[id,data]);

    const scrollToNear = () => {
        nearRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div id="property">
            {error && <h1>There is an error to load property details</h1>}
            {isLoading||loading && (
                <Spin size="large" />
            )}
            {data&&!loading && (
                <>
                    <Title 
                        title={data?.title}
                        createdAt={data?.createdAt}
                        state={data?.state}
                        city={data?.city}
                        neighborhood={data?.neighborhood}
                        zip={data?.zip}
                        username={data?.user?.username}
                        id={data?._id}
                        scrollToNear={scrollToNear}
                    />
                    <Gallery
                        imgs={data?.imgs}
                        map={data?.map}
                    />
                    <div className="btm-prt">
                        <div className="details">
                            <About
                                area={`${data?.area?.width}x${data?.area?.length}`}
                                furnishing={data?.furnishingStatus}
                                category={data?.category}
                                status={"active"}
                                description={data?.description}
                                type={data?.type}
                                rooms={data?.rooms}
                                bedrooms={data?.bedrooms}
                                bathrooms={data?.bathrooms}
                                kitchen={data?.kitchen}
                            />
                            <Features
                                features={data?.features}
                            />
                            <Owner
                                userInfo={data?.user}
                            />
                            <div className="line"></div>
                            <Nearby
                                ref={nearRef}
                                postId={data?._id}
                                postState={data?.state}
                                postCity={data?.city}
                            />
                        </div>
                        <Affix offsetTop={10}>
                            <Apply
                                price={Object.entries(data?.price)}
                                id={data?._id}
                                name={data?.user?.publicName}
                            />
                        </Affix>
                    </div>
                </>
            )}
        </div>
    )
}