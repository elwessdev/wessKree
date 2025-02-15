import { memo } from "react"
import { favorite } from "../../API/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropertyItem from "../../Home/Properties/property-item";
import { Empty, message, Spin, Typography } from 'antd';
import { useUser } from "../../hooks/userContext";
import { deleteFav } from "../../API/user";



const Favorite = () => {
    const {user}:any = useUser();
    const queryClient = useQueryClient();
    // Properties
    const { data, isLoading, error } = useQuery({
        queryFn: () => favorite(),
        queryKey: ["myFavorite",user],
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
    // console.log(data);

    const mutationDel = useMutation({
        mutationFn: deleteFav,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myFavorite'] });
            message.success("Unfavorite Done!");
        },
        onError: () => {
            message.error("Something went wrong, Try again");
        },
    });
    const removeFavorite = async(id:string) => mutationDel.mutate(id);
    
    return (
        <div className="porps">
            {isLoading && (
                <Spin size="large" />
            )}
            {error && (
                <h3>Something wrong, Refresh page</h3>
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
                <PropertyItem data={property} key={idx} page="ownerFav" delFavBtn={removeFavorite} />
            ))}
        </div>
    )
}
export default memo(Favorite)