package com.senai.gabrielnunes.consultasmedicas.service;

import com.senai.gabrielnunes.consultasmedicas.dto.PacienteDTO;
import com.senai.gabrielnunes.consultasmedicas.exception.ResourceNotFoundException;
import com.senai.gabrielnunes.consultasmedicas.model.Paciente;
import com.senai.gabrielnunes.consultasmedicas.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public PacienteDTO criarPaciente(PacienteDTO dto) {
        if (pacienteRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("Já existe um paciente com este CPF.");
        }

        Paciente p = new Paciente();
        p.setNome(dto.getNome());
        p.setCpf(dto.getCpf());
        p.setDataNascimento(dto.getDataNascimento());
        p.setTelefone(dto.getTelefone());

        Paciente salvo = pacienteRepository.save(p);
        return toDTO(salvo);
    }

    public List<PacienteDTO> listarPacientes() {
        return pacienteRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PacienteDTO buscarPorId(Long id) {
        Paciente p = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));
        return toDTO(p);
    }

    public PacienteDTO atualizarPaciente(Long id, PacienteDTO dto) {
        Paciente p = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));

        p.setNome(dto.getNome());
        p.setCpf(dto.getCpf());
        p.setDataNascimento(dto.getDataNascimento());
        p.setTelefone(dto.getTelefone());

        Paciente atualizado = pacienteRepository.save(p);
        return toDTO(atualizado);
    }

    public void excluirPaciente(Long id) {
        Paciente p = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));
        pacienteRepository.delete(p);
    }

    private PacienteDTO toDTO(Paciente p) {
        return new PacienteDTO(p.getId(), p.getNome(), p.getCpf(), p.getDataNascimento(), p.getTelefone());
    }
}
