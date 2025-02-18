import { memo } from "react"
import { userProperties } from "../../API/user"
import { useQuery } from "@tanstack/react-query";
import PropertyItem from "../../Home/Properties/property-item";
import { Badge, Empty, Spin, Typography } from 'antd';
import { NavLink } from "react-router-dom";

type props = {
    username?:string
}

const MyProperty = ({username}:props) => {

    // Properties
    const { data, isLoading, error } = useQuery({
        queryFn: () => userProperties(username),
        queryKey: ["MyProperties", username],
        enabled: !!username
        // refetchOnWindowFocus: true,
    });
    console.log(data);
    
    return (
        <div className="porps">
            {error && (
                <h3>Something wrong, Refresh page</h3>
            )}
            {isLoading && (
                <Spin size="large" />
            )}
            {(data?.length==0) && (
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    styles={{ image: { height: 60 } }}
                    description={
                        <Typography.Text>
                            No properties listed yet. Ready to showcase your first property?
                        </Typography.Text>
                    }
                    >
                    <NavLink type="primary" to={"/post-property"}>Post now</NavLink>
                </Empty>
            )}
            {(data?.length>0) && data?.map((property:any,idx:number)=>
                (
                    <PropertyItem data={property} page="owner" key={idx} />
                )
            )}
        </div>
    )
}
export default memo(MyProperty)