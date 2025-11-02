document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    function mostrarMensagem(texto, cor) {
        mensagem.textContent = texto;
        mensagem.style.color = cor;
        if (texto.trim() !== "") {
            boxMsg.style.display = 'block';  // Mostrar
        } else {
            boxMsg.style.display = 'none';   // Ocultar se vazio
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');

                setTimeout(() => {
                    window.location.href = '../pasta-html/index.html';
                }, 3000);
            } else {
                mostrarMensagem(`❌ ${texto}`, 'red');
            }
        } catch (erro) {
            mostrarMensagem('Erro de comunicação com o servidor.', 'red');
        }
    });

    
    // 1. Seleciona os elementos
    const senhaInput = document.getElementById('senha');
    const toggleSenha = document.getElementById('toggleSenha');

    const confirmarInput = document.getElementById('confirmar_senha');
    const toggleConfirmar = document.getElementById('toggleConfirmar');

    // Função auxiliar para alternar um campo
    function togglePasswordVisibility(input, icon) {
        // Verifica o tipo do input
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        // Muda o ícone
        if (type === 'password') {
            // Se for senha, mostra o ícone de "riscado"
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            // Se for texto, mostra o ícone de "olho aberto"
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    }

    // 2. Adiciona o evento de clique para o primeiro ícone
    toggleSenha.addEventListener('click', () => {
        togglePasswordVisibility(senhaInput, toggleSenha);
    });

    // 3. Adiciona o evento de clique para o segundo ícone
    toggleConfirmar.addEventListener('click', () => {
        togglePasswordVisibility(confirmarInput, toggleConfirmar);
    });
    // --- FIM DA NOVA FUNCIONALIDADE ---
});

});
