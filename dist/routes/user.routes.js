"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const user_controller_1 = require("../controllers/user.controller");
const db_validators_1 = require("../helpers/db-validators");
exports.router = (0, express_1.Router)();
exports.router.get('/', [
    (0, express_validator_1.check)('limite', 'El Limite debe ser numero').isNumeric(),
    (0, express_validator_1.check)('limite', 'No puede estar vacio ').notEmpty(),
    (0, express_validator_1.check)('desde', 'Debe ser un Número').isNumeric(),
    (0, express_validator_1.check)('desde', 'No puede estar vacio ').notEmpty(),
    validar_campos_1.validarCampos
], user_controller_1.usuariosGET);
exports.router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es un campo Obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseañ debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], user_controller_1.usuariosPOST);
exports.router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.esIdValido),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], user_controller_1.usuariosPUT);
exports.router.patch('/', user_controller_1.usuariosPATCH);
exports.router.delete('/:id', [
    validar_jwt_1.default,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.esIdValido),
    validar_campos_1.validarCampos
], user_controller_1.usuariosDELETE);
//# sourceMappingURL=user.routes.js.map