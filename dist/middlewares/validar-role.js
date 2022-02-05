"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.validarARole = void 0;
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
exports.validarARole = validarARole;
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.body.uAutenticado) {
            return res.status(500).json({
                msg: "Error no se valido el token"
            });
        }
        const { nombre, rol } = req.body.uAutenticado;
        if (!roles.includes(rol)) {
            return res.status(401).json({
                msg: `El usuario ${nombre} require uno de estos roles ${roles} - no puede hacer esto`
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-role.js.map