"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/* import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarARole, tieneRole } from '../middlewares/validar-role';
 */
const middle = __importStar(require("../middlewares"));
const user_controller_1 = require("../controllers/user.controller");
const db_validators_1 = require("../helpers/db-validators");
exports.router = (0, express_1.Router)();
exports.router.get('/', [
    (0, express_validator_1.check)('limite', 'El Limite debe ser numero').isNumeric(),
    (0, express_validator_1.check)('limite', 'No puede estar vacio ').notEmpty(),
    (0, express_validator_1.check)('desde', 'Debe ser un Número').isNumeric(),
    (0, express_validator_1.check)('desde', 'No puede estar vacio ').notEmpty(),
    middle.VaCa.validarCampos
], user_controller_1.usuariosGET);
exports.router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es un campo Obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseañ debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    middle.VaCa.validarCampos
], user_controller_1.usuariosPOST);
exports.router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.esIdValido),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    middle.VaCa.validarCampos
], user_controller_1.usuariosPUT);
exports.router.patch('/', user_controller_1.usuariosPATCH);
exports.router.delete('/:id', [
    middle.VJWT.validarJWT,
    //validarARole,
    middle.VaRo.tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'NOSE_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.esIdValido),
    middle.VaCa.validarCampos
], user_controller_1.usuariosDELETE);
//# sourceMappingURL=user.routes.js.map