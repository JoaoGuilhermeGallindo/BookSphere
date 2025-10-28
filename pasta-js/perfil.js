document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch('../pasta-php/getUsers.php', {
            credentials: 'include'
        });

        if (!resposta.ok) throw new Error('Usuário não logado');

        const dados = await resposta.json();

        // Atualiza os textos do perfil
        document.getElementById('user-name').textContent = dados.nome;
        document.getElementById('profile-nome').textContent = dados.usuario;
        document.getElementById('user-username').textContent = '@' + dados.usuario;

        // Atualiza a imagem principal do perfil
        const avatar = document.getElementById('profile-avatar');
        const headerAvatar = document.querySelector('.profile-img img'); // <-- imagem do cabeçalho

        if (dados.imagem && dados.imagem.trim() !== '') {
            const caminhoImagem = '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime();
            avatar.src = caminhoImagem;
            headerAvatar.src = caminhoImagem; // <-- atualiza o cabeçalho também
        } else {
            avatar.src = '../IMAGENS/SemFoto.jpg';
            headerAvatar.src = '../IMAGENS/SemFoto.jpg';
        }

    } catch (erro) {
     
    }
});
