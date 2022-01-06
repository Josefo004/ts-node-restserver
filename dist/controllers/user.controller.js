"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDELETE = exports.usuariosPATCH = exports.usuariosPUT = exports.usuariosPOST = exports.usuariosGET = void 0;
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
const usuariosPOST = (req, res) => {
    //const body = req.body;
    const { nombre, edad } = req.body;
    res.json({
        msg: 'POST API',
        nombre,
        edad
    });
};
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