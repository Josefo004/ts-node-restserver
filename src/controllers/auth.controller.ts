import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcriptjs from 'bcryptjs';
import generarJWT from '../helpers/generar-jwt';
import { googleVerify } from '../helpers/google-verify';

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
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Pongase en contacto con el usuario"
    });
  }

}

export const logingoogle = async(req: Request, res: Response) => {
  const { id_token } = req.body;
  try {
    const {nombre, img, correo} = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google:true
      }
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario Bloqueado - hable con el administrador'
      });
    }

    //generar el JWT
    const token = await generarJWT(usuario.id);
    
    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo Verificar el ID_TOKEN de Google");
  }
}