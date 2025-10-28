document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch('../pasta-php/getUsers.php', {
            credentials: 'include'
        });

        if (!resposta.ok) throw new Error('Usuário não logado');

        const dados = await resposta.json();

        // Atualiza nome e username se existirem na página
        const nome = document.getElementById('user-name');
        const username = document.getElementById('user-username');
        const profileNome = document.getElementById('profile-nome');
        if (nome) nome.textContent = dados.nome;
        if (username) username.textContent = '@' + dados.usuario;
        if (profileNome) profileNome.textContent = dados.usuario;

        // Atualiza imagens (tanto do cabeçalho quanto do perfil)
        const headerAvatar = document.querySelector('.profile-img img');
        const profileAvatar = document.getElementById('profile-avatar');

        const caminhoImagem =
            dados.imagem && dados.imagem.trim() !== ''
                ? '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime()
                : '../IMAGENS/SemFoto.jpg';

        if (headerAvatar) headerAvatar.src = caminhoImagem;
        if (profileAvatar) profileAvatar.src = caminhoImagem;

    } catch (erro) {
        console.warn('Usuário não logado ou erro ao carregar perfil:', erro);
    }
});
