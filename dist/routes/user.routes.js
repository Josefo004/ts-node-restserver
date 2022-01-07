"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
exports.router = (0, express_1.Router)();
exports.router.get('/', user_controller_1.usuariosGET);
exports.router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es un campo Obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseañ debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
], user_controller_1.usuariosPOST);
exports.router.put('/:id', user_controller_1.usuariosPUT);
exports.router.patch('/', user_controller_1.usuariosPATCH);
exports.router.delete('/', user_controller_1.usuariosDELETE);
//# sourceMappingURL=user.routes.js.map