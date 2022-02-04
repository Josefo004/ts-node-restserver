import express, { Application } from 'express';
import cors from 'cors';

import { router as rutasUsuario} from '../routes/user.routes';
import { router as rutasAuth  } from '../routes/auth.routes';
import { dbConnection } from '../database/config';



class Server {
  private app           : Application;
  private port          :string;
  private usuariosPath  :string = '/api/usuarios';
  private authPath      :string = '/api/auth';

  constructor () {
    this.app  = express();
    this.port = process.env.PORT || '3000';

    //conectar a la base de datos
    this.conectarDb();

    //middlewares
    this.middlewares();

    //rutas
    this.routes();
  }

  async conectarDb(){
    await dbConnection();
  }

  middlewares(){
    //cors
    this.app.use( cors() );

    //parseo y lectura del body
    this.app.use( express.json() );

    //directorio publico
    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use(this.usuariosPath, rutasUsuario);
    this.app.use(this.authPath, rutasAuth);
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`server is listening on ${this.port}`);
    });
  }

}

export default Server;