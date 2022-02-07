"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.router = (0, express_1.Router)();
exports.router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.login);
exports.router.post('/google', [
    (0, express_validator_1.check)('id_token', 'Token de Google es Nesesario').notEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.logingoogle);
//# sourceMappingURL=auth.routes.js.map