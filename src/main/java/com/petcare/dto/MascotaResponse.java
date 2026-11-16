package com.petcare.dto;

import com.petcare.entity.Mascota;

import java.time.LocalDate;

public record MascotaResponse(
        Long id,
        String nombre,
        String especie,
        String raza,
        LocalDate fechaNacimiento,
        Long duenoId,
        String duenoNombre
) {
    public static MascotaResponse from(Mascota m) {
        return new MascotaResponse(
                m.getId(),
                m.getNombre(),
                m.getEspecie(),
                m.getRaza(),
                m.getFechaNacimiento(),
                m.getDueno().getId(),
                m.getDueno().getNombre()
        );
    }
}
