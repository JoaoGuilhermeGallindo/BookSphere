// Setup de elementos
const params = new URLSearchParams(window.location.search);
const pdfFile = params.get("pdf");
const bookGenre = params.get("genre") || "default";
const bookTitle = params.get("title") || "Título Desconhecido"; // <-- NOVO
const bookCover = params.get("cover") || "../IMAGENS/SemFoto.jpg"; // <-- NOVO
// Converte o gênero para um nome de classe CSS (ex: "história-em-quadrinhos")
const genreClass = `genre-${bookGenre.toLowerCase().replace(/ /g, "-")}`;
// ... (resto do seu código)
document.body.classList.add(genreClass); // Adiciona a classe ao body na hora
if (!pdfFile) {
  document.body.innerHTML = "<p>Arquivo PDF não especificado.</p>";
  throw new Error("PDF não especificado");
}
const pdfPath = `../LIVROS-PDF-LEITURA/${decodeURIComponent(pdfFile)}`;
const storageKey = `pdfReader-${pdfFile}`;
// Pega o status de login do atributo data-* que definimos no HTML
const IS_LOGGED_IN = document.body.dataset.isLoggedIn === "true";
// O 'pdfFile' que você já tem será nosso 'book_id'
const PDF_BOOK_ID = decodeURIComponent(pdfFile);

// Seleciona todos os elementos, incluindo os novos de mobile
const elements = {
  mainContent: document.getElementById("main-content"),
  leftCanvas: document.getElementById("leftPageCanvas"),
  rightCanvas: document.getElementById("rightPageCanvas"),
  rightPageWrapper: document.getElementById("right-page-wrapper"),
  btnExp: document.querySelector("#btn-exp"),
  menuLateral: document.querySelector(".menu-lateral"),
  zoomInBtn: document.getElementById("zoom-in"),
  zoomOutBtn: document.getElementById("zoom-out"),
  themeBtn: document.getElementById("theme-btn"),
  themeIconContainer: document.getElementById("theme-icon-container"),
  annotateBtn: document.getElementById("annotate-btn"),
  viewAnnotationsBtn: document.getElementById("view-annotations-btn"),
  bookmarkIconLeft: document.getElementById("bookmark-icon-left"),
  bookmarkIconRight: document.getElementById("bookmark-icon-right"),
  noteModal: document.getElementById("note-modal"),
  noteModalTitle: document.getElementById("note-modal-title"),
  noteInput: document.getElementById("note-input"),
  noteSaveBtn: document.getElementById("note-save"),
  noteCancelBtn: document.getElementById("note-cancel"),
  annotationsPanel: document.getElementById("annotations-panel"),
  closeAnnotationsBtn: document.getElementById("close-annotations-btn"),
  annotationsList: document.getElementById("annotations-list"),
  annotationSearchInput: document.getElementById("annotation-search-input"),
  annotationActionModal: document.getElementById("annotation-action-modal"),
  annotationCloseBtn: document.getElementById("annotation-close"),
  annotationEditBtn: document.getElementById("annotation-edit"),
  annotationDeleteBtn: document.getElementById("annotation-delete"),
  alertModal: document.getElementById("alert-modal"),
  alertMessage: document.getElementById("alert-message"),
  alertOkBtn: document.getElementById("alert-ok"),
  pageIndicator: document.getElementById("page-indicator"),
  pageIndicator2: document.getElementById("page-indicator2"),
  mobileViewProgressBtn: document.getElementById("mobileViewProgressBtn"),
  confirmDeleteModal: document.getElementById("confirm-delete-modal"),
  confirmDeleteBtn: document.getElementById("confirm-delete-btn"),
  confirmCancelBtn: document.getElementById("confirm-cancel-btn"),
  // Novos elementos para mobile
  mobileZoomInBtn: document.getElementById("mobile-zoom-in"),
  mobileZoomOutBtn: document.getElementById("mobile-zoom-out"),
  mobileThemeBtn: document.getElementById("mobile-theme-btn"),
  mobileAnnotateBtn: document.getElementById("mobile-annotate-btn"),
  mobileViewAnnotationsBtn: document.getElementById(
    "mobile-view-annotations-btn"
  ),
};

const leftCtx = elements.leftCanvas.getContext("2d");
const rightCtx = elements.rightCanvas.getContext("2d");
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

const state = {
  pdfDoc: null,
  currentPage: 1,
  scale: 0.8,
  MIN_SCALE: 0.5,
  annotations: [],
  bookmarkedPage: null, // Alterado de bookmarkedPages: new Set()
  editingAnnotation: null,
  activeAnnotationId: null,
};

// Função que lê o CSS para saber o estado atual do layout
function isSinglePageView() {
  return window.getComputedStyle(elements.rightPageWrapper).display === "none";
}

async function renderPage(num, canvas, ctx, customScale) {
  if (!state.pdfDoc || num < 1 || num > state.pdfDoc.numPages) {
    // Limpeza de segurança
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.width = "0px";
    canvas.style.height = "0px";
    return;
  }

  const page = await state.pdfDoc.getPage(num);
  const scaleToUse = customScale || state.scale;
  const viewport = page.getViewport({ scale: scaleToUse });

  // Fator de Alta Resolução (Retina/Mobile)
  const outputScale = window.devicePixelRatio || 1;

  // Define o tamanho físico do canvas (pixels reais)
  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);

  // Define o tamanho visual do canvas (CSS)
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;

  // =========================================================
  // ✅ CORREÇÃO DEFINITIVA DO BUG F11 (INVERSÃO)
  // =========================================================

  // 1. Reseta qualquer transformação anterior para o padrão absoluto
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // 2. Aplica a escala de alta resolução DIRETAMENTE NO CONTEXTO
  // Isso faz com que o desenho fique nítido sem confundir o PDF.js
  ctx.scale(outputScale, outputScale);

  // 3. Limpa a área (O contexto já está limpo pelo setTransform, mas garantimos)
  // Nota: Como usamos scale() acima, limpamos baseados no viewport original
  ctx.clearRect(0, 0, viewport.width, viewport.height);

  // 4. Renderiza SEM passar o array 'transform' manual.
  // Deixamos o PDF.js calcular a matriz dele sozinho, desenhando
  // "normalmente" dentro do nosso contexto que já está ampliado.
  const renderContext = {
    canvasContext: ctx,
    viewport: viewport
    // REMOVIDO: transform: ... (Isso era o causador do conflito)
  };

  await page.render(renderContext).promise;
}

async function renderBook() {
  if (!state.pdfDoc) return;
  if (isSinglePageView()) {
    await renderPage(
      state.currentPage,
      elements.leftCanvas,
      leftCtx,
      state.scale
    );
  } else {
    const pageNumL = state.currentPage;
    const pageNumR = state.currentPage + 1;
    if (pageNumR > state.pdfDoc.numPages) {
      await renderPage(pageNumL, elements.leftCanvas, leftCtx, state.scale);
      await renderPage(0, elements.rightCanvas, rightCtx);
    } else {
      const pageL = await state.pdfDoc.getPage(pageNumL);
      const pageR = await state.pdfDoc.getPage(pageNumR);
      const vpL = pageL.getViewport({ scale: 1 });
      const vpR = pageR.getViewport({ scale: 1 });
      const maxH = Math.max(vpL.height, vpR.height);
      await renderPage(
        pageNumL,
        elements.leftCanvas,
        leftCtx,
        state.scale * (maxH / vpL.height)
      );
      await renderPage(
        pageNumR,
        elements.rightCanvas,
        rightCtx,
        state.scale * (maxH / vpR.height)
      );
    }
  }
  updateUI();
}

function updateUI() {
  // --- SALVA NA SESSÃO (Para resistir ao F5) ---
  if (state.currentPage) {
    sessionStorage.setItem(`lastPage_${PDF_BOOK_ID}`, state.currentPage);
  }
  // ---------------------------------------------
  const singlePage = isSinglePageView();
  const totalPages = state.pdfDoc.numPages;
  // Indicador de Página
  if (singlePage) {
    elements.pageIndicator.textContent = `Página ${state.currentPage}`;
    elements.pageIndicator2.textContent = `Página ${state.currentPage}`;
  } else {
    const endPage = Math.min(state.currentPage + 1, totalPages);
    elements.pageIndicator.textContent =
      state.currentPage === endPage
        ? `Página ${state.currentPage}`
        : `Páginas ${state.currentPage}-${endPage}`;
  }
  // Botões de Navegação
  document.querySelector(".button-left").style.visibility =
    state.currentPage > 1 ? "visible" : "hidden";
  document.querySelector(".button-left2").style.visibility =
    state.currentPage > 1 ? "visible" : "hidden";
  const isLastPage = singlePage
    ? state.currentPage >= totalPages
    : state.currentPage + 1 >= totalPages;
  document.querySelector(".button-right").style.visibility = isLastPage
    ? "hidden"
    : "visible";
  document.querySelector(".button-right2").style.visibility = isLastPage
    ? "hidden"
    : "visible";
  // Marcadores
  // Marcadores
  elements.bookmarkIconLeft.classList.toggle(
    "bookmarked",
    state.bookmarkedPage === state.currentPage
  );
  if (!singlePage) {
    elements.bookmarkIconRight.classList.toggle(
      "bookmarked",
      state.bookmarkedPage === state.currentPage + 1
    );
  } else {
    // Garante que o ícone direito não fique marcado na visualização de página única
    elements.bookmarkIconRight.classList.remove("bookmarked");
  }
}

function navigate(direction) {
  const step = isSinglePageView() ? 1 : 2;
  const newPage = state.currentPage + direction * step;
  if (newPage >= 1 && newPage <= state.pdfDoc.numPages) {
    state.currentPage = newPage;
    renderBook();
  }
}

let dynamicMaxScale = 1.0; // variável global (inicie com zoom padrão)

function changeZoom(delta) {
  let newScale = state.scale + delta;

  // --- LÓGICA DE ZOOM MÍNIMO (CORREÇÃO COM ACENTOS) ---
  let currentMinScale = state.MIN_SCALE; // Padrão é 0.5

  // Pega o gênero e normaliza COMPLETAMENTE
  // 1. toLowerCase() -> "história em quadrinhos"
  // 2. replace() -> "história em quadrinhos" (sem hífens)
  // 3. normalize().replace() -> "historia em quadrinhos" (SEM ACENTOS)
  const genre = bookGenre
    .toLowerCase()
    .replace(/-/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // ADICIONE ESTE CONSOLE.LOG PARA TESTAR
  console.log("Gênero normalizado para zoom:", genre);

  // Agora a comparação vai funcionar
  if (genre === "manga" || genre === "historia em quadrinhos") {
    // Se for HQ ou Mangá, permite zoom out "infinito"
    currentMinScale = 0.1;
  }

  newScale = Math.max(currentMinScale, newScale);
  // --- FIM DA LÓGICA CORRIGIDA ---

  state.scale = newScale;

  // --- SALVA O ZOOM NO LOCALSTORAGE (Persiste mesmo fechando a aba) ---
  localStorage.setItem(`zoom_${PDF_BOOK_ID}`, newScale);
  // -------------------------------------------------------------------

  renderBook();
}


// Carrega o PDF (agora em uma função async auto-executável)
// --- SUBSTITUA O BLOCO INTEIRO (ETAPA 3.5) POR ESTE ---

(async function loadPdfAndProgress() {
  try {
    const pdfDoc_ = await pdfjsLib.getDocument(pdfPath).promise;
    state.pdfDoc = pdfDoc_;
    // =================================================
    // LÓGICA DE ZOOM INICIAL (Com Memória)
    // =================================================

    // 1. Tenta recuperar o zoom salvo pelo usuário
    const savedZoom = localStorage.getItem(`zoom_${PDF_BOOK_ID}`);
    const normalizedTitle = bookTitle.toLowerCase();
    const isMobileView = window.innerWidth <= 991;

    if (savedZoom) {
      // Se já tem um zoom salvo, USA ELE (respeita a vontade do usuário)
      state.scale = parseFloat(savedZoom);

      // Mantém o mínimo correto para mobile
      if (isMobileView) {
        state.MIN_SCALE = 0.1;
      }

    } else {
      // Se NÃO tem zoom salvo, usa a lógica padrão (automática)

      if (isMobileView) {
        // Lógica Mobile (ajusta à largura)
        const page = await state.pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const targetWidth = elements.mainContent.clientWidth - 20;

        state.scale = targetWidth / viewport.width;
        state.MIN_SCALE = 0.1;

      } else {
        // Lógica Desktop
        if (normalizedTitle === "iracema") {
          state.scale = 2.0;
        } else {
          state.scale = 0.8; // Padrão
        }
      }
    }
    // =================================================

    loadData();
    await loadNotesFromDB(); // <-- ADICIONE ESTA LINHA

    let savedPage = null;

    if (IS_LOGGED_IN) {
      // 2. Se estiver logado, busca o progresso do DB
      try {
        const response = await fetch(
          `../pasta-php/progress_handler.php?action=load&book_id=${encodeURIComponent(
            PDF_BOOK_ID
          )}`
        );
        const data = await response.json();

        if (data.status === "success" && data.page > 0) {
          savedPage = parseInt(data.page, 10);
        }
      } catch (e) {
        console.error(
          "Erro ao carregar progresso do DB. Usando dados locais.",
          e
        );
      }
    }

    // ==========================================================
    // LÓGICA DE CARREGAMENTO INTELIGENTE (Reload vs Navegação)
    // ==========================================================

    // 1. Detecta se o usuário deu F5 (Reload)
    // A API 'performance' nos diz se a página foi recarregada ou acessada via link
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    let sessionPage = null;

    if (isReload) {
      // Se for F5, tentamos recuperar onde ele estava antes de piscar a tela
      const sessionPageStr = sessionStorage.getItem(`lastPage_${PDF_BOOK_ID}`);
      sessionPage = sessionPageStr ? parseInt(sessionPageStr, 10) : null;
    } else {
      // Se NÃO for F5 (veio da Home, clicou no link), LIMPA a memória antiga
      // Assim garantimos que ele vai pegar o Marcador do Banco de Dados
      sessionStorage.removeItem(`lastPage_${PDF_BOOK_ID}`);
    }

    // 2. Configura o ÍCONE de favorito (Sempre fiel ao Banco de Dados)
    if (savedPage && savedPage > 1) {
      state.bookmarkedPage = savedPage;
    } else {
      state.bookmarkedPage = null;
    }

    // 3. Define qual página vai abrir na tela
    let pageToLoad = 1; // Padrão: Capa

    if (sessionPage) {
      // PRIORIDADE 1: Apenas se for F5
      pageToLoad = sessionPage;
      console.log("F5 Detectado: Mantendo página atual", pageToLoad);

    } else if (savedPage && savedPage > 1) {
      // PRIORIDADE 2: Se veio da Home, usa o Marcador Oficial
      pageToLoad = savedPage;
      console.log("Acesso via Link: Abrindo no Marcador", pageToLoad);

    } else {
      // PRIORIDADE 3: Capa
      pageToLoad = 1;
      console.log("Novo acesso: Abrindo na Capa");
    }

    // ==========================================================
    // 4. CORREÇÃO DE PÁGINA DUPLA (O Passo que faltava)
    // ==========================================================
    // Verifica se está no PC (Página Dupla)
    const singleView = window.getComputedStyle(elements.rightPageWrapper).display === "none";

    // Se NÃO for mobile e a página não for a capa
    if (!singleView && pageToLoad > 1) {
      // Se a página for ÍMPAR (ex: 13), subtrai 1.
      // Isso força o livro a abrir no par correto (ex: 12-13)
      if (pageToLoad % 2 !== 0) {
        pageToLoad = pageToLoad - 1;
      }
    }
    // ==========================================================

    // Define a página final
    state.currentPage = pageToLoad;

    // Renderiza
    renderBook();

  } catch (err) {
    console.error("Erro ao carregar PDF:", err);
    document.getElementById("main-content").innerHTML =
      "<p style='color:red; text-align:center;'>Erro ao carregar o PDF.</p>";
  }
})();

// === Event Listeners ===

/**
 * Mostra um modal de confirmação customizado.
 * Retorna uma Promise que resolve 'true' se confirmado, 'false' se cancelado.
 */
function showConfirm(message) {
  return new Promise((resolve) => {
    // Define a mensagem de confirmação
    const modalText = elements.confirmDeleteModal.querySelector(".modal-text");
    if (modalText) modalText.textContent = message;

    openModal(elements.confirmDeleteModal);

    // Função para quando o usuário confirmar
    const onConfirm = () => {
      closeModal(elements.confirmDeleteModal);
      resolve(true);
      // Remove os listeners para não acumular
      elements.confirmDeleteBtn.removeEventListener("click", onConfirm);
      elements.confirmCancelBtn.removeEventListener("click", onCancel);
    };

    // Função para quando o usuário cancelar
    const onCancel = () => {
      closeModal(elements.confirmDeleteModal);
      resolve(false);
      // Remove os listeners para não acumular
      elements.confirmDeleteBtn.removeEventListener("click", onConfirm);
      elements.confirmCancelBtn.removeEventListener("click", onCancel);
    };

    // Adiciona os listeners
    elements.confirmDeleteBtn.addEventListener("click", onConfirm);
    elements.confirmCancelBtn.addEventListener("click", onCancel);
  });
}

// Tema (desktop)
elements.themeBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("Faça login para mudar o tema.");
    return;
  } // <-- ADICIONE
  indiceModo = (indiceModo + 1) % modos.length;
  aplicarModo(modos[indiceModo]);
});

// Tema (mobile)
elements.mobileThemeBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("Faça login para mudar o tema.");
    return;
  } // <-- ADICIONE
  indiceModo = (indiceModo + 1) % modos.length;
  aplicarModo(modos[indiceModo]);
});

// Navegação
document
  .querySelector(".button-left")
  .addEventListener("click", () => navigate(-1));
document
  .querySelector(".button-right")
  .addEventListener("click", () => navigate(1));
document
  .querySelector(".button-left2")
  .addEventListener("click", () => navigate(-1));
document
  .querySelector(".button-right2")
  .addEventListener("click", () => navigate(1));

// Zoom (desktop)
elements.zoomInBtn?.addEventListener("click", () => changeZoom(0.1));
elements.zoomOutBtn?.addEventListener("click", () => changeZoom(-0.1));

// Zoom (mobile)
elements.mobileZoomInBtn?.addEventListener("click", () => changeZoom(0.1));
elements.mobileZoomOutBtn?.addEventListener("click", () => changeZoom(-0.1));

// Anotações (desktop)
elements.annotateBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("É preciso estar logado para criar anotações.");
    return;
  }
  state.editingAnnotation = null;
  elements.noteInput.value = "";
  // --- CORREÇÃO (LINHAS FALTANTES) ---
  elements.noteModalTitle.textContent = "Adicionar Anotação Pessoal";
  openModal(elements.noteModal);
  // --- FIM DA CORREÇÃO ---
});
elements.viewAnnotationsBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("É preciso estar logado para ver anotações.");
    return;
  } // <-- ADICIONE AQUI
  renderAnnotationsPanel();
  elements.annotationsPanel.classList.add("open");
});

// Anotações (mobile)
elements.mobileAnnotateBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("É preciso estar logado para criar anotações.");
    return;
  }
  state.editingAnnotation = null;
  elements.noteInput.value = "";
  // --- CORREÇÃO (LINHAS FALTANTES) ---
  elements.noteModalTitle.textContent = "Adicionar Anotação Pessoal";
  openModal(elements.noteModal);
  // --- FIM DA CORREÇÃO ---
});
elements.mobileViewAnnotationsBtn?.addEventListener("click", () => {
  if (!IS_LOGGED_IN) {
    showAlert("É preciso estar logado para ver anotações.");
    return;
  } // <-- ADICIONE AQUI
  renderAnnotationsPanel();
  elements.annotationsPanel.classList.add("open");
});

// Menu lateral (só em desktop)
if (window.innerWidth > 991) {
  elements.btnExp?.addEventListener("click", () => {
    elements.menuLateral.classList.toggle("expandir");
  });
}

// Teclado
document.addEventListener("keydown", (e) => {
  if (document.querySelector('.modal[style*="display: flex"]')) return;
  if (e.key === "ArrowLeft") navigate(-1);
  else if (e.key === "ArrowRight") navigate(1);
  else if (e.key === "+" || e.key === "=") {
    e.preventDefault();
    changeZoom(0.1);
  } else if (e.key === "-" || e.key === "_") {
    e.preventDefault();
    changeZoom(-0.1);
  }
});

// =========================================================
// ✅ CORREÇÃO "BLINDADA" PARA MOBILE
// =========================================================
let resizeTimeout;
let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {
  // 1. REGRA DO FOCO (A MAIS IMPORTANTE):
  // Se o usuário estiver digitando (input ou textarea focado),
  // IGNORA totalmente o resize. O teclado abriu, não queremos mexer no livro.
  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
    console.log("Teclado aberto detectado: Resize bloqueado.");
    return;
  }

  // 2. REGRA DA LARGURA (Backup):
  // Mesmo sem foco, só redesenha se a LARGURA mudar significativamente (girou a tela).
  // Aumentei a tolerância para 10px para evitar bugs de navegadores móveis.
  const currentWidth = window.innerWidth;
  if (Math.abs(currentWidth - lastWidth) < 10) {
    return;
  }

  // Se passou pelas duas barreiras, aí sim atualiza
  lastWidth = currentWidth;

  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log("Redimensionando livro...");
    renderBook();
  }, 200);
});

// === Funções Auxiliares ===

// === NOVA FUNÇÃO PARA SALVAR O TEMA DO LEITOR NO DB ===
async function saveReaderThemeToDB(theme) {
  // Só salva no DB se o usuário estiver logado
  if (!IS_LOGGED_IN) return;

  const formData = new FormData();
  formData.append("action", "save_reader_theme"); // <-- Ação que criamos no PHP
  formData.append("theme", theme);

  try {
    await fetch("../pasta-php/progress_handler.php", {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.error("Falha ao salvar tema do leitor", e);
  }
}

async function loadNotesFromDB() {
  if (!IS_LOGGED_IN) return; // Só carrega se logado

  try {
    const response = await fetch(
      `../pasta-php/progress_handler.php?action=load_notes&book_id=${encodeURIComponent(
        PDF_BOOK_ID
      )}`
    );
    const result = await response.json();

    if (result.status === "success") {
      // Converte os dados do DB para o formato que 'state.annotations' espera
      state.annotations = result.data.map((note) => ({
        id: note.id, // ID do banco de dados
        note: note.note_text,
        date: note.created_at,
      }));
    } else {
      console.error("Falha ao carregar anotações:", result.message);
    }
  } catch (error) {
    console.error("Erro de rede ao carregar anotações:", error);
  }
}

async function saveNoteToDB(noteText) {
  const formData = new FormData();
  formData.append("action", "save_note");
  formData.append("book_id", PDF_BOOK_ID);
  formData.append("note_text", noteText);

  try {
    const response = await fetch("../pasta-php/progress_handler.php", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.status === "success") {
      return data.new_note_id; // Retorna o ID do novo B
    }
    return null;
  } catch (error) {
    console.error("Erro de rede ao salvar anotação:", error);
    return null;
  }
}

async function editNoteInDB(noteId, noteText) {
  const formData = new FormData();
  formData.append("action", "edit_note");
  formData.append("note_id", noteId);
  formData.append("note_text", noteText);

  try {
    await fetch("../pasta-php/progress_handler.php", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("Erro de rede ao editar anotação:", error);
  }
}

async function deleteNoteFromDB(noteId) {
  const formData = new FormData();
  formData.append("action", "delete_note");
  formData.append("note_id", noteId);

  try {
    await fetch("../pasta-php/progress_handler.php", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("Erro de rede ao excluir anotação:", error);
  }
}

async function saveProgressToDB(pageNumber) {
  // Só tenta salvar no DB se o usuário estiver logado
  if (!IS_LOGGED_IN) {
    return;
  }

  const formData = new FormData();
  formData.append("action", "save");
  formData.append("book_id", PDF_BOOK_ID);
  formData.append("page", pageNumber);
  formData.append("total_pages", state.pdfDoc.numPages); // <-- NOVO
  formData.append("book_title", bookTitle); // <-- NOVO
  formData.append("book_cover", bookCover); // <-- NOVO
  formData.append("book_genre", bookGenre); // <-- NOVO

  try {
    const response = await fetch("../pasta-php/progress_handler.php", {
      // ... (resto da função)
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.status === "success") {
      console.log("Progresso salvo no banco de dados.");
    } else {
      console.error("Falha ao salvar progresso no DB:", data.message);
    }
  } catch (error) {
    console.error("Erro de rede ao salvar progresso:", error);
  }
}

function openModal(modal) {
  modal.style.display = "flex";
}
function closeModal(modal) {
  modal.style.display = "none";
}

function showAlert(message) {
  elements.alertMessage.textContent = message;
  openModal(elements.alertModal);
}

elements.alertOkBtn?.addEventListener("click", () =>
  closeModal(elements.alertModal)
);

// Salvar anotação
// Salvar anotação (AGORA COM BANCO DE DADOS)
elements.noteSaveBtn?.addEventListener("click", async () => {
  const noteText = elements.noteInput.value.trim();
  if (!noteText) {
    showAlert("A anotação não pode estar vazia.");
    return;
  }

  try {
    if (state.editingAnnotation) {
      // --- MODO DE EDIÇÃO ---
      await editNoteInDB(state.editingAnnotation.id, noteText);
      // Atualiza o estado local
      state.editingAnnotation.note = noteText;
    } else {
      // --- MODO DE CRIAÇÃO ---
      const newNoteId = await saveNoteToDB(noteText);
      if (newNoteId) {
        // Adiciona ao início da lista no estado local
        state.annotations.unshift({
          id: newNoteId,
          note: noteText,
          date: new Date(),
        });
      }
    }

    renderAnnotationsPanel();
    closeModal(elements.noteModal);
    state.editingAnnotation = null;
  } catch (error) {
    console.error("Erro ao salvar anotação:", error);
    showAlert("Não foi possível salvar a anotação.");
  }
});

elements.noteCancelBtn?.addEventListener("click", () => {
  closeModal(elements.noteModal);
  state.editingAnnotation = null;
});

// Painel de anotações
elements.closeAnnotationsBtn?.addEventListener("click", () => {
  elements.annotationsPanel.classList.remove("open");
});

elements.annotationSearchInput?.addEventListener("input", (e) => {
  renderAnnotationsPanel(e.target.value);
});

function renderAnnotationsPanel(searchTerm = "") {
  elements.annotationsList.innerHTML = "";
  const searchLower = searchTerm.toLowerCase();
  const filteredAnnotations = state.annotations.filter((annotation) =>
    annotation.note.toLowerCase().includes(searchLower)
  );
  filteredAnnotations
    .slice()
    .reverse()
    .forEach((annotation) => {
      const item = document.createElement("div");
      item.className = "annotation-item";
      item.dataset.annotationId = annotation.id;
      const formattedDate = new Date(annotation.date).toLocaleString("pt-BR");
      item.innerHTML = `<div class="text-xs"><span>${formattedDate}</span></div><p>${annotation.note}</p>`;
      item.addEventListener("click", () => {
        state.activeAnnotationId = annotation.id;
        elements.annotationActionModal.querySelector(
          ".modal-note-text"
        ).textContent = annotation.note;
        openModal(elements.annotationActionModal);
      });
      elements.annotationsList.appendChild(item);
    });
}

elements.annotationCloseBtn?.addEventListener("click", () =>
  closeModal(elements.annotationActionModal)
);
elements.annotationEditBtn?.addEventListener("click", () => {
  const annotation = findAnnotationById(state.activeAnnotationId);
  if (!annotation) return;
  state.editingAnnotation = annotation;
  elements.noteModalTitle.textContent = "Editar Anotação";
  elements.noteInput.value = annotation.note;
  closeModal(elements.annotationActionModal);
  openModal(elements.noteModal);
});
// Excluir anotação (AGORA COM MODAL CUSTOMIZADO)
elements.annotationDeleteBtn?.addEventListener("click", async () => {
  // 1. Fecha o modal de "Sua Anotação"
  closeModal(elements.annotationActionModal);

  // 2. Chama o novo modal de confirmação e espera a resposta
  const confirmed = await showConfirm(
    "Tem certeza que deseja excluir esta anotação permanentemente?"
  );

  // 3. Se o usuário clicou "Excluir" (confirmed === true)
  if (confirmed) {
    try {
      await deleteNoteFromDB(state.activeAnnotationId);

      // Atualiza o estado local
      state.annotations = state.annotations.filter(
        (ann) => ann.id !== state.activeAnnotationId
      );

      renderAnnotationsPanel();
      // O modal 'confirmDeleteModal' já foi fechado pela função showConfirm
    } catch (error) {
      console.error("Erro ao excluir anotação:", error);
      // Usa o modal de alerta existente para o erro
      showAlert("Não foi possível excluir a anotação.");
    }
  }
  // 4. Se 'confirmed' for 'false', a função 'showConfirm' já fechou o modal e não fazemos nada.
});

function findAnnotationById(id) {
  return state.annotations.find((ann) => ann.id === id);
}

// Bookmarks
// --- SUBSTITUA PELA VERSÃO ABAIXO ---
function toggleBookmark(pageNum, iconElement) {
  // --- ADICIONE ESTA VERIFICAÇÃO ---
  if (!IS_LOGGED_IN) {
    // Usa a sua função de alerta existente
    showAlert("É preciso estar logado para marcar a página.");
    return; // Impede que o resto da função execute
  }
  // --- FIM DA VERIFICAÇÃO ---

  if (state.bookmarkedPage === pageNum) {
    // Usuário está desmarcando a página
    state.bookmarkedPage = null;
    saveProgressToDB(1);
  } else {
    // Usuário está MARCANDO uma nova página
    state.bookmarkedPage = pageNum;
    // !!! AQUI ESTÁ A MUDANÇA !!!
    // Salva a página marcada no banco de dados (se estiver logado)
    saveProgressToDB(pageNum);
  }

  iconElement.classList.add("animate-pop");
  setTimeout(() => iconElement.classList.remove("animate-pop"), 300);
  updateUI();
  saveData(); // Continua salvando no localStorage (para anotações)
}

elements.bookmarkIconLeft?.addEventListener("click", () =>
  toggleBookmark(state.currentPage, elements.bookmarkIconLeft)
);
elements.bookmarkIconRight?.addEventListener("click", () => {
  if (state.currentPage + 1 <= state.pdfDoc.numPages) {
    toggleBookmark(state.currentPage + 1, elements.bookmarkIconRight);
  }
});
// Temas - apenas uma lista e um índice
const modos = ["modo-claro", "modo-noturno", "modo-sepia"];
let indiceModo = 0;

// Função única que aplica o modo e atualiza TODOS os ícones
// Função única que aplica o modo e atualiza TODOS os ícones
function aplicarModo(modo) {
  // Aplica a classe no body
  document.body.className = genreClass; // Mantém a classe de gênero
  document.body.classList.add(modo); // Adiciona o modo
  // Atualiza o ícone do menu lateral (desktop)
  const iconDesktop = elements.themeIconContainer?.querySelector("i");
  if (iconDesktop) {
    if (modo === "modo-claro")
      iconDesktop.className = "bi bi-brightness-high-fill";
    else if (modo === "modo-noturno") iconDesktop.className = "bi bi-moon-fill";
    else iconDesktop.className = "bi bi-circle-square";
  }

  // Atualiza o ícone da barra mobile (se existir)
  const iconMobile = elements.mobileThemeBtn?.querySelector("i");
  if (iconMobile) {
    if (modo === "modo-claro")
      iconMobile.className = "bi bi-brightness-high-fill";
    else if (modo === "modo-noturno") iconMobile.className = "bi bi-moon-fill";
    else iconMobile.className = "bi bi-circle-square";
  }

  // Salva no banco de dados (se logado)
  saveReaderThemeToDB(modo);
}

// Carregar dados
// Carregar dados
function saveData() {
  const data = {};

  // Só salva a página marcada no localStorage se estiver logado
  // (Isso age como um cache local para o DB)
  if (IS_LOGGED_IN) {
    data.bookmarkedPage = state.bookmarkedPage;
  }

  localStorage.setItem(storageKey, JSON.stringify(data));
}
function loadData() {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const data = JSON.parse(savedData);
    state.annotations = []; // Anotações são carregadas do DB

    // --- CORREÇÃO ---
    // SÓ carregamos do localStorage se o usuário NÃO ESTIVER LOGADO
    // (o que agora está desabilitado, mas a lógica está correta)
    if (!IS_LOGGED_IN) {
      state.bookmarkedPage = data.bookmarkedPage || null;
    } else {
      // Se está logado, IGNORA o localStorage. O DB é a única verdade.
      state.bookmarkedPage = null;
    }
  }

  // --- CORREÇÃO DO CARREGAMENTO DO TEMA ---
  // O TEMA JÁ FOI CARREGADO PELO PHP NO <body>
  // Nós só precisamos definir o 'indiceModo' e ATUALIZAR OS ÍCONES
  let modoSalvo = "modo-claro";
  if (document.body.classList.contains("modo-noturno"))
    modoSalvo = "modo-noturno";
  if (document.body.classList.contains("modo-sepia")) modoSalvo = "modo-sepia";

  indiceModo = modos.indexOf(modoSalvo);

  // Atualiza os ícones para corresponderem ao tema carregado
  const iconDesktop = elements.themeIconContainer?.querySelector("i");
  if (iconDesktop) {
    if (modoSalvo === "modo-claro")
      iconDesktop.className = "bi bi-brightness-high-fill";
    else if (modoSalvo === "modo-noturno")
      iconDesktop.className = "bi bi-moon-fill";
    else iconDesktop.className = "bi bi-circle-square";
  }
  const iconMobile = elements.mobileThemeBtn?.querySelector("i");
  if (iconMobile) {
    if (modoSalvo === "modo-claro")
      iconMobile.className = "bi bi-brightness-high-fill";
    else if (modoSalvo === "modo-noturno")
      iconMobile.className = "bi bi-moon-fill";
    else iconMobile.className = "bi bi-circle-square";
  }
}
