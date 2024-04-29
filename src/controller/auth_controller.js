import { User } from "../model/user_model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const register = async (req, res) => {

    try {
        console.log(req.body)

        let { username, email, password, name, age, gender, avatar, photos } = req.body;
        const userExits = await User.findOne({ email })
        if (userExits) {
            return res.status(400).json({
                msg: "email already exists"
            })
        }

        if ([username, email, password, name, avatar, age, photos, gender].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                msg: "please fill all the fields"
            })
        }

        // handleing the files 

        const avatarLocalPath = req.files?.avatar[0]?.path
        
        const photosLocalPath = req.files?.photos[0]?.path

        // console.log(req.files.photos)


        // console.log(avatarLocalPath)
        // console.log(photosLocalPath)


        if(!avatarLocalPath) {
            return res.status(400).json({
                msg: "please upload an avatar"
            })
        }

        avatar = await uploadOnCloudinary(avatarLocalPath)

        photos = await uploadOnCloudinary(photosLocalPath)

        if (!avatar) {

            res.status(404).json({

                msg: "please upload an avatar"
            })
        }

        const createdUsers = await User.create({
            username,
            email,
            password,
            name,
            avatar: avatar.url,
            age,
            gender,
            photos: photos?.url || ""
        })

        res.status(201).send({
            createdUsers,
            msg: "user created successfully",
            token: await createdUsers.getJsonwebToken(),
            userId: createdUsers._id.toString()

        })

    } catch (error) {

        console.log(error)

    }


}


export default { register }