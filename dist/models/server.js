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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("../routes/user.routes");
const auth_routes_1 = require("../routes/auth.routes");
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        //conectar a la base de datos
        this.conectarDb();
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
    }
    conectarDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
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
        this.app.use(this.authPath, auth_routes_1.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server is listening on ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map