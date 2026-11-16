package com.petcare.exception;

/** Se lanza cuando los datos enviados no cumplen una regla de negocio. Responde 400. */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String mensaje) {
        super(mensaje);
    }
}
