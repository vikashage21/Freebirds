import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true  // for using  searching

    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true


    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true,

    },
    age: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: Array
    },
    photos: {
        type: Array
    }
}, {
    timestamps: true
});





// secure the passwrod with the bcrypt (middlewares)

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified(user.password)) {


        next()

    }

    try {

        const saltRond = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, saltRond)
        console.log(hashPassword)

        user.password = hashPassword

    } catch (error) {
        next(error)

    }

})




// defining the method for creating json web token 


userSchema.methods.getJsonwebToken = async function () {


    try {

        const user = this;
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            name: user.name,
            age: user.age,
        }, process.env.JSON_SECRET_KEY, {
            expiresIn: process.env.JSON_SECRET_KEY_EXPIRES_IN
        })
    
    
        return token;
        
    } catch (error) {
        

        console.log(error)
    }


}

// defining campare password for this creating method

userSchema.methods.camparePassword = async function (password){

 
    try {

        const user = this;
       
        const isMath = await bcrypt.compare(password, user.password )

        return isMath;
        
        
    } catch (error) {

        console.log(error)
        
    }
}

const User = mongoose.model('User', userSchema)


export { User }