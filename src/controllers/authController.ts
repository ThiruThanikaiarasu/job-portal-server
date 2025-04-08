import { Request, Response } from "express"

import { setResponseBody } from "../utils/responseFormatter"
import { IUser } from "../models/userModel"
import { generateToken, setTokenCookie } from "../services/tokenService"
import { createUserInDB, findUserByEmailFromDB, findUserByEmailWithPasswordFromDB } from "../repositories/userRepository"
import { validatePassword } from "../services/userService"

interface SignupRequestBody {
    name: string
    email: string
    password: string
}

interface LoginRequestBody {
    email: string
    password: string
}

interface IMongooseMetaFields {
    _id?: any
    __v?: number
    createdAt?: Date
    updatedAt?: Date
}

type IUserWithMeta = IUser & IMongooseMetaFields

const signup = async (request: Request<{}, {}, SignupRequestBody>, response: Response) => {
    const { name, email, password } = request.body

    try {
        const existingUser = await findUserByEmailFromDB(email)
        if (existingUser) {
            response.status(409).send(setResponseBody('Email id already exist', 'existing_email', null))
            return
        }

        const newUserData: Partial<IUser> = {
            name,
            email,
            password
        }

        const userToBeRegistered = await createUserInDB(newUserData)

        const token = generateToken(userToBeRegistered)
        setTokenCookie(response, token)

        const { password: _, __v: __, _id: ___, ...userData } = userToBeRegistered._doc
        response.status(201).send(setResponseBody<Partial<IUser>>('User Created Successfully', null, userData))
    } catch (error) {
        if(error instanceof Error) {
            response.status(500).send(setResponseBody(error.message, 'server_error', null))
        }
        
        response.status(500).send(setResponseBody(String(error), 'server_error', null))
    }
}

const login = async (request: Request<{}, {}, LoginRequestBody>, response: Response) => {
    const { email, password } = request.body 

    try {
        const existingUser = await findUserByEmailWithPasswordFromDB(email)

        if (!existingUser) {
            response.status(401).send(setResponseBody("Invalid email address", "invalid_email", null))
            return
        }

        const validPassword = await validatePassword(password, existingUser.password)
        if (!validPassword) {
            response.status(401).send(setResponseBody("Invalid password", "invalid_password", null))
            return
        }

        const {
            password: _,
            _id,
            __v,
            createdAt,
            updatedAt,
            ...userData
        } = existingUser._doc as IUserWithMeta

        const token = generateToken(existingUser)
        setTokenCookie(response, token)

        response.status(200).send(setResponseBody("Logged in Successfully", null, userData))
    } catch (error: any) {
        response.status(500).send(setResponseBody(error.message, "server_error", null))
    }
}

export {
    signup,
    login
}