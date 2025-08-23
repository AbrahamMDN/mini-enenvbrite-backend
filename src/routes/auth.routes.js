import { Router } from "express";
// Importación de middleware de validación 
import { validateBody } from "../middlewares/validate.js";
// Importación de esquemas de registro e inicio de sesión 
import { registerSchema, loginSchema } from '../validators/auth.schema.js';
import * as AuthCtrl from '../controllers/auth.controller.js'
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// Rutas de funciones con autorización
router.post('/register', validateBody(registerSchema), AuthCtrl.register);
router.post('/login', validateBody(loginSchema), AuthCtrl.login);
router.post('/me', requireAuth, AuthCtrl.me);

export default router;