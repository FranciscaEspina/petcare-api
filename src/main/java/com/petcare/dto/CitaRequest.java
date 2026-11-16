package com.petcare.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CitaRequest(
        @NotNull(message = "La fecha es obligatoria (formato: 2026-11-20T10:30:00)")
        LocalDateTime fecha,

        @NotBlank(message = "El motivo es obligatorio")
        @Size(max = 255, message = "El motivo no puede superar los 255 caracteres")
        String motivo,

        @Size(max = 500, message = "El diagnóstico no puede superar los 500 caracteres")
        String diagnostico,

        @PositiveOrZero(message = "El costo no puede ser negativo")
        BigDecimal costo,

        @NotNull(message = "El id de la mascota es obligatorio")
        Long mascotaId
) {
}
