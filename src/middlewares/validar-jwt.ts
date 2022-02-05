import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//const jwt = require('jsonwebtoken'); //uso aqui JS para evitar el error de UNDEFINE de payload
import dotenv from 'dotenv';

dotenv.config();

const sopk:string = process.env.SECRETORPRIVATEKEY || '';

const validarJWT = (req:Request, res:Response, next: () => void) => {

  const token = req.header('x-token');
  
  //verificar si viene el token
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  //Validar token
  try {
    jwt.verify(token,sopk);  
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido"
    });
  }
  

}

export default validarJWT;
