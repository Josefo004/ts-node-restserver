import { Schema, model } from 'mongoose';

import { iRol } from '../interfaces/role.interface';


const RoleSchema = new Schema<iRol>({
  rol: {
    type:String,
    required: [true, 'El rol es un campo obligatorio']
  }
  
});

export default model<iRol>('Role', RoleSchema);

