document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch('../pasta-php/getUsers.php', {
            credentials: 'include' // <- IMPORTANTE para enviar os cookies da sessão
        });

        if (!resposta.ok) throw new Error('Usuário não logado');

        const dados = await resposta.json();

        document.getElementById('user-name').textContent = dados.nome;
        document.getElementById('profile-nome').textContent = dados.usuario;
        document.getElementById('user-username').textContent = '@' + dados.usuario;

    } catch (erro) {
        alert('Você precisa estar logado para ver o perfil.');
        window.location.href = '../pasta-html/login.html';
    }
});
// Dentro do seu arquivo perfil.js

document.addEventListener('DOMContentLoaded', () => {

    const cameraIcon = document.getElementById('cameraIcon');
    const avatarUploadInput = document.getElementById('avatarUploadInput');
    const avatarImage = document.getElementById('avatarImage');

    // 1. Quando o usuário clicar no ícone da câmera, acione o clique no input de arquivo escondido.
    cameraIcon.addEventListener('click', () => {
        avatarUploadInput.click();
    });

    // 2. Quando o usuário selecionar um arquivo, esta função será executada.
    avatarUploadInput.addEventListener('change', (event) => {
        // Pega o primeiro arquivo que o usuário selecionou
        const file = event.target.files[0];

        if (file) {
            // Cria um objeto FormData para enviar o arquivo
            const formData = new FormData();
            // Adiciona o arquivo ao FormData. A chave 'avatar' DEVE ser a mesma
            // que você espera no PHP: $_FILES['avatar']
            formData.append('avatar', file);

            // 3. Envia o arquivo para o seu script PHP usando a API Fetch
            fetch('http://localhost/BookSphere/pasta-php/salvar_avatar.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(response => response.json()) // Espera uma resposta JSON do PHP
            .then(data => {
                if (data.success) {
                    // Se o upload foi um sucesso, atualize a imagem.
                    // Adicionamos um timestamp para evitar problemas de cache do navegador.
                    alert(data.message); // Exibe a mensagem de sucesso
                    avatarImage.src = '../pasta-php/getAvatar.php?' + new Date().getTime();
                } else {
                    // Se deu erro, exibe a mensagem de erro retornada pelo PHP
                    alert('Erro: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro na requisição:', error);
                alert('Ocorreu um erro de comunicação. Tente novamente.');
            });
        }
    });
});
// No seu arquivo perfil.js

// ANTES (Incorreto para origens diferentes)
// fetch('../pasta-php/salvar_avatar.php', { ... })

// DEPOIS (Correto - use a URL completa do seu servidor XAMPP)
// Ajuste "BookSphere" para o nome da sua pasta no htdocs
// ... o resto do código continua igual