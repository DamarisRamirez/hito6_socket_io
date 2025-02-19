import { Patient } from "../interfaces/patient.interface"
import { patientModel } from "../models/patient.model"

const getAllPatients = async() =>{
    const patients = patientModel.getAllPatients()
    return patients
}

const getPatient = async(id:string) => {
    const patient = patientModel.findOneByRut(id)
    return patient
}
const createNewPatient = async(id:string, name: string, age: number, diagnostic: string) => {
    const patient = await getPatient(id)
    if(patient){
        throw new Error(`Ya existe un usuario con el RUT ${patient.id}`)
    }

    const newpatient: Patient = {
        id,
        name,
        age,
        diagnostic
    }

    await patientModel.createPatient(id, name, age, diagnostic);
    return newpatient
}

const updatePatient = async(id: string, name: string, age: number, diagnostic: string) =>{
    const patientExists = await getPatient(id)
    if(!patientExists){
        throw new Error(`No existe un usuario con el RUT ${id}`)
    }

    const patient: Patient = {
        id,
        name,
        age,
        diagnostic
    }

    await patientModel.updatePatient(id, name, age, diagnostic);
    return patient
}

const deletePatient = async(id: string) =>{
    const patientExists = await getPatient(id)
    if(!patientExists){
        throw new Error(`No existe un usuario con el RUT ${id}`)
    }
    const deleted = await patientModel.deletePatient(id)
    return deleted
}

export const patientService = {
    getAllPatients,
    getPatient,
    createNewPatient,
    updatePatient,
    deletePatient
}