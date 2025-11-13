// Espera o HTML carregar
document.addEventListener('DOMContentLoaded', () => {

    // --- PARTE 1: LÓGICA DE MOSTRAR ERRO ---
    
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    function mostrarMensagem(texto, cor) {
        mensagem.textContent = texto;
        mensagem.style.color = cor;
        if (texto.trim() !== "") {
            boxMsg.style.display = 'block';
        } else {
            boxMsg.style.display = 'none';
        }
    }

    // Procura por erros na URL (ex: ?error=wrong_pass)
    const urlParams = new URLSearchParams(window.location.search);
    const erro = urlParams.get('error');

    if (erro) {
        // Usa as mensagens do seu login.php
        if (erro === 'not_found') {
            mostrarMensagem('Usuário não encontrado.', 'red');
        } else if (erro === 'wrong_pass') {
            mostrarMensagem('Senha incorreta.', 'red');
        } else if (erro === 'long_user') {
            mostrarMensagem('O usuário não pode ter mais de 30 caracteres.', 'red');
        } else {
            mostrarMensagem('Erro no servidor. Tente novamente.', 'red');
        }
    } else {
        // Esconde a caixa de msg se não houver erro
        boxMsg.style.display = 'none';
    }

    // --- PARTE 2: LÓGICA DE OCULTAR/MOSTRAR SENHA ---
    // (Esta parte continua igual à que você já tinha)

    const senhaInput = document.getElementById('senha');
    const toggleSenha = document.getElementById('toggleSenha');
    const confirmarInput = document.getElementById('confirmar_senha');
    const toggleConfirmar = document.getElementById('toggleConfirmar');

    function togglePasswordVisibility(input, icon) {
        if (!input || !icon) return;

        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        if (type === 'password') {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    }

    if (toggleSenha) {
        toggleSenha.addEventListener('click', () => {
            togglePasswordVisibility(senhaInput, toggleSenha);
        });
    }

    if (toggleConfirmar) {
        toggleConfirmar.addEventListener('click', () => {
            togglePasswordVisibility(confirmarInput, toggleConfirmar);
        });
    }

    // --- PARTE 3: REMOVENDO O FETCH ---
    // O 'form.addEventListener("submit", ...)' foi removido.
    // O formulário agora será enviado da maneira tradicional (HTML puro),
    // o que permite ao navegador ver o login e oferecer para salvar a senha.
});