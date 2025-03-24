document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pacienteForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const dataNascimento = document.getElementById("dataNascimento").value;
        const telefone = document.getElementById("telefone").value.trim();

        const paciente = { nome, cpf, dataNascimento, telefone };

        try {
            const response = await fetch("/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paciente)
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(`Erro ao cadastrar paciente: ${erro}`);
            }

            alert("Paciente cadastrado com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar paciente.");
        }
    });
});
