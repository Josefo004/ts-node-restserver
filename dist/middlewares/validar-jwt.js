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
exports.validarJWT = void 0;
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken'); //uso aqui JS para evitar el error de UNDEFINE de payload
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_1 = __importDefault(require("../models/usuario"));
dotenv_1.default.config();
const sopk = process.env.SECRETORPRIVATEKEY || '';
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    //verificar si viene el token
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
    //Validar token
    try {
        const { uid } = jwt.verify(token, sopk);
        const usuarioAutenticado = yield usuario_1.default.findById(uid);
        if (!usuarioAutenticado) {
            return res.status(401).json({
                msg: "token no valido - usuario borrado de la DB"
            });
        }
        //verificar si el uid tiene estado true
        if (!(usuarioAutenticado === null || usuarioAutenticado === void 0 ? void 0 : usuarioAutenticado.estado)) {
            return res.status(401).json({
                msg: "token no valido - usuario con estado false"
            });
        }
        req.body.uAutenticado = usuarioAutenticado;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map