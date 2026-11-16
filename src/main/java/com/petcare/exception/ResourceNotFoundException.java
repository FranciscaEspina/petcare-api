package com.petcare.exception;

/** Se lanza cuando un recurso (dueño, mascota o cita) no existe. Responde 404. */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
