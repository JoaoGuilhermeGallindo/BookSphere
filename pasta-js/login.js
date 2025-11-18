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

    // (Dentro do seu login.js)
    // ... (as funções mostrarMensagem e validarEmail ficam aqui em cima) ...

    form.addEventListener('submit', async (e) => {
        // 1. PREVINE O ENVIO TRADICIONAL
        e.preventDefault();

        // Validação de E-mail
        const emailInput = document.getElementById('email');
        if (!validarEmail(emailInput.value)) {
            mostrarMensagem("Por favor, insira um e-mail válido.", 'red');
            return;
        }

        // ===================================
        // ✅ PASSO DE DIAGNÓSTICO
        // ===================================

        // Pega TUDO do formulário
        const formData = new FormData(form);

        console.log("--- Iniciando Envio ---");
        console.log("Dados que estão a ser enviados para o login.php:");

        // Este 'for...of' irá imprimir tudo o que o FormData capturou
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        console.log("------------------------");
        // ===================================

        try {
            // 2. ENVIA OS DADOS USANDO FETCH
            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData // Envia o "envelope"
            });

            // ... (o resto do seu código fetch continua igual) ...
            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');
                setTimeout(() => {
                    window.location.href = '../pasta-html/home.html';
                }, 2000);
            } else if (texto.includes('E-mail não encontrado')) {
                mostrarMensagem('E-mail não encontrado.', 'red');
            } else if (texto.includes('Senha incorreta')) {
                mostrarMensagem('Senha incorreta.', 'red');
            } else {
                mostrarMensagem(texto, 'red');
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