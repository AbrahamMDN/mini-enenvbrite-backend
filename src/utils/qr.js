// Creación de lógica para el QR

import crypto from 'crypto';
import QRCode from 'qrcode';
import { env } from '../config/env.js';

// Función que crea la firma del ticket hasheada  
// *
export function signTicket(ticketId) {
    // Creación del hasheo de nuestra firma secreta del QR con sha256
    const h = crypto.createHmac('sha256', env.qrSigningSecret);
    h.update(ticketId);
    // Devolución del valor hexadecimal
    return h.digest('hex');
}

// Función que crea el payload del QR con sus elementos t y s
export function buildQrPayload(ticketId) {
    return JSON.stringify({t: ticketId, s: signTicket(ticketId)})
}

// Función que genera el QR como una imagen cifrada en PNG
export async function generateQrPngBuffer(payload) {
    return await QRCode.toBuffer(payload, { type: 'png', width: 512, margin: 1});
}