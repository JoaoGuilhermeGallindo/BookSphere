document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecuperacaoUsuario');
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
        const novoUsuario = document.getElementById('novo_usuario').value.trim();
        const confirmarUsuario = document.getElementById('confirmar_usuario').value.trim();

        // Validação
        if (!email || !novoUsuario || !confirmarUsuario) {
            mostrarMensagem("Preencha todos os campos.", CORES.alerta);
            return;
        }

        if (novoUsuario !== confirmarUsuario) {
            mostrarMensagem("Os nomes de usuário não coincidem!", CORES.alerta);
            return;
        }

        // Envia os dados
        const formData = new FormData(form);

        try {
            mostrarMensagem("Alterando usuário...", CORES.info);

            const resposta = await fetch("../pasta-php/recuperar_usuario.php", {
                method: "POST",
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes("sucesso")) {
                mostrarMensagem("Usuário alterado com sucesso! Redirecionando...", CORES.sucesso);

                // ✅ AVISO: Define a "bandeira"
                sessionStorage.setItem('fromRecovery', 'true');

                setTimeout(() => {
                    // ✅ CORREÇÃO AQUI
                    // Use 'replace' para não salvar a página de recuperação no histórico
                    window.location.replace("../pasta-html/login.html");
                }, 2000);
            } else if (texto.includes("email_nao_encontrado")) {
                mostrarMensagem("O e-mail digitado não foi encontrado.", CORES.erro);
            } else if (texto.includes("usuario_ja_existe")) { // <-- NOVO ERRO
                mostrarMensagem("Este nome de usuário já está em uso. Escolha outro.", CORES.erro);
            } else if (texto.includes("usuarios_diferentes")) {
                mostrarMensagem("Os nomes de usuário não conferem (servidor).", CORES.alerta);
            } else {
                mostrarMensagem("Erro ao alterar o usuário. Tente novamente.", CORES.erro);
                console.error("Resposta do servidor:", texto);
            }
        } catch (erro) {
            mostrarMensagem("Erro na comunicação com o servidor.", CORES.erro);
        }
    });

    boxMsg.style.display = 'none'; // Esconde a caixa de msg no início
});