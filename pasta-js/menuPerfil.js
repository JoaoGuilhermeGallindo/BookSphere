
let profileDropdowList = document.querySelector(".profile-dropdown-list");
let btn2 = document.querySelector(".profile-dropdown-btn");

const toggle = () => profileDropdowList.classList.toggle("active");

window.addEventListener("click", function (e) {
  if (!btn2.contains(e.target)) {
    profileDropdowList.classList.remove("active");
  }
});

document.getElementById("logoutLink").addEventListener("click", async function (e) {
  e.preventDefault();

  try {
    const resposta = await fetch('../pasta-php/logout.php', {
      method: 'POST',
      credentials: 'include' // importante para enviar cookies de sessão
    });
    if (!resposta.ok) throw new Error('Erro ao sair');

    window.location.href = '../pasta-html/index.html'; // redireciona para login
  } catch (erro) {
    alert('Erro ao sair, tente novamente.');
  }
});
