import { memo } from 'react';
import { Image } from 'antd';


const Gallery = () => {
    return (
        <div className="gallery">
            <Image.PreviewGroup
                items={[
                'https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fs9edvqq08p8s4wpet38xc1aqe4i215&option=N&h=472&permitphotoenlargement=false',
                'https://imagescdn.homes.com/i2/L2eusQGotou75jF6c_mFcQ5wSXVL_wiwzk6ig_6qGqA/111/3201-overland-ave-los-angeles-ca-primaryphoto.jpg?p=1',
                'https://cdn.vox-cdn.com/thumbor/898j2hZdnl2L_53peT0V5aaqXj4=/0x0:833x529/1400x1050/filters:focal(351x199:483x331):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56221709/ISah33hip2p9b80000000000.0.jpg',
                "https://photos.zillowstatic.com/fp/e69878b5870c3c4d2bdec71df6e5ac21-p_e.jpg"
                ]}
            >
                <div className="main-image">
                    <Image src="https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fs9edvqq08p8s4wpet38xc1aqe4i215&option=N&h=472&permitphotoenlargement=false" alt="3" />
                </div>
                <div className="top-image">
                    <Image src="https://imagescdn.homes.com/i2/L2eusQGotou75jF6c_mFcQ5wSXVL_wiwzk6ig_6qGqA/111/3201-overland-ave-los-angeles-ca-primaryphoto.jpg?p=1" alt="2" />
                </div>
                <div className="bottom-images">
                    <div className="small-image">
                        <Image src="https://cdn.vox-cdn.com/thumbor/898j2hZdnl2L_53peT0V5aaqXj4=/0x0:833x529/1400x1050/filters:focal(351x199:483x331):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56221709/ISah33hip2p9b80000000000.0.jpg" alt="1" />
                    </div>
                    <div className="small-image">
                        <Image src="https://photos.zillowstatic.com/fp/e69878b5870c3c4d2bdec71df6e5ac21-p_e.jpg" alt="4" />
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