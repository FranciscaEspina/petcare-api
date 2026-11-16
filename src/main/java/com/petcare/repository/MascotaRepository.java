package com.petcare.repository;

import com.petcare.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    List<Mascota> findByDuenoId(Long duenoId);

    boolean existsByDuenoId(Long duenoId);
}
