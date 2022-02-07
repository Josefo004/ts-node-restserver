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
    default: 'USER_ROLE',
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
  const { __v, password, _id, ... resto} = this.toObject();
  resto.uid = _id;
  return resto;
}

export default model<iUsuario>('Usuario', UsuarioSchema);

