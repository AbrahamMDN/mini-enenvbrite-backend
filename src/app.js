import express from 'express';
import cors from 'cors';
// Helmet y Morgan permiten utilizar autorizaciones
import helmet from 'helmet';
import morgan from 'morgan';
// Permite guardar cookies
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { env } from './config/env.js';
// import { errorHandler, notFoundHandler } from './middlewares/error.js';

// Construcción de la lógica de la App
export function buildApp() {
    const app = express();
    app.use(cors({origin: env.corsOrigin, credentials: true}));
    // Límite de tamaño y peso 
    app.use(express.json({limit: '2mb'}));
    // Permite el uso de cookies
    app.use(cookieParser());
    // Define el uso para producción, desarrollo o una combinación de ambos
    app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

    // Permite visualizar si el desarrollo está funcionando
    // La raya inferior en el request es de que ese lemento no lo vamos a ver
    app.get('/healt', (_req, res)=> res.json({ ok: true}));
    // Uso de APIs ubicadas en rutas
    app.use('/api', routes);
    // Uso de funciones para manejo de errores y al no encontrar las API solicitadas 
  //  app.use(notFoundHandler);
  //  app.use(errorHandler);
    return app;
}