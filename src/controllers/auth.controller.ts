import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcriptjs from 'bcryptjs';

export const login = async(req: Request, res: Response) => { 

  const { correo, password} = req.body;

  try {

    //si el email existe 
    const usuario = await Usuario.findOne({ correo });
    //console.log(usuario);
    
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son validos"
      });
    }

    //si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son validos - Usuario Bloqueado"
      });
    }

    //verificar contraseña
    const passwordValido = bcriptjs.compareSync(password, usuario.password);
    if ( !passwordValido ) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no son validos"
      });
    }


    //generar el JWT
    res.json({
      msg: "Login OK"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Pongase en contacto con el usuario"
    });
  }

}