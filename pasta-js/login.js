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

        // Validação de E-mail
        const emailInput = document.getElementById('email');
        if (!validarEmail(emailInput.value)) {
            mostrarMensagem("Por favor, insira um e-mail válido.", 'red');
            return;
        }

        // Pega TUDO do formulário (incluindo o 'rememberMe' se marcado)
        const formData = new FormData(form);

        try {
            // 2. ENVIA OS DADOS USANDO FETCH
            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            // 3. LÊ A RESPOSTA DO PHP COMO TEXTO
            const texto = await resposta.text();

            // ===================================
            // ✅ CORREÇÃO DO 'ELSE IF'
            // ===================================
            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');

                setTimeout(() => {
                    // Limpa a flag de recuperação, se existir
                    sessionStorage.removeItem('fromRecovery');

                    // Redireciona o usuário para a home.html
                    window.location.href = '../pasta-html/home.html';

                }, 2000); // Espera 2 segundos

            } else if (texto.includes('E-mail não encontrado')) {
                mostrarMensagem('E-mail não encontrado.', 'red'); // <-- Bloco corrigido

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
// (Este código está 100% correto e permanece igual)
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

// ====================================================================
// FUNÇÃO GLOBAL PARA O LOGIN DO GOOGLE
// ====================================================================

function processarLoginGoogle(response) {
    const token = response.credential;

    fetch('../pasta-php/login-google.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
        .then(res => res.json())
        .then(dados => {
            if (dados.sucesso) {
                // LOGIN APROVADO!
                const mensagemEl = document.getElementById('mensagem');
                const boxMsgEl = document.querySelector('.box-msg');
                if (mensagemEl && boxMsgEl) {
                    mensagemEl.textContent = "Login com Google realizado!";
                    mensagemEl.style.color = 'green';
                    boxMsgEl.style.display = 'block';
                }

                // Verifica se tem página salva na memória (do livro)
                const destino = sessionStorage.getItem('voltar_para');

                setTimeout(() => {
                    if (destino) {
                        sessionStorage.removeItem('voltar_para');
                        window.location.href = destino;
                    } else {
                        // ===================================
                        // ✅ CORREÇÃO: Redirecionando para home.html
                        // ===================================
                        window.location.href = '../pasta-html/home.html';
                    }
                }, 1000); // Espera 1 segundo

            } else {
                // ERRO
                const mensagemEl = document.getElementById('mensagem');
                const boxMsgEl = document.querySelector('.box-msg');
                if (mensagemEl && boxMsgEl) {
                    mensagemEl.textContent = "Erro Google: " + dados.mensagem;
                    mensagemEl.style.color = 'red';
                    boxMsgEl.style.display = 'block';
                } else {
                    alert('Erro ao logar com Google: ' + dados.mensagem);
                }
            }
        })
        .catch(err => {
            console.error('Erro na requisição Google:', err);
            alert('Erro de conexão com o servidor. Verifique o console (F12).');
        });
}