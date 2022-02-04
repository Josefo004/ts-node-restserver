import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller';
import { emailExiste } from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validar-campos';

export const router = Router();

router.post('/login',[
  check('correo', 'El correo no es válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
] , login );    