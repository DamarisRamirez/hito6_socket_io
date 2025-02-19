import { userModel } from "../models/user.model"
import bcrypt from "bcryptjs"

const getAllUsers = async() => {
    const users = userModel.findAll();
    return users;
}

const getUserByEmail = async (email: string) => {
    const user = userModel.findOneByEmail(email);
    return user;
  };

const createBasicUser = async(email: string, password: string) => {
    const user = await userModel.findOneByEmail(email);
    if(user){
        throw new Error(`Ya existe un usuario con el correo ${user.email}`)
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(password, salt)

    const newUser = await userModel.create(email, passwordHashed);

    return newUser;
}

export const userService = {
    getAllUsers,
    createBasicUser,
    getUserByEmail
}