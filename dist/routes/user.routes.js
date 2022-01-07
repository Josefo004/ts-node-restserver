"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const user_controller_1 = require("../controllers/user.controller");
const role_1 = __importDefault(require("../models/role"));
exports.router = (0, express_1.Router)();
exports.router.get('/', user_controller_1.usuariosGET);
exports.router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es un campo Obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseañ debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    (0, express_validator_1.check)('rol').custom((rol) => __awaiter(void 0, void 0, void 0, function* () {
        const existeRol = yield role_1.default.findOne({ rol });
        if (!existeRol) {
            throw new Error(`El rol ${rol} no existe en la BD`);
        }
    })),
    validar_campos_1.validarCampos
], user_controller_1.usuariosPOST);
exports.router.put('/:id', user_controller_1.usuariosPUT);
exports.router.patch('/', user_controller_1.usuariosPATCH);
exports.router.delete('/', user_controller_1.usuariosDELETE);
//# sourceMappingURL=user.routes.js.map