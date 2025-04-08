import bcrypt from 'bcryptjs'

const validatePassword = (userEnteredPassword: string, actualPassword: string) => {
    return bcrypt.compare(userEnteredPassword, actualPassword)
}

export {
    validatePassword
}