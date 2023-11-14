import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY , 
  api_secret: process.env.CLOUDNARY_API_SECRET
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath){
            alert("PATH NOT FOUND")
            return null   
           const responce = await cloudinary.uploader.upload(localfilepath, {
                resource_type: 'auto'
            })
            console.log(responce.url);
            return responce;
        }
    } catch (error) {
        fs.unlink.Sync(localfilepath)
        return null
    }
}

export {uploadoncloudinary}