document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pacienteForm");

    // Impedir datas futuras no campo de nascimento
    const dataNascimentoInput = document.getElementById("dataNascimento");
    const hoje = new Date().toISOString().split("T")[0];
    dataNascimentoInput.setAttribute("max", hoje);

    // Máscara de CPF
    const cpfInput = document.getElementById("cpf");
    cpfInput.addEventListener("input", () => {
        let value = cpfInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        cpfInput.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (m, p1, p2, p3, p4) => {
            return `${p1}.${p2}.${p3}${p4 ? "-" + p4 : ""}`;
        });
    });

    // Máscara de telefone
    const telefoneInput = document.getElementById("telefone");
    telefoneInput.addEventListener("input", () => {
        let value = telefoneInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        telefoneInput.value = value.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (m, d1, d2, d3) => {
            let result = "";
            if (d1) result += `(${d1}`;
            if (d1.length === 2) result += `) `;
            if (d2) result += d2;
            if (d2.length === 5 && d3) result += `-${d3}`;
            return result;
        });
    });

    // Enviar formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cpf = cpfInput.value.replace(/\D/g, ""); // enviar só números
        const dataNascimento = dataNascimentoInput.value;
        const telefone = telefoneInput.value.trim();

        const paciente = { nome, cpf, dataNascimento, telefone };

        try {
            const response = await fetch("/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paciente)
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(`Erro ao cadastrar paciente: ${erro}`);
            }

            alert("Paciente cadastrado com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar paciente.");
        }
    });
});
