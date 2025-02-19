import {AllowNull, Column, DataType, Default, IsEmail, IsUUID, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model {
  @IsUUID(4) 
  @PrimaryKey 
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID) 
  id!: string;

  @AllowNull(false)
  @IsEmail
  @Unique 
  @Column(DataType.STRING) 
  email!: string;

  @AllowNull(false) 
  @Column(DataType.STRING) 
  password!: string;
}