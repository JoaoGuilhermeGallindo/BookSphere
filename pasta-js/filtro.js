const data = [
    {
        id: "divina-comedia",
        titulo: "A Divina Comédia",
        autor: "Dante Alighieri",
        capa: "../Capas/A Divina Comédia.jpg",
        genero: "Clássico"
    },
    {
        id: "dom-casmurro",
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        capa: "../Capas/Dom Casmurro.jpg",
        genero: "Romance"
    },
    {
        id: "a-carteira",
        titulo: "A Carteira",
        autor: "Machado de Assis",
        capa: "../Capas/A Carteira.jpg",
        genero: "Conto"
    },
    {
        id: "os-lusiadas",
        titulo: "Os Lusíadas",
        autor: "Luís Vaz de Camões",
        capa: "../Capas/Os Lusiadas.jpg",
        genero: "Clássico"
    },
    {
        id: "arte-poetica",
        titulo: "A Arte Poética",
        autor: "Aristóteles",
        capa: "../Capas/A Arte Poética.jpg",
        genero: "Filosofia"
    },
    {
        id: "alma-do-lazaro",
        titulo: "A Alma do Lázaro",
        autor: "José de Alencar",
        capa: "../Capas/A Alma do Lazaro.jpg",
        genero: "Romance"
    },
    {
        id: "bela-madame-vargas",
        titulo: "A Bela Madame Vargas",
        autor: "Camilo Castelo Branco",
        capa: "../Capas/A Bela Madame Vargas.jpg",
        genero: "Romance"
    },
    {
        id: "brasileira-de-prazins",
        titulo: "A Brasileira de Prazins",
        autor: "Camilo Castelo Branco",
        capa: "../Capas/A Brasileira de Prazins.jpg",
        genero: "Romance"
    },
    {
        id: "dama-das-camelias",
        titulo: "A Dama das Camélias",
        autor: "Alexandre Dumas Filho",
        capa: "../Capas/A Dama das Camelias.jpg",
        genero: "Romance"
    },
    {
        id: "escrava-isaura",
        titulo: "A Escrava Isaura",
        autor: "Bernardo Guimarães",
        capa: "../Capas/A Escrava Isaura.jpg",
        genero: "Romance"
    },
    {
        id: "esfinge-sem-segredo",
        titulo: "A Esfinge sem Segredo",
        autor: "Oscar Wilde",
        capa: "../Capas/A Esfinge sem Segredo.jpg",
        genero: "Conto"
    },
    {
        id: "harpa-do-crente",
        titulo: "A Harpa do Crente",
        autor: "Alexandre Herculano",
        capa: "../Capas/AHarpaDoCrente.jpg",
        genero: "Poesia"
    },
    {
        id: "igreja-do-diabo",
        titulo: "A Igreja do Diabo",
        autor: "Machado de Assis",
        capa: "../Capas/A IgrejaDoDiabo.jpg",
        genero: "Conto"
    },
    {
        id: "iracema",
        titulo: "Iracema",
        autor: "José de Alencar",
        capa: "../Capas/A Iracema.jpg",
        genero: "Romance"
    },
    {
        id: "mulher-de-preto",
        titulo: "A Mulher de Preto",
        autor: "Machado de Assis",
        capa: "../Capas/A Mulher de Preto.jpg",
        genero: "Conto"
    },
    {
        id: "pata-da-gazela",
        titulo: "A Pata da Gazela",
        autor: "José de Alencar",
        capa: "../Capas/A Pata Da Gazela.jpg",
        genero: "Romance"
    },
    {
        id: "utopia",
        titulo: "A Utopia",
        autor: "Thomás Morus",
        capa: "../Capas/A Utopia.jpg",
        genero: "Filosofia"
    },
    {
        id: "carta-de-pero-vaz",
        titulo: "A Carta de Pero Vaz de Caminha",
        autor: "Pero Vaz de Caminha",
        capa: "../Capas/ACartaDePeroVazDeCaminha.jpg",
        genero: "Histórico"
    },
    {
        id: "cidade-e-asserras-",
        titulo: "A Cidade e as Serras",
        autor: "Eça de Queirós",
        capa: "../Capas/ACidadeEAsSerras.jpg",
        genero: "Romance"
    },
    {
        id: "adao-e-eva",
        titulo: "Adão e Eva",
        autor: "Machado de Assis",
        capa: "../Capas/AdaoEEva.jpg",
        genero: "Conto"
    },
    {
        id: "moreninha",
        titulo: "A Moreninha",
        autor: "Joaquim Manuel de Macedo",
        capa: "../Capas/A Moreninha.jpg",
        genero: "Romance"
    },
    {
        id: "tempestade",
        titulo: "A Tempestade",
        autor: "William Shakespeare",
        capa: "../Capas/ATempestade.jpg",
        genero: "Teatro"
    },
    {
        id: "via-lactea",
        titulo: "Via Láctea",
        autor: "Olavo Bilac",
        capa: "../Capas/ViaLactea.jpg",
        genero: "Poesia"
    },
    {
        id: "vozes-da-africa",
        titulo: "Vozes d’África",
        autor: "Castro Alves",
        capa: "../Capas/VozesDAfrica.jpg",
        genero: "Poesia"
    },
    {
        id: "cartomante",
        titulo: "A Cartomante",
        autor: "Machado de Assis",
        capa: "../Capas/Cartomante.jpg",
        genero: "Conto"
    },
    {
        id: "dom-quixote-volume2",
        titulo: "Dom Quixote",
        autor: "Miguel de Cervantes",
        capa: "../Capas/Dom Quixote Volume II.jpg",
        genero: "Clássico"
    },
    {
        id: "dom-quixote-volume1",
        titulo: "Dom Quixote",
        autor: "Miguel de Cervantes",
        capa: "../Capas/Dom Quixote Volume I.jpg",
        genero: "Clássico"
    },
    {
        id: "macbeth",
        titulo: "Macbeth",
        autor: "William Shakespeare",
        capa: "../Capas/Macbeth.jpg",
        genero: "Teatro"
    },
    {
        id: "helena",
        titulo: "Helena",
        autor: "Machado de Assis",
        capa: "../Capas/Helena.jpg",
        genero: "Romance"
    },
    {
        id: "livro-de-magoas",
        titulo: "Livro de Mágoas",
        autor: "Florbela Espanca",
        capa: "../Capas/Livro de Maguas.jpg",
        genero: "Poesia"
    },
    {
        id: "livro-do-desassossego",
        titulo: "Livro do Desassossego",
        autor: "Fernando Pessoa",
        capa: "../Capas/LivroDoDesassossego.jpg",
        genero: "Filosofia"
    },
    {
        id: "memorias-postumas",
        titulo: "Memórias Póstumas de Brás Cubas",
        autor: "Machado de Assis",
        capa: "../Capas/Memorias Postumas de Bras Cubas.jpg",
        genero: "Romance"
    },
    {
        id: "mensagem",
        titulo: "Mensagem",
        autor: "Fernando Pessoa",
        capa: "../Capas/Mensagem.jpg",
        genero: "Poesia"
    },
    {
        id: "mulato",
        titulo: "O Mulato",
        autor: "Aluísio Azevedo",
        capa: "../Capas/Mulato.jpg",
        genero: "Romance"
    },
    {
        id: "a-carne",
        titulo: "A Carne",
        autor: "Júlio Ribeiro",
        capa: "../Capas/A Carne.jpg",
        genero: "Romance"
    },
    {
        id: "o-alienista",
        titulo: "O Alienista",
        autor: "Machado de Assis",
        capa: "../Capas/O Alienista.jpg",
        genero: "Romance"
    },
    {
        id: "auto-da-barca-do-inferno",
        titulo: "Auto da Barca do Inferno",
        autor: "Gil Vicente",
        capa: "../Capas/O Auto da Barca do Inferno.jpg",
        genero: "Teatro"
    },
    {
        id: "eu-profundo",
        titulo: "O Eu Profundo e os Outros Eus",
        autor: "Fernando Pessoa",
        capa: "../Capas/O Eu profundo e os outros eus.jpg",
        genero: "Poesia"
    },
    {
        id: "contos-para-velhos",
        titulo: "Contos para Velhos",
        autor: "Olavo Bilac",
        capa: "../Capas/Contos para Velhos.jpg",
        genero: "Conto"
    },
    {
        id: "guardador-de-rebanhos",
        titulo: "O Guardador de Rebanhos",
        autor: "Fernando Pessoa (Alberto Caeiro)",
        capa: "../Capas/o-guardador-de-rebanhos-3.jpg",
        genero: "Poesia"
    },
    {
        id: "pastor-amoroso",
        titulo: "O Pastor Amoroso",
        autor: "Fernando Pessoa (Alberto Caeiro)",
        capa: "../Capas/OPastorAmoroso.jpg",
        genero: "Poesia"
    },
    {
        id: "os-sertoes",
        titulo: "Os Sertões",
        autor: "Euclides da Cunha",
        capa: "../Capas/Os Sertões.jpg",
        genero: "Histórico"
    },
    {
        id: "os-maias",
        titulo: "Os Maias",
        autor: "Eça de Queirós",
        capa: "../Capas/OsMaias.jpg",
        genero: "Romance"
    },
    {
        id: "a-mensageira-das-violetas",
        titulo: "A Mensageira das Violetas",
        autor: "Florbela Espanca",
        capa: "../Capas/A Mensageira das Violetas.jpg",
        genero: "Poesia"
    },
    {
        id: "cancioneiro",
        titulo: "Cancioneiro",
        autor: "Fernando Pessoa",
        capa: "../Capas/Cancioneiro.jpg",
        genero: "Poesia"
    },
    {
        id: "o-que-e-o-casamento",
        titulo: "O que é o Casamento?",
        autor: "José de Alencar",
        capa: "../Capas/OQueEOCasamento.jpg",
        genero: "Ensaio"
    },
    {
        id: "farsa-de-ines-pereira",
        titulo: "Farsa de Inês Pereira",
        autor: "Gil Vicente",
        capa: "../Capas/FarsaDeInesPereira.jpg",
        genero: "Teatro"
    },
    {
        id: "alegria-da-revolucao",
        titulo: "A Alegria da Revolução",
        autor: "Ken Knab",
        capa: "../Capas/a-alegria-da-revolucao-1.webp",
        genero: "Ensaio"
    },
    {
        id: "os-escravos",
        titulo: "Os Escravos",
        autor: "Antônio Frederico de Castro Alves",
        capa: "../Capas/OsEscravos.jpg",
        genero: "Poesia"
    },
    {
        id: "este-mundo",
        titulo: "Este Mundo da Injustiça Globalizada",
        autor: "José Saramago",
        capa: "../Capas/Este Mundo Da inustiça Globalizada.jpg",
        genero: "Ensaio"
    }
];

const livrossection = document.querySelector(".livros-lista");
const searchInput = document.querySelector("#pesquisar");
const generoTexto = document.getElementById("generoSelecionadoTexto");

let generoAtivo = localStorage.getItem("generoSelecionado") || "todos";
let textoBuscaSalvo = localStorage.getItem("textoBusca") || "";

// Função para exibir os livros
const displayData = (livros) => {
    livrossection.innerHTML = "";

    if (livros.length === 0) {
        livrossection.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    livros.forEach(e => {
        livrossection.innerHTML += `
            <article class="livro-card">
                <img src="${e.capa}" alt="${e.titulo}" />
                <h3>${e.titulo}</h3>
                <p>${e.autor}</p>
                <button onclick="location.href='../livro/sinopse.html?id=${e.id}'">
                    BAIXAR OU LER ONLINE
                </button>
            </article>
        `;
    });
};

// Atualiza o texto do breadcrumb
const atualizarBreadcrumb = (genero) => {
    generoTexto.textContent = genero === "todos"
        ? "TODOS"
        : genero.toUpperCase();
};

// Filtro por gênero
const generoButtons = document.querySelectorAll("button[data-genero]");

generoButtons.forEach(button => {
    button.addEventListener("click", () => {
        generoAtivo = button.getAttribute("data-genero").toLowerCase();

        // Salva no localStorage
        localStorage.setItem("generoSelecionado", generoAtivo);

        // Limpa o campo de busca e remove do localStorage
        searchInput.value = "";
        localStorage.removeItem("textoBusca");

        // Atualiza breadcrumb
        atualizarBreadcrumb(generoAtivo);

        // Aplica o filtro
        const livrosFiltrados = generoAtivo === "todos"
            ? data
            : data.filter(livro => livro.genero.toLowerCase() === generoAtivo);

        displayData(livrosFiltrados);
    });
});

// Evento de pesquisa
searchInput.addEventListener("input", (e) => {
    const valorBusca = e.target.value.trim();

    // Salva o texto digitado no localStorage
    localStorage.setItem("textoBusca", valorBusca);

    if (valorBusca !== "") {
        // Atualiza breadcrumb com o texto digitado, em maiúsculas
        generoTexto.textContent = valorBusca.toUpperCase();

        // Busca em todos os livros (independente do gênero ativo)
        const livrosFiltrados = data.filter(livro =>
            livro.titulo.toLowerCase().includes(valorBusca.toLowerCase()) ||
            livro.autor.toLowerCase().includes(valorBusca.toLowerCase()) ||
            livro.genero.toLowerCase().includes(valorBusca.toLowerCase())
        );

        displayData(livrosFiltrados);
    } else {
        // Se campo vazio, volta a mostrar o gênero ativo no breadcrumb
        atualizarBreadcrumb(generoAtivo);

        // Aplica filtro pelo gênero ativo
        const livrosFiltrados = generoAtivo === "todos"
            ? data
            : data.filter(livro => livro.genero.toLowerCase() === generoAtivo);

        displayData(livrosFiltrados);
    }
});

// Exibir ao carregar com base no gênero salvo e texto de busca salvo
window.addEventListener("load", () => {
    if (textoBuscaSalvo !== "") {
        // Se houver texto salvo, coloca no input e atualiza breadcrumb
        searchInput.value = textoBuscaSalvo;
        generoTexto.textContent = textoBuscaSalvo.toUpperCase();

        // Filtra com o texto salvo (busca geral)
        const livrosFiltrados = data.filter(livro =>
            livro.titulo.toLowerCase().includes(textoBuscaSalvo.toLowerCase()) ||
            livro.autor.toLowerCase().includes(textoBuscaSalvo.toLowerCase()) ||
            livro.genero.toLowerCase().includes(textoBuscaSalvo.toLowerCase())
        );

        displayData(livrosFiltrados);
    } else {
        // Senão, mostra o gênero ativo normalmente
        atualizarBreadcrumb(generoAtivo);

        const livrosFiltrados = generoAtivo === "todos"
            ? data
            : data.filter(livro => livro.genero.toLowerCase() === generoAtivo);

        displayData(livrosFiltrados);
    }
});
