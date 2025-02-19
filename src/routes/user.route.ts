import { Router } from "express";
import { userController } from "../controllers/user.controller"
//import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http:localhost:3000/api/v1/users

//leer los usuarios
router.get('/', userController.getUsers)

//leer un único usuario

//crear un usuario
router.post('/createUser', userController.createUser)

export default router;