document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    function mostrarMensagem(texto, cor) {
        mensagem.textContent = texto;
        mensagem.style.color = cor;
        if (texto.trim() !== "") {
            boxMsg.style.display = 'block'; // Mostrar
        } else {
            boxMsg.style.display = 'none'; // Ocultar se vazio
        }
    }
    
    // Função simples para validar e-mail (Regex)
    function validarEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', async (e) => {
        // 1. PREVINE O ENVIO TRADICIONAL
        e.preventDefault();

        // ===================================
        // ✅ MUDANÇA 1: Validar E-mail em vez de Usuário
        // ===================================
        const emailInput = document.getElementById('email');
        if (!validarEmail(emailInput.value)) {
            mostrarMensagem("Por favor, insira um e-mail válido.", 'red');
            return;
        }
        // ===================================

        const formData = new FormData(form);

        try {
            // 2. ENVIA OS DADOS USANDO FETCH
            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            // 3. LÊ A RESPOSTA DO PHP COMO TEXTO
            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');

                setTimeout(() => {
                    // 4. LÓGICA DE REDIRECIONAMENTO INTELIGENTE
                    const fromRecovery = sessionStorage.getItem('fromRecovery');

                    if (fromRecovery === 'true') {
                        sessionStorage.removeItem('fromRecovery');
                        window.history.go(-2);
                    } else {
                        window.history.go(-1);
                    }

                }, 2000); // Espera 2 segundos
                
            // ===================================
            // ✅ MUDANÇA 2: Checar por "E-mail" não encontrado
            // ===================================
            } else if (texto.includes('E-mail não encontrado')) {
                mostrarMensagem('E-mail não encontrado.', 'red');
            } else if (texto.includes('Senha incorreta')) {
                mostrarMensagem('Senha incorreta.', 'red');
            } else {
                mostrarMensagem(texto, 'red'); // Mostra outros erros (ex: 'E-mail inválido')
            }

        } catch (erro) {
            console.error("Erro detalhado do fetch:", erro);
            mostrarMensagem('Erro de comunicação com o servidor.', 'red');
        }
    });

    boxMsg.style.display = 'none'; // <- Inicialmente oculta
});

// --- LÓGICA DE OCULTAR/MOSTRAR SENHA ---
// (Este código permanece 100% igual e limpo)
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