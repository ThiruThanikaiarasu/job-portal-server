import express from 'express'
const router = express.Router()

import { login, signup } from '../controllers/authController'
import validateRequest from '../middleware/validateRequest'
import { loginSchema, signupSchema } from '../validators/userValidator'

router.post(
    '/signup',

    validateRequest(signupSchema),

    signup
)

router.post(
    '/login',

    validateRequest(loginSchema),

    login
)

export default router