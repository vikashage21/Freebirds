import mongoose from 'mongoose'


const connectDb = async () => {
    try {
        const connetionInsatance = await mongoose.connect(
            `${process.env.MONGOOSE_URL}/BirdChat`
        )
        console.log('connected to mongodb server successfully !!', connetionInsatance.connection.host)



    } catch (error) {
        console.log(' mongodb server error !!', error)

        process.exit(1)

    }
}

export { connectDb }