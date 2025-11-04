// =================================================================
// SCRIPT GLOBAL DE USUÁRIO - CORRIGIDO (COM PAGESHOW E ONCLICK)
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
    // ... (SEU BLOCO 'TRY' CONTINUA EXATAMENTE IGUAL) ...
    const resposta = await fetch('../pasta-php/getUsers.php', {
      credentials: 'include'
    });

    if (!resposta.ok) throw new Error('Usuário não logado');
    const dados = await resposta.json();

    document.body.classList.add('logado');

    // --- LÓGICA DE NOMES ---
    const rawUsername = dados.usuario;
    let headerUsername = rawUsername;
    if (rawUsername.length > 8) {
      headerUsername = rawUsername.substring(0, 8) + '...';
    }

    // --- ATUALIZA OS ELEMENTOS (PERFIL) ---
    const nome = document.getElementById('user-name');
    const username = document.getElementById('user-username');
    if (nome) nome.textContent = dados.nome;
    if (username) username.textContent = '@' + rawUsername;

    // --- ATUALIZA O CABEÇALHO (COM A CORREÇÃO DO ONCLICK) ---
    if (profileNomeEl) {
      profileNomeEl.textContent = headerUsername;
      profileNomeEl.removeAttribute('onclick');
      profileNomeEl.style.cursor = 'default';
    }

    // --- ATUALIZA AS IMAGENS ---
    const caminhoImagem =
      dados.imagem && dados.imagem.trim() !== ''
        ? '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime()
        : '../IMAGENS/SemFoto.jpg';

    if (headerAvatar) headerAvatar.src = caminhoImagem;
    if (profileAvatar) profileAvatar.src = caminhoImagem;

  } catch (erro) {
    // --- LÓGICA DE VISITANTE (AGORA CORRIGIDA) ---
    document.body.classList.remove('logado');

    // Atualiza o NOME para "Logar"
    if (profileNomeEl) {
      profileNomeEl.textContent = 'Logar';
      profileNomeEl.setAttribute('onclick', "window.location.href='../pasta-html/login.html'");
      profileNomeEl.style.cursor = 'pointer';
    }

    // ===================================
    // ✅ CORREÇÃO ADICIONADA AQUI
    // ===================================
    // Define a IMAGEM de volta para o padrão "SemFoto"
    const defaultAvatar = '../IMAGENS/SemFoto.jpg';
    if (headerAvatar) headerAvatar.src = defaultAvatar;
    if (profileAvatar) profileAvatar.src = defaultAvatar;
    // ===================================
    // FIM DA CORREÇÃO
    // ===================================

  } finally {
    // Mostra tudo, logado ou não
    if (profileImgContainer) profileImgContainer.style.visibility = 'visible';
    if (profileNomeEl) profileNomeEl.style.visibility = 'visible';
    if (setinha) setinha.style.visibility = 'visible';
  }
}

// 2. Chame a função no 'DOMContentLoaded' (para o primeiro carregamento da página)
document.addEventListener('DOMContentLoaded', loadGlobalUserData);

// 3. Chame a função no 'pageshow' (para carregamentos do cache ao "Voltar")
window.addEventListener('pageshow', function (event) {
  // event.persisted é true quando a página é carregada do cache
  if (event.persisted) {
    loadGlobalUserData();
  }
});