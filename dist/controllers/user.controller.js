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
exports.usuariosDELETE = exports.usuariosPATCH = exports.usuariosPUT = exports.usuariosPOST = exports.usuariosGET = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuariosGET = (req, res) => {
    //const query = req.query;
    const { nombre, apikey, qq = 'noname' } = req.query;
    res.json({
        msg: 'GET API',
        nombre,
        apikey,
        qq
    });
};
exports.usuariosGET = usuariosGET;
const usuariosPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const body = req.body;
    //const { nombre, edad } = req.body;
    //const {estado, google, ... resto} = req.body; //excliomos los campos estado y google y mandamos el resto
    //const usuario = new Usuario(resto);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.default({ nombre, password, correo, rol });
    //verificar el correo
    //encriptar la contrseña
    const salt = bcryptjs_1.default.genSaltSync(5);
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    yield usuario.save();
    res.json({
        msg: 'POST API',
        usuario
    });
});
exports.usuariosPOST = usuariosPOST;
const usuariosPUT = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'PUT API',
        id
    });
};
exports.usuariosPUT = usuariosPUT;
const usuariosPATCH = (req, res) => {
    res.json({
        msg: 'PATCH API'
    });
};
exports.usuariosPATCH = usuariosPATCH;
const usuariosDELETE = (req, res) => {
    res.json({
        msg: 'DELETE API'
    });
};
exports.usuariosDELETE = usuariosDELETE;
//# sourceMappingURL=user.controller.js.map