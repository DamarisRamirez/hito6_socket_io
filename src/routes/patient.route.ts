import { Router } from "express";
import { patientController } from "../controllers/patient.controller"
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http:localhost:3000/api/v1/patients

//leer listado de pacientes
router.get('/', verifyToken, patientController.getPatientsList)

//leer un paciente
router.get('/:id', verifyToken, patientController.getPatientByRut)

//crear un nuevo paciente
router.post('/createPatient', patientController.createPatient)

//actualizar datos de un paciente
router.put('/updatePatient', patientController.updatePatientByRut)

//eliminar un paciente
router.delete('/deletePatient', verifyToken, patientController.deletePatient)

export default router;