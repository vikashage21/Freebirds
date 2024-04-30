import express from 'express'

import authController from '../controller/auth_controller.js'

import { upload } from '../middlewares/multer.middleware.js'



const router = express.Router()


router.route('/register').post(

// adding middlewares of multer 


    upload.fields([

        {
            name: 'avatar',
            maxCount: 1
        },

        {
            name: 'photos',
            maxCount: 10

        }

    ]),
    authController.register)


    // login router

    router.route('/login').post(authController.login)

export {router}