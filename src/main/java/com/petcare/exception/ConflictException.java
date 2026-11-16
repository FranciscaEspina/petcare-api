package com.petcare.exception;

/** Se lanza cuando la operación choca con el estado actual (RUT duplicado, borrar con hijos). Responde 409. */
public class ConflictException extends RuntimeException {
    public ConflictException(String mensaje) {
        super(mensaje);
    }
}
