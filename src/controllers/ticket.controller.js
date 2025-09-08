/* Lógica para el control de información */

// Importación de Lógica de Servicio de Tickets
import * as Tickets from '../services/ticket.service.js';
import { AppError } from '../utils/errors.js';
// Importación de librería para encriptar información
import crypto from 'crypto';
import { env } from '../config/env.js';

// Función que permite simular la compra de tickets
export async function purchase(req, res, next) {
    try {
        const ticket = await Tickets.purchase(req.body, req.user.sub);
        res.status(201).json({ ticket });
    } catch (e) {
        next(e);
    }   
}

// Función que permite escanear el código QR del ticket
export async function scan(req, res, next) {
  try {
    // Busca el token en el body para tener acceso
    const { token } = req.body;
    if (!token) throw new AppError('Missing token', 400, 'MISSING_TOKEN');

    // Si se accede, se recupera la información del mismo 
    let data;
    if (typeof token === 'string') {
      try { data = JSON.parse(token); } 
      catch { throw new AppError('Invalid token', 400, 'INVALID_TOKEN'); }
    } else if (typeof token === 'object' && token !== null) {
      data = token; // permite enviar { t, s } directo
    } else {
      throw new AppError('Invalid token', 400, 'INVALID_TOKEN');
    }

    // Se evalúa si existen el ticket ID y el valor hexadecimal en el ticket
    const { t, s } = data || {};
    if (!t || !s) throw new AppError('Invalid token', 400, 'INVALID_TOKEN');

    // Se verifica que el QR sea el correcto al compararlo con la llave para lectura y generación de QRs
    const h = crypto.createHmac('sha256', env.qrSigningSecret);
    h.update(t);
    const expected = h.digest('hex');
    if (s !== expected) throw new AppError('Invalid signature', 400, 'INVALID_SIGNATURE');

    const ticket = await Tickets.findTicketById(t);
    if (!ticket) throw new AppError('Ticket not found', 404, 'TICKET_NOT_FOUND');

    // Si se verificó la identidad del ticket, se devuelve una respuesta true y su estado como actualizado
    const updated = await Tickets.checkIn(ticket);
    res.json({ ok: true, ticket: updated });
  } catch (e) { next(e); }
}