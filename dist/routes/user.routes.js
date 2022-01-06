"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.router = (0, express_1.Router)();
exports.router.get('/', user_controller_1.usuariosGET);
exports.router.post('/', user_controller_1.usuariosPOST);
exports.router.put('/:id', user_controller_1.usuariosPUT);
exports.router.patch('/', user_controller_1.usuariosPATCH);
exports.router.delete('/', user_controller_1.usuariosDELETE);
//# sourceMappingURL=user.routes.js.map