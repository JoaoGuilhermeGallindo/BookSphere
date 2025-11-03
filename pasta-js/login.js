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

        // --- NOVA VALIDAÇÃO DE LIMITE ---
        const usuarioInput = document.getElementById('usuario');
        if (usuarioInput.value.length > 30) {
            mostrarMensagem("O usuário não pode ter mais de 30 caracteres.", 'red');
            return;
        }

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
                    // =============================================
                    // ✅ CORREÇÃO APLICADA AQUI
                    // =============================================
                    // Em vez de redirecionar, volta 1 página
                    window.history.go(-1);

                }, 2000); // Espera 3 segundos
            }
            else if (texto.includes('Usuário muito longo')) {
                mostrarMensagem('O usuário não pode ter mais de 30 caracteres.', 'red');
            } else {
                mostrarMensagem(`${texto}`, 'red');
            }
        }
        catch (erro) {
            // ISSO VAI MOSTRAR O ERRO REAL NO CONSOLE (F12)
            console.error("Erro detalhado do fetch:", erro);

            mostrarMensagem('Erro de comunicação com o servidor.', 'red');
        }
    });

    boxMsg.style.display = 'none';  // <- Inicialmente oculta
});

// --- LÓGICA DE OCULTAR/MOSTRAR SENHA ---

const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');
const confirmarInput = document.getElementById('confirmar_senha');
const toggleConfirmar = document.getElementById('toggleConfirmar');

function togglePasswordVisibility(input, icon) {
    if (!input || !icon) return; // Retorna se os elementos não existirem

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



