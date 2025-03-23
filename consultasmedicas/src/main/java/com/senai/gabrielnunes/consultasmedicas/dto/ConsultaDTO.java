package com.senai.gabrielnunes.consultasmedicas.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ConsultaDTO {

    private Long id;

    @NotNull(message = "A data e hora da consulta são obrigatórias")
    @Future(message = "A consulta deve estar em uma data futura")
    private LocalDateTime dataHora;

    @NotNull(message = "O ID do médico é obrigatório")
    private Long medicoId;

    @NotNull(message = "O ID do paciente é obrigatório")
    private Long pacienteId;

    private String status;

    public ConsultaDTO() {}

    public ConsultaDTO(Long id, LocalDateTime dataHora, Long medicoId, Long pacienteId, String status) {
        this.id = id;
        this.dataHora = dataHora;
        this.medicoId = medicoId;
        this.pacienteId = pacienteId;
        this.status = status;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public Long getMedicoId() { return medicoId; }
    public void setMedicoId(Long medicoId) { this.medicoId = medicoId; }

    public Long getPacienteId() { return pacienteId; }
    public void setPacienteId(Long pacienteId) { this.pacienteId = pacienteId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
