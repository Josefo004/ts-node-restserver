"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sopk = process.env.SECRETORPRIVATEKEY || '';
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const paylod = { uid };
        jsonwebtoken_1.default.sign(paylod, sopk, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo genrar el Token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
exports.default = exports.generarJWT;
//# sourceMappingURL=generar-jwt.js.map