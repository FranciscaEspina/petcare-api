package com.petcare.controller;

import com.petcare.dto.CitaResponse;
import com.petcare.dto.MascotaRequest;
import com.petcare.dto.MascotaResponse;
import com.petcare.service.CitaService;
import com.petcare.service.MascotaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {

    private final MascotaService mascotaService;
    private final CitaService citaService;

    public MascotaController(MascotaService mascotaService, CitaService citaService) {
        this.mascotaService = mascotaService;
        this.citaService = citaService;
    }

    @GetMapping
    public List<MascotaResponse> listar() {
        return mascotaService.listar();
    }

    @GetMapping("/{id}")
    public MascotaResponse obtener(@PathVariable Long id) {
        return mascotaService.obtener(id);
    }

    @PostMapping
    public ResponseEntity<MascotaResponse> crear(@Valid @RequestBody MascotaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mascotaService.crear(request));
    }

    @PutMapping("/{id}")
    public MascotaResponse actualizar(@PathVariable Long id, @Valid @RequestBody MascotaRequest request) {
        return mascotaService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        mascotaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    /** Endpoint de relación: citas de una mascota. */
    @GetMapping("/{id}/citas")
    public List<CitaResponse> citasDeLaMascota(@PathVariable Long id) {
        return citaService.listarPorMascota(id);
    }
}
