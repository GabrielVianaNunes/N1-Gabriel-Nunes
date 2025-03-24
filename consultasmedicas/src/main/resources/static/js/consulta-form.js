document.getElementById("consultaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const consulta = {
        medicoId: parseInt(document.getElementById("medicoId").value),
        pacienteId: parseInt(document.getElementById("pacienteId").value),
        dataHora: document.getElementById("dataHora").value
    };

    fetch("/consultas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(consulta)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao agendar consulta");
        }
    })
    .then(data => {
        document.getElementById("mensagem").textContent = "Consulta agendada com sucesso!";
        document.getElementById("consultaForm").reset();
    })
    .catch(error => {
        document.getElementById("mensagem").textContent = error.message;
    });
});
