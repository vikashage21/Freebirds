import { User } from "../model/user_model.js";

const register = async (req, res) => {

    try {
        console.log(req.body)

        const { username, email, password, name, avatar, age, gender, photos } = req.body;
        const userExits = await User.findOne({ email })
        if (userExits) {
            return res.status(400).json({
                msg: "email already exists"
            })
        }

        const createdUsers = await User.create({
            username, email, password, name, avatar, age, gender, photos
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