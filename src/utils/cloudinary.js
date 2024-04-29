import { v2 as cloudinary } from 'cloudinary'

import fs from 'fs'


// setting configuration parameters globally

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) => {
    try {

        if (!localPath) return null

        //upload files on cloudinary

        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: 'auto'
        })

        // files has been uploaded successfull 
        console.log('file is uploaded on cloudinary', response.url)

        return response;

    } catch (error) {

        // remove the locally save temporary files as the upload operation got failed


        fs.unlinkSync(localPath)

        console.log(error)

    }
}


// console.log(cloudinary.config())


export { uploadOnCloudinary }