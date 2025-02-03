import { memo } from 'react';
import { Image } from 'antd';

type props = {
    imgs: {
        url: string,
        cloudId: string,
    }[]
}

const Gallery = ({imgs}:props) => {
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
            {/* <Button>
                <TbPhotoSquareRounded /> View all photos
            </Button> */}
        </div>
    )
}
export default memo(Gallery);