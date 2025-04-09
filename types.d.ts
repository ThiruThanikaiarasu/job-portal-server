import { IUser } from './src/models/userModel'

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string
        email: string
        role: string
      }
    }
  }
}

export {}