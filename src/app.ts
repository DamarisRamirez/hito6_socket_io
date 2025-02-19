import express from 'express';
import rateLimit from "express-rate-limit";
import userRoute  from './routes/user.route';
import authRoute from "./routes/auth.route"
import patientRoute from "./routes/patient.route"
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";



const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

app.use(limiter);

app.use(loggerMiddleware)

app.use('/api/v1/users', userRoute)
app.use('/api/v1/patients', patientRoute)
app.use('/api/v1/auth', authRoute)

app.use(express.static("public")); //Ruta estática

app.use(httpErrorHandle);

export default app;