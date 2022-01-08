
import Role from '../models/role';
import Usuario from '../models/usuario';

export const esRolValido = async(rol:string)=>{ // existe Rol??
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
}

export const emailExiste = async(correo:string)=>{
  const existeE = await Usuario.findOne({ correo });
  if (existeE) {
    throw new Error(`El email ${correo} ya existe en la BD`);
  }
}

export const esIdValido = async(id:string)=>{
  const existeId = await Usuario.findById(id);  
  if (!existeId) {
    throw new Error(`El ID ${id} NO existe en la BD`);
  }
}

