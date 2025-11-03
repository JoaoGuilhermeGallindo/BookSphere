// --- Seleção de Elementos ---
let profileDropdowList = document.querySelector(".profile-dropdown-list");
let btn2 = document.querySelector(".profile-dropdown-btn");
let setinha = document.getElementById("setinha");
let logoutLink = document.getElementById("logoutLink");

// --- NOVO: Seleção do Modal Global ---
const globalAlertModal = document.getElementById("global-alert-modal");
const globalAlertMsg = document.getElementById("global-alert-message");
const globalAlertOkBtn = document.getElementById("global-alert-ok");

// Função para abrir/fechar o dropdown
const toggle = () => {
  if (profileDropdowList) {
    profileDropdowList.classList.toggle("active");
  }
};

// --- NOVO: Função para mostrar o modal ---
function showGlobalAlert(message) {
  if (globalAlertModal && globalAlertMsg) {
    globalAlertMsg.textContent = message;
    globalAlertModal.hidden = false;
  }
}

// --- NOVO: Evento para fechar o modal ---
if (globalAlertOkBtn) {
  globalAlertOkBtn.addEventListener("click", () => {
    globalAlertModal.hidden = true;
  });
}

// --- LÓGICA DE CLIQUE (Atualizada) ---
if (setinha) {
  setinha.addEventListener("click", function () {
    const isUserLoggedIn = document.body.classList.contains('logado');
    if (isUserLoggedIn) {
      toggle();
    } else {
      // Chama o novo modal em vez do alert()
      showGlobalAlert("Você precisa estar logado para abrir o menu.");
    }
  });
}

// --- Evento para FECHAR o dropdown se clicar fora ---
window.addEventListener("click", function (e) {
  // Fecha o dropdown
  if (btn2 && !btn2.contains(e.target) && profileDropdowList) {
    profileDropdowList.classList.remove("active");
  }
  // Opcional: fecha o modal se clicar no fundo escuro
  if (e.target === globalAlertModal) {
    globalAlertModal.hidden = true;
  }
});

// --- Evento de LOGOUT (Atualizado para usar o modal) ---
if (logoutLink) {
  logoutLink.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      const resposta = await fetch('../pasta-php/logout.php', {
        method: 'POST',
        credentials: 'include'
      });
      if (!resposta.ok) throw new Error('Erro ao sair');

      window.location.reload(); // Recarrega a página

    } catch (erro) {
      // Usa o modal de alerta para erros também!
      showGlobalAlert('Erro ao sair, tente novamente.');
    }
  });
}