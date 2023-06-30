import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUser } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUser()
  user.id = id
  if(!user.password){
    user.password = config.defult_user_password as string
  }
  const createUser = await User.create(user)
  // if (!createUser) {
  //   throw new Error('Failed to create user !')
  // }
  return createUser
}
 export default {
    createUser
 }