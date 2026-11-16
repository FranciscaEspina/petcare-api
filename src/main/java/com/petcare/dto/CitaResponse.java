package com.petcare.dto;

import com.petcare.entity.Cita;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CitaResponse(
        Long id,
        LocalDateTime fecha,
        String motivo,
        String diagnostico,
        BigDecimal costo,
        Long mascotaId,
        String mascotaNombre
) {
    public static CitaResponse from(Cita c) {
        return new CitaResponse(
                c.getId(),
                c.getFecha(),
                c.getMotivo(),
                c.getDiagnostico(),
                c.getCosto(),
                c.getMascota().getId(),
                c.getMascota().getNombre()
        );
    }
}
