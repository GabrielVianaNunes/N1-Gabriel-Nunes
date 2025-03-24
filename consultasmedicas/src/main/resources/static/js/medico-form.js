document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("medicoForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const crm = document.getElementById("crm").value.trim();
        const especialidade = document.getElementById("especialidade").value.trim();

        const medico = { nome, crm, especialidade };

        try {
            const response = await fetch("/medicos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medico)
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(`Erro ao cadastrar médico: ${erro}`);
            }

            alert("Médico cadastrado com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar médico.");
        }
    });
});
