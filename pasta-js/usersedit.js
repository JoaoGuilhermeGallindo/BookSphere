document.addEventListener('DOMContentLoaded', async () => {
  const profileEl = document.getElementById('profile-nome');

  try {
    const resposta = await fetch('../pasta-php/getUsers.php', {
      credentials: 'include'
    });

    if (!resposta.ok) throw new Error('Usuário não logado');

    const dados = await resposta.json();

    profileEl.textContent = dados.usuario;
    profileEl.style.cursor = 'default'; // muda o cursor para indicar que não é clicável
    profileEl.removeAttribute('onclick');
  } catch (erro) {
    profileEl.textContent = 'Logar';
    profileEl.setAttribute('onclick', "window.location.href='../pasta-html/login.html'");
    profileEl.style.cursor = 'pointer';
  } finally {
    profileEl.style.display = 'block'; // Mostrar o elemento só depois da verificação
  }
});
