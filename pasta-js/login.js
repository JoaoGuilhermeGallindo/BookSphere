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
                    // ===================================
                    // ✅ CORREÇÃO: Redirecionando para home.html
                    // ===================================

                    // Limpa a flag de recuperação, se existir
                    sessionStorage.removeItem('fromRecovery');

                    // Redireciona o usuário para a home.html
                    // (Ajuste o caminho se 'home.html' não estiver na pasta raiz)
                    window.location.href = '../pasta-html/home.html';

                }, 2000); // Espera 2 segundos

            } else if (texto.includes('E-mail não encontrado')) {

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

// ====================================================================
// FUNÇÃO GLOBAL PARA O LOGIN DO GOOGLE
// (Com a correção de redirecionamento para carregar a foto)
// ====================================================================

function processarLoginGoogle(response) {
    // 1. Pega o Token do Google
    const token = response.credential;

    // 2. Envia para o back-end (PHP) verificar
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

                // Tenta mostrar a mensagem de sucesso (opcional)
                const mensagemEl = document.getElementById('mensagem');
                const boxMsgEl = document.querySelector('.box-msg');
                if (mensagemEl && boxMsgEl) {
                    mensagemEl.textContent = "Login com Google realizado!";
                    mensagemEl.style.color = 'green';
                    boxMsgEl.style.display = 'block';
                }

                // ===================================
                // ✅ CORREÇÃO APLICADA AQUI
                // ===================================
                // Em vez de window.history.go(-1), nós forçamos um
                // redirecionamento completo. Isso garante que a nova
                // foto da sessão seja carregada.

                // Verifica se tem página salva na memória (do livro)
                const destino = sessionStorage.getItem('voltar_para');

                setTimeout(() => {
                    if (destino) {
                        sessionStorage.removeItem('voltar_para'); // Limpa a memória
                        window.location.href = destino; // Vai para o livro (recarregando)
                    } else {
                        // Se não tiver histórico, vai para a home (recarregando)
                        // (Certifique-se que este é o caminho correto para seu index)
                        window.location.href = '../index.html';
                    }
                }, 1000); // Espera 1 segundo

            } else {
                // ERRO (Ex: Email não cadastrado ou erro no banco)
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