document.addEventListener("DOMContentLoaded", () => {
    fetch("/pacientes")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar pacientes.");
            }
            return response.json();
        })
        .then(pacientes => {
            const tabela = document.getElementById("tabela-pacientes");
            tabela.innerHTML = ""; // limpa antes de renderizar

            pacientes.forEach(p => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.cpf}</td>
                    <td>${p.dataNascimento}</td>
                    <td>${p.telefone}</td>
                `;

                tabela.appendChild(linha);
            });
        })
        .catch(error => {
            console.error(error);
            alert("Erro ao carregar pacientes.");
        });
});
