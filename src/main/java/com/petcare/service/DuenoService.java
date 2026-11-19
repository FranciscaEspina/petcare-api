package com.petcare.service;

import com.petcare.dto.DuenoRequest;
import com.petcare.dto.DuenoResponse;
import com.petcare.entity.Dueno;
import com.petcare.exception.BadRequestException;
import com.petcare.exception.ConflictException;
import com.petcare.exception.ResourceNotFoundException;
import com.petcare.repository.DuenoRepository;
import com.petcare.repository.MascotaRepository;
import com.petcare.util.RutUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DuenoService {

    private final DuenoRepository duenoRepository;
    private final MascotaRepository mascotaRepository;

    public DuenoService(DuenoRepository duenoRepository, MascotaRepository mascotaRepository) {
        this.duenoRepository = duenoRepository;
        this.mascotaRepository = mascotaRepository;
    }

    @Transactional(readOnly = true)
    public List<DuenoResponse> listar() {
        return duenoRepository.findAll().stream().map(DuenoResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public DuenoResponse obtener(Long id) {
        return DuenoResponse.from(buscar(id));
    }

    @Transactional
    public DuenoResponse crear(DuenoRequest request) {
        String rut = validarRut(request.rut());
        if (duenoRepository.existsByRut(rut)) {
            throw new ConflictException("Ya existe un dueño registrado con el RUT " + rut);
        }
        Dueno dueno = new Dueno();
        aplicar(dueno, request, rut);
        return DuenoResponse.from(duenoRepository.save(dueno));
    }

    @Transactional
    public DuenoResponse actualizar(Long id, DuenoRequest request) {
        Dueno dueno = buscar(id);
        String rut = validarRut(request.rut());
        if (duenoRepository.existsByRutAndIdNot(rut, id)) {
            throw new ConflictException("Ya existe otro dueño registrado con el RUT " + rut);
        }
        aplicar(dueno, request, rut);
        return DuenoResponse.from(duenoRepository.save(dueno));
    }

    @Transactional
    public void eliminar(Long id) {
        Dueno dueno = buscar(id);
        if (mascotaRepository.existsByDuenoId(id)) {
            throw new ConflictException("No se puede eliminar al dueño " + id
                    + " porque tiene mascotas registradas. Elimina primero sus mascotas.");
        }
        duenoRepository.delete(dueno);
    }


    private Dueno buscar(Long id) {
        return duenoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un dueño con id " + id));
    }

    private String validarRut(String rutOriginal) {
        String rut = RutUtil.normalizar(rutOriginal);
        if (!RutUtil.esValido(rut)) {
            throw new BadRequestException(
                    "El RUT '" + rutOriginal + "' no es válido. Formato esperado: 12.345.678-5 o 12345678-5");
        }
        return rut;
    }

    private void aplicar(Dueno dueno, DuenoRequest request, String rutNormalizado) {
        dueno.setRut(rutNormalizado);
        dueno.setNombre(request.nombre().trim());
        dueno.setTelefono(request.telefono());
        dueno.setEmail(request.email());
    }
}
