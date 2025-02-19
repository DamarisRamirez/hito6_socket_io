import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Patient } from "../models/patient"

const DATABASE_URL = 'postgres://postgres:root@localhost:5436/dbclinic';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  models: [User, Patient],
  logging: false,
});
