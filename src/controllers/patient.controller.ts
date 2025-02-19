import {Request, Response, NextFunction} from "express"
import { patientService } from "../services/patient.service"

const getPatientsList = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const patients = await patientService.getAllPatients()
        res.json(patients)
    }catch(error){
        next(error);
    }
}

const createPatient = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id, name, age, diagnostic} = req.body
        const newPatient = await patientService.createNewPatient(id, name, age, diagnostic)
        res.json({newPatient})
        
    }catch(error){
        next(error);
    }
}

const getPatientByRut = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const {id} = req.params;
        const patient = await patientService.getPatient(id)
        res.json(patient)
    }catch(error){
        next(error);
    }
}

const updatePatientByRut = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id, name, age, diagnostic} = req.body
        const updatedPatient = await patientService.updatePatient(id, name, age, diagnostic)
        res.json({updatedPatient})
        
    }catch(error){
        next(error);
    }
}

const deletePatient = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.body
        const deletedPatient = await patientService.deletePatient(id)
        res.json({deletedPatient})
    }catch(error){
        next(error);
    }
}

export const patientController = {
    getPatientsList,
    createPatient,
    updatePatientByRut,
    deletePatient,
    getPatientByRut
}