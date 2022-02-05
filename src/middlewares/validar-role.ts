import { Request, Response } from 'express';

const validarARole = (req: Request, res: Response, next: () => void) =>{

  if (!req.body.uAutenticado) {
    return res.status(500).json({
      msg: "Error no se valido el token"
    })
  }

  const {nombre, rol} = req.body.uAutenticado;

  if (rol!=='ADMIN_ROLE') {
    return res.status(401).json({
      msg: `El usuario ${nombre} no es Adminstrador - no puede hacer esto`
    })
  }

  next();
}

const tieneRole = ( ...roles:string[] )=>{
  
  return (req: Request, res: Response, next: () => void) =>{
    if (!req.body.uAutenticado) {
      return res.status(500).json({
        msg: "Error no se valido el token"
      })
    }
    const {nombre, rol} = req.body.uAutenticado;
    if (!roles.includes(rol)) {
      return res.status(401).json({
        msg: `El usuario ${nombre} require uno de estos roles ${roles} - no puede hacer esto`
      });
    }
    next();
  }
}

export {
  validarARole,
  tieneRole
}