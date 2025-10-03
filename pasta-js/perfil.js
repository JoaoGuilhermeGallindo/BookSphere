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
