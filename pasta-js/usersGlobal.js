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

    // --- LÓGICA DE NOMES CORRIGIDA ---

    // 1. Pega o nome de usuário original (para o perfil)
    const rawUsername = dados.usuario; // ex: "Gallindo"

    // 2. Cria uma versão truncada (para o cabeçalho)
    let headerUsername = rawUsername; // Por padrão, é o nome completo
    if (rawUsername.length >= 8) {
      headerUsername = rawUsername.substring(0, 6) + '...'; // ex: "Gallin..."
    }
    // --- FIM DA LÓGICA ---

    // --- ATUALIZA OS ELEMENTOS CORRETOS ---

    // Elementos da PÁGINA DE PERFIL (usarão nomes completos)
    const nome = document.getElementById('user-name');
    const username = document.getElementById('user-username');
    if (nome) nome.textContent = dados.nome; // Nome completo (ex: João Guilherme...)
    if (username) username.textContent = '@' + rawUsername; // @username (ex: @Gallindo)

    // Elemento do CABEÇALHO (usará o nome truncado)
    const profileNome = document.getElementById('profile-nome');
    if (profileNome) profileNome.textContent = headerUsername; // Nome do cabeçalho (ex: Gallin...)

    // --- ATUALIZA AS IMAGENS ---
    // (O código duplicado e com erro foi removido daqui)

    // Atualiza imagem do perfil, se o usuário tiver uma imagem personalizada
    if (dados.imagem && dados.imagem.trim() !== '') {
      const caminhoImagem = '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime();
      // Assumindo que 'headerAvatar' e 'profileAvatar' estão definidos no topo do seu script
      if (headerAvatar) headerAvatar.src = caminhoImagem;
      if (profileAvatar) profileAvatar.src = caminhoImagem;
    }

    // Quando a imagem carregar (ou se já estiver em cache)
    const mostrarImagem = () => {
      // Certifique-se de que headerAvatar está definido
      if (headerAvatar) headerAvatar.style.opacity = '1';
    };

    if (headerAvatar && headerAvatar.complete) {
      mostrarImagem();
    } else if (headerAvatar) {
      headerAvatar.addEventListener('load', mostrarImagem);
      headerAvatar.addEventListener('error', mostrarImagem);
    }

  } catch (erro) {
    console.warn('Usuário não logado ou erro ao carregar perfil:', erro);

    // ❌ Remove a classe se não estiver logado
    document.body.classList.remove('logado');

    // Mostra a imagem padrão (SemFoto.jpg)
    if (headerAvatar) headerAvatar.style.opacity = '1';

    // Lógica para Visitante (botão "Logar")
    const profileNome = document.getElementById('profile-nome');
    if (profileNome) {
      profileNome.textContent = 'Logar';
      profileNome.setAttribute('onclick', "window.location.href='../pasta-html/login.html'");
      profileNome.style.cursor = 'pointer';
    }
  }
});
