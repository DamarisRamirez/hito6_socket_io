import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

export const generateAccessToken = (
  email: string,
  uid: string,
  expiresIn = "1h"
) => {
  return jwt.sign({ email, uid }, secret, {
    expiresIn,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};
