package com.petcare.service;

import com.petcare.dto.MascotaRequest;
import com.petcare.dto.MascotaResponse;
import com.petcare.entity.Dueno;
import com.petcare.entity.Mascota;
import com.petcare.exception.ConflictException;
import com.petcare.exception.ResourceNotFoundException;
import com.petcare.repository.CitaRepository;
import com.petcare.repository.DuenoRepository;
import com.petcare.repository.MascotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final DuenoRepository duenoRepository;
    private final CitaRepository citaRepository;

    public MascotaService(MascotaRepository mascotaRepository,
                          DuenoRepository duenoRepository,
                          CitaRepository citaRepository) {
        this.mascotaRepository = mascotaRepository;
        this.duenoRepository = duenoRepository;
        this.citaRepository = citaRepository;
    }

    @Transactional(readOnly = true)
    public List<MascotaResponse> listar() {
        return mascotaRepository.findAll().stream().map(MascotaResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public MascotaResponse obtener(Long id) {
        return MascotaResponse.from(buscar(id));
    }

    /** GET /api/duenos/{id}/mascotas */
    @Transactional(readOnly = true)
    public List<MascotaResponse> listarPorDueno(Long duenoId) {
        if (!duenoRepository.existsById(duenoId)) {
            throw new ResourceNotFoundException("No existe un dueño con id " + duenoId);
        }
        return mascotaRepository.findByDuenoId(duenoId).stream().map(MascotaResponse::from).toList();
    }

    @Transactional
    public MascotaResponse crear(MascotaRequest request) {
        Mascota mascota = new Mascota();
        aplicar(mascota, request);
        return MascotaResponse.from(mascotaRepository.save(mascota));
    }

    @Transactional
    public MascotaResponse actualizar(Long id, MascotaRequest request) {
        Mascota mascota = buscar(id);
        aplicar(mascota, request);
        return MascotaResponse.from(mascotaRepository.save(mascota));
    }

    @Transactional
    public void eliminar(Long id) {
        Mascota mascota = buscar(id);
        if (citaRepository.existsByMascotaId(id)) {
            throw new ConflictException("No se puede eliminar a la mascota " + id
                    + " porque tiene citas registradas. Elimina primero sus citas.");
        }
        mascotaRepository.delete(mascota);
    }

    // ----- helpers -----

    private Mascota buscar(Long id) {
        return mascotaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una mascota con id " + id));
    }

    private void aplicar(Mascota mascota, MascotaRequest request) {
        // Validación de negocio: el dueño debe existir antes de asociarle una mascota.
        Dueno dueno = duenoRepository.findById(request.duenoId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se puede registrar la mascota: no existe un dueño con id " + request.duenoId()));
        mascota.setNombre(request.nombre().trim());
        mascota.setEspecie(request.especie().trim());
        mascota.setRaza(request.raza());
        mascota.setFechaNacimiento(request.fechaNacimiento());
        mascota.setDueno(dueno);
    }
}
