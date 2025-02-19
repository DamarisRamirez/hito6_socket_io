import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utils/auth.util";

/* declare module "express-serve-static-core" {
    interface Request {
      email?: string;
      uid?: string;
    }
} */

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "No se ha encontrado el Bearer token" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = verifyAccessToken(token);
       // req.email = payload.email;
        next();
      } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
          res.status(401).json({ error: "Token invalido" });
          return;
        }
    
        if (error instanceof jwt.TokenExpiredError) {
          res.status(401).json({ error: "Token expirado" });
          return;
        }
    
        res.status(500).json("Error de Servidor");
        return;
      }
}