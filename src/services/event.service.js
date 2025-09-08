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

// Función que maneja los asientos ocupados según el tipo de ticket
export async function occupiedSeats(eventId, TicketModel) {
  const { Ticket } = TicketModel || await import('../models/Ticket.js');

  const e = await Event.findById(eventId).lean();
  if (!e) throw new AppError('Evento no encontrado', 404, 'EVENT_NOT_FOUND');

  // GA: No maneja asientos
  if (!e.seatMap || e.seatMap.type === 'ga') {
    return [];
  }

  // GRID: lectura de asientos ocupados desde tickets
  const tickets = await Ticket.find({ event: e._id }, { seat: 1, _id: 0 }).lean();
  const occupied = (tickets || [])
    .map(t => t.seat)
    .filter(s => s && Number.isInteger(s.row) && Number.isInteger(s.col))
    .map(s => ({ row: s.row, col: s.col }));

  return occupied;
}