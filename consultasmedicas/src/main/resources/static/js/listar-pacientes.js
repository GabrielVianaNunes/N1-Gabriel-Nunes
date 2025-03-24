fetch("/pacientes")
    .then(response => response.json())
    .then(pacientes => {
        const tabela = document.querySelector("#tabelaPacientes tbody");
        pacientes.forEach(p => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.dataNascimento}</td>
                <td>${p.telefone}</td>
            `;
        });
    })
    .catch(() => {
        alert("Erro ao carregar pacientes.");
    });
