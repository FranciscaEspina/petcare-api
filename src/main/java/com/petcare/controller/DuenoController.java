package com.petcare.controller;

import com.petcare.dto.DuenoRequest;
import com.petcare.dto.DuenoResponse;
import com.petcare.dto.MascotaResponse;
import com.petcare.service.DuenoService;
import com.petcare.service.MascotaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/duenos")
public class DuenoController {

    private final DuenoService duenoService;
    private final MascotaService mascotaService;

    public DuenoController(DuenoService duenoService, MascotaService mascotaService) {
        this.duenoService = duenoService;
        this.mascotaService = mascotaService;
    }

    @GetMapping
    public List<DuenoResponse> listar() {
        return duenoService.listar();
    }

    @GetMapping("/{id}")
    public DuenoResponse obtener(@PathVariable Long id) {
        return duenoService.obtener(id);
    }

    @PostMapping
    public ResponseEntity<DuenoResponse> crear(@Valid @RequestBody DuenoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(duenoService.crear(request));
    }

    @PutMapping("/{id}")
    public DuenoResponse actualizar(@PathVariable Long id, @Valid @RequestBody DuenoRequest request) {
        return duenoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        duenoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/mascotas")
    public List<MascotaResponse> mascotasDelDueno(@PathVariable Long id) {
        return mascotaService.listarPorDueno(id);
    }
}
