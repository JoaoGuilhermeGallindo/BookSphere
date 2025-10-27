// Setup de elementos
const params = new URLSearchParams(window.location.search);
const pdfFile = params.get("pdf");
if (!pdfFile) {
    document.body.innerHTML = "<p>Arquivo PDF não especificado.</p>";
    throw new Error("PDF não especificado");
}
const pdfPath = `../livro/livros-pdf/${decodeURIComponent(pdfFile)}`;
const storageKey = `pdfReader-${pdfFile}`;

// Seleciona todos os elementos, incluindo os novos de mobile
const elements = {
    mainContent: document.getElementById('main-content'),
    leftCanvas: document.getElementById('leftPageCanvas'),
    rightCanvas: document.getElementById('rightPageCanvas'),
    rightPageWrapper: document.getElementById('right-page-wrapper'),
    btnExp: document.querySelector('#btn-exp'),
    menuLateral: document.querySelector('.menu-lateral'),
    zoomInBtn: document.getElementById('zoom-in'),
    zoomOutBtn: document.getElementById('zoom-out'),
    themeBtn: document.getElementById('theme-btn'),
    themeIconContainer: document.getElementById('theme-icon-container'),
    annotateBtn: document.getElementById('annotate-btn'),
    viewAnnotationsBtn: document.getElementById('view-annotations-btn'),
    bookmarkIconLeft: document.getElementById('bookmark-icon-left'),
    bookmarkIconRight: document.getElementById('bookmark-icon-right'),
    noteModal: document.getElementById('note-modal'),
    noteModalTitle: document.getElementById('note-modal-title'),
    noteInput: document.getElementById('note-input'),
    noteSaveBtn: document.getElementById('note-save'),
    noteCancelBtn: document.getElementById('note-cancel'),
    annotationsPanel: document.getElementById('annotations-panel'),
    closeAnnotationsBtn: document.getElementById('close-annotations-btn'),
    annotationsList: document.getElementById('annotations-list'),
    annotationSearchInput: document.getElementById('annotation-search-input'),
    annotationActionModal: document.getElementById('annotation-action-modal'),
    annotationCloseBtn: document.getElementById('annotation-close'),
    annotationEditBtn: document.getElementById('annotation-edit'),
    annotationDeleteBtn: document.getElementById('annotation-delete'),
    alertModal: document.getElementById('alert-modal'),
    alertMessage: document.getElementById('alert-message'),
    alertOkBtn: document.getElementById('alert-ok'),
    pageIndicator: document.getElementById('page-indicator'),

    // Novos elementos para mobile
    mobileZoomInBtn: document.getElementById('mobile-zoom-in'),
    mobileZoomOutBtn: document.getElementById('mobile-zoom-out'),
    mobileThemeBtn: document.getElementById('mobile-theme-btn'),
    mobileAnnotateBtn: document.getElementById('mobile-annotate-btn'),
    mobileViewAnnotationsBtn: document.getElementById('mobile-view-annotations-btn')
};

const leftCtx = elements.leftCanvas.getContext('2d');
const rightCtx = elements.rightCanvas.getContext('2d');
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

const state = {
    pdfDoc: null,
    currentPage: 1,
    scale: 0.8,
    MIN_SCALE: 0.5,
    annotations: [],
    bookmarkedPages: new Set(),
    editingAnnotation: null,
    activeAnnotationId: null
};

// Função que lê o CSS para saber o estado atual do layout
function isSinglePageView() {
    return window.getComputedStyle(elements.rightPageWrapper).display === 'none';
}

async function renderPage(num, canvas, ctx, customScale) {
    if (!state.pdfDoc || num < 1 || num > state.pdfDoc.numPages) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.width = '0px';
        canvas.style.height = '0px';
        return;
    }
    const page = await state.pdfDoc.getPage(num);
    const scaleToUse = customScale || state.scale;
    const viewport = page.getViewport({ scale: scaleToUse });
    const outputScale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
    await page.render({ canvasContext: ctx, viewport, transform }).promise;
}

async function renderBook() {
    if (!state.pdfDoc) return;
    if (isSinglePageView()) {
        await renderPage(state.currentPage, elements.leftCanvas, leftCtx, state.scale);
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
            await renderPage(pageNumL, elements.leftCanvas, leftCtx, state.scale * (maxH / vpL.height));
            await renderPage(pageNumR, elements.rightCanvas, rightCtx, state.scale * (maxH / vpR.height));
        }
    }
    updateUI();
}

function updateUI() {
    const singlePage = isSinglePageView();
    const totalPages = state.pdfDoc.numPages;
    // Indicador de Página
    if (singlePage) {
        elements.pageIndicator.textContent = `Página ${state.currentPage} de ${totalPages}`;
    } else {
        const endPage = Math.min(state.currentPage + 1, totalPages);
        elements.pageIndicator.textContent = (state.currentPage === endPage)
            ? `Página ${state.currentPage} de ${totalPages}`
            : `Páginas ${state.currentPage}-${endPage} de ${totalPages}`;
    }
    // Botões de Navegação
    document.querySelector('.button-left').style.visibility = (state.currentPage > 1) ? 'visible' : 'hidden';
    document.querySelector('.button-left2').style.visibility = (state.currentPage > 1) ? 'visible' : 'hidden';
    const isLastPage = singlePage ? (state.currentPage >= totalPages) : (state.currentPage + 1 >= totalPages);
    document.querySelector('.button-right').style.visibility = isLastPage ? 'hidden' : 'visible';
    document.querySelector('.button-right2').style.visibility = isLastPage ? 'hidden' : 'visible';
    // Marcadores
    elements.bookmarkIconLeft.classList.toggle('bookmarked', state.bookmarkedPages.has(state.currentPage));
    if (!singlePage) {
        elements.bookmarkIconRight.classList.toggle('bookmarked', state.bookmarkedPages.has(state.currentPage + 1));
    }
}

function navigate(direction) {
    const step = isSinglePageView() ? 1 : 2;
    const newPage = state.currentPage + (direction * step);
    if (newPage >= 1 && newPage <= state.pdfDoc.numPages) {
        state.currentPage = newPage;
        renderBook();
    }
}

function changeZoom(delta) {
    let newScale = state.scale + delta;
    if (delta > 0 && elements.leftCanvas.style.height && parseFloat(elements.leftCanvas.style.height) > 0) {
        const canvasHeight = parseFloat(elements.leftCanvas.style.height);
        const pageHeight = canvasHeight / state.scale;
        const availableHeight = elements.mainContent.clientHeight - 60;
        if (pageHeight > 0) newScale = Math.min(newScale, availableHeight / pageHeight);
    }
    state.scale = Math.max(state.MIN_SCALE, newScale);
    renderBook();
}

// Carrega o PDF
pdfjsLib.getDocument(pdfPath).promise.then(pdfDoc_ => {
    state.pdfDoc = pdfDoc_;
    loadData();
    renderBook();
}).catch(err => {
    console.error("Erro ao carregar PDF:", err);
    document.getElementById('main-content').innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar o PDF.</p>";
});

// === Event Listeners ===

// Navegação
document.querySelector('.button-left').addEventListener('click', () => navigate(-1));
document.querySelector('.button-right').addEventListener('click', () => navigate(1));
document.querySelector('.button-left2').addEventListener('click', () => navigate(-1));
document.querySelector('.button-right2').addEventListener('click', () => navigate(1));

// Zoom (desktop)
elements.zoomInBtn?.addEventListener('click', () => changeZoom(0.1));
elements.zoomOutBtn?.addEventListener('click', () => changeZoom(-0.1));

// Zoom (mobile)
elements.mobileZoomInBtn?.addEventListener('click', () => changeZoom(0.1));
elements.mobileZoomOutBtn?.addEventListener('click', () => changeZoom(-0.1));

// Tema (desktop)
elements.themeBtn?.addEventListener("click", () => {
    indiceModo = (indiceModo + 1) % modos.length;
    aplicarModo(modos[indiceModo]);
});

// Tema (mobile)
elements.mobileThemeBtn?.addEventListener("click", () => {
    indiceModo = (indiceModo + 1) % modos.length;
    aplicarModo(modos[indiceModo]);
});

// Anotações (desktop)
elements.annotateBtn?.addEventListener('click', () => {
    state.editingAnnotation = null;
    elements.noteInput.value = '';
    elements.noteModalTitle.textContent = "Adicionar Anotação Pessoal";
    openModal(elements.noteModal);
});
elements.viewAnnotationsBtn?.addEventListener('click', () => {
    renderAnnotationsPanel();
    elements.annotationsPanel.classList.add('open');
});

// Anotações (mobile)
elements.mobileAnnotateBtn?.addEventListener('click', () => {
    state.editingAnnotation = null;
    elements.noteInput.value = '';
    elements.noteModalTitle.textContent = "Adicionar Anotação Pessoal";
    openModal(elements.noteModal);
});
elements.mobileViewAnnotationsBtn?.addEventListener('click', () => {
    renderAnnotationsPanel();
    elements.annotationsPanel.classList.add('open');
});

// Menu lateral (só em desktop)
if (window.innerWidth > 991) {
    elements.btnExp?.addEventListener('click', () => {
        elements.menuLateral.classList.toggle('expandir');
    });
}

// Teclado
document.addEventListener('keydown', e => {
    if (document.querySelector('.modal[style*="display: flex"]')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    else if (e.key === 'ArrowRight') navigate(1);
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); changeZoom(0.1); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); changeZoom(-0.1); }
});

// Redimensionar
window.addEventListener('resize', renderBook);

// === Funções Auxiliares ===

function openModal(modal) { modal.style.display = 'flex'; }
function closeModal(modal) { modal.style.display = 'none'; }

function showAlert(message) {
    elements.alertMessage.textContent = message;
    openModal(elements.alertModal);
}

elements.alertOkBtn?.addEventListener('click', () => closeModal(elements.alertModal));

// Salvar anotação
elements.noteSaveBtn?.addEventListener('click', () => {
    const noteText = elements.noteInput.value.trim();
    if (!noteText) {
        showAlert("A anotação não pode estar vazia.");
        return;
    }
    if (state.editingAnnotation) {
        state.editingAnnotation.note = noteText;
    } else {
        state.annotations.push({ id: Date.now(), note: noteText, date: new Date() });
    }
    saveData();
    renderAnnotationsPanel();
    closeModal(elements.noteModal);
    state.editingAnnotation = null;
});

elements.noteCancelBtn?.addEventListener('click', () => {
    closeModal(elements.noteModal);
    state.editingAnnotation = null;
});

// Painel de anotações
elements.closeAnnotationsBtn?.addEventListener('click', () => {
    elements.annotationsPanel.classList.remove('open');
});

elements.annotationSearchInput?.addEventListener('input', e => {
    renderAnnotationsPanel(e.target.value);
});

function renderAnnotationsPanel(searchTerm = '') {
    elements.annotationsList.innerHTML = '';
    const searchLower = searchTerm.toLowerCase();
    const filteredAnnotations = state.annotations.filter(annotation =>
        annotation.note.toLowerCase().includes(searchLower)
    );
    filteredAnnotations.slice().reverse().forEach(annotation => {
        const item = document.createElement('div');
        item.className = 'annotation-item';
        item.dataset.annotationId = annotation.id;
        const formattedDate = new Date(annotation.date).toLocaleString('pt-BR');
        item.innerHTML = `<div class="text-xs"><span>${formattedDate}</span></div><p>${annotation.note}</p>`;
        item.addEventListener('click', () => {
            state.activeAnnotationId = annotation.id;
            elements.annotationActionModal.querySelector('.modal-note-text').textContent = annotation.note;
            openModal(elements.annotationActionModal);
        });
        elements.annotationsList.appendChild(item);
    });
}

elements.annotationCloseBtn?.addEventListener('click', () => closeModal(elements.annotationActionModal));
elements.annotationEditBtn?.addEventListener('click', () => {
    const annotation = findAnnotationById(state.activeAnnotationId);
    if (!annotation) return;
    state.editingAnnotation = annotation;
    elements.noteModalTitle.textContent = "Editar Anotação";
    elements.noteInput.value = annotation.note;
    closeModal(elements.annotationActionModal);
    openModal(elements.noteModal);
});
elements.annotationDeleteBtn?.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja excluir esta anotação?")) {
        state.annotations = state.annotations.filter(ann => ann.id !== state.activeAnnotationId);
        saveData();
        renderAnnotationsPanel();
        closeModal(elements.annotationActionModal);
    }
});

function findAnnotationById(id) {
    return state.annotations.find(ann => ann.id === id);
}

// Bookmarks
function toggleBookmark(pageNum, iconElement) {
    if (state.bookmarkedPages.has(pageNum)) {
        state.bookmarkedPages.delete(pageNum);
    } else {
        state.bookmarkedPages.add(pageNum);
    }
    iconElement.classList.add('animate-pop');
    setTimeout(() => iconElement.classList.remove('animate-pop'), 300);
    updateUI();
    saveData();
}

elements.bookmarkIconLeft?.addEventListener('click', () => toggleBookmark(state.currentPage, elements.bookmarkIconLeft));
elements.bookmarkIconRight?.addEventListener('click', () => {
    if (state.currentPage + 1 <= state.pdfDoc.numPages) {
        toggleBookmark(state.currentPage + 1, elements.bookmarkIconRight);
    }
});
// Temas - apenas uma lista e um índice
const modos = ["modo-claro", "modo-noturno", "modo-sepia"];
let indiceModo = 0;

// Função única que aplica o modo e atualiza TODOS os ícones
function aplicarModo(modo) {
    // Aplica a classe no body
    document.body.className = '';
    document.body.classList.add(modo);

    // Atualiza o ícone do menu lateral (desktop)
    const iconDesktop = elements.themeIconContainer?.querySelector('i');
    if (iconDesktop) {
        if (modo === "modo-claro") iconDesktop.className = "bi bi-brightness-high-fill";
        else if (modo === "modo-noturno") iconDesktop.className = "bi bi-moon-fill";
        else iconDesktop.className = "bi bi-circle-square";
    }

    // Atualiza o ícone da barra mobile (se existir)
    const iconMobile = elements.mobileThemeBtn?.querySelector('i');
    if (iconMobile) {
        if (modo === "modo-claro") iconMobile.className = "bi bi-brightness-high-fill";
        else if (modo === "modo-noturno") iconMobile.className = "bi bi-moon-fill";
        else iconMobile.className = "bi bi-circle-square";
    }

    // Salva no localStorage
    localStorage.setItem("themeMode", modo);
}
// Carregar dados
function saveData() {
    const data = {
        annotations: state.annotations,
        bookmarkedPages: Array.from(state.bookmarkedPages)
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        const data = JSON.parse(savedData);
        state.annotations = data.annotations || [];
        state.bookmarkedPages = new Set(data.bookmarkedPages || []);
    }
    const modoSalvo = localStorage.getItem("themeMode") || "modo-claro";
    indiceModo = modos.indexOf(modoSalvo);
    aplicarModo(modoSalvo);
}