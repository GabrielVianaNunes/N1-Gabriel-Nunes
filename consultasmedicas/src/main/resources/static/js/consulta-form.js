document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("consultaForm");
    const medicoSelect = document.getElementById("medicoId");
    const pacienteSelect = document.getElementById("pacienteId");

    // Carregar médicos no select
    fetch("/medicos")
        .then(res => res.json())
        .then(medicos => {
            medicos.forEach(m => {
                const option = document.createElement("option");
                option.value = m.id;
                option.textContent = `${m.nome} - ${m.especialidade}`;
                medicoSelect.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar médicos:", err);
            alert("Erro ao carregar médicos.");
        });

    // Carregar pacientes no select
    fetch("/pacientes")
        .then(res => res.json())
        .then(pacientes => {
            pacientes.forEach(p => {
                const option = document.createElement("option");
                option.value = p.id;
                option.textContent = `${p.nome} (${p.cpf})`;
                pacienteSelect.appendChild(option);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar pacientes:", err);
            alert("Erro ao carregar pacientes.");
        });

    // Enviar o formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const dataHora = document.getElementById("dataHora").value;
        const medicoId = medicoSelect.value;
        const pacienteId = pacienteSelect.value;

        const consulta = {
            dataHora,
            medicoId,
            pacienteId
        };

        try {
            const response = await fetch("/consultas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(consulta)
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(`Erro ao agendar consulta: ${erro}`);
            }

            alert("Consulta agendada com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao agendar consulta.");
        }
    });
});
