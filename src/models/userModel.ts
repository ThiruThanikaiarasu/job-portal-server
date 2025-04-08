import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  generateAccessJWT(): string
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            trim: true,
            minLength: [2, 'Name must be at least 2 characters long'],
            maxLength: [50, 'Name must be no longer than 50 characters']
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Email is a mandatory field']
        },
        password: {
            type: String,
            select: false,
            required: [true, 'Password is a mandatory field']
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
)

userSchema.pre<IUser>('save', function (next) {
    if (!this.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        if(!salt) throw new Error('Error while creating salt')

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            if(!hash) return new Error('Error while generating hash')

            this.password = hash
            next()
        })
    })
})

userSchema.methods.generateAccessJWT = function (): string {
    const payload = { id: this._id }
    return jwt.sign(payload, process.env.ACCESS_TOKEN as string, { expiresIn: '30d' })
}

const User = mongoose.models.users || mongoose.model<IUser>('users', userSchema)
export default User
