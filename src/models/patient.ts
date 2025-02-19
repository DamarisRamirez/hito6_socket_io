import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
  tableName: 'patients',
  timestamps: false,
})
export class Patient extends Model {
  @PrimaryKey
  @Column(DataType.STRING) //Es string porque es un rut
  id!: string;

  @AllowNull(false) 
  @Column(DataType.STRING) 
  name!: string;

  @AllowNull(false) 
  @Column(DataType.INTEGER)
  age!: number;

  @AllowNull(false) 
  @Column(DataType.STRING)
  diagnostic!: string;
}