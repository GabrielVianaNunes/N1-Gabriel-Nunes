package com.senai.gabrielnunes.consultasmedicas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String redirecionarParaHome() {
        return "home";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    // ✅ Rotas para páginas HTML
    @GetMapping("/paciente-form")
    public String pacienteForm() {
        return "paciente-form";
    }

    @GetMapping("/medico-form")
    public String medicoForm() {
        return "medico-form";
    }

    @GetMapping("/consulta-form")
    public String consultaForm() {
        return "consulta-form";
    }

    @GetMapping("/listar-pacientes")
    public String listarPacientes() {
        return "listar-pacientes";
    }

    @GetMapping("/listar-medicos")
    public String listarMedicos() {
        return "listar-medicos";
    }

    @GetMapping("/consultas-gerenciar")
    public String consultasGerenciar() {
        return "consultas-gerenciar";
    }
}
