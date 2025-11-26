document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
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

    // Função para validar formato de e-mail (Regex)
    function validarEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // --- LÓGICA DE VALIDAÇÃO VISUAL (E-MAIL) ---
    const emailInput = document.getElementById('email');
    const statusEmailIcone = document.getElementById('statusEmailIcone');
    const msgEmailErro = document.getElementById('msgEmailErro');

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const valor = this.value.trim();
            mostrarMensagem(""); // Limpa mensagens

            if (statusEmailIcone) statusEmailIcone.style.display = 'none';
            if (msgEmailErro) msgEmailErro.style.display = 'none';

            if (valor.length === 0) return;

            if (statusEmailIcone) {
                statusEmailIcone.style.display = 'block';
                statusEmailIcone.className = 'bi';

                if (validarEmail(valor)) {
                    statusEmailIcone.classList.add('bi-check-circle-fill');
                    statusEmailIcone.style.color = 'green';
                } else {
                    statusEmailIcone.classList.add('bi-x-circle-fill');
                    statusEmailIcone.style.color = 'red';
                }
            }
        });
    }

    // --- LÓGICA DE VALIDAÇÃO VISUAL (SENHA) ---
    const senhaInput = document.getElementById('senha');
    const statusSenhaIcone = document.getElementById('statusSenhaIcone');

    if (senhaInput) {
        senhaInput.addEventListener('input', function () {
            mostrarMensagem("");
            const valor = this.value;
            if (statusSenhaIcone) {
                if (valor.length > 0) {
                    statusSenhaIcone.style.display = 'block';
                    statusSenhaIcone.className = 'bi bi-check-circle-fill';
                    statusSenhaIcone.style.color = 'green';
                } else {
                    statusSenhaIcone.style.display = 'none';
                }
            }
        });
    }

    // --- SUBMIT DO FORMULÁRIO (LOGIN NORMAL) ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validarEmail(emailInput.value)) {
            mostrarMensagem("Por favor, insira um e-mail válido.", 'red');
            if (statusEmailIcone) {
                statusEmailIcone.className = 'bi bi-x-circle-fill';
                statusEmailIcone.style.color = 'red';
                statusEmailIcone.style.display = 'block';
            }
            return;
        }

        const formData = new FormData(form);

        try {
            mostrarMensagem("Autenticando...", "blue");

            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');
                setTimeout(() => {
                    const destino = sessionStorage.getItem('voltar_para');
                    if (destino) {
                        sessionStorage.removeItem('voltar_para');
                        window.location.href = destino;
                    } else {
                        window.location.href = '../pasta-html/home.html';
                    }
                }, 1500);

            } else if (texto.includes('E-mail não encontrado')) {
                mostrarMensagem('E-mail não encontrado.', 'red');
                if (statusEmailIcone) {
                    statusEmailIcone.className = 'bi bi-x-circle-fill';
                    statusEmailIcone.style.color = 'red';
                }
            } else if (texto.includes('Senha incorreta')) {
                mostrarMensagem('Senha incorreta.', 'red');
                if (statusSenhaIcone) {
                    statusSenhaIcone.className = 'bi bi-x-circle-fill';
                    statusSenhaIcone.style.color = 'red';
                    statusSenhaIcone.style.display = 'block';
                }
                senhaInput.value = "";
            } else {
                mostrarMensagem(texto, 'red');
            }

        } catch (erro) {
            console.error("Erro detalhado do fetch:", erro);
            mostrarMensagem('Erro de comunicação com o servidor.', 'red');
        }
    });

    boxMsg.style.display = 'none';
});

// =========================================================
// CÓDIGO GLOBAL (FORA DO DOMContentLoaded)
// O Google PRECISA que esta função esteja aqui fora para vê-la.
// =========================================================

const toggleSenha = document.getElementById('toggleSenha');
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
        const input = document.getElementById('senha');
        togglePasswordVisibility(input, toggleSenha);
    });
}

// ✅ FUNÇÃO DO GOOGLE (GLOBAL)
function processarLoginGoogle(response) {
    const token = response.credential;

    // Feedback visual (opcional, mas bom)
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');
    if(mensagem) {
        mensagem.textContent = "Verificando Google...";
        mensagem.style.color = "blue";
        if(boxMsg) boxMsg.style.display = "block";
    }

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
            if(mensagem) {
                mensagem.textContent = "Sucesso! Entrando...";
                mensagem.style.color = "green";
            }
            
            // REDIRECIONAMENTO
            setTimeout(() => {
                const destino = sessionStorage.getItem('voltar_para');
                if (destino) {
                    sessionStorage.removeItem('voltar_para');
                    window.location.href = destino;
                } else {
                    window.location.href = '../pasta-html/home.html';
                }
            }, 1000);
        } else {
            alert('Erro ao logar com Google: ' + (dados.mensagem || 'Erro desconhecido'));
        }
    })
    .catch(err => {
        console.error('Erro na requisição Google:', err);
        alert('Erro de conexão com o servidor.');
    });
}