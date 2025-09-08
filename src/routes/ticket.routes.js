import { Router } from 'express';
import { validateBody } from '../middlewares/validate.js';
import { purchaseSchema } from '../validators/ticket.schema.js';
import * as TicketCtrl from '../controllers/ticket.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

/* Rutas para Ticket */

// Ruta de compra
router.post('/purchase', requireAuth, validateBody(purchaseSchema), TicketCtrl.purchase);
// Ruta de escaneo (accesible solo para roles administrativos específicos)
router.post('/scan', requireAuth, requireRole('organizer','staff','admin'), TicketCtrl.scan);

export default router;