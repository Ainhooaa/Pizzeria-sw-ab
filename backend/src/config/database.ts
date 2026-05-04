import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 Intentando conectar a MongoDB...');
  
  try {
    await mongoose.connect(uri as string, {
      dbName: 'pizzeria'  // 👈 Especifica aquí la base de datos
    });
    console.log(`✅ MongoDB conectado a la base de datos: pizzeria`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
};