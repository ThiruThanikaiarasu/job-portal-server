import { Response } from 'express'

interface UserWithToken {
    generateAccessJWT: () => string
}

const generateToken = (user: UserWithToken): string => {
    return user.generateAccessJWT()
}

const setTokenCookie = (response: Response, token: string): void => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
    }

    response.cookie('SessionID', token, options)
}

export {
    generateToken,
    setTokenCookie
}