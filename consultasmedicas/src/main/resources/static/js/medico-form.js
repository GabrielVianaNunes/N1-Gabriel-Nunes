document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("medicoForm");

    const crmInput = document.getElementById("crm");

    // Máscara para CRM: 123456-SP
    crmInput.addEventListener("input", () => {
        let value = crmInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (value.length > 9) value = value.slice(0, 9); // limita tamanho

        if (value.length > 6) {
            value = value.slice(0, 6) + "-" + value.slice(6);
        }

        crmInput.value = value;
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const crm = crmInput.value.trim();
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
