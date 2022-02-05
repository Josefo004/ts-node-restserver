
import { Router } from 'express';
import { check } from 'express-validator';

/* import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarARole, tieneRole } from '../middlewares/validar-role';
 */

import * as middle from '../middlewares';

import { usuariosDELETE, 
         usuariosGET, 
         usuariosPATCH, 
         usuariosPOST, 
         usuariosPUT } from '../controllers/user.controller';
import { emailExiste, esIdValido, esRolValido } from '../helpers/db-validators';

export const router = Router();

router.get('/',[
  check('limite', 'El Limite debe ser numero').isNumeric(),
  check('limite', 'No puede estar vacio ').notEmpty(),
  check('desde', 'Debe ser un Número').isNumeric(),
  check('desde', 'No puede estar vacio ').notEmpty(),
  middle.VaCa.validarCampos
], usuariosGET);    

router.post('/', [
  check('nombre', 'El nombre es un campo Obligatorio').notEmpty(),
  check('password', 'La contraseañ debe tener mas de 6 caracteres').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(esRolValido),
  middle.VaCa.validarCampos
], usuariosPOST);   

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( esIdValido ),
  check('rol').custom(esRolValido),
  middle.VaCa.validarCampos
], usuariosPUT);    

router.patch('/', usuariosPATCH);    

router.delete('/:id',[
  middle.VJWT.validarJWT,
  //validarARole,
  middle.VaRo.tieneRole('ADMIN_ROLE','VENTAS_ROLE','NOSE_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( esIdValido ),
  middle.VaCa.validarCampos
], usuariosDELETE);  



