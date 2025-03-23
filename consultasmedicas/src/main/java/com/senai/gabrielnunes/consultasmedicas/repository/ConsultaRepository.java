package com.senai.gabrielnunes.consultasmedicas.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.gabrielnunes.consultasmedicas.model.Consulta;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    Optional<Consulta> findByPacienteIdAndDataHora(Long pacienteId, LocalDateTime dataHora);

}
