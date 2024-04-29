import mongoose from 'mongoose'
const Schema = new mongoose.Schema;

const userLocationSchema = new Schema ({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    latitude :{
        type:Number,
        required : true

    },
    longitude :{
        type:Number,
        required : true

    }
},{
    timestaps:true
}
)

const UserLocation = mongoose.model('UserLocation' , userLocationSchema)


export {UserLocation}
