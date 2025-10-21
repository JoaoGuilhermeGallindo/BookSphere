const params = new URLSearchParams(window.location.search);
const pdfFile = params.get("pdf");

if (!pdfFile) {
    document.body.innerHTML = "<p>Arquivo PDF não especificado.</p>";
    throw new Error("Nenhum PDF foi passado na URL");
}

const pdfPath = `../livro/livros-pdf/${decodeURIComponent(pdfFile)}`;

const elements = {
    leftCanvas: document.getElementById('leftPageCanvas'),
    rightCanvas: document.getElementById('rightPageCanvas'),
    leftPageWrapper: document.getElementById('left-page-wrapper'),
    rightPageWrapper: document.getElementById('right-page-wrapper'),
    btnExp: document.querySelector('#btn-exp'),
    menuLateral: document.querySelector('.menu-lateral'),
    flipbookContainer: document.querySelector('.flipbook-container'),
    buttonLeft: document.querySelector('.button-left'),
    buttonRight: document.querySelector('.button-right'),
    zoomInBtn: document.getElementById('zoom-in'),
    zoomOutBtn: document.getElementById('zoom-out'),
    themeBtn: document.getElementById('theme-btn'),
    themeIconContainer: document.getElementById('theme-icon-container'),
    highlightBtn: document.getElementById('highlight-btn'),
    annotateBtn: document.getElementById('annotate-btn'),
    bookmarkBtn: document.getElementById('bookmark-btn'),
    viewAnnotationsBtn: document.getElementById('view-annotations-btn'),
    bookmarkIconLeft: document.getElementById('bookmark-icon-left'),
    bookmarkIconRight: document.getElementById('bookmark-icon-right'),
    noteModal: document.getElementById('note-modal'),
    noteInput: document.getElementById('note-input'),
    noteSaveBtn: document.getElementById('note-save'),
    noteCancelBtn: document.getElementById('note-cancel'),
    noteTooltip: document.getElementById('note-tooltip'),
    annotationsPanel: document.getElementById('annotations-panel'),
    closeAnnotationsBtn: document.getElementById('close-annotations-btn'),
    annotationsList: document.getElementById('annotations-list'),
    annotationActionModal: document.getElementById('annotation-action-modal'),
    annotationCloseBtn: document.getElementById('annotation-close'),
    annotationGotoBtn: document.getElementById('annotation-goto'),
    annotationEditBtn: document.getElementById('annotation-edit'),
    annotationDeleteBtn: document.getElementById('annotation-delete'),
    alertModal: document.getElementById('alert-modal'),
    alertMessage: document.getElementById('alert-message'),
    alertOkBtn: document.getElementById('alert-ok'),
};

const leftCtx = elements.leftCanvas.getContext('2d');
const rightCtx = elements.rightCanvas.getContext('2d');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

let state = {
    pdfDoc: null,
    currentPage: 1,
    scale: 0.8,
    highlightsByPage: {},
    bookmarkedPages: new Set(),
    tempSelection: null,
    editingAnnotation: null,
};

function renderPage(num, canvas, ctx, wrapper) {
    if (!state.pdfDoc || num < 1 || num > state.pdfDoc.numPages) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const oldTextLayer = wrapper.querySelector(".textLayer");
        if (oldTextLayer) oldTextLayer.remove();
        return;
    }

    state.pdfDoc.getPage(num).then(async (page) => {
        const viewport = page.getViewport({ scale: state.scale });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const transform = [outputScale, 0, 0, outputScale, 0, 0];
        const renderContext = { canvasContext: ctx, viewport, transform };
        
        await page.render(renderContext).promise;
        
        const oldTextLayer = wrapper.querySelector(".textLayer");
        if (oldTextLayer) oldTextLayer.remove();

        const textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        wrapper.appendChild(textLayerDiv);

        const textContent = await page.getTextContent();
        pdfjsLib.renderTextLayer({
            textContent,
            container: textLayerDiv,
            viewport,
            textDivs: [],
            enhanceTextSelection: true,
        });
        
        const oldHighlightLayer = wrapper.querySelector(".highlight-layer");
        if (oldHighlightLayer) oldHighlightLayer.remove();
        
        const highlightLayerDiv = document.createElement("div");
        highlightLayerDiv.className = "highlight-layer";
        wrapper.appendChild(highlightLayerDiv);

        drawHighlights(num, highlightLayerDiv);
        updateBookmarkUI(num, (num % 2 !== 0) ? elements.bookmarkIconLeft : elements.bookmarkIconRight);
    });
}

function renderDoublePages() {
    const leftPageNum = state.currentPage;
    const rightPageNum = state.currentPage + 1;

    renderPage(leftPageNum, elements.leftCanvas, leftCtx, elements.leftPageWrapper);
    renderPage(rightPageNum, elements.rightCanvas, rightCtx, elements.rightPageWrapper);
}

function drawHighlights(pageNum, highlightLayer) {
    const highlights = state.highlightsByPage[pageNum] || [];
    highlights.forEach(h => {
        h.rects.forEach(rect => {
            const div = document.createElement('div');
            div.className = h.note ? 'highlight-box annotation-box' : 'highlight-box';
            div.style.left = `${rect.x * state.scale}px`;
            div.style.top = `${rect.y * state.scale}px`;
            div.style.width = `${rect.width * state.scale}px`;
            div.style.height = `${rect.height * state.scale}px`;
            highlightLayer.appendChild(div);
        });
    });
}

function updateBookmarkUI(pageNum, iconElement) {
    if (state.bookmarkedPages.has(pageNum)) {
        iconElement.style.display = 'block';
    } else {
        iconElement.style.display = 'none';
    }
}

function nextPages() {
    if (state.currentPage + 2 <= state.pdfDoc.numPages) {
        state.currentPage += 2;
        renderDoublePages();
    }
}

function prevPages() {
    if (state.currentPage - 2 >= 1) {
        state.currentPage -= 2;
        renderDoublePages();
    }
}

pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDoc_) {
    state.pdfDoc = pdfDoc_;
    renderDoublePages();
});

// --- Lógica da Interface ---

// Menu Lateral
elements.btnExp.addEventListener('click', function(){
    elements.menuLateral.classList.toggle('expandir');
    elements.flipbookContainer.classList.toggle('expandir');
});

// Navegação
elements.buttonLeft.addEventListener('click', prevPages);
elements.buttonRight.addEventListener('click', nextPages);

// Zoom
elements.zoomInBtn.addEventListener('click', () => { state.scale += 0.1; renderDoublePages(); });
elements.zoomOutBtn.addEventListener('click', () => { if(state.scale > 0.3) { state.scale -= 0.1; renderDoublePages(); } });

// Temas
const modos = ["modo-claro", "modo-noturno", "modo-sepia"];
let indiceModo = 0;
function aplicarModo(modo) {
    document.body.classList.remove(...modos);
    document.body.classList.add(modo);
    const icon = elements.themeIconContainer.querySelector('i');
    if (modo === "modo-claro") icon.className = "bi bi-brightness-high-fill";
    else if (modo === "modo-noturno") icon.className = "bi bi-moon-fill";
    else icon.className = "bi bi-circle-square";
    localStorage.setItem("modoAtual", modo);
}
elements.themeBtn.addEventListener("click", () => {
    indiceModo = (indiceModo + 1) % modos.length;
    aplicarModo(modos[indiceModo]);
});
window.addEventListener("DOMContentLoaded", () => {
    const modoSalvo = localStorage.getItem("modoAtual");
    if (modoSalvo && modos.includes(modoSalvo)) {
        indiceModo = modos.indexOf(modoSalvo);
        aplicarModo(modoSalvo);
    } else {
        aplicarModo(modos[0]);
    }
});

// Alerta
function showAlert(message) {
    elements.alertMessage.textContent = message;
    elements.alertModal.style.display = 'flex';
}
elements.alertOkBtn.addEventListener('click', () => elements.alertModal.style.display = 'none');

// Lógica de Marcação/Anotação
function getSelectionDetails(pageWrapper, pageNum) {
    const selection = window.getSelection();
    if (selection.isCollapsed) return null;

    const wrapperRect = pageWrapper.getBoundingClientRect();
    let isSelectionOnPage = false;
    
    const selectionRects = Array.from(selection.getRangeAt(0).getClientRects()).map(r => {
        if (r.top >= wrapperRect.top && r.bottom <= wrapperRect.bottom) {
            isSelectionOnPage = true;
        }
        return {
            x: (r.left - wrapperRect.left) / state.scale,
            y: (r.top - wrapperRect.top) / state.scale,
            width: r.width / state.scale,
            height: r.height / state.scale,
        };
    });

    if (!isSelectionOnPage) return null;

    return { pageNum, rects: selectionRects, text: selection.toString() };
}

function applyAction(type) {
    const leftSelection = getSelectionDetails(elements.leftPageWrapper, state.currentPage);
    const rightSelection = getSelectionDetails(elements.rightPageWrapper, state.currentPage + 1);
    const selection = leftSelection || rightSelection;

    if (!selection) return;

    state.tempSelection = selection;

    if (type === 'highlight') saveHighlights();
    else if (type === 'annotate') {
        state.editingAnnotation = null;
        elements.noteInput.value = '';
        elements.noteModal.style.display = 'flex';
        elements.noteInput.focus();
    }
}

function saveHighlights() {
    const pageNum = state.editingAnnotation ? state.editingAnnotation.pageNum : state.tempSelection.pageNum;
    if (!state.highlightsByPage[pageNum]) state.highlightsByPage[pageNum] = [];
    const pageHighlights = state.highlightsByPage[pageNum];

    if (state.editingAnnotation) {
        state.editingAnnotation.note = elements.noteInput.value.trim();
    } else {
        pageHighlights.push({
            id: Date.now(),
            rects: state.tempSelection.rects,
            note: state.tempSelection.note || null,
            snippet: state.tempSelection.text,
            timestamp: state.tempSelection.note ? new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : null,
        });
    }

    renderDoublePages();
    if (state.editingAnnotation) renderAnnotationsList();
    state.tempSelection = null;
    state.editingAnnotation = null;
    window.getSelection().removeAllRanges();
}

elements.highlightBtn.addEventListener('click', () => applyAction('highlight'));
elements.annotateBtn.addEventListener('click', () => applyAction('annotate'));
elements.noteSaveBtn.addEventListener('click', () => {
    const noteText = elements.noteInput.value.trim();
    if (!noteText) return;
    if (!state.editingAnnotation) state.tempSelection.note = noteText;
    saveHighlights();
    elements.noteModal.style.display = 'none';
});
elements.noteCancelBtn.addEventListener('click', () => {
    elements.noteModal.style.display = 'none';
    state.tempSelection = null;
    state.editingAnnotation = null;
    window.getSelection().removeAllRanges();
});

// Lógica para Remover Marcações
function handlePageClick(e, pageWrapper, pageNum) {
    if (window.getSelection().toString()) return;

    const wrapperRect = pageWrapper.getBoundingClientRect();
    const clickX = (e.clientX - wrapperRect.left) / state.scale;
    const clickY = (e.clientY - wrapperRect.top) / state.scale;
    
    const highlights = state.highlightsByPage[pageNum] || [];
    let highlightToDelete = null;

    for (const h of highlights) {
        for (const rect of h.rects) {
            if (clickX >= rect.x && clickX <= rect.x + rect.width && clickY >= rect.y && clickY <= rect.y + rect.height) {
                highlightToDelete = h;
                break;
            }
        }
        if (highlightToDelete) break;
    }
    
    if (highlightToDelete) {
        const index = highlights.indexOf(highlightToDelete);
        highlights.splice(index, 1);
        renderDoublePages();
        renderAnnotationsList();
    }
}
elements.leftPageWrapper.addEventListener('click', (e) => handlePageClick(e, elements.leftPageWrapper, state.currentPage));
elements.rightPageWrapper.addEventListener('click', (e) => handlePageClick(e, elements.rightPageWrapper, state.currentPage + 1));

// Painel de Anotações
elements.viewAnnotationsBtn.addEventListener('click', () => {
    renderAnnotationsList();
    elements.annotationsPanel.classList.add('open');
});
elements.closeAnnotationsBtn.addEventListener('click', () => {
    elements.annotationsPanel.classList.remove('open');
});

function showAnnotationActions(anno, pageNum) {
    state.editingAnnotation = anno;
    state.editingAnnotation.pageNum = pageNum;
    const modal = elements.annotationActionModal;
    modal.querySelector('blockquote').textContent = anno.snippet;
    modal.querySelector('p').textContent = anno.note;
    modal.style.display = 'flex';
}

elements.annotationGotoBtn.onclick = () => {
    const page = state.editingAnnotation.pageNum;
    state.currentPage = (page % 2 === 0) ? page - 1 : page;
    renderDoublePages();
    elements.annotationActionModal.style.display = 'none';
    elements.annotationsPanel.classList.remove('open');
};
elements.annotationEditBtn.onclick = () => {
    elements.annotationActionModal.style.display = 'none';
    elements.noteInput.value = state.editingAnnotation.note;
    elements.noteModal.style.display = 'flex';
    elements.noteInput.focus();
};
elements.annotationDeleteBtn.onclick = () => {
    const pageNum = state.editingAnnotation.pageNum;
    const highlights = state.highlightsByPage[pageNum];
    const index = highlights.findIndex(h => h.id === state.editingAnnotation.id);
    if (index > -1) {
        highlights.splice(index, 1);
        renderDoublePages();
        renderAnnotationsList();
    }
    elements.annotationActionModal.style.display = 'none';
};
elements.annotationCloseBtn.onclick = () => elements.annotationActionModal.style.display = 'none';

// Bookmark
elements.bookmarkBtn.addEventListener('click', () => {
    const pageToBookmark = state.currentPage; // Marca a página da esquerda
    if (state.bookmarkedPages.has(pageToBookmark)) {
        state.bookmarkedPages.delete(pageToBookmark);
    } else {
        state.bookmarkedPages.add(pageToBookmark);
    }
    updateBookmarkUI(pageToBookmark, elements.bookmarkIconLeft);

    const otherPage = state.currentPage + 1; // Marca a página da direita
    if(otherPage <= state.pdfDoc.numPages) {
         if (state.bookmarkedPages.has(otherPage)) {
            state.bookmarkedPages.delete(otherPage);
        } else {
            state.bookmarkedPages.add(otherPage);
        }
        updateBookmarkUI(otherPage, elements.bookmarkIconRight);
    }
});


// Tooltip
function handleTooltip(e, pageWrapper, pageNum) {
     if (elements.noteModal.style.display === 'flex' || elements.annotationActionModal.style.display === 'flex') {
        elements.noteTooltip.style.display = 'none';
        return;
    }
    const wrapperRect = pageWrapper.getBoundingClientRect();
    const mouseX = e.clientX - wrapperRect.left;
    const mouseY = e.clientY - wrapperRect.top;
    
    const highlights = state.highlightsByPage[pageNum] || [];
    let foundHighlight = null;

    for (const h of highlights) {
        if (!h.note) continue;
        for (const rect of h.rects) {
            const scaledRect = { x: rect.x * state.scale, y: rect.y * state.scale, width: rect.width * state.scale, height: rect.height * state.scale };
            if (mouseX >= scaledRect.x && mouseX <= scaledRect.x + scaledRect.width && mouseY >= scaledRect.y && mouseY <= scaledRect.y + scaledRect.height) {
                foundHighlight = h;
                break;
            }
        }
        if (foundHighlight) break;
    }
    
    if (foundHighlight) {
        elements.noteTooltip.textContent = foundHighlight.note;
        elements.noteTooltip.style.display = 'block';
        elements.noteTooltip.style.left = `${e.pageX + 10}px`;
        elements.noteTooltip.style.top = `${e.pageY + 10}px`;
    } else {
        elements.noteTooltip.style.display = 'none';
    }
}

elements.leftPageWrapper.addEventListener('mousemove', (e) => handleTooltip(e, elements.leftPageWrapper, state.currentPage));
elements.rightPageWrapper.addEventListener('mousemove', (e) => handleTooltip(e, elements.rightPageWrapper, state.currentPage + 1));
elements.leftPageWrapper.addEventListener('mouseleave', () => elements.noteTooltip.style.display = 'none');
elements.rightPageWrapper.addEventListener('mouseleave', () => elements.noteTooltip.style.display = 'none');