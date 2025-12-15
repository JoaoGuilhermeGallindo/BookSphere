const data = [
  {
    id: "a-princesa-da-babilonia",
    titulo: "A Princesa de Babilônia",
    autor: "Voltaire",
    capa: "../Capas/APrincesadeBabilonia.jpg",
    genero: "Filosofia",
  },
  {
    id: "A-Megera-Domada",
    titulo: "A Megera Domada",
    autor: "William Shakespeare",
    capa: "../Capas/A-Megera-Domada.jpg",
    genero: "Teatro",
  },
  {
    id: "os-lusiadas",
    titulo: "Os Lusiadas",
    autor: "Luís Vaz de Camões",
    capa: "../Capas/OsLusiadas.jpg",
    genero: "Clássico",
  },
  {
    id: "o-alienista",
    titulo: "O Alienista",
    autor: "Machado de Assis",
    capa: "../Capas/OAlienista.jpg",
    genero: "Romance",
  },
  {
    id: "o-que-e-o-casamento",
    titulo: "O que é o Casamento?",
    autor: "José de Alencar",
    capa: "../Capas/OqueEOCasamento.jpg",
    genero: "Ensaio",
  },
  {
    id: "a-cidade-e-as-serras",
    titulo: "A Cidade e as Serras",
    autor: "Eça de Queirós",
    capa: "../Capas/ACidadeEasSerras.jpg",
    genero: "Romance",
  },
  {
    id: "o-cortiço",
    titulo: "O Cortiço",
    autor: "Aluísio de Azevedo",
    capa: "../Capas/Ocortico.jpg",
    genero: "Histórico",
  },
  {
    id: "TristeFimdePolicarpoQuaresma",
    titulo: "Triste Fim de Policarpo Quaresma",
    autor: "Afonso Henriques de Lima Barreto",
    capa: "../Capas/Triste-Fim-de-Policarpo-Quaresmaa.jpg",
    genero: "Histórico",
  },
  {
    id: "candido",
    titulo: "Cândido",
    autor: "Voltaire",
    capa: "../Capas/Candido.jpg",
    genero: "Clássico",
  },
  {
    id: "a-desobediencia-civil",
    titulo: "A Desobediência Civil",
    autor: "Henry David Thoureau ",
    capa: "../Capas/Adesobedienciacivil.jpg",
    genero: "Filosofia",
  },
  {
    id: "cancioneiro",
    titulo: "Cancioneiro",
    autor: "Fernando Pessoa",
    capa: "../Capas/Cancioneiro.jpg",
    genero: "Poesia",
  },
  {
    id: "a-campanha-abolicionista",
    titulo: "A Campanha Abolicionista",
    autor: "José Carlos do Patrocínio",
    capa: "../Capas/ACampanhaAbolicionista.jpg",
    genero: "Ensaio",
  },
  {
    id: "bela-madame-vargas",
    titulo: "A Bela Madame Vargas",
    autor: "Camilo Castelo Branco",
    capa: "../Capas/ABelaMadameVargas.jpg",
    genero: "Romance",
  },
  {
    id: "a-moreninha",
    titulo: "A Moreninha",
    autor: "Joaquim Manuel de Macedo",
    capa: "../Capas/AMoreninha.jpg",
    genero: "Romance",
  },
  {
    id: "dom-quixote-volume1",
    titulo: "Dom Quixote Vol. 1",
    autor: "Miguel de Cervantes",
    capa: "../Capas/DomQuixoteVolumeI.jpg",
    genero: "Clássico",
  },
  {
    id: "os-maias",
    titulo: "Os Maias",
    autor: "Eça de Queirós",
    capa: "../Capas/OsMaias.jpg",
    genero: "Romance",
  },
  {
    id: "a-harpa-do-crente",
    titulo: "A Harpa do Crente",
    autor: "Alexandre Herculano",
    capa: "../Capas/AHarpaDoCrente.jpg",
    genero: "Poesia",
  },
  {
    id: "o-ateneu",
    titulo: "O Ateneu",
    autor: "Raul Pompeia",
    capa: "../Capas/OAteneu.png",
    genero: "Histórico",
  },
  {
    id: "a-igreja-do-diabo",
    titulo: "A Igreja do Diabo",
    autor: "Machado de Assis",
    capa: "../Capas/AIgrejaDoDiabo.jpg",
    genero: "Conto",
  },
  {
    id: "dom-casmurro",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    capa: "../Capas/DomCasmurro.jpg",
    genero: "Romance",
  },
  {
    id: "a-utopia",
    titulo: "A Utopia",
    autor: "Thomás Morus",
    capa: "../Capas/AUtopia.jpg",
    genero: "Filosofia",
  },
  {
    id: "dom-quixote-volume2",
    titulo: "Dom Quixote Vol. 2",
    autor: "Miguel de Cervantes",
    capa: "../Capas/DomQuixoteVolumeII.jpg",
    genero: "Clássico",
  },
  {
    id: "a-esfinge-sem-segredo",
    titulo: "A Esfinge sem Segredo",
    autor: "Oscar Wilde",
    capa: "../Capas/AEsfingeSemSegredo.jpg",
    genero: "Conto",
  },
  {
    id: "a-metamorfose",
    titulo: "A Metamorfose",
    autor: "Franz Kafka",
    capa: "../Capas/AMetamorfose.jpg",
    genero: "Clássico",
  },
  {
    id: "helena",
    titulo: "Helena",
    autor: "Machado de Assis",
    capa: "../Capas/Helena.jpg",
    genero: "Romance",
  },
  {
    id: "auto-da-barca-do-inferno",
    titulo: "Auto da Barca do Inferno",
    autor: "Gil Vicente",
    capa: "../Capas/AutoDaBarcaDoInferno.jpg",
    genero: "Teatro",
  },
  {
    id: "o-abolicionismo",
    titulo: "O Abolicionismo",
    autor: "Joaquim Nabuco",
    capa: "../Capas/OAbolicionismo.jpg",
    genero: "Ensaio",
  },
  {
    id: "a-brasileira-de-prazins",
    titulo: "A Brasileira de Prazins",
    autor: "Camilo Castelo Branco",
    capa: "../Capas/ABrasileiraDePrazins.jpg",
    genero: "Romance",
  },
  {
    id: "sermao-da-sexagesima",
    titulo: "Sermão da Sexagésima",
    autor: "Padre Antônio Vieira",
    capa: "../Capas/SermaoDaSexagesima.jpg",
    genero: "Filosofia",
  },
  {
    id: "bom-crioulo",
    titulo: "Bom Crioulo",
    autor: "Adolfo Ferreira Caminha",
    capa: "../Capas/BomCrioulo.png",
    genero: "Histórico",
  },
  {
    id: "a-carta-de-pero-vaz",
    titulo: "A Carta de Pero Vaz de Caminha",
    autor: "Pero Vaz de Caminha",
    capa: "../Capas/ACartaDePeroVazDeCaminha.jpg",
    genero: "Histórico",
  },
  {
    id: "a-divina-comedia",
    titulo: "A Divina Comédia",
    autor: "Dante Alighieri",
    capa: "../Capas/ADivinaComedia.jpg",
    genero: "Clássico",
  },
  {
    id: "a-alegria-da-revolucao",
    titulo: "A Alegria da Revolução",
    autor: "Ken Knab",
    capa: "../Capas/AAlegriaDaRevolucao.webp",
    genero: "Ensaio",
  },
  {
    id: "o-homem-que-sabia-javanes",
    titulo: "O Homem que Sabia Javanês",
    autor: "Lima Barreto",
    capa: "../Capas/OHomemQueSabiaJavanes.jpg",
    genero: "Conto",
  },
  {
    id: "a-carteira",
    titulo: "A Carteira",
    autor: "Machado de Assis",
    capa: "../Capas/ACarteira.jpg",
    genero: "Conto",
  },
  {
    id: "a-carne",
    titulo: "A Carne",
    autor: "Júlio Ribeiro",
    capa: "../Capas/ACarne.jpg",
    genero: "Romance",
  },
  {
    id: "os-escravos",
    titulo: "Os Escravos",
    autor: "Antônio Frederico de Castro Alves",
    capa: "../Capas/OsEscravos.jpg",
    genero: "Poesia",
  },
  {
    id: "A-Comedia-dos-Erros",
    titulo: "A Comédia dos Erros",
    autor: "William Shakespeare",
    capa: "../Capas/A-Comédia-dos-Erros.jpg",
    genero: "Teatro",
  },
  {
    id: "edipo-rei",
    titulo: "Édipo Rei",
    autor: "Sófocles",
    capa: "../Capas/EdipoRei.jpg",
    genero: "Filosofia",
  },
  {
    id: "a-tempestade",
    titulo: "A Tempestade",
    autor: "William Shakespeare",
    capa: "../Capas/ATempestade.jpg",
    genero: "Teatro",
  },
  {
    id: "schopenhauer",
    titulo: "Schopenhauer",
    autor: "Thomas Mann",
    capa: "../Capas/Schopenhauer.jpg",
    genero: "Filosofia",
  },
  {
    id: "adao-e-eva",
    titulo: "Adão e Eva",
    autor: "Machado de Assis",
    capa: "../Capas/AdaoEEva.jpg",
    genero: "Conto",
  },
  {
    id: "a-escrava-isaura",
    titulo: "A Escrava Isaura",
    autor: "Bernardo Guimarães",
    capa: "../Capas/AEscravaIsaura.jpg",
    genero: "Romance",
  },
  {
    id: "DiarioIntimo",
    titulo: "Diário Íntimo",
    autor: "Afonso Henriques de Lima Barreto",
    capa: "../Capas/Diario-Intimo.jpg",
    genero: "Histórico",
  },
  {
    id: "capitulos-de-historia-colonial-(1500-1800)",
    titulo: "Capítulos de História Colonial (1500-1800)",
    autor: "João Capistrano de Abreu",
    capa: "../Capas/CapitulosdeHistoriaColonial(1500-1800).jpg",
    genero: "Ensaio",
  },
  {
    id: "odisseia",
    titulo: "Odisséia",
    autor: "Homero",
    capa: "../Capas/Odisseia.jpg",
    genero: "Clássico",
  },
  {
    id: "iracema",
    titulo: "Iracema",
    autor: "José de Alencar",
    capa: "../Capas/Iracema.jpg",
    genero: "Romance",
  },
  {
    id: "o-elixir-da-longa-vida",
    titulo: "O Elixir da Longa Vida",
    autor: "Honoré de Balzac",
    capa: "../Capas/OElixirdaLongaVida.png",
    genero: "Filosofia",
  },
  {
    id: "a-viuvinha",
    titulo: "A Viuvinha",
    autor: "José de Alencar",
    capa: "../Capas/AViuvinha.jpg",
    genero: "Romance",
  },
  {
    id: "os-sertoes",
    titulo: "Os Sertões",
    autor: "Euclides da Cunha",
    capa: "../Capas/OsSertoes.jpg",
    genero: "Histórico",
  },
  {
    id: "A-Tragedia-de-Hamlet",
    titulo: "A Tragédia de Hamlet, Príncipe da Dinamarca",
    autor: "William Shakespeare",
    capa: "../Capas/A-Tragedia-de-Hamlet.jpg",
    genero: "Teatro",
  },
  {
    id: "minha-formacao",
    titulo: "Minha Formação",
    autor: "Joaquim Nabuco",
    capa: "../Capas/MinhaFormacao.jpg",
    genero: "Ensaio",
  },
  {
    id: "a-mensageira-das-violetas",
    titulo: "A Mensageira das Violetas",
    autor: "Florbela Espanca",
    capa: "../Capas/AMensageiraDasVioletas.jpg",
    genero: "Poesia",
  },
  {
    id: "quincasborba",
    titulo: "Quincas Borba",
    autor: "Machado de Assis",
    capa: "../Capas/QuincasBorba.jpg",
    genero: "Histórico",
  },
  {
    id: "as-religioes-no-rio",
    titulo: "As Religiões no Rio",
    autor: "João do Rio",
    capa: "../Capas/AsReligioesNoRio.jpg",
    genero: "Ensaio",
  },
  {
    id: "Tudo-Bem-Quando-Termina-Bem",
    titulo: "Tudo Bem Quando Termina Bem",
    autor: "William Shakespeare",
    capa: "../Capas/Tudo-Bem-Quando-Termina-Bem.jpg",
    genero: "Teatro",
  },
  {
    id: "antigona",
    titulo: "Antígona",
    autor: "Sófocles",
    capa: "../Capas/Antigona.jpg",
    genero: "Filosofia",
  },
  {
    id: "memorias-postumas",
    titulo: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    capa: "../Capas/MemoriasPostumasdeBrasCubas.jpg",
    genero: "Romance",
  },
  {
    id: "este-mundo",
    titulo: "Este Mundo da Injustiça Globalizada",
    autor: "José Saramago",
    capa: "../Capas/EsteMundoDaInjusticaGlobalizada.jpg",
    genero: "Ensaio",
  },
  {
    id: "viagens-de-gulliver",
    titulo: "Viagens de Gulliver",
    autor: "Jonathan Swift",
    capa: "../Capas/ViagensDeGulliver.jpg",
    genero: "Clássico",
  },
  {
    id: "conto-de-escola",
    titulo: "Conto de Escola",
    autor: "Machado de Assis",
    capa: "../Capas/ContoDeEscola.jpg",
    genero: "Conto",
  },
  {
    id: "a-pata-da-gazela",
    titulo: "A Pata da Gazela",
    autor: "José de Alencar",
    capa: "../Capas/APataDaGazela.jpg",
    genero: "Romance",
  },
  {
    id: "livro-de-máguas",
    titulo: "Livro de Máguas",
    autor: "Florbela Espanca",
    capa: "../Capas/LivroDeMaguas.jpg",
    genero: "Poesia",
  },
  {
    id: "Sonho-de-Uma-Noite-de-Verao",
    titulo: "Sonho de Uma Noite de Verão",
    autor: "William Shakespeare",
    capa: "../Capas/Sonho-de-Uma-Noite-de-Verao.webp",
    genero: "Teatro",
  },
  {
    id: "obras-seletas",
    titulo: "Obras Seletas",
    autor: "Rui Barbosa",
    capa: "../Capas/Obras-Seletas.jpg",
    genero: "Histórico",
  },
  {
    id: "macbeth",
    titulo: "Macbeth",
    autor: "William Shakespeare",
    capa: "../Capas/Macbeth.jpg",
    genero: "Teatro",
  },
  {
    id: "contos-para-velhos",
    titulo: "Contos para Velhos",
    autor: "Olavo Bilac",
    capa: "../Capas/ContosParaVelhos.jpg",
    genero: "Conto",
  },
  {
    id: "livro-do-desassossego",
    titulo: "Livro do Desassossego",
    autor: "Fernando Pessoa",
    capa: "../Capas/LivroDoDesassossego.jpg",
    genero: "Filosofia",
  },
  {
    id: "iliada",
    titulo: "Ilíada",
    autor: "Homero",
    capa: "../Capas/Iliada.jpg",
    genero: "Clássico",
  },
  {
    id: "farsa-de-ines-pereira",
    titulo: "Farsa de Inês Pereira",
    autor: "Gil Vicente",
    capa: "../Capas/FarsaDeInesPereira.jpg",
    genero: "Teatro",
  },
  {
    id: "historia-da-literatura-brasileira",
    titulo: "História da Literatura Brasileira",
    autor: "Sílvio Romero",
    capa: "../Capas/HistoriadaLiteraturaBrasileira.webp",
    genero: "Ensaio",
  },
  {
    id: "o-enfermeiro",
    titulo: "O Enfermeiro",
    autor: "Machado de Assis",
    capa: "../Capas/OEnfermeiro.jpg",
    genero: "Conto",
  },
  {
    id: "arte-poetica",
    titulo: "A Arte Poética",
    autor: "Aristóteles",
    capa: "../Capas/AArtePoetica.jpg",
    genero: "Filosofia",
  },
  {
    id: "a-mulher-de-preto",
    titulo: "A Mulher de Preto",
    autor: "Machado de Assis",
    capa: "../Capas/AMulherDePreto.jpg",
    genero: "Conto",
  },
  {
    id: "memorias-de-um-sargento-de-milicias",
    titulo: "Memórias de um Sargento de Milícias",
    autor: "Manuel Antônio de Almeida",
    capa: "../Capas/MemoriasdeumSargentodeMilicias.jpg",
    genero: "Histórico",
  },
  {
    id: "a-cartomante",
    titulo: "A Cartomante",
    autor: "Machado de Assis",
    capa: "../Capas/ACartomante.jpg",
    genero: "Conto",
  },
  {
    id: "vozes-da-africa",
    titulo: "Vozes d’Africa",
    autor: "Castro Alves",
    capa: "../Capas/VozesDAfrica.jpg",
    genero: "Poesia",
  },
  {
    id: "mensagem",
    titulo: "Mensagem",
    autor: "Fernando Pessoa",
    capa: "../Capas/Mensagem.jpg",
    genero: "Poesia",
  },
  {
    id: "pastor-amoroso",
    titulo: "O Pastor Amoroso",
    autor: "Fernando Pessoa (Alberto Caeiro)",
    capa: "../Capas/OPastorAmoroso.jpg",
    genero: "Poesia",
  },
  {
    id: "guardador-de-rebanhos",
    titulo: "O Guardador de Rebanhos",
    autor: "Fernando Pessoa (Alberto Caeiro)",
    capa: "../Capas/OGuardadorDeRebanhos.jpg",
    genero: "Poesia",
  },
  {
    id: "fausto",
    titulo: "Fausto",
    autor: "Johann Wolfgang von Goethe",
    capa: "../Capas/Fausto.jpg",
    genero: "Clássico",
  },
  {
    id: "ViaLactea",
    titulo: "Via Lactea",
    autor: "Olavo Bilac",
    capa: "../Capas/ViaLactea.jpg",
    genero: "Poesia",
  },
  {
    id: "como-e-por-que-sou-romancista",
    titulo: "Como e Por Que Sou Romancista",
    autor: "José de Alencar",
    capa: "../Capas/ComoePorQueSouRomancista.jpg",
    genero: "Ensaio",
    pdf: "ComoePorQueSouRomancista.pdf",
  },
  {
    id: "o-mulato",
    titulo: "O Mulato",
    autor: "Aluísio Azevedo",
    capa: "../Capas/OMulato.jpg",
    genero: "Romance",
  },
  {
    id: "Romeu-e-Julieta",
    titulo: "Romeu e Julieta",
    autor: "William Shakespeare",
    capa: "../Capas/Romeu-e-Julieta.webp",
    genero: "Teatro",
  },
];

const livrossection = document.querySelector(".livros-lista");
const searchInput = document.querySelector("#pesquisar");
const searchInput2 = document.querySelector("#pesquisar2");
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

  livros.forEach((e) => {
    livrossection.innerHTML += `
<article class="livro-card">
<img src="${e.capa}" alt="${e.titulo}" />
<h3>${e.titulo}</h3>
<p>${e.autor}</p>
<button onclick="location.href='sinopse.html?id=${e.id}'">
BAIXAR OU LER ONLINE
</button>
</article>
 `;
  });
};

// Atualiza o texto do breadcrumb
const atualizarBreadcrumb = (genero) => {
  generoTexto.textContent = genero === "todos" ? "TODOS" : genero.toUpperCase();
};

// Filtro por gênero
const generoButtons = document.querySelectorAll("button[data-genero]");

generoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    generoAtivo = button.getAttribute("data-genero").toLowerCase();

    // Salva no localStorage
    localStorage.setItem("generoSelecionado", generoAtivo);

    // Limpa o campo de busca e remove do localStorage
    searchInput.value = "";
    searchInput2.value = "";
    localStorage.removeItem("textoBusca");

    // Atualiza breadcrumb
    atualizarBreadcrumb(generoAtivo);

    // Aplica o filtro
    const livrosFiltrados =
      generoAtivo === "todos"
        ? data
        : data.filter((livro) => livro.genero.toLowerCase() === generoAtivo);

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
    const livrosFiltrados = data.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(valorBusca.toLowerCase()) ||
        livro.autor.toLowerCase().includes(valorBusca.toLowerCase()) ||
        livro.genero.toLowerCase().includes(valorBusca.toLowerCase())
    );

    displayData(livrosFiltrados);
  } else {
    // Se campo vazio, volta a mostrar o gênero ativo no breadcrumb
    atualizarBreadcrumb(generoAtivo);

    // Aplica filtro pelo gênero ativo
    const livrosFiltrados =
      generoAtivo === "todos"
        ? data
        : data.filter((livro) => livro.genero.toLowerCase() === generoAtivo);

    displayData(livrosFiltrados);
  }
});

// Evento de pesquisa
searchInput2.addEventListener("input", (e) => {
  const valorBusca = e.target.value.trim();

  // Salva o texto digitado no localStorage
  localStorage.setItem("textoBusca", valorBusca);

  if (valorBusca !== "") {
    // Atualiza breadcrumb com o texto digitado, em maiúsculas
    generoTexto.textContent = valorBusca.toUpperCase();

    // Busca em todos os livros (independente do gênero ativo)
    const livrosFiltrados = data.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(valorBusca.toLowerCase()) ||
        livro.autor.toLowerCase().includes(valorBusca.toLowerCase()) ||
        livro.genero.toLowerCase().includes(valorBusca.toLowerCase())
    );

    displayData(livrosFiltrados);
  } else {
    // Se campo vazio, volta a mostrar o gênero ativo no breadcrumb
    atualizarBreadcrumb(generoAtivo);

    // Aplica filtro pelo gênero ativo
    const livrosFiltrados =
      generoAtivo === "todos"
        ? data
        : data.filter((livro) => livro.genero.toLowerCase() === generoAtivo);

    displayData(livrosFiltrados);
  }
});

// Exibir ao carregar com base no gênero salvo e texto de busca salvo
window.addEventListener("load", () => {
  if (textoBuscaSalvo !== "") {
    // Se houver texto salvo, coloca no input e atualiza breadcrumb
    searchInput.value = textoBuscaSalvo;
    searchInput2.value = textoBuscaSalvo;
    generoTexto.textContent = textoBuscaSalvo.toUpperCase();

    // Filtra com o texto salvo (busca geral)
    const livrosFiltrados = data.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(textoBuscaSalvo.toLowerCase()) ||
        livro.autor.toLowerCase().includes(textoBuscaSalvo.toLowerCase()) ||
        livro.genero.toLowerCase().includes(textoBuscaSalvo.toLowerCase())
    );

    displayData(livrosFiltrados);
  } else {
    // Senão, mostra o gênero ativo normalmente
    atualizarBreadcrumb(generoAtivo);

    const livrosFiltrados =
      generoAtivo === "todos"
        ? data
        : data.filter((livro) => livro.genero.toLowerCase() === generoAtivo);

    displayData(livrosFiltrados);
  }
});
