document.addEventListener("DOMContentLoaded", function () {
    const tabelaConsultas = document.getElementById("tabela-consultas");

    function carregarConsultas() {
        fetch("http://localhost:8082/consultas")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar consultas.");
                }
                return res.json();
            })
            .then(data => {
                tabelaConsultas.innerHTML = "";
                data.forEach(consulta => {
                    const tr = document.createElement("tr");

                    const dataHoraFormatada = new Date(consulta.dataHora).toLocaleString("pt-BR");

                    tr.innerHTML = `
                        <td>${consulta.id}</td>
                        <td>${dataHoraFormatada}</td>
                        <td>${consulta.medicoId}</td>
                        <td>${consulta.pacienteId}</td>
                        <td>${consulta.status}</td>
                        <td>
                            <button onclick="cancelarConsulta(${consulta.id})">Cancelar</button>
                            <button onclick="realizarConsulta(${consulta.id})">Concluir</button>
                        </td>
                    `;
                    tabelaConsultas.appendChild(tr);
                });
            })
            .catch(error => {
                console.error(error);
                alert("Erro ao carregar consultas.");
            });
    }

    window.cancelarConsulta = function (id) {
        fetch(`http://localhost:8082/consultas/${id}/cancelar`, { method: "PUT" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao cancelar consulta.");
                }
                carregarConsultas();
            })
            .catch(error => {
                console.error(error);
                alert("Erro ao cancelar consulta.");
            });
    };

    window.realizarConsulta = function (id) {
        fetch(`http://localhost:8082/consultas/${id}/realizar`, { method: "PUT" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao concluir consulta.");
                }
                carregarConsultas();
            })
            .catch(error => {
                console.error(error);
                alert("Erro ao concluir consulta.");
            });
    };

    carregarConsultas();
});
