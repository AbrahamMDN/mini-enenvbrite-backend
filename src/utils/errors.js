// Creación del Formato de Clase para Errores de la App: Mensaje, Status y Significado
export class AppError extends Error {
    // La clase se aplica a todos los BAD_REQUEST y los contruye según la causa
    constructor(message, status = 400, code = 'BAD_REQUEST', details = undefined){
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }

}

// Error de Evento no encontrado
export function notFound(message = 'Not Found') {
  return new AppError(message, 404, 'NOT_FOUND');
}

// Error de Acceso no autorizado 
export function unauthorized(message = 'Unauthorized') {
  return new AppError(message, 401, 'UNAUTHORIZED');
}

// Error de Acceso prohibido
export function forbidden(message = 'Forbidden') {
  return new AppError(message, 403, 'FORBIDDEN');
}