document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecuperacao');
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    // Cores padrão
    const CORES = {
        sucesso: "green",
        erro: "red",
        alerta: "orange",
        info: "blue"
    };

    function mostrarMensagem(texto, cor = CORES.info) {
        mensagem.textContent = texto;
        mensagem.style.color = cor;
        boxMsg.style.display = texto.trim() ? 'block' : 'none';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita recarregar a página

        const email = document.getElementById('email').value.trim();
        const novaSenha = document.getElementById('nova_senha').value;
        const confirmarSenha = document.getElementById('confirmar_senha').value;

        // Validação
        if (!email || !novaSenha || !confirmarSenha) {
            mostrarMensagem("Preencha todos os campos.", CORES.alerta);
            return;
        }

        if (novaSenha !== confirmarSenha) {
            mostrarMensagem("As senhas não coincidem!", CORES.alerta);
            return;
        }

        // Envia os dados
        const formData = new FormData(form);

        try {
            mostrarMensagem("Alterando senha...", CORES.info);

            const resposta = await fetch("../pasta-php/recuperar_senha.php", {
                method: "POST",
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes("sucesso")) {
                mostrarMensagem("Senha alterada com sucesso! Redirecionando...", CORES.sucesso);

                // ✅ AVISO: Define a "bandeira"
                sessionStorage.setItem('fromRecovery', 'true');

                setTimeout(() => {
                    // ✅ CORREÇÃO AQUI
                    // Use 'replace' para não salvar a página de recuperação no histórico
                    window.location.replace("../pasta-html/login.html");
                }, 2000);
            } else if (texto.includes("email_nao_encontrado")) {
                // ... (resto do código)
                mostrarMensagem("O e-mail digitado não foi encontrado.", CORES.erro);
            } else if (texto.includes("senhas_diferentes")) {
                mostrarMensagem("As senhas não conferem (servidor).", CORES.alerta);
            } else {
                mostrarMensagem("Erro ao alterar a senha. Tente novamente.", CORES.erro);
                console.error("Resposta do servidor:", texto);
            }
        } catch (erro) {
            mostrarMensagem("Erro na comunicação com o servidor.", CORES.erro);
        }
    });

    // --- LÓGICA DE OCULTAR/MOSTRAR SENHA (REUTILIZADA) ---

    const novaSenhaInput = document.getElementById('nova_senha');
    const toggleNova = document.getElementById('toggleNova');

    const confirmarInput = document.getElementById('confirmar_senha');
    const toggleConfirmar = document.getElementById('toggleConfirmar');

    function togglePasswordVisibility(input, icon) {
        if (!input || !icon) return;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    }

    if (toggleNova) {
        toggleNova.addEventListener('click', () => {
            togglePasswordVisibility(novaSenhaInput, toggleNova);
        });
    }
    if (toggleConfirmar) {
        toggleConfirmar.addEventListener('click', () => {
            togglePasswordVisibility(confirmarInput, toggleConfirmar);
        });
    }

    boxMsg.style.display = 'none'; // Esconde a caixa de msg no início
});