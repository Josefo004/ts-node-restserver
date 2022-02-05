"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken'); //uso aqui JS para evitar el error de UNDEFINE de payload
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sopk = process.env.SECRETORPRIVATEKEY || '';
const validarJWT = (req, res, next) => {
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
        //console.log(payload);
        req.body.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        });
    }
};
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map