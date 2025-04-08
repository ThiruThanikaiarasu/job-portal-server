import User, { IUser } from "../models/userModel"

const findUserByEmailFromDB = (email: string) => {
    return User.findOne({ email })
}

const findUserByEmailWithPasswordFromDB = (email: string) => {
    return User.findOne({ email }).select('+password')
}

const createUserInDB = async (userData: Partial<IUser>) => {
    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser    
}

export {
    findUserByEmailFromDB,
    findUserByEmailWithPasswordFromDB,
    createUserInDB
}