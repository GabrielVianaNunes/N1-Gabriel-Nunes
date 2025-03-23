package com.senai.gabrielnunes.consultasmedicas.controller;

import com.senai.gabrielnunes.consultasmedicas.dto.ConsultaDTO;
import com.senai.gabrielnunes.consultasmedicas.service.ConsultaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    public ResponseEntity<ConsultaDTO> agendar(@RequestBody @Valid ConsultaDTO dto) {
        return ResponseEntity.ok(consultaService.agendarConsulta(dto));
    }

    @GetMapping
    public ResponseEntity<List<ConsultaDTO>> listar() {
        return ResponseEntity.ok(consultaService.listarConsultas());
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {
        consultaService.cancelarConsulta(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/realizar")
    public ResponseEntity<Void> realizar(@PathVariable Long id) {
        consultaService.realizarConsulta(id);
        return ResponseEntity.noContent().build();
    }
}
