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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDELETE = exports.usuariosPATCH = exports.usuariosPUT = exports.usuariosPOST = exports.usuariosGET = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const usuariosGET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const qestado = { estado: true };
    const { limite = 5, desde = 0 } = req.query;
    /* const usuarios = await Usuario.find(qestado)
      .skip(Number(desde))
      .limit(Number(limite));
    
    const total = await Usuario.countDocuments(qestado); */
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(qestado),
        usuario_1.default.find(qestado)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        query,
        total,
        usuarios
    });
});
exports.usuariosGET = usuariosGET;
const usuariosPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const body = req.body;
    //const { nombre, edad } = req.body;
    //const {estado, google, ... resto} = req.body; //excliomos los campos estado y google y mandamos el resto
    //const usuario = new Usuario(resto);
    const { nombre, correo, password, rol } = req.body;
    const usuario = new usuario_1.default({ nombre, password, correo, rol });
    //encriptar la contrseña
    const salt = bcryptjs_1.default.genSaltSync(5);
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    //guardar Usuario
    yield usuario.save();
    res.json({
        msg: 'POST API',
        usuario
    });
});
exports.usuariosPOST = usuariosPOST;
const usuariosPUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google } = _a, resto = __rest(_a, ["_id", "password", "google"]);
    //validar ID
    //actualizar pasword
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync(5);
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    //guaradar modificaciones
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, resto);
    const usuario2 = yield usuario_1.default.findById(id);
    res.json({
        msg: 'PUT API',
        id,
        usuario,
        usuario2
    });
});
exports.usuariosPUT = usuariosPUT;
const usuariosPATCH = (req, res) => {
    res.json({
        msg: 'PATCH API'
    });
};
exports.usuariosPATCH = usuariosPATCH;
const usuariosDELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioAutenticado = req.body.uAutenticado;
    const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    res.json({
        usuario,
        usuarioAutenticado
    });
});
exports.usuariosDELETE = usuariosDELETE;
//# sourceMappingURL=user.controller.js.map