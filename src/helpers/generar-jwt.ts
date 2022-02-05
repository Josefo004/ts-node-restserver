import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const sopk:string = process.env.SECRETORPRIVATEKEY || '';

export const generarJWT = (uid:string) => {
  return new Promise ((resolve, reject) => {
    const paylod = { uid };
    jwt.sign(paylod,sopk,{
      expiresIn:'4h'
    },(err, token)=>{
      if (err) {
        console.log(err);
        reject('No se pudo genrar el Token');
      } else{
        resolve( token );
      }
    });
  });
}

export default generarJWT;