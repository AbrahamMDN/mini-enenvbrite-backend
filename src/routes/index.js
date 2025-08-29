import { Router } from "express";
import auth from './auth.routes.js';
import events from './event.routes.js';
import tickets from './ticket.routes.js';

const router = Router();

// Gestión de rutas por función
router.use('/auth', auth);
router.use('/events', events);
router.use('/tickets', tickets); // Sólo me permite utilizar el purchase
router.use('/checkin', tickets); // Sólo me permite utilizar el scan: /checkin/scan

export default router;