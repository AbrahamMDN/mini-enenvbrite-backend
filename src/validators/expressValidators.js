// Valida que exista una concatenación Usuario-Evento-Ticket

import { param } from 'express-validator';

// Selección del ID como parámetro de vinculación con Mongo
export const validateMongoIdParam = (name = 'id') => [
  param(name).isMongoId().withMessage(`${name} must be a valid Mongo ObjectId`)
];