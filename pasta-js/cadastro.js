document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro');
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

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar_senha').value;

        // Validação simples
        if (!nome || !email || !usuario || !senha) {
            mostrarMensagem("Preencha todos os campos obrigatórios.", CORES.alerta);
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarMensagem("As senhas não coincidem!", CORES.alerta);
            return;
        }

        // Dados para envio
        const formData = new FormData(form);

        try {
            mostrarMensagem("Enviando dados...", CORES.info);

            const resposta = await fetch("/pasta-php/cadastrar.php", {
                method: "POST",
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes("sucesso")) {
                mostrarMensagem("Usuário cadastrado com sucesso!", CORES.sucesso);
                form.reset();
                setTimeout(() => {
                    window.location.href = "../pasta-html/index.html";
                }, 3000);
            } else if (texto.includes("senhas_diferentes")) {
                mostrarMensagem("As senhas não conferem (servidor).", CORES.alerta);
            } else {
                mostrarMensagem("Erro ao cadastrar. Verifique os dados.", CORES.erro);
                console.error("Resposta do servidor:", texto);
            }
        } catch (erro) {
            mostrarMensagem("Erro na comunicação com o servidor.", CORES.erro);
            console.error("Erro fetch:", erro);
        }
    });

    // Inicialmente esconde a box-msg
    boxMsg.style.display = 'none';
});
