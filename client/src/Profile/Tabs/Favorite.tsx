import { memo } from "react"
import { favorite } from "../../API/user"
import { useQuery } from "@tanstack/react-query";
import PropertyItem from "../../Home/Properties/property-item";
import { Empty, message, Spin, Typography } from 'antd';
import { useUser } from "../../context/userContext";

type props = {
    username?:string
}

const Favorite = () => {
    const {user}:any = useUser();
    // Properties
    const { data, isLoading, error } = useQuery({
        queryFn: () => favorite(),
        queryKey: ["myFavorite",user],
        refetchOnWindowFocus: true,
    });
    // console.log(data);
    
    return (
        <div className="porps">
            {isLoading && (
                <Spin size="large" />
            )}
            {data?.length==0 && (
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    styles={{ image: { height: 60 } }}
                    description={
                        <Typography.Text>
                            You haven't added any favorite properties yet.
                        </Typography.Text>
                    }
                    >
                </Empty>
            )}
            {data?.length > 0 && data?.map((property:any,idx:number)=>(
                <PropertyItem data={property} key={idx} page="ownerFav" />
            ))}
        </div>
    )
}
export default memo(Favorite)