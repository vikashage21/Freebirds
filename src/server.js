import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

import express from 'express'

import { connectDb } from '../src/db/index.js'
import { router } from '../src/router/auth_router.js';



const app = express();


app.use(express.json())

app.use(express.static('public'))

// using router here 

app.use('/api/auth' , router)


connectDb().then(()=>{
    app.listen(process.env.PORT ,()=>{
        console.log(`server is running on port ${process.env.PORT }`)
    })
})


