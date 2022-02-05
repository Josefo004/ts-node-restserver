import { Request, Response } from 'express';
import bcriptjs from 'bcryptjs';

import Usuario from '../models/usuario';


 

export const usuariosGET = async (req: Request, res: Response) => {

  const query = req.query;

  const qestado = {estado:true};
  const {limite = 5, desde = 0 } = req.query;
  
  /* const usuarios = await Usuario.find(qestado)
    .skip(Number(desde))
    .limit(Number(limite)); 
  
  const total = await Usuario.countDocuments(qestado); */
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(qestado),
    Usuario.find(qestado)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);
  res.json({
    query,
    total,
    usuarios
  });
}

export const usuariosPOST = async(req: Request, res: Response) => {

  //const body = req.body;
  //const { nombre, edad } = req.body;
  
  //const {estado, google, ... resto} = req.body; //excliomos los campos estado y google y mandamos el resto
  //const usuario = new Usuario(resto);
  
  const {nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, password, correo, rol});

  //encriptar la contrseña
  const salt = bcriptjs.genSaltSync(5);
  usuario.password = bcriptjs.hashSync(password, salt);
  //guardar Usuario
  await usuario.save();

  res.json({
    msg:'POST API',
    usuario
  });
}

export const usuariosPUT = async (req: Request, res: Response) => {

  const {id} = req.params;
  const { _id, password, google, ...resto} = req.body;

  //validar ID

  //actualizar pasword
  if (password){
    const salt = bcriptjs.genSaltSync(5);
    resto.password = bcriptjs.hashSync(password, salt);
  }

  //guaradar modificaciones
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  const usuario2 = await Usuario.findById(id);

  res.json({
    msg:'PUT API',
    id,
    usuario,
    usuario2
  });
}

export const usuariosPATCH = (req: Request, res: Response) => {
  res.json({
    msg:'PATCH API'
  });
}

export const usuariosDELETE = async (req: Request, res: Response) => {
  const {id} = req.params;

  const uid = req.body.uid;

  //borrar fisicamente usuario
  //const usuario = await Usuario.findByIdAndDelete(id);

  //borrado Logico
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

  res.json({
    msg:'DELETE API',
    id,
    usuario,
    uid
  });
}


