import { Schema, Model, model } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = Model<IUser, Record<string, unknown>>
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
export const User = model<IUser, UserModel>('User', userSchema)
