package com.senai.gabrielnunes.consultasmedicas.service;

import com.senai.gabrielnunes.consultasmedicas.dto.MedicoDTO;
import com.senai.gabrielnunes.consultasmedicas.exception.ResourceNotFoundException;
import com.senai.gabrielnunes.consultasmedicas.model.Medico;
import com.senai.gabrielnunes.consultasmedicas.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public MedicoDTO criarMedico(MedicoDTO dto) {
        if (medicoRepository.existsByCrm(dto.getCrm())) {
            throw new IllegalArgumentException("Já existe um médico com este CRM.");
        }

        Medico medico = new Medico();
        medico.setNome(dto.getNome());
        medico.setEspecialidade(dto.getEspecialidade());
        medico.setCrm(dto.getCrm());

        Medico salvo = medicoRepository.save(medico);
        return new MedicoDTO(salvo.getId(), salvo.getNome(), salvo.getEspecialidade(), salvo.getCrm());
    }

    public List<MedicoDTO> listarMedicos() {
        return medicoRepository.findAll()
                .stream()
                .map(m -> new MedicoDTO(m.getId(), m.getNome(), m.getEspecialidade(), m.getCrm()))
                .collect(Collectors.toList());
    }

    public MedicoDTO buscarPorId(Long id) {
        Medico m = medicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));
        return new MedicoDTO(m.getId(), m.getNome(), m.getEspecialidade(), m.getCrm());
    }

    public MedicoDTO atualizarMedico(Long id, MedicoDTO dto) {
        Medico m = medicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));

        m.setNome(dto.getNome());
        m.setEspecialidade(dto.getEspecialidade());
        m.setCrm(dto.getCrm());

        Medico atualizado = medicoRepository.save(m);
        return new MedicoDTO(atualizado.getId(), atualizado.getNome(), atualizado.getEspecialidade(), atualizado.getCrm());
    }

    public void excluirMedico(Long id) {
        Medico m = medicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));

        medicoRepository.delete(m);
    }
}
