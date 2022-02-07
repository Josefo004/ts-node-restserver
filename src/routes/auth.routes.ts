import { Router } from 'express';
import { check } from 'express-validator';

import { login, logingoogle } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar-campos';

export const router = Router();

router.post('/login',[
  check('correo', 'El correo no es válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
] , login );    

router.post('/google',[
  check('id_token', 'Token de Google es Nesesario').notEmpty(),
  validarCampos
] , logingoogle );    