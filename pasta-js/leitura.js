const params = new URLSearchParams(window.location.search);
const pdfFile = params.get("pdf"); // pega ?pdf=arquivo.pdf

if (!pdfFile) {
    document.body.innerHTML = "<p>Arquivo PDF não especificado.</p>";
    throw new Error("Nenhum PDF foi passado na URL");
}

const pdfPath = `../livro/livros-pdf/${decodeURIComponent(pdfFile)}`;

let pdfDoc = null;
let currentPage = 2; // começa mostrando páginas 1 e 2

const leftCanvas = document.getElementById('leftPageCanvas');
const rightCanvas = document.getElementById('rightPageCanvas');
const leftCtx = leftCanvas.getContext('2d');
const rightCtx = rightCanvas.getContext('2d');

pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

function renderPage(num, canvas, ctx) {
    pdfDoc.getPage(num).then(function (page) {
        const container = canvas.parentElement;

        const scale = 0.8; // ou outro valor que você desejar
        const viewport = page.getViewport({ scale });


        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
            transform: [outputScale, 0, 0, outputScale, 0, 0]
        };

        // Renderizar no canvas
        page.render(renderContext);

        // 🔹 Remover camada antiga
        const oldTextLayer = container.querySelector(".textLayer");
        if (oldTextLayer) oldTextLayer.remove();

        // 🔹 Criar nova camada de texto
        const textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        container.appendChild(textLayerDiv);
     

        page.getTextContent().then(function (textContent) {
            pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayerDiv,
                viewport: viewport,
                textDivs: [],
                enhanceTextSelection: true
            })
        });
        
    });
}

  

  


function renderDoublePages() {
    const leftPageNum = currentPage - 1;
    const rightPageNum = currentPage;

    if (leftPageNum >= 1) renderPage(leftPageNum, leftCanvas, leftCtx);
    else leftCtx.clearRect(0, 0, leftCanvas.width, leftCanvas.height);

    if (rightPageNum <= pdfDoc.numPages) renderPage(rightPageNum, rightCanvas, rightCtx);
    else rightCtx.clearRect(0, 0, rightCanvas.width, rightCanvas.height);
}

function nextPages() {
    if (currentPage + 2 <= pdfDoc.numPages) {
        currentPage += 2;
        renderDoublePages();
    }
}

function prevPages() {
    if (currentPage - 2 >= 2) {
        currentPage -= 2;
        renderDoublePages();
    } else if (currentPage !== 2) {
        // volta para mostrar apenas a capa (página 1)
        currentPage = 1;
        renderDoublePages();
    }
}

// Carregar PDF
pdfjsLib.getDocument(pdfPath).promise.then(function (pdfDoc_) {
    pdfDoc = pdfDoc_;
    renderDoublePages();
});

const btnModo = document.getElementById("mudar-tema");
const modos = ["modo-claro", "modo-noturno", "modo-sepia"];
let indice = 0;

// Função para atualizar tema e botão
function aplicarModo(modo) {
    // Remove classes antigas
    document.body.classList.remove(...modos);

    // Aplica novo modo
    document.body.classList.add(modo);

    // Atualiza o botão só com o ícone
    if (modo === "modo-claro") {
        btnModo.innerHTML = `
       <i class="bi bi-brightness-high-fill"></i>
        `;
    } else if (modo === "modo-noturno") {
        btnModo.innerHTML = `
       <i class="bi bi-moon-fill"></i>
        `;
    } else {
        btnModo.innerHTML = `
           <i class="bi bi-circle-square"></i>
        `;
    }

    // Salva no localStorage
    localStorage.setItem("modoAtual", modo);
}

// Evento do botão
btnModo.addEventListener("click", () => {
    indice = (indice + 1) % modos.length;
    aplicarModo(modos[indice]);
});

// Quando a página carrega, verifica se já tem modo salvo
window.addEventListener("DOMContentLoaded", () => {
    const modoSalvo = localStorage.getItem("modoAtual");
    if (modoSalvo && modos.includes(modoSalvo)) {
        indice = modos.indexOf(modoSalvo);
        aplicarModo(modoSalvo);
    } else {
        aplicarModo(modos[indice]); // aplica o padrão
    }
});

//Expandir o menu

var btnExpandir = document.querySelector('#btn-exp')

var menuSide1 = document.querySelector('.menu-lateral')
var menuSide2 = document.querySelector('.flipbook-container')
var menuSide3 = document.querySelector('.button-left')
var menuSide4 = document.querySelector('.button-right')

btnExpandir.addEventListener('click', function(){
    menuSide1.classList.toggle('expandir')
    menuSide2.classList.toggle('expandir')
    menuSide3.classList.toggle('expandir')
    menuSide4.classList.toggle('expandir')
})



