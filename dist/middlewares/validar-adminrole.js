"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validarARole = (req, res, next) => {
    if (!req.body.uAutenticado) {
        return res.status(500).json({
            msg: "Error no se valido el token"
        });
    }
    const { nombre, rol } = req.body.uAutenticado;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es Adminstrador - no puede hacer esto`
        });
    }
    next();
};
exports.default = validarARole;
//# sourceMappingURL=validar-adminrole.js.map