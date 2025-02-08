import { memo } from 'react';
import { Image } from 'antd';
import ViewMap from "./map";

type props = {
    imgs: {
        url: string,
        cloudId: string,
    }[],
    map: {
        lat: number,
        lng: number
    }
}

const Gallery = ({imgs,map}:props) => {
    return (
        <div className="gallery">
            <Image.PreviewGroup
                items={imgs.map(img=>img.url)}
            >
                <div className="main-image">
                    <Image src={imgs[0]?.url} alt="" />
                </div>
                <div className="top-image">
                    <Image src={imgs[1]?.url} alt="" />
                </div>
                <div className="bottom-images">
                    <div className="small-image">
                        <Image src={imgs[2]?.url} alt="" />
                    </div>
                    <div className="small-image">
                        <Image src={imgs[3]?.url} alt="" />
                    </div>
                </div>
            </Image.PreviewGroup>
            {map?.lat!=36.8065 && map?.lng!=10.1815 && <ViewMap map={map} /> }
        </div>
    )
}
export default memo(Gallery);