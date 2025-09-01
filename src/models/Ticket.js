import mongoose from 'mongoose';

// Esquema de asiento seleccionado
const seatSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  col: { type: Number, required: true },
}, { _id: false });

// Esquema del ticket de compra
const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  seat: seatSchema,
  pricePaid: { type: Number, required: true },
  qrUrl: { type: String },
  // Comprueba si se usó ya el ticket y en que fecha
  checkedInAt: { type: Date, default: null },
}, { timestamps: true });

// Indexación de elementos de selección del ticket como únicos para evitar boletos duplicados: De un evento individual, se seleccionan una única coincidencia de fila y columna en la selección
ticketSchema.index({ event: 1, 'seat.row': 1, 'seat.col': 1 }, { unique: true });

export const Ticket = mongoose.model('Ticket', ticketSchema);