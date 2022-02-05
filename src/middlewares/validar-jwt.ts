import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken'); //uso aqui JS para evitar el error de UNDEFINE de payload
import dotenv from 'dotenv';

import Usuario from '../models/usuario';

dotenv.config();

const sopk:string = process.env.SECRETORPRIVATEKEY || '';

const validarJWT = async (req:Request, res:Response, next: () => void) => {

  const token = req.header('x-token');
  
  //verificar si viene el token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  //Validar token
  try {
    const { uid } = jwt.verify(token,sopk); 
    const usuarioAutenticado = await Usuario.findById(uid);

    if(!usuarioAutenticado){
      return res.status(401).json({
        msg: "token no valido - usuario borrado de la DB"
      });
    }

    //verificar si el uid tiene estado true
    if(!usuarioAutenticado?.estado){
      return res.status(401).json({
        msg: "token no valido - usuario con estado false"
      });
    }
    
    req.body.uAutenticado = usuarioAutenticado;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido"
    });
  }
  

}

export {
  validarJWT
}
