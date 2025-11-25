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

            // Limpa mensagens globais ao digitar
            mostrarMensagem("");

            // Reset visual
            if (statusEmailIcone) statusEmailIcone.style.display = 'none';
            if (msgEmailErro) msgEmailErro.style.display = 'none';

            if (valor.length === 0) return;

            if (statusEmailIcone) {
                statusEmailIcone.style.display = 'block';
                statusEmailIcone.className = 'bi';

                if (validarEmail(valor)) {
                    // Formato Válido (Verde)
                    statusEmailIcone.classList.add('bi-check-circle-fill');
                    statusEmailIcone.style.color = 'green';
                } else {
                    // Formato Inválido (Vermelho)
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
            // Limpa mensagens globais ao digitar
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


    // --- SUBMIT DO FORMULÁRIO ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validação final de formato antes de enviar
        if (!validarEmail(emailInput.value)) {
            mostrarMensagem("Por favor, insira um e-mail válido.", 'red');
            // Força o ícone vermelho
            if (statusEmailIcone) {
                statusEmailIcone.className = 'bi bi-x-circle-fill';
                statusEmailIcone.style.color = 'red';
                statusEmailIcone.style.display = 'block';
            }
            return;
        }

        const formData = new FormData(form);

        try {
            mostrarMensagem("Autenticando...", "blue"); // Feedback imediato

            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');
                setTimeout(() => {
                    // Verifica se tem redirecionamento salvo ou vai pra home
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
                // Ícone vermelho no email
                if (statusEmailIcone) {
                    statusEmailIcone.className = 'bi bi-x-circle-fill';
                    statusEmailIcone.style.color = 'red';
                }

            } else if (texto.includes('Senha incorreta')) {
                mostrarMensagem('Senha incorreta.', 'red');
                // Ícone vermelho na senha
                if (statusSenhaIcone) {
                    statusSenhaIcone.className = 'bi bi-x-circle-fill';
                    statusSenhaIcone.style.color = 'red';
                    statusSenhaIcone.style.display = 'block';
                }
                // Limpa o campo de senha
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

// --- LÓGICA DE OCULTAR/MOSTRAR SENHA (MANTIDA IGUAL) ---
const toggleSenha = document.getElementById('toggleSenha');
const toggleConfirmar = document.getElementById('toggleConfirmar'); // Caso exista em algum lugar
// (Note que deletei a redeclaração de 'senhaInput' pois já declarei acima)

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
// ... (Lógica do Google mantida igual) ...