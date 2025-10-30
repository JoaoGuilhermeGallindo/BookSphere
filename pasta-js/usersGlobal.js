document.addEventListener('DOMContentLoaded', async () => {
  const headerAvatar = document.querySelector('.profile-img img');
  const profileAvatar = document.getElementById('profile-avatar');

  if (!headerAvatar) return; // segurança

  // Começa invisível
  headerAvatar.style.opacity = '0';

  try {
    const resposta = await fetch('../pasta-php/getUsers.php', {
      credentials: 'include'
    });

    if (!resposta.ok) throw new Error('Usuário não logado');
    const dados = await resposta.json();

    // ✅ Marca o body como "logado"
    document.body.classList.add('logado');

    // Atualiza nome e username se existirem
    const nome = document.getElementById('user-name');
    const username = document.getElementById('user-username');
    const profileNome = document.getElementById('profile-nome');
    if (nome) nome.textContent = dados.nome;
    if (username) username.textContent = '@' + dados.usuario;
    if (profileNome) profileNome.textContent = dados.usuario;

    // Atualiza imagem do perfil, se o usuário tiver uma imagem personalizada
    if (dados.imagem && dados.imagem.trim() !== '') {
      const caminhoImagem = '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime();
      headerAvatar.src = caminhoImagem;
      if (profileAvatar) profileAvatar.src = caminhoImagem;
    }

    // Quando a imagem carregar (ou se já estiver em cache)
    const mostrarImagem = () => headerAvatar.style.opacity = '1';
    if (headerAvatar.complete) {
      mostrarImagem();
    } else {
      headerAvatar.addEventListener('load', mostrarImagem);
      headerAvatar.addEventListener('error', mostrarImagem);
    }

  } catch (erro) {
    console.warn('Usuário não logado ou erro ao carregar perfil:', erro);

    // ❌ Remove a classe se não estiver logado
    document.body.classList.remove('logado');

    headerAvatar.style.opacity = '1'; // garante que apareça a SemFoto.jpg
  }
});
