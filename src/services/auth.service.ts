import { userService } from "./user.service"
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/httpError.util";


const loggingBasicEmailPwd = async(email:string, password:string) =>{
    const user = await userService.getUserByEmail(email);
    if(!user){
        throw new HttpError(`Usuario no encontrado`, 400)
    }

    //Confirmar si es valida la contraseña 
    const isValidPwd = await bcrypt.compare(password, user.password)
    if(!isValidPwd){
        throw new HttpError(`Credenciales incorrectas`, 400)
    }

    // 3. generar el token
    const token = generateAccessToken(user.email, user.id);

    return token //Entrega el token al controller como string
}

const registerBasicUser = async(email: string, password: string) =>{
    const user = await userService.createBasicUser(email, password)

    const token = generateAccessToken(user.email, user.id);

    return token //Entrega el token al controller como string
}

export const authService = {
    loggingBasicEmailPwd,
    registerBasicUser

}