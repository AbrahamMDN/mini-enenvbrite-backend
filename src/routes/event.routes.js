import { Router } from 'express';
import { validateBody } from '../middlewares/validate.js';
import { createEventSchema } from '../validators/event.schema.js';
import { validateMongoIdParam } from '../validators/expressValidators.js';
import * as EventCtrl from '../controllers/event.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

// Rutas de funciones para búsqueda y visualización de eventos
router.get('/', EventCtrl.list);
router.get('/:id', validateMongoIdParam('id'), EventCtrl.get);

// Ruta para creación de eventos
// Sólo los organizadores pueden crear eventos
router.post('/', requireAuth, requireRole('organizer','admin'), validateBody(createEventSchema), EventCtrl.create);

export default router;