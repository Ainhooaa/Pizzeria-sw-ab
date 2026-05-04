import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 Intentando conectar a MongoDB...');
  
  try {
    await mongoose.connect(uri as string);
    console.log(`✅ MongoDB conectado`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    // No hacemos process.exit() - el servidor sigue funcionando
    throw error;
  }
};