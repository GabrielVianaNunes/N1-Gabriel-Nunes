package com.senai.gabrielnunes.consultasmedicas.service;

import com.senai.gabrielnunes.consultasmedicas.dto.ConsultaDTO;
import com.senai.gabrielnunes.consultasmedicas.exception.ResourceNotFoundException;
import com.senai.gabrielnunes.consultasmedicas.model.Consulta;
import com.senai.gabrielnunes.consultasmedicas.model.Medico;
import com.senai.gabrielnunes.consultasmedicas.model.Paciente;
import com.senai.gabrielnunes.consultasmedicas.repository.ConsultaRepository;
import com.senai.gabrielnunes.consultasmedicas.repository.MedicoRepository;
import com.senai.gabrielnunes.consultasmedicas.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public ConsultaDTO agendarConsulta(ConsultaDTO dto) {
        if (consultaRepository.findByPacienteIdAndDataHora(dto.getPacienteId(), dto.getDataHora()).isPresent()) {
            throw new IllegalArgumentException("Paciente já possui uma consulta nesse horário.");
        }

        Medico medico = medicoRepository.findById(dto.getMedicoId())
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));

        Consulta consulta = new Consulta();
        consulta.setDataHora(dto.getDataHora());
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setStatus(Consulta.StatusConsulta.AGENDADA);

        Consulta salva = consultaRepository.save(consulta);
        return toDTO(salva);
    }

    public List<ConsultaDTO> listarConsultas() {
        return consultaRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void cancelarConsulta(Long id) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consulta não encontrada"));

        consulta.setStatus(Consulta.StatusConsulta.CANCELADA);
        consultaRepository.save(consulta);
    }

    public void realizarConsulta(Long id) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consulta não encontrada"));

        consulta.setStatus(Consulta.StatusConsulta.REALIZADA);
        consultaRepository.save(consulta);
    }

    private ConsultaDTO toDTO(Consulta c) {
        return new ConsultaDTO(
                c.getId(),
                c.getDataHora(),
                c.getMedico().getId(),
                c.getPaciente().getId(),
                c.getStatus().name()
        );
    }
}
