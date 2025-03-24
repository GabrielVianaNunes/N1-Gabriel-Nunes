fetch("/medicos")
    .then(response => response.json())
    .then(medicos => {
        const tabela = document.querySelector("#tabelaMedicos tbody");
        medicos.forEach(m => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${m.id}</td>
                <td>${m.nome}</td>
                <td>${m.especialidade}</td>
                <td>${m.crm}</td>
            `;
        });
    })
    .catch(() => {
        alert("Erro ao carregar médicos.");
    });
