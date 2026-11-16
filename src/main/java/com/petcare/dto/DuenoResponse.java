package com.petcare.dto;

import com.petcare.entity.Dueno;

public record DuenoResponse(
        Long id,
        String rut,
        String nombre,
        String telefono,
        String email
) {
    public static DuenoResponse from(Dueno d) {
        return new DuenoResponse(d.getId(), d.getRut(), d.getNombre(), d.getTelefono(), d.getEmail());
    }
}
