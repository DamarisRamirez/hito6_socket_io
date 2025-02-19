import {Request, Response, NextFunction} from "express"
import { authService } from "../services/auth.service"
import { HttpError } from "../utils/httpError.util";
import { authLoginSchema } from "../schemas/auth.schema";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { error, value } = authLoginSchema.validate(req.body);

        if (error) {
        throw new HttpError(error.message, 400);
        }
        const {email, password} = value
        const token = await authService.loggingBasicEmailPwd(email, password)
        res.json({token})
    }catch(error){
        next(error);
    }
}

const register = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body
        const token = await authService.registerBasicUser(email, password)
        res.json({token})
    }catch(error){
        next(error);
    }
}

export const authController = {
    login,
    register
}