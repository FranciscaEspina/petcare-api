package com.petcare.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record MascotaRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 80, message = "El nombre no puede superar los 80 caracteres")
        String nombre,

        @NotBlank(message = "La especie es obligatoria")
        @Size(max = 50, message = "La especie no puede superar los 50 caracteres")
        String especie,

        @Size(max = 80, message = "La raza no puede superar los 80 caracteres")
        String raza,

        @PastOrPresent(message = "La fecha de nacimiento no puede ser futura")
        LocalDate fechaNacimiento,

        @NotNull(message = "El id del dueño es obligatorio")
        Long duenoId
) {
}
