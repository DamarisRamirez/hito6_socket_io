    import { Patient } from './patient';

    const getAllPatients = async () => {
      const patients = await Patient.findAll();
      return patients;
    };
    
    const findOneByRut = async (id: string) => {
      const patient = await Patient.findByPk(id);
      return patient;
    };
    
    const createPatient = async (id: string, name: string, age: number, diagnostic: string) => {
      const patient = await Patient.create({ id, name, age, diagnostic });
      return patient;
    };
    
    const updatePatient = async (id: string, name: string, age: number, diagnostic: string) => {
      const [updatedRows] = await Patient.update(
        { name, age, diagnostic },
        { where: { id } }
      );
    
      if (updatedRows > 0) {
        return await Patient.findByPk(id); 
      }
    
      return null;
    };
    
    const deletePatient = async (id: string) => {
      const deletedRows = await Patient.destroy({ where: { id } });
      return deletedRows > 0;
    };
    
export const patientModel = {
    getAllPatients,
    findOneByRut,
    createPatient,
    updatePatient,
    deletePatient
}