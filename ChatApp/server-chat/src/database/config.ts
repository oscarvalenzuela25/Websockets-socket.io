import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_URI || '');
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar la base de datos');
  }
};
