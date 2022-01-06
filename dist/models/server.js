"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("../routes/user.routes");
class Server {
    constructor() {
        this.usuariosPath = '/api/usuarios';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //parseo y lectura del body
        this.app.use(express_1.default.json());
        //directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.usuariosPath, user_routes_1.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server is listening on ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map