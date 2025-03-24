document.addEventListener("DOMContentLoaded", function () {
    const tabelaMedicos = document.getElementById("tabela-medicos");

    fetch("/medicos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar médicos.");
            }
            return response.json();
        })
        .then(medicos => {
            tabelaMedicos.innerHTML = ""; // Limpa antes de adicionar

            medicos.forEach(medico => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${medico.id}</td>
                    <td>${medico.nome}</td>
                    <td>${medico.especialidade}</td>
                    <td>${medico.crm}</td>
                `;

                tabelaMedicos.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao carregar médicos.");
        });
});
