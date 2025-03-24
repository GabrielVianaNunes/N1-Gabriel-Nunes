document.getElementById("pacienteForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const paciente = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        telefone: document.getElementById("telefone").value
    };

    fetch("/pacientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao cadastrar paciente");
        }
    })
    .then(data => {
        document.getElementById("mensagem").textContent = "Paciente cadastrado com sucesso!";
        document.getElementById("pacienteForm").reset();
    })
    .catch(error => {
        document.getElementById("mensagem").textContent = error.message;
    });
});
