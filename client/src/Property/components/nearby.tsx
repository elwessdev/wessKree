import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../API/property";
import PropertyItem from "../../Home/Properties/property-item";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Empty, Spin } from "antd";
import { forwardRef, useEffect, useState } from "react";


interface props {
    postId: string | undefined,
    postState: string | undefined,
    postCity: string | undefined,
}

const Nearby = forwardRef<HTMLDivElement,props>(({postId,postState,postCity}, ref)=>{
    // Properties
    const [properties,setProperies] = useState<any>(null);
    const {data,isLoading,error} = useQuery({
        queryFn: () => getProperties(),
        queryKey: ["properties"],
        refetchOnWindowFocus: true
        // staleTime: Infinity
    });

    useEffect(()=>{
        setProperies(data?.filter((item:any)=>((item?.state == postState && item?.city == postCity) || item?.state == postState) && item?._id != postId))
    },[postId,data])

    return (
        <div className="nearby" ref={ref}>
            <h1>Nearby Property</h1>
            <div className="items">
                {isLoading && (
                    <Spin size="large" />
                )}
                {/* {Array.isArray(properties) && properties.length > 0
                    ?(
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={3}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            >
                                {properties?.map((item:any,idx:number)=>(
                                        <SwiperSlide key={idx}>
                                            <PropertyItem key={idx} data={item} />
                                        </SwiperSlide>
                                    ))
                                }
                        </Swiper>
                    )
                    :(
                        <Empty description="Oops! No properties near this area." />
                    )
                } */}
                {Array.isArray(properties) && properties.length > 0
                    ?(
                        <div className="props">
                            {properties?.map((item:any,idx:number)=>(
                                <PropertyItem key={idx} data={item} />
                            ))}
                        </div>
                    )
                    :(
                        <Empty description="Oops! No properties near this area." />
                    )
                }
            </div>
        </div>
    )
})
export default Nearby;