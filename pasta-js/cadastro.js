document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO FORMULÁRIO DE CADASTRO ---
    const form = document.getElementById('formCadastro');
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    const CORES = {
        sucesso: "green",
        erro: "red",
        alerta: "orange",
        info: "blue"
    };

    function mostrarMensagem(texto, cor = CORES.info) {
        if (mensagem && boxMsg) {
            mensagem.textContent = texto;
            mensagem.style.color = cor;
            boxMsg.style.display = texto.trim() ? 'block' : 'none';
        }
    }

    // --- LÓGICA DE MÁSCARA + VERIFICAÇÃO EM TEMPO REAL (USUÁRIO) ---
    const usuarioInput = document.getElementById('usuario');
    const statusIcone = document.getElementById('statusUsuarioIcone');
    const msgErro = document.getElementById('msgUsuarioErro');
    let timeoutVerificacao = null;

    if (usuarioInput) {
        usuarioInput.addEventListener('input', function () {
            // 1. Transformação visual
            let valor = this.value.toLowerCase().replace(/\s/g, '_');
            this.value = valor;

            // Reset visual IMEDIATO (Esconde tudo ao digitar ou apagar)
            if (statusIcone) statusIcone.style.display = 'none';
            if (msgErro) msgErro.style.display = 'none';
            usuarioInput.style.borderColor = '';
            usuarioInput.setCustomValidity("");

            // Se limpou o campo, cancela qualquer verificação pendente e para
            if (valor.length === 0) {
                clearTimeout(timeoutVerificacao);
                return;
            }

            // 2. Debounce
            clearTimeout(timeoutVerificacao);

            timeoutVerificacao = setTimeout(async () => {
                // VERIFICAÇÃO DE SEGURANÇA 1: Se o usuário apagou tudo enquanto esperava, não faz nada
                if (usuarioInput.value.trim() === '') return;

                try {
                    const resposta = await fetch(`../pasta-php/verificar_usuario_email.php?usuario=${valor}`);
                    const dados = await resposta.json();

                    // VERIFICAÇÃO DE SEGURANÇA 2: Checa novamente se o campo está vazio antes de mostrar o ícone
                    // Isso evita que o ícone "ressurja" se a internet for lenta e o usuário tiver apagado o texto
                    if (usuarioInput.value.trim() === '') {
                        if (statusIcone) statusIcone.style.display = 'none';
                        return;
                    }

                    if (statusIcone) {
                        statusIcone.style.display = 'block';
                        statusIcone.className = 'bi';

                        if (dados.disponivel === true) {
                            statusIcone.classList.add('bi-check-circle-fill');
                            statusIcone.style.color = 'green';
                            usuarioInput.setCustomValidity("");
                        } else {
                            statusIcone.classList.add('bi-x-circle-fill');
                            statusIcone.style.color = 'red';
                            usuarioInput.setCustomValidity("Este usuário já está em uso.");

                            if (msgErro) {
                                msgErro.textContent = "Usuário indisponível.";
                                msgErro.style.display = 'block';
                            }
                        }
                    }
                } catch (error) {
                    console.error("Erro ao verificar usuário", error);
                }
            }, 500);
        });
    }

    // --- LÓGICA DE VERIFICAÇÃO DE EMAIL ---
    const emailInput = document.getElementById('email');
    const statusEmailIcone = document.getElementById('statusEmailIcone');
    const msgEmailErro = document.getElementById('msgEmailErro');
    let timeoutEmail = null;

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            let valor = this.value.trim();

            // Reset visual IMEDIATO
            if (statusEmailIcone) statusEmailIcone.style.display = 'none';
            if (msgEmailErro) msgEmailErro.style.display = 'none';
            emailInput.setCustomValidity("");

            // Se limpou ou não tem @, cancela pendências e para
            if (valor.length === 0 || !valor.includes('@')) {
                clearTimeout(timeoutEmail);
                return;
            }

            clearTimeout(timeoutEmail);

            timeoutEmail = setTimeout(async () => {
                // VERIFICAÇÃO DE SEGURANÇA 1
                if (emailInput.value.trim() === '') return;

                try {
                    const resposta = await fetch(`../pasta-php/verificar_usuario_email.php?email=${encodeURIComponent(valor)}`);
                    if (!resposta.ok) throw new Error('Erro na requisição');

                    const dados = await resposta.json();

                    // VERIFICAÇÃO DE SEGURANÇA 2 (O Pulo do Gato)
                    if (emailInput.value.trim() === '') {
                        if (statusEmailIcone) statusEmailIcone.style.display = 'none';
                        return;
                    }

                    if (statusEmailIcone) {
                        statusEmailIcone.style.display = 'block';
                        statusEmailIcone.className = 'bi';

                        if (dados.disponivel === true) {
                            statusEmailIcone.classList.add('bi-check-circle-fill');
                            statusEmailIcone.style.color = 'green';
                        } else {
                            statusEmailIcone.classList.add('bi-x-circle-fill');
                            statusEmailIcone.style.color = 'red';
                            emailInput.setCustomValidity("Este e-mail já está cadastrado.");

                            if (msgEmailErro) {
                                msgEmailErro.textContent = "E-mail indisponível.";
                                msgEmailErro.style.display = 'block';
                            }
                        }
                    }
                } catch (error) {
                    console.error("Erro ao verificar email:", error);
                }
            }, 500);
        });
    }
    // ... (Lógicas anteriores de Usuário e Email continuam aqui) ...

    // --- LÓGICA DE SENHA FORTE (FEEDBACK DINÂMICO) ---
    const senhaInputRegra = document.getElementById('senha');
    const statusSenhaIcone = document.getElementById('statusSenhaIcone');
    const listaRequisitos = document.getElementById('listaRequisitos');

    // Elementos individuais da lista
    const regraTam = document.getElementById('regra-tam');
    const regraMai = document.getElementById('regra-mai');
    const regraMin = document.getElementById('regra-min');
    const regraNum = document.getElementById('regra-num');
    const regraSim = document.getElementById('regra-sim');

    if (senhaInputRegra) {
        senhaInputRegra.addEventListener('input', function () {
            const valor = this.value;

            // 1. Se estiver vazio, esconde tudo e reseta
            if (valor.length === 0) {
                if (listaRequisitos) listaRequisitos.style.display = 'none';
                if (statusSenhaIcone) statusSenhaIcone.style.display = 'none';
                senhaInputRegra.setCustomValidity("");
                return;
            }

            // 2. Mostra a lista de requisitos
            if (listaRequisitos) listaRequisitos.style.display = 'flex';

            // 3. Verificações Individuais
            let totalValid = 0;

            // Regra: Tamanho >= 8
            if (valor.length >= 8) {
                regraTam.classList.remove('requisito-pendente');
                regraTam.classList.add('requisito-concluido');
                totalValid++;
            } else {
                regraTam.classList.remove('requisito-concluido');
                regraTam.classList.add('requisito-pendente');
            }

            // Regra: Maiúscula
            if (/[A-Z]/.test(valor)) {
                regraMai.classList.remove('requisito-pendente');
                regraMai.classList.add('requisito-concluido');
                totalValid++;
            } else {
                regraMai.classList.remove('requisito-concluido');
                regraMai.classList.add('requisito-pendente');
            }

            // Regra: Minúscula
            if (/[a-z]/.test(valor)) {
                regraMin.classList.remove('requisito-pendente');
                regraMin.classList.add('requisito-concluido');
                totalValid++;
            } else {
                regraMin.classList.remove('requisito-concluido');
                regraMin.classList.add('requisito-pendente');
            }

            // Regra: Número
            if (/\d/.test(valor)) {
                regraNum.classList.remove('requisito-pendente');
                regraNum.classList.add('requisito-concluido');
                totalValid++;
            } else {
                regraNum.classList.remove('requisito-concluido');
                regraNum.classList.add('requisito-pendente');
            }

            // Regra: Símbolo
            if (/[\W_]/.test(valor)) {
                regraSim.classList.remove('requisito-pendente');
                regraSim.classList.add('requisito-concluido');
                totalValid++;
            } else {
                regraSim.classList.remove('requisito-concluido');
                regraSim.classList.add('requisito-pendente');
            }

            // 4. Verifica se TODOS (5 regras) foram cumpridos
            if (totalValid === 5) {
                // SUCESSO COMPLETO: Esconde a lista e mostra o check verde
                listaRequisitos.style.display = 'none';

                statusSenhaIcone.style.display = 'block';
                statusSenhaIcone.className = 'bi bi-check-circle-fill';
                statusSenhaIcone.style.color = 'green';

                senhaInputRegra.setCustomValidity(""); // Senha válida
            } else {
                // AINDA FALTA ALGO: Mantém a lista visível e mostra X vermelho no ícone
                statusSenhaIcone.style.display = 'block';
                statusSenhaIcone.className = 'bi bi-x-circle-fill';
                statusSenhaIcone.style.color = 'red';

                senhaInputRegra.setCustomValidity("Senha fraca."); // Bloqueia envio
            }
        });

        // Quando o campo perde o foco (blur), se estiver incompleto, mantemos o erro?
        // No estilo moderno, geralmente a lista some se o usuário clicar fora, 
        // mas vamos deixar aparecendo para ele corrigir.
    }
    // --- LÓGICA DE CONFIRMAR SENHA ---
    const inputSenhaPrincipal = document.getElementById('senha');
    const inputConfirmar = document.getElementById('confirmar_senha');
    const statusConfirmar = document.getElementById('statusConfirmarIcone');
    const msgConfirmarErro = document.getElementById('msgConfirmarErro');

    function validarConfirmacao() {
        // Se o campo de confirmação ou o de senha principal não existirem no HTML, para.
        if (!inputConfirmar || !inputSenhaPrincipal) return;

        const senha1 = inputSenhaPrincipal.value;
        const senha2 = inputConfirmar.value;

        // Reset visual inicial
        if (statusConfirmar) statusConfirmar.style.display = 'none';
        if (msgConfirmarErro) msgConfirmarErro.style.display = 'none';
        inputConfirmar.setCustomValidity("");

        // Se o campo confirmar estiver vazio, não mostra erro nem sucesso
        if (senha2.length === 0) return;

        if (statusConfirmar) {
            statusConfirmar.style.display = 'block';
            statusConfirmar.className = 'bi'; // Limpa classes anteriores

            if (senha1 === senha2) {
                // SUCESSO: Senhas iguais
                statusConfirmar.classList.add('bi-check-circle-fill');
                statusConfirmar.style.color = 'green';
                inputConfirmar.setCustomValidity(""); // Libera o envio
            } else {
                // ERRO: Senhas diferentes
                statusConfirmar.classList.add('bi-x-circle-fill');
                statusConfirmar.style.color = 'red';

                // Mostra mensagem e bloqueia envio
                if (msgConfirmarErro) msgConfirmarErro.style.display = 'block';
                inputConfirmar.setCustomValidity("As senhas não coincidem.");
            }
        }
    }

    if (inputConfirmar) {
        // Verifica quando digita no Confirmar
        inputConfirmar.addEventListener('input', validarConfirmacao);

        // Verifica TAMBÉM quando altera a Senha Principal (para atualizar o status do confirmar em tempo real)
        if (inputSenhaPrincipal) {
            inputSenhaPrincipal.addEventListener('input', () => {
                // Só valida a confirmação se já tiver algo digitado nela
                if (inputConfirmar.value.length > 0) {
                    validarConfirmacao();
                }
            });
        }
    }

    // --- LÓGICA DO SUBMIT DO FORMULÁRIO ---
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const usuario = document.getElementById('usuario').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar_senha').value;

            // SELETORES DA IMAGEM (Adicionados aqui para garantir que existam)
            const fileInputCheck = document.getElementById('imagem');
            const uploaderLabel = document.querySelector('.profile-pic-uploader');
            const msgFotoErro = document.getElementById('msgFotoErro');

            // 1. VERIFICAÇÃO DE CAMPOS VAZIOS (TEXTO)
            if (!nome || !email || !usuario || !senha) {
                mostrarMensagem("Preencha todos os campos obrigatórios.", CORES.alerta);
                return;
            }

            // 2. VERIFICAÇÃO DA FOTO (MANUAL)
            // Agora que removemos o 'required' do HTML, o JS assume o controle aqui
            if (fileInputCheck.files.length === 0) {
                mostrarMensagem("Por favor, escolha uma foto de perfil.", CORES.alerta);

                // Efeito visual na foto
                if (uploaderLabel) uploaderLabel.style.border = '2px solid #ff3333';

                if (msgFotoErro) {
                    msgFotoErro.textContent = "Foto obrigatória.";
                    msgFotoErro.style.display = 'block';
                }
                return; // Para o envio aqui!
            }

            if (nome.length > 100) {
                mostrarMensagem("O nome completo não pode ter mais de 100 caracteres.", CORES.alerta);
                return;
            }
            if (senha !== confirmarSenha) {
                mostrarMensagem("As senhas não coincidem!", CORES.alerta);
                return;
            }

            const formData = new FormData(form);

            try {
                mostrarMensagem("Enviando dados...", CORES.info);
                const resposta = await fetch("../pasta-php/cadastrar.php", { // Verifique se o caminho '../' está correto
                    method: "POST",
                    body: formData
                });
                const texto = await resposta.text();

                if (texto.includes("sucesso")) {
                    mostrarMensagem("Usuário cadastrado com sucesso!", CORES.sucesso);
                    form.reset();

                    // Limpa visualmente os ícones e bordas
                    if (statusIcone) statusIcone.style.display = 'none';
                    if (statusEmailIcone) statusEmailIcone.style.display = 'none';
                    if (uploaderLabel) uploaderLabel.style.border = '';
                    if (msgFotoErro) msgFotoErro.style.display = 'none';
                    if (imagePreview) {
                        imagePreview.style.display = 'none';
                        imagePreview.src = '#';
                    }
                    if (uploadPrompt) uploadPrompt.style.display = 'flex';

                    setTimeout(() => {
                        window.history.go(-1);
                    }, 2000);

                } else if (texto.includes("senhas_diferentes")) {
                    mostrarMensagem("As senhas não conferem (servidor).", CORES.alerta);
                } else if (texto.includes("nome_muito_longo")) {
                    mostrarMensagem("O nome completo não pode ter mais de 100 caracteres.", CORES.erro);
                } else if (texto.includes("usuario_muito_longo")) {
                    mostrarMensagem("O nome de usuário não pode ultrapassar 30 caracteres.", CORES.erro);
                } else if (texto.includes("senha_fraca")) {
                    mostrarMensagem("Sua senha não atende aos requisitos de segurança.", CORES.erro);
                } else if (texto.includes("senha_muito_longa")) {
                    mostrarMensagem("A senha é muito longa (máximo 255 caracteres).", CORES.erro);
                } else {
                    mostrarMensagem("Erro ao cadastrar. Verifique os dados.", CORES.erro);
                    console.error("Resposta do servidor:", texto);
                }
            } catch (erro) {
                mostrarMensagem("Erro na comunicação com o servidor.", CORES.erro);
                console.error("Erro fetch:", erro);
            }
        });
    }

    if (boxMsg) {
        boxMsg.style.display = 'none';
    }

    // --- LÓGICA DE OCULTAR/MOSTRAR SENHA ---
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

    // --- LÓGICA DO PREVIEW COM RECORTE (CROPPER JS) ---
    const fileInput = document.getElementById('imagem');
    const imagePreview = document.getElementById('image-preview');
    const uploadPrompt = document.querySelector('.upload-prompt');
    const uploaderLabel = document.querySelector('.profile-pic-uploader');
    const msgFotoErro = document.getElementById('msgFotoErro');

    // Elementos do Modal
    const modalRecorte = document.getElementById('modalRecorte');
    const imagemParaCortar = document.getElementById('imagemParaCortar');
    const btnCancelarRecorte = document.getElementById('btnCancelarRecorte');
    const btnCortarImagem = document.getElementById('btnCortarImagem');

    let cropper = null; // Variável para guardar a instância do cortador

    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            const files = e.target.files;

            // Limpa erros visuais
            if (msgFotoErro) msgFotoErro.style.display = 'none';
            if (uploaderLabel) uploaderLabel.style.border = '';
            mostrarMensagem("");

            if (files && files.length > 0) {
                const file = files[0];

                // Valida se é imagem
                if (!file.type.startsWith('image/')) {
                    alert("Por favor, selecione um arquivo de imagem.");
                    this.value = ""; // Limpa input
                    return;
                }

                // Carrega a imagem no Modal em vez de no preview direto
                const reader = new FileReader();
                reader.onload = function (evt) {
                    imagemParaCortar.src = evt.target.result;
                    modalRecorte.style.display = 'block'; // Abre o modal

                    // Se já tiver um cropper ativo, destrói para criar um novo
                    if (cropper) {
                        cropper.destroy();
                    }

                    // Inicializa o Cropper
                    cropper = new Cropper(imagemParaCortar, {
                        aspectRatio: 1, // Força quadrado (1:1)
                        viewMode: 1,    // Restringe o corte dentro da imagem
                        autoCropArea: 0.8, // Tamanho inicial
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Ação do Botão CANCELAR
    if (btnCancelarRecorte) {
        btnCancelarRecorte.addEventListener('click', () => {
            modalRecorte.style.display = 'none';
            fileInput.value = ""; // Limpa o input pois desistiu
            if (cropper) cropper.destroy();
        });
    }

    // Ação do Botão CORTAR (CONFIRMAR)
    if (btnCortarImagem) {
        btnCortarImagem.addEventListener('click', () => {
            if (!cropper) return;

            // 1. Pega o resultado do corte como Canvas
            const canvas = cropper.getCroppedCanvas({
                width: 300, // Redimensiona para não ficar gigante (opcional)
                height: 300,
            });

            // 2. Transforma o canvas em URL para mostrar no Preview
            imagePreview.src = canvas.toDataURL();
            imagePreview.style.display = 'block';
            imagePreview.style.objectPosition = 'center center'; // Agora é sempre centralizado
            if (uploadPrompt) uploadPrompt.style.display = 'none';

            // 3. A MÁGICA: Transforma o canvas em ARQUIVO para enviar pro PHP
            canvas.toBlob((blob) => {
                // Cria um novo arquivo com o conteúdo cortado
                const arquivoCortado = new File([blob], "perfil_cortado.jpg", { type: "image/jpeg" });

                // Cria um container de arquivos para substituir o do input original
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(arquivoCortado);

                // Substitui o arquivo original pelo cortado no input
                fileInput.files = dataTransfer.files;

                // Fecha o modal
                modalRecorte.style.display = 'none';
                if (cropper) cropper.destroy();

            }, 'image/jpeg');
        });
    }
    // ... (Coloque isso antes de fechar a chave final '})' do DOMContentLoaded)

    // --- LÓGICA GERAL: LIMPAR MENSAGEM GLOBAL AO INTERAGIR ---
    // Seleciona todos os inputs do formulário
    const todosInputs = form.querySelectorAll('input');

    todosInputs.forEach(input => {
        // Adiciona um ouvinte em cada campo
        input.addEventListener('input', () => {
            // Se houver alguma mensagem de erro lá embaixo, ela some ao digitar
            mostrarMensagem("");
        });
    });
});