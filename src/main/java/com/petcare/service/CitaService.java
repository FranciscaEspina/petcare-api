package com.petcare.service;

import com.petcare.dto.CitaRequest;
import com.petcare.dto.CitaResponse;
import com.petcare.entity.Cita;
import com.petcare.entity.Mascota;
import com.petcare.exception.ResourceNotFoundException;
import com.petcare.repository.CitaRepository;
import com.petcare.repository.MascotaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final MascotaRepository mascotaRepository;

    public CitaService(CitaRepository citaRepository, MascotaRepository mascotaRepository) {
        this.citaRepository = citaRepository;
        this.mascotaRepository = mascotaRepository;
    }

    @Transactional(readOnly = true)
    public List<CitaResponse> listar() {
        return citaRepository.findAll().stream().map(CitaResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public CitaResponse obtener(Long id) {
        return CitaResponse.from(buscar(id));
    }

    @Transactional(readOnly = true)
    public List<CitaResponse> listarPorMascota(Long mascotaId) {
        if (!mascotaRepository.existsById(mascotaId)) {
            throw new ResourceNotFoundException("No existe una mascota con id " + mascotaId);
        }
        return citaRepository.findByMascotaIdOrderByFechaDesc(mascotaId).stream()
                .map(CitaResponse::from)
                .toList();
    }

    @Transactional
    public CitaResponse crear(CitaRequest request) {
        Cita cita = new Cita();
        aplicar(cita, request);
        return CitaResponse.from(citaRepository.save(cita));
    }

    @Transactional
    public CitaResponse actualizar(Long id, CitaRequest request) {
        Cita cita = buscar(id);
        aplicar(cita, request);
        return CitaResponse.from(citaRepository.save(cita));
    }

    @Transactional
    public void eliminar(Long id) {
        citaRepository.delete(buscar(id));
    }


    private Cita buscar(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una cita con id " + id));
    }

    private void aplicar(Cita cita, CitaRequest request) {
        Mascota mascota = mascotaRepository.findById(request.mascotaId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se puede registrar la cita: no existe una mascota con id " + request.mascotaId()));
        cita.setFecha(request.fecha());
        cita.setMotivo(request.motivo().trim());
        cita.setDiagnostico(request.diagnostico());
        cita.setCosto(request.costo());
        cita.setMascota(mascota);
    }
}
