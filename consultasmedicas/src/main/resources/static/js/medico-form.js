document.getElementById("medicoForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const medico = {
        nome: document.getElementById("nome").value,
        especialidade: document.getElementById("especialidade").value,
        crm: document.getElementById("crm").value
    };

    fetch("/medicos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(medico)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao cadastrar médico");
        }
    })
    .then(data => {
        document.getElementById("mensagem").textContent = "Médico cadastrado com sucesso!";
        document.getElementById("medicoForm").reset();
    })
    .catch(error => {
        document.getElementById("mensagem").textContent = error.message;
    });
});
