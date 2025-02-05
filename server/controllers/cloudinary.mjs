import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    secure: true
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// Delete image
export const deleteCloudImg = async(req,res)=>{
    const { id } = req.params;
    try {
        const result = await cloudinary.uploader.destroy(id,{ invalidate: true });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
}