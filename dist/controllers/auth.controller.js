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
exports.logingoogle = exports.login = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const google_verify_1 = require("../helpers/google-verify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        //si el email existe 
        const usuario = yield usuario_1.default.findOne({ correo });
        //console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Contraseña no son validos"
            });
        }
        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Contraseña no son validos - Usuario Bloqueado"
            });
        }
        //verificar contraseña
        const passwordValido = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({
                msg: "Usuario / Contraseña no son validos"
            });
        }
        //generar el JWT
        const token = yield (0, generar_jwt_1.default)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Pongase en contacto con el usuario"
        });
    }
});
exports.login = login;
const logingoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const googleUser = yield (0, google_verify_1.googleVerify)(id_token);
        console.log(googleUser);
        res.json({
            msg: "Todo Ok!",
            id_token,
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("No se pudo Verificar el ID_TOKEN de Google");
    }
});
exports.logingoogle = logingoogle;
//# sourceMappingURL=auth.controller.js.map