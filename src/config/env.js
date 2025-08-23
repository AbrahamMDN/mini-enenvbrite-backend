import dotenv from 'dotenv';
dotenv.config();

// Almacena mis variables de entorno
export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    // Define quién puede consumir la app
    corsOrigin:  process.env.CORS_ORIGIN ?? '*',
    // Conexión con MongoDB
    mongoUri: process.env.MONGODB_URI,
    // Subobjeto
    jwt: {
        // Llaves de acceso y tiempos de acceso
        accessSecret: process.env.JWT_ACCESS_SECRET ,
        refreshSecret: process.env.JWT_REFRESH_SECRET ,
        accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
        refreshTtl:process.env.JWT_REFRESH_TTL ?? '7d',
    },
    // Llave secreta para actualización de QRs
    qrSigningSecret:process.env.QR_SIGNING_SECRET,
    // Conexión a BD en Supabase
    supabase: {
        url: process.env.SUPABASE_URL,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        bucket: process.env.SUPABASE_BUCKET
    }
}

// Manejo de errores por si no se encuentran las variables de entorno

['mongoUri', 'jwt', 'qrSigningSecret', 'supabase'].forEach((k) => {
    if (k === 'jwt') {
        if (!env.jwt.accessSecret || !env.jwt.refreshSecret ) {
            console.warn('[WARN] Missing JWT secrets. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET');
        }
    } else if (k === 'supabase'){
        if (!env.supabase.url || !env.supabase.serviceRoleKey ) {
            console.warn('[WARN] Missing Supabese config. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
        }
    } else if (!env[k]){
        console.warn(`[WARN] Missing env var for ${k}`);
    }
});