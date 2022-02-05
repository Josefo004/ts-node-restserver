import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken'); //uso aqui JS para evitar el error de UNDEFINE de payload
import dotenv from 'dotenv';

dotenv.config();

const sopk:string = process.env.SECRETORPRIVATEKEY || '';

const validarJWT = (req:Request, res:Response, next: () => void) => {

  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  try {
    const {uid} = jwt.verify(token,sopk);  
    //console.log(payload);
    req.body.uid = uid;
      
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido"
    });
  }
  

}

export default validarJWT;
