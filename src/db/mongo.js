import mongoose from 'mongoose';
// Importo variables de entorno
import { env } from '../config/env.js';

// Conexión asíncrona a la nube
export async function connectMongo() {
    const uri = env.mongoUri;
    if (!uri) throw new Error('MONGODB_URI is required');
    // Se agregan valores del uri
    mongoose.set('strictQuery',true);
    // Indexación automática
    await mongoose.connect(uri, { autoIndex: true});
    console.log('[DB] Connected to mongo')
}