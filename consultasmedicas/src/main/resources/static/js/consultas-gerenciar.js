const tabela = document.querySelector("#tabelaConsultas tbody");

function carregarConsultas() {
    fetch("/consultas")
        .then(res => res.json())
        .then(consultas => {
            tabela.innerHTML = "";
            consultas.forEach(c => {
                const row = tabela.insertRow();
                row.innerHTML = `
                    <td>${c.id}</td>
                    <td>${c.dataHora.replace("T", " ")}</td>
                    <td>${c.status}</td>
                    <td>${c.medicoId}</td>
                    <td>${c.pacienteId}</td>
                    <td class="acoes">
                        <button class="realizar" onclick="alterarStatus(${c.id}, 'realizar')">Concluir</button>
                        <button class="cancelar" onclick="alterarStatus(${c.id}, 'cancelar')">Cancelar</button>
                    </td>
                `;
            });
        })
        .catch(() => {
            alert("Erro ao carregar consultas.");
        });
}

function alterarStatus(id, acao) {
    fetch(`/consultas/${id}/${acao}`, {
        method: "PUT"
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao atualizar status.");
        return response.text();
    })
    .then(() => {
        alert("Status atualizado com sucesso!");
        carregarConsultas();
    })
    .catch(error => {
        alert(error.message);
    });
}

carregarConsultas();
