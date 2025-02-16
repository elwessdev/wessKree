import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react"
import { getApplications } from "../../API/request";
import { Empty, Spin } from "antd";
import { useUser } from "../../hooks/userContext";

// Icons
import { FaMapPin } from "react-icons/fa6";
import { formatDistance } from "date-fns";
import { MdAccessTimeFilled } from "react-icons/md";


type props = {
    openChat: any
}

const Tour = ({openChat}:props)=>{
    const {user} = useUser();
    const queryClient = useQueryClient();
    const [appSelected, setAppSelected]=useState<any>(null);
    const {data,isLoading,error} = useQuery({
        queryFn: () => getApplications("tour"),
        queryKey: ["tours"],
        refetchOnWindowFocus: true
    });

    useEffect(()=>{
        setAppSelected(null);
    },[]);

    const appls = data?.data;
    return (
        <div className="appliesList ll">
            {error && (
                <p>Error</p>
            )}
            {isLoading && (
                <Spin size="large" />
            )}
            {data?.data && data?.data?.length>0 && appls?.map((app:any,idx:number)=>(
                <div 
                    className={appSelected==app?._id ?"pp active" :"pp"}
                    key={idx} 
                    onClick={()=>{
                        openChat(app?._id);
                        setAppSelected(app?._id);
                        queryClient.invalidateQueries({queryKey: ["tours"]});
                    }}
                >
                    <img src={app?.property?.imgs[0].url} alt={app?.property?.title} />
                    <p>
                        <span>{app?.property?.title}</span>
                        <span className="add"><FaMapPin />{app?.property?.city}, {app?.property?.state}</span>
                        <span className="add"><MdAccessTimeFilled />{formatDistance(new Date(app?.createdAt), new Date(), { addSuffix: true }).replace("about ", "")}</span>
                        {app?.owner?.username === user?.username &&
                            <span className="tg">My Property</span>
                        }
                    </p>
                </div>
            ))
        }
        {data?.data && data?.data?.length==0 && <Empty description="You don't have tours yet" />}
        </div>
    )
}
export default memo(Tour);