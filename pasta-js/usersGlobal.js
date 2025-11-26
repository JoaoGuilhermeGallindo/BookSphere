// =================================================================
// SCRIPT GLOBAL DE USUÁRIO - CORRIGIDO (LÓGICA RESPONSIVA)
// =================================================================

// 1. Crie a função principal que carrega os dados
async function loadGlobalUserData() {
  // Pega os elementos
  const headerAvatar = document.querySelector('.profile-img img');
  const profileAvatar = document.getElementById('profile-avatar');
  const profileImgContainer = document.querySelector('.profile-img');
  const profileNomeEl = document.getElementById('profile-nome');
  const setinha = document.getElementById('setinha');

  // Esconde os elementos para evitar o "piscar"
  if (profileNomeEl) profileNomeEl.style.visibility = 'hidden';
  if (setinha) setinha.style.visibility = 'hidden';
  if (profileImgContainer) profileImgContainer.style.visibility = 'hidden';

  try {
    const resposta = await fetch('../pasta-php/getUsers.php', {
      credentials: 'include'
    });

    if (!resposta.ok) throw new Error('Usuário não logado');
    const dados = await resposta.json();

    document.body.classList.add('logado');

    // ===================================
    // ✅ LÓGICA DE NOMES RESPONSIVA
    // ===================================
    const rawUsername = dados.usuario;
    let headerUsername = rawUsername;

    // Verifica se a tela é pequena (Mobile < 768px)
    const isMobile = window.innerWidth < 768;

    // Define os limites baseados no tamanho da tela
    // PC: Se passar de 12 (limite 13), corta. Mobile: Se passar de 7 (limite 8), corta.
    const limiteCaracteres = isMobile ? 8 : 11;

    // Onde cortar a string (deixa um pouco maior no PC)
    const pontoDeCorte = isMobile ? 4 : 6;

    if (rawUsername.length >= limiteCaracteres) {
      headerUsername = rawUsername.substring(0, pontoDeCorte) + '...';
    }

    // --- ATUALIZA OS ELEMENTOS (PERFIL) ---
    const nome = document.getElementById('user-name');
    const username = document.getElementById('user-username');
    if (nome) nome.textContent = dados.nome;
    if (username) username.textContent = '@' + rawUsername;

    // --- ATUALIZA O CABEÇALHO ---
    if (profileNomeEl) {
      profileNomeEl.textContent = headerUsername;
      profileNomeEl.removeAttribute('onclick');
      profileNomeEl.style.cursor = 'default';
    }

    // ===================================
    // LÓGICA DA FOTO (MANTIDA IGUAL)
    // ===================================
    const urlImagemDoBanco = dados.imagem;
    let caminhoFinal = '../IMAGENS/SemFoto.jpg';

    if (urlImagemDoBanco && urlImagemDoBanco.trim() !== '') {
      if (urlImagemDoBanco.startsWith('http')) {
        caminhoFinal = urlImagemDoBanco;
      } else {
        caminhoFinal = `../pasta-php/uploads/${urlImagemDoBanco}?v=${new Date().getTime()}`;
      }
    }

    if (headerAvatar) {
      headerAvatar.src = caminhoFinal;
      headerAvatar.onerror = () => { headerAvatar.src = '../IMAGENS/SemFoto.jpg'; };
    }

    if (profileAvatar) {
      profileAvatar.src = caminhoFinal;
      profileAvatar.onerror = () => { profileAvatar.src = '../IMAGENS/SemFoto.jpg'; };
    }

  } catch (erro) {
    // --- LÓGICA DE VISITANTE ---
    document.body.classList.remove('logado');

    if (profileNomeEl) {
      profileNomeEl.textContent = 'Logar';
      profileNomeEl.setAttribute('onclick', "window.location.href='../pasta-html/login.html'");
      profileNomeEl.style.cursor = 'pointer';
    }

    const defaultAvatar = '../IMAGENS/SemFoto.jpg';
    if (headerAvatar) headerAvatar.src = defaultAvatar;
    if (profileAvatar) profileAvatar.src = defaultAvatar;

  } finally {
    // Mostra tudo
    if (profileImgContainer) profileImgContainer.style.visibility = 'visible';
    if (profileNomeEl) profileNomeEl.style.visibility = 'visible';
    if (setinha) setinha.style.visibility = 'visible';
  }
}

// 2. Event Listeners
document.addEventListener('DOMContentLoaded', loadGlobalUserData);

window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    loadGlobalUserData();
  }
});