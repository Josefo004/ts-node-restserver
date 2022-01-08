import mongoose from 'mongoose';

export const dbConnection = async() =>{
  const uri = process.env.MONGODB_CNN || '';
  
  try {
    await mongoose.connect(uri);
    console.log('Base de datos on line');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error al conetar ala BD');
  }

}