import express from 'express'

import authController from '../controller/auth_controller.js'



const router = express.Router()


router.route('/register').post(authController.register)

export {router}