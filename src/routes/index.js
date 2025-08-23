import { Router } from "express";
import auth from './auth.routes.js';
import events from './event.routes.js';

const router = Router();

// Gestión de rutas por función
router.use('/auth', auth);
router.use('/events', events);

export default router;