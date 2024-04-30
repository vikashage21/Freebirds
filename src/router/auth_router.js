import express from 'express'

import authController from '../controller/auth_controller.js'

import { upload } from '../middlewares/multer.middleware.js'

import { sinupSchema } from '../validators/auth_validator.js'

import { validate } from '../middlewares/validate_middleware.js'

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
    validate(sinupSchema), authController.register)


// login router

router.route('/login').post(authController.login)

export { router }