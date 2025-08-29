// Validación de Esquemas de Autorización: Registro e Inicio de Sesión

import { z } from "zod";

// Roles permitidos
const allowedRoles = ['user','organizer','staff','admin'];

// Esquema de registro con validación
export const registerSchema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    // Acepta rol opcional, lo normaliza y lo pasa como undefined si no es válido
    role: z.string()
        .transform(r => r?.trim().toLowerCase())
        .optional()
        .transform(r => (r && allowedRoles.includes(r)) ? r : undefined)
})

// Esquema de inicio de sesión con validación
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(128)
})