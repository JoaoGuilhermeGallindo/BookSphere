let profileDropdowList = document.querySelector(".profile-dropdown-list");
let btn2 = document.querySelector(".profile-dropdown-btn");

const toggle = () => profileDropdowList.classList.toggle("active");

window.addEventListener("click", function (e) {
  // Adicionando uma verificação para garantir que 'btn2' existe
  if (btn2 && !btn2.contains(e.target) && profileDropdowList) {
    profileDropdowList.classList.remove("active");
  }
});

// Verifica se o link de "Sair" existe antes de adicionar o listener
let logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
  logoutLink.addEventListener("click", async function (e) {
    e.preventDefault();

    try {
      const resposta = await fetch('../pasta-php/logout.php', {
        method: 'POST',
        credentials: 'include' // importante para enviar cookies de sessão
      });
      if (!resposta.ok) throw new Error('Erro ao sair');

      // ✅ CORREÇÃO APLICADA AQUI
      // Em vez de "voltar", nós "recarregamos" a página atual.
      window.location.reload();

    } catch (erro) {
      alert('Erro ao sair, tente novamente.');
    }
  });
}