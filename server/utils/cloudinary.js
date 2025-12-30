import {v2 as cloudinary} from 'cloudinary';

// configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (file, folderName) => {
    const result = cloudinary.uploader.upload(file, {
        folder: folderName,
        public_id: String(Date.now())
    }).then(result => console.log(result))
    .catch(error => console.error(error));;

    if (!result) return null;

    const url = cloudinary.url(result.public_id, {
        fetch_format: "auto",
        quality: "auto"
    })

    return url;
}
