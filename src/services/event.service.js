import { Event } from '../models/Event.js';
import { AppError } from '../utils/errors.js';

// Función que muestra una lista ordenada por fecha de los eventos publicados
export async function listPublished() {
  return Event.find({ isPublished: true }).sort({ date: 1 }).lean();
}

// Función que busca un evento por su ID
export async function getById(id) {
  const e = await Event.findById(id).lean();
  if (!e) throw new AppError('Event not found', 404, 'EVENT_NOT_FOUND');
  return e;
}

// Función que crea un evento y publica el ID del propietario/creador del mismo
export async function createEvent(input, ownerId) {
  const e = await Event.create({ ...input, owner: ownerId });
  return e.toObject();
}