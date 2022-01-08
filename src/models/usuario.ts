import { Schema, model } from 'mongoose';

import { iUsuario } from '../interfaces/usuario.interface';

const UsuarioSchema = new Schema<iUsuario>({
  nombre: {
    type:String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type:String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type:String,
    required: [true, 'La contraseña es obligatorio']
  },
  img: {
    type:String
  },
  rol: {
    type:String,
    required: true,
    //enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type:Boolean,
    default:true
  },
  google: {
    type:Boolean,
    default: false
  }
});

UsuarioSchema.methods.toJSON = function (){
  const { __v, password, ... resto} = this.toObject();
  return resto;
}

export default model<iUsuario>('Usuario', UsuarioSchema);

