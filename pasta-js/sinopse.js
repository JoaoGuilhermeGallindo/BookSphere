const livros = {
  "divina-comedia": {
    titulo: "A Divina Comédia",
    autor: "Dante Alighieri",
    paginas: "788 Páginas - PDF",
    paginas2: "788 Páginas - ONLINE",
    capa: "../Capas/ADivinaComedia.jpg",
    sinopse:
      "A Divina Comédia propõe que a Terra está no meio de uma sucessão de círculos concêntricos que formam a Esfera armilar e o meridiano onde é Jerusalém hoje seria o lugar atingido por Lúcifer ao cair das esferas mais superiores e que fez da Terra Santa o Portal do Inferno. Portanto o Inferno, responderia pela depressão do Mar Morto, onde todas as águas convergem, e o Paraíso e o Purgatório seriam os segmentos dos círculos concêntricos que juntos respondem pela nomecânica celeste e os cenários comentados por Dante, num poema envolvendo todos os personagens bíblicos do Antigo ao Novo Testamento, que são costumeiramente encontrados nas entranhas do Inferno.",
    pdf: "ADivinaComedia.pdf",
  },
  "dom-casmurro": {
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    paginas: "105 Páginas - PDF",
    paginas2: "203 Páginas - ONLINE",
    capa: "../Capas/DomCasmurro.jpg",
    sinopse:
      "Em Dom Casmurro, o narrador Bento Santiago retoma a infância que passou na Rua de Matacavalos e conta a história do amor e das desventuras que viveu com Capitu, uma das personagens mais enigmáticas e intrigantes da literatura brasileira. Nas Páginas - PDF deste romance, encontra-se a versão de um homem perturbado pelo ciúme, que revela aos poucos sua psicologia complexa e enreda o leitor em sua narrativa ambígua acerca do acontecimento ou não do adultério da mulher com olhos de ressaca, uma das maiores polêmicas da literatura brasileira.",
    pdf: "DomCasmurro.pdf",
  },
  "a-carteira": {
    titulo: "A Carteira",
    autor: "Machado de Assis",
    paginas: "4 Páginas - PDF",
    paginas2: "10 Páginas - ONLINE",
    capa: "../Capas/ACarteira.jpg",
    sinopse: ` O conto A carteira, de Machado de Assis, narra a história de Honório, que acha uma carteira na rua. Por meio de uma boa dose de ironia, Machado de Assis faz diversas críticas à sociedade carioca daquela época e traz à tona temas como roubo, luxúria, falsidade, honestidade e fidelidade. `,
    pdf: "ACarteira.pdf",
  },
  "os-lusiadas": {
    titulo: "Os Lusiadas",
    autor: "Luís Vaz de Camões",
    paginas: "160 Páginas - PDF",
    paginas2: "327 Páginas - ONLINE",
    capa: "../Capas/OsLusiadas.jpg",
    sinopse: `Publicado em 1572, Os Lusiadas é a epopeia que imortalizou os feitos dos navegadores portugueses durante os Descobrimentos. Estruturada em dez cantos escritos em oitavas decassilábicas, a obra relata a viagem de Vasco da Gama às Índias, exaltando o espírito aventureiro e o papel de Portugal na expansão marítima. Camões mistura fatos históricos e elementos mitológicos, criando uma narrativa grandiosa e simbólica. Mais do que uma simples celebração, o poema também traz críticas e reflexões sobre a condição humana, os sacrifícios exigidos pela glória e as contradições da conquista. A intervenção dos deuses clássicos, como Vênus e Baco, confere à narrativa uma dimensão épica que dialoga com Homero e Virgílio, ao mesmo tempo em que reafirma a identidade nacional portuguesa. O equilíbrio entre erudição e emoção torna o texto singular. Considerado o maior monumento literário de Portugal, Os Lusiadas consolidou Camões como um dos grandes poetas da língua portuguesa. Sua obra não apenas preserva a memória dos feitos heroicos, mas também oferece uma visão crítica e atemporal sobre a busca pela imortalidade através da história e da palavra poética.`,
    pdf: "OsLusiadas.pdf",
  },
  "arte-poetica": {
    titulo: "A Arte Poética",
    autor: "Aristóteles",
    paginas: "53 Páginas - PDF",
    paginas2: "91 Páginas - ONLINE",
    capa: "../Capas/AArtePoetica.jpg",
    sinopse: `A Arte Poética é um tratado fundamental de Aristóteles sobre a natureza e os princípios da arte, com foco na poesia e na tragédia. Ele introduz conceitos centrais como mímesis (imitação da realidade) e catarse (purificação emocional do público). O filósofo analisa as diferentes formas de poesia e dramaturgia, destacando a importância de enredo, caráter e estilo. Ele também aborda a função moral e educativa da arte na sociedade. A obra influenciou profundamente a estética ocidental, servindo de referência para poetas, dramaturgos e críticos literários por séculos, consolidando-se como um estudo clássico da literatura e da arte.`,
    pdf: "AArtePoetica.pdf",
  },
  "alma-do-lazaro": {
    titulo: "A Alma do Lázaro",
    autor: "José de Alencar",
    paginas: "44 Páginas - PDF",
    paginas2: "86 Páginas - ONLINE",
    capa: "../Capas/AAlmadoLazaro.jpg",
    sinopse: `A Alma do Lázaro aborda temas de espiritualidade, redenção e reflexão sobre a vida e a morte, acompanhando a jornada de Lázaro em busca de compreensão. A narrativa mescla elementos místicos e filosóficos, explorando dilemas internos, virtudes humanas e o poder da fé e da esperança. Apesar do autor ser desconhecido, a obra oferece uma experiência introspectiva e transformadora, convidando o leitor a refletir sobre moralidade, propósito e transcendência.`,
    pdf: "AAlmadoLazaro.pdf",
  },

  "bela-madame-vargas": {
    titulo: "A Bela Madame Vargas",
    autor: "Camilo Castelo Branco",
    paginas: "39 Páginas - PDF",
    paginas2: "92 Páginas - ONLINE",
    capa: "../Capas/ABelaMadameVargas.jpg",
    sinopse: `A Bela Madame Vargas explora as relações humanas e as intrigas da sociedade portuguesa, centrando-se na vida da protagonista. Camilo Castelo Branco desenvolve os conflitos emocionais de Madame Vargas, abordando amor, moralidade e expectativas sociais da época. A obra é representativa do romantismo português, combinando realismo e lirismo, e oferece um retrato vívido da sociedade do século XIX.`,
    pdf: "ABelaMadameVargas.pdf",
  },
  "brasileira-de-prazins": {
    titulo: "A Brasileira de Prazins",
    autor: "Camilo Castelo Branco",
    paginas: "63 Páginas - PDF",
    paginas2: "341 Páginas - ONLINE",
    capa: "../Capas/ABrasileiraDePrazins.jpg",
    sinopse: `A Brasileira de Prazins é um romance que combina drama, romance e crítica social, mostrando os desafios da protagonista em meio à sociedade portuguesa. A narrativa explora identidade, honra e paixão, destacando os conflitos entre desejos individuais e normas sociais. A obra evidencia o estilo romântico de Camilo Castelo Branco, retratando com precisão sentimentos intensos e o contexto histórico da época.`,
    pdf: "ABrasileiraDePrazins.pdf",
  },
  "dama-das-camelias": {
    titulo: "A Dama das Camélias",
    autor: "Alexandre Dumas Filho",
    paginas: "101 Páginas - PDF",
    paginas2: "130 Páginas - ONLINE",
    capa: "../Capas/ADamaDasCamelias.jpg",
    sinopse: `A Dama das Camélias narra a trágica história de amor entre Marguerite Gautier e Armand Duval, explorando paixão, sociedade e moralidade. O romance descreve o sofrimento da cortesã parisiense e o impacto do preconceito social em seu destino. Considerado um clássico do romantismo francês, o livro inspirou adaptações teatrais, óperas e filmes, sendo referência mundial da literatura.`,
    pdf: "ADamaDasCamelias.pdf",
  },
  "escrava-isaura": {
    titulo: "A Escrava Isaura",
    autor: "Bernardo Guimarães",
    paginas: "87 Páginas - PDF",
    paginas2: "312 Páginas - ONLINE",
    capa: "../Capas/AEscravaIsaura.jpg",
    sinopse: `A Escrava Isaura é um romance abolicionista que retrata a vida da jovem Isaura, uma escrava branca que busca liberdade no Brasil do século XIX.
        O livro aborda injustiças, preconceitos e sofrimentos da escravidão, destacando coragem, bondade e esperança da protagonista.
        Considerada emblemática da literatura brasileira, a obra combina crítica social, drama e romance, sendo um marco contra a escravidão.`,
    pdf: "AEscravaIsaura.pdf",
  },
  "esfinge-sem-segredo": {
    titulo: "A Esfinge sem Segredo",
    autor: "Oscar Wilde",
    paginas: "9 Páginas - PDF",
    paginas2: "13 Páginas - ONLINE",
    capa: "../Capas/AEsfingeSemSegredo.jpg",
    sinopse: `A Esfinge sem Segredo é um conto que explora mistério, intriga e psicologia das relações humanas, com personagens sofisticados da alta sociedade.
        O enredo revela segredos e atitudes moralmente ambíguas, mantendo o leitor envolvido do início ao fim. O conto evidencia o estilo irônico e refinado de Wilde, mostrando como aparências sociais contrastam com a verdadeira natureza humana.`,
    pdf: "AEsfingeSemSegredo.pdf",
  },
  "harpa-do-crente": {
    titulo: "A Harpa do Crente",
    autor: "Alexandre Herculano",
    paginas: "70 Páginas - PDF",
    paginas2: "175 Páginas - ONLINE",
    capa: "../Capas/AHarpaDoCrente.jpg",
    sinopse: `A Harpa do Crente é uma coletânea de hinos evangélicos tradicionais, reunindo canções de louvor e adoração. Os hinos abordam fé, esperança e gratidão, incentivando a prática espiritual e o crescimento pessoal. A obra é referência na música sacra evangélica, oferecendo instrumentos para culto e reflexão cristã.`,
    pdf: "AHarpaDoCrente.pdf",
  },
  "igreja-do-diabo": {
    titulo: "A Igreja do Diabo",
    autor: "Machado de Assis",
    paginas: "6 Páginas - PDF",
    paginas2: "16 Páginas - ONLINE",
    capa: "../Capas/AIgrejaDoDiabo.jpg",
    sinopse: `A Igreja do Diabo é um conto de Machado de Assis que faz crítica social e filosófica, explorando a hipocrisia e comportamento humano. A narrativa acompanha personagens diante de dilemas morais, revelando ambições e desejos. É uma obra-prima do realismo brasileiro, mostrando com ironia como instituições e crenças influenciam a vida das pessoas.`,
    pdf: "AIgrejaDoDiabo.pdf",
  },
  iracema: {
    titulo: "Iracema",
    autor: "José de Alencar",
    paginas: "120 Páginas - PDF",
    paginas2: "75 Páginas - ONLINE",
    capa: "../Capas/Iracema.jpg",
    sinopse: `Publicado em 1865, Iracema é um dos romances indianistas de José de Alencar e se tornou um dos símbolos da literatura romântica brasileira. A obra narra o amor entre Iracema, a virgem tabajara de lábios de mel, e Martim, um colonizador português. Dessa união nasce Moacir, o “filho da dor”, que simboliza o nascimento do povo brasileiro a partir da fusão entre indígenas e europeus.O romance é marcado pela linguagem poética, repleta de metáforas e descrições líricas da natureza. O Ceará natal de Alencar é transformado em palco de um mito fundacional que mistura história, lenda e imaginação literária. A paisagem é personificada e ganha papel central, funcionando como reflexo do destino das personagens e da formação de uma nova identidade. Iracema transcende o simples romance para se tornar um mito da nacionalidade. O livro consagra José de Alencar como um dos maiores representantes do romantismo brasileiro e permanece como leitura obrigatória para compreender as origens literárias e culturais da ideia de Brasil.`,
    pdf: "Iracema.pdf",
  },
  "mulher-de-preto": {
    titulo: "A Mulher de Preto",
    autor: "Machado de Assis",
    paginas: "29 Páginas - PDF",
    paginas2: "67 Páginas - ONLINE",
    capa: "../Capas/AMulherDePreto.jpg",
    sinopse:
      "Em A Mulher de Preto de Machado de Assis, o jovem e idealista Dr. Estêvão apaixona-se pela misteriosa Madalena, que ele conhece em uma sociedade e se apresenta como viúva. No entanto, ele descobre que ela é casada com seu amigo, o deputado Meneses, e está envolvida em um caso extraconjugal. Estêvão, dividido entre a paixão e a lealdade, atua como mediador e consegue reatar o casal, que parte juntos, enquanto ele se retira para Minas Gerais.",
    pdf: "AMulherDePreto.pdf",
  },
  "pata-da-gazela": {
    titulo: "A Pata da Gazela",
    autor: "José de Alencar",
    paginas: "63 Páginas - PDF",
    paginas2: "170 Páginas - ONLINE",
    capa: "../Capas/APataDaGazela.jpg",
    sinopse:
      "A Pata da Gazela, de José de Alencar, é um romance do século XIX que satiriza a sociedade carioca através de um triângulo amoroso envolvendo Horácio, Leopoldo e a rica Amélia. Horácio apaixona-se por um pé pequeno e delicado que cai de Amélia, mas Leopoldo, ao ver o que ele pensa ser um pé disforme, apaixona-se pela alma da jovem. A história, inspirada em Cinderela e O Leão Amoroso, critica o amor superficial pela aparência, mostrando que o amor verdadeiro deve ser guiado pela essência e não pela beleza externa. ",
    pdf: "APataDaGazela.pdf",
  },
  utopia: {
    titulo: "A Utopia",
    autor: "Thomás Morus",
    paginas: "62 Páginas - PDF",
    paginas2: "134 Páginas - ONLINE",
    capa: "../Capas/AUtopia.jpg",
    sinopse:
      'A sinopse de Utopia, de Thomás Morus — forma alatinada pelo qual Thomas More é literariamente conhecido — descreve uma ilha imaginária, fundada na razão e na justiça, como um contraste à sociedade inglesa da época, que era marcada pela desigualdade e pela violência. O livro apresenta uma sociedade sem propriedade privada, com igualdade social, liberdade religiosa e um governo escolhido pelo voto popular, onde todos os bens são partilhados. Através de um diálogo com o personagem Rafael Hitlodeu, More critica os problemas do seu tempo, propondo um modelo social ideal, livre de conflitos e vícios, que se tornou a origem do termo "utopia".',
    pdf: "AUtopia.pdf",
  },
  "carta-de-pero-vaz": {
    titulo: "A Carta de Pero Vaz de Caminha",
    autor: "Pero Vaz de Caminha",
    paginas: "11 Páginas - PDF",
    paginas2: "33 Páginas - ONLINE",
    capa: "../Capas/ACartaDePeroVazDeCaminha.jpg",
    sinopse:
      "Considerada a primeiríssima obra da literatura brasileira e um dos principais documentos históricos que explicam a gênese deste país chamado Brasil, A carta de Pero Vaz de Caminha é um texto que deve ser lido e relido por todas as gerações de brasileiros. Neste texto, Pero Vaz de Caminha – o escrivão da expedição desbravadora de Pedro Álvares Cabral que no ano de 1500 descobriu o Brasil – relata o que vê ao aportar nas terras do Novo Mundo: índios semi-nus, flora e fauna esplendorosas e toda uma geografia e civilização que seria desvendada aos poucos nos próximos séculos. Os primeiros contatos dos europeus com os nativos brasileiros, as tentativas de troca de mercadorias, o comportamento desinibido dos índios, isto e muito mais é narrado com surpreendente agilidade estilística por Pero Vaz.",
    pdf: "ACartaDePeroVazDeCaminha.pdf",
  },
  "cidade-e-asserras-": {
    titulo: "A Cidade e as Serras",
    autor: "Eça de Queirós",
    paginas: "79 Páginas - PDF",
    paginas2: "296 Páginas - ONLINE",
    capa: "../Capas/ACidadeEasSerras.jpg",
    sinopse:
      "Romance da última fase de Eça de Queirós, publicado em 1901, um ano após a morte do escritor. Nele são narradas as diferenças entre a vida rural e a urbana por meio da figura de Jacinto, fidalgo português que mora em Paris em meio a um aparato técnico e moderno que, segundo ele, traduz o homem civilizado, mas que não lhe dá satisfação e felicidade, as quais, para espanto de Jacinto, serão encontradas durante uma viagem à província natal, em meio à vida simples e campesina das serras portuguesas.",
    pdf: "ACidadeEasSerras.pdf",
  },
  "adao-e-eva": {
    titulo: "Adão e Eva",
    autor: "Machado de Assis",
    paginas: "5 Páginas - PDF",
    paginas2: "12 Páginas - ONLINE",
    capa: "../Capas/AdaoEEva.jpg",
    sinopse:
      "No tempo do Brasil colonial, o Sr. Juiz dispara uma conversa: quem será mais curioso, o homem ou a mulher? E assim, quem foi responsável pela perda do paraíso, Adão ou Eva?Temos então o refinamento do mestre Machado propondo uma nova versão para a história da criação do mundo. E fica, para os leitores, uma reflexão sobre as atitudes do ser humano.",
    pdf: "AdaoEEva.pdf",
  },
  moreninha: {
    titulo: "A Moreninha",
    autor: "Joaquim Manuel de Macedo",
    paginas: "100 Páginas - PDF",
    paginas2: "197 Páginas - ONLINE",
    capa: "../Capas/AMoreninha.jpg",
    sinopse: `Publicado em 1844, A Moreninha é considerado o primeiro romance romântico brasileiro e marcou a estreia literária de Joaquim Manuel de Macedo. A trama acompanha a história de Augusto, estudante de medicina, que aposta com seus colegas que jamais se apaixonaria. Durante uma visita a uma ilha, ele conhece Carolina, a jovem “moreninha” que transforma completamente sua vida. A narrativa é leve e envolvente, com descrições do cotidiano carioca do século XIX e diálogos que revelam costumes e valores da juventude da época. O romance também traz o mistério de uma promessa de amor feita na infância, que se entrelaça ao destino dos personagens e confere à obra um ar de encantamento. Com grande sucesso desde sua publicação, A Moreninha se consolidou como um clássico da literatura nacional, responsável por popularizar o romance no Brasil. Sua simplicidade e frescor continuam a conquistar leitores, sendo leitura obrigatória para quem deseja conhecer as origens do romantismo brasileiro.`,
    pdf: "AMoreninha.pdf",
  },
  tempestade: {
    titulo: "A Tempestade",
    autor: "William Shakespeare",
    paginas: "56 Páginas - PDF",
    paginas2: "112 Páginas - ONLINE",
    capa: "../Capas/ATempestade.jpg",
    sinopse:
      '"A Tempestade" é uma peça de William Shakespeare sobre o mago Próspero, que, após ser traído e exilado numa ilha, usa seus poderes para causar um naufrágio e atrair seus inimigos para lá, buscando vingança e justiça. Na ilha, ele orquestra encontros, um amor inesperado entre sua filha Miranda e o príncipe Ferdinando, e confrontos com o antigo súdito Caliban. A peça explora temas de poder, perdão e redenção, misturando elementos de comédia, tragédia e fantasia. ',
    pdf: "ATempestade.pdf",
  },
  "ViaLactea": {
    titulo: "Via Lactea",
    autor: "Olavo Bilac",
    paginas: "16 Páginas - PDF",
    paginas2: "37 Páginas - ONLINE",
    capa: "../Capas/ViaLactea.jpg",
    sinopse: `Via Lactea é uma coletânea poética de Olavo Bilac, publicada em 1887, que celebra a beleza do cosmos e da natureza com lirismo refinado. A obra demonstra a habilidade do autor em combinar imagens visuais e musicais, criando poemas carregados de emoção e harmonia sonora. Bilac utiliza a poesia para explorar a transcendência do universo e os sentimentos humanos diante da imensidão cósmica. Cada poema apresenta delicadeza formal e riqueza vocabular, refletindo a preocupação do autor com ritmo, métrica e sonoridade típica do Parnasianismo. A coletânea consolidou Bilac como um dos principais poetas parnasianos do Brasil, influenciando gerações futuras e destacando a importância da estética e da técnica poética. Via Lactea é leitura essencial para entender o lirismo refinado da poesia brasileira do século XIX.`,
    pdf: "ViaLactea.pdf",
  },
  "vozes-da-africa": {
    titulo: "Vozes d’Africa",
    autor: "Castro Alves",
    paginas: "3 Páginas - PDF",
    paginas2: "8 Páginas - ONLINE",
    capa: "../Capas/VozesDAfrica.jpg",
    sinopse: `Vozes d’Africa é uma das obras mais emblemáticas de Castro Alves, publicada em 1888, reunindo poemas engajados no combate à escravidão e à opressão. O autor denuncia injustiças e exalta a liberdade, buscando sensibilizar a sociedade brasileira para a causa abolicionista.Com linguagem vigorosa e imagética, os poemas exploram sentimentos de revolta, empatia e esperança, refletindo a vida dos escravos e a luta por dignidade. Castro Alves utiliza versos épicos e líricos, combinando técnica poética e comprometimento social. A obra consolidou Castro Alves como o “Poeta dos Escravos” e permanece referência fundamental para estudar a literatura engajada do Brasil. Vozes d’Africa demonstra como a poesia pode atuar como instrumento de crítica social e reflexão ética.`,
    pdf: "VozesDAfrica.pdf",
  },
  cartomante: {
    titulo: "A Cartomante",
    autor: "Machado de Assis",
    paginas: "7 Páginas - PDF",
    paginas2: "20 Páginas - ONLINE",
    capa: "../Capas/ACartomante.jpg",
    sinopse:
      "A cartomante é a história de um triângulo amoroso. Depois de anos de distância, Vilela reencontra o amigo Camilo e apresenta-lhe sua esposa, Rita. Paixão, traição e adultério fazem parte desta trama, que tem uma cartomante como personagem chave, selando o destino dos três. O conto foi publicado originalmente em 1884, e esta versão em quadrinhos, com desenhos em aquarela do jovem designer Flavio Pessoa, é uma adaptação fiel ao espírito do original. Fotos de Marc Ferrez e Augusto Malta ajudam a recriar o Rio de Janeiro do fim do século XIX e inserem o leitor no mundo de Machado de Assis.",
    pdf: "ACartomante.pdf",
  },
  "dom-quixote-volume2": {
    titulo: "Dom Quixote Vol. 2",
    autor: "Miguel de Cervantes",
    paginas: "309 Páginas - PDF",
    paginas2: "193 Páginas - ONLINE",
    capa: "../Capas/DomQuixoteVolumeII.jpg",
    sinopse:
      "Publicada em 1615, uma década depois do primeiro livro e menos de um ano antes da morte de Cervantes, esta segunda parte do D. Quixote, muito mais do que uma simples continuação da primeira, representa o aprofundamento e a realização plena da obra máxima do escritor espanhol.",
    pdf: "DomQuixoteVolumeII.pdf",
  },
  "dom-quixote-volume1": {
    titulo: "Dom Quixote Vol. 1",
    autor: "Miguel de Cervantes",
    paginas: "308 Páginas - PDF",
    paginas2: "183 Páginas - ONLINE",
    capa: "../Capas/DomQuixoteVolumeI.jpg",
    sinopse:
      "A obra narra as aventuras e desventuras de Dom Quixote, um homem de meia idade que resolveu se tornar cavaleiro andante depois de ler muitos romances de cavalaria. Providenciando cavalo e armadura, resolve lutar para provar seu amor por Dulcineia de Toboso, uma mulher imaginária. Consegue também um escudeiro, Sancho Pança, que resolve acompanhá-lo, acreditando que será recompensado. Quixote mistura fantasia e realidade, se comportando como se estivesse em um romance de cavalaria e transformando obstáculos banais (como moinhos de vento ou ovelhas) em gigantes e exércitos de inimigos. Na primeira parte O protagonista é um homem de meia idade que se dedicava à leitura de romances de cavalaria. Confundindo fantasia e realidade, resolve imitar os heróis e partir em busca de aventuras. Como precisa de uma amada em nome da qual lutar, cria Dulcineia, grande dama inspirada em uma paixão da juventude.",
    pdf: "DomQuixoteVolumeI.pdf",
  },
  macbeth: {
    titulo: "Macbeth",
    autor: "William Shakespeare",
    paginas: "49 Páginas - PDF",
    paginas2: "88 Páginas - ONLINE",
    capa: "../Capas/Macbeth.jpg",
    sinopse:
      "Considerada uma das obras mais sombrias e poderosas de William Shakespeare, esta narrativa clássica mostra Macbeth e Banquo, seu amigo, retornando de uma guerra pelo reinado da Escócia, depois de retumbante vitória. Na estrada eles se deparam com três feiticeiras, que realizam surpreendentes previsões. De acordo com as irmãs, símbolos aqui das três tecelãs do destino humano, o protagonista se tornará Barão de Cawdor e, futuramente, o novo soberano. Quanto a Banquo, será o progenitor de reis. Macbeth foi publicada pela primeira em 1623, possivelmente a partir de uma transcrição de alguma performance específica e adaptada para cinema, televisão, ópera, romances, história sem quadrinhos e outras mídias.",
    pdf: "Macbeth.pdf",
  },
  helena: {
    titulo: "Helena",
    autor: "Machado de Assis",
    paginas: "93 Páginas - PDF",
    paginas2: "215 Páginas - ONLINE",
    capa: "../Capas/Helena.jpg",
    sinopse: `Publicado em 1876, Helena é um romance realista de Machado de Assis que narra a história de Helena, uma jovem órfã acolhida pela família de Estácio. A trama se desenrola entre segredos familiares, heranças e conflitos sociais, explorando a diferença entre classes e o preconceito da sociedade carioca do século XIX. O romance apresenta um delicado equilíbrio entre intriga e análise psicológica, revelando as nuances dos personagens e suas motivações internas. Helena, com sua pureza e sensibilidade, atua como catalisadora de eventos, ao mesmo tempo em que enfrenta julgamentos e mal-entendidos da família e da sociedade. Considerada uma obra de transição para o realismo de Machado, Helena combina crítica social, sutileza narrativa e profundidade emocional. O livro mantém relevância por sua exploração de questões humanas universais como amor, honra e preconceito.`,
    pdf: "Helena.pdf",
  },
  "livro-de-máguas": {
    titulo: "Livro de Máguas",
    autor: "Florbela Espanca",
    paginas: "13 Páginas - PDF",
    paginas2: "34 Páginas - ONLINE",
    capa: "../Capas/LivroDeMaguas.jpg",
    sinopse:
      "Livro de Máguas (ou Livro das Máguas) é a primeira obra poética de Florbela Espanca editada Saiu em Junho de 1919 em Lisboa pela Tipografia Maurício graças a Raul Proença, um intelectual e crítico literário conceituado e influente, que reconheceu o talento da jovem poetisa",
    pdf: "LivroDeMaguas.pdf",
  },
  "livro-do-desassossego": {
    titulo: "Livro do Desassossego",
    autor: "Fernando Pessoa",
    paginas: "17 Páginas - PDF",
    paginas2: "34 Páginas - ONLINE",
    capa: "../Capas/LivroDoDesassossego.jpg",
    sinopse:
      'O narrador principal (mas não exclusivo) das centenas de fragmentos que compõem este livro é o "semi-heterônimo" Bernardo Soares. Ajudante de guarda-livros na cidade de Lisboa, ele escreve sem encadeamento narrativo claro, sem fatos propriamente ditos e sem uma noção de tempo definida. Ainda assim, foi nesta obra que Fernando Pessoa mais se aproximou do gênero romance. Os temas não deixam de ser adequados a um diário íntimo: a elucidação de estados psíquicos, a descrição das coisas, através dos efeitos que elas exercem sobre a mente, reflexões e devaneios sobre a paixão, a moral, o conhecimento. "Dono do mundo em mim, como de terras que não posso trazer comigo", escreve o narrador. Seu tom é sempre o de uma intimidade que não encontrará nunca o ponto de repouso.',
    pdf: "LivroDoDesassossego.pdf",
  },
  "memorias-postumas": {
    titulo: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    paginas: "99 Páginas - PDF",
    paginas2: "199  Páginas - ONLINE",
    capa: "../Capas/MemoriasPostumasdeBrasCubas.jpg",
    sinopse: `Publicado em 1881, Memórias Póstumas de Brás Cubas revolucionou a literatura brasileira ao inaugurar a fase realista de Machado de Assis. O romance é narrado por Brás Cubas, um defunto-autor que, do além, escreve suas memórias sem compromisso com a moral ou convenções. Com humor ácido e estilo fragmentado, ele revisita sua vida, suas ambições frustradas, amores e fracassos. O tom irônico e a quebra de expectativas fazem da obra uma crítica à sociedade do século XIX, expondo vaidades, hipocrisias e desigualdades. A liberdade narrativa permite que Machado explore reflexões filosóficas, digressões e diálogos com o leitor, criando um texto moderno e inovador para sua época. Brás Cubas é um narrador que diverte, provoca e desconstrói ilusões.Memórias Póstumas é considerado um marco não apenas da literatura brasileira, mas também mundial, por antecipar técnicas narrativas que influenciariam o modernismo. Sua mistura de sarcasmo, introspecção e crítica social continua a fascinar leitores e estudiosos até hoje.`,
    pdf: "MemoriasPostumasDeBrasCubas.pdf",
  },
  mensagem: {
    titulo: "Mensagem",
    autor: "Fernando Pessoa",
    paginas: "18 Páginas - PDF",
    paginas2: "37 Páginas - ONLINE",
    capa: "../Capas/Mensagem.jpg",
    sinopse: `Mensagem é a única obra em português publicada em vida por Fernando Pessoa, reunindo poemas que exaltam a história e os mitos de Portugal. O livro celebra feitos nacionais e figuras históricas, com forte conteúdo simbólico e patriótico. A obra se divide em três partes principais: "Brasão", "Mar Português" e "O Encoberto", explorando desde a heráldica e símbolos nacionais até a esperança em um futuro glorioso. Pessoa combina erudição, misticismo e poesia lírica para construir uma narrativa poética única. Mensagem é considerada um dos marcos da literatura portuguesa moderna, mostrando a capacidade de Fernando Pessoa de sintetizar história, mito e identidade nacional em versos densos e memoráveis.`,
    pdf: "Mensagem.pdf",
  },
  mulato: {
    titulo: "O Mulato",
    autor: "Aluísio Azevedo",
    paginas: "204 Páginas - PDF",
    paginas2: "203 Páginas - ONLINE",
    capa: "../Capas/OMulato.jpg",
    sinopse: `O Mulato, publicado em 1881, é um romance naturalista de Aluísio Azevedo que critica as desigualdades sociais e o preconceito racial no Brasil do século XIX. A obra acompanha Raimundo, um jovem mestiço que enfrenta discriminação por sua origem. O romance expõe a hipocrisia da sociedade, mostrando conflitos familiares, preconceitos e tensões entre classes sociais. Azevedo utiliza detalhamento psicológico e social para tornar a narrativa realista e crítica. O Mulato é um marco do Naturalismo no Brasil, abordando temas de identidade racial, justiça social e moralidade, mantendo-se relevante como reflexão sobre preconceitos e estruturas sociais.`,
    pdf: "OMulato.pdf",
  },
  "a-carne": {
    titulo: "A Carne",
    autor: "Júlio Ribeiro",
    paginas: "104 Páginas - PDF",
    paginas2: "205 Páginas - ONLINE",
    capa: "../Capas/ACarne.jpg",
    sinopse: `Por muito tempo, o romance A Carne foi tachado como obsceno. Originalmente publicado em 1888, recebeu críticas ferrenhas e tornou-se popular por conter cenas explícitas de sexo e sadismo. Isso transformou Júlio Ribeiro numa das figuras mais controversas da literatura brasileira. Sua narrativa em terceira pessoa imita a objetividade do relato científico e traz uma visão progressista da sociedade.`,
    pdf: "ACarne.pdf",
  },
  "o-alienista": {
    titulo: "O Alienista",
    autor: "Machado de Assis",
    paginas: "36 Páginas - PDF",
    paginas2: "93 Páginas - ONLINE",
    capa: "../Capas/OAlienista.jpg",
    sinopse: `Publicado em 1882, O Alienista é um conto longo de Machado de Assis que satiriza a ciência e a obsessão pelo controle social. A narrativa acompanha o Dr. Simão Bacamarte, que decide estudar a loucura na pequena cidade de Itaguaí, internando aqueles que considera mentalmente instáveis em seu manicômio. A obra explora temas como poder, moralidade e relatividade da sanidade, questionando o limite entre razão e loucura. Com humor irônico e crítica social, Machado constrói personagens complexos que refletem os dilemas humanos e a arbitrariedade das convenções. O Alienista é reconhecido como um dos grandes contos da literatura brasileira, combinando narrativa concisa, inteligência crítica e sutileza psicológica. A obra continua atual por sua reflexão sobre poder, autoridade e sociedade.`,
    pdf: "OAlienista.pdf",
  },
  "auto-da-barca-do-inferno": {
    titulo: "Auto da Barca do Inferno",
    autor: "Gil Vicente",
    paginas: "19 Páginas - PDF",
    paginas2: "42 Páginas - ONLINE",
    capa: "../Capas/AutoDaBarcaDoInferno.jpg",
    sinopse: `O Auto da Barca do Inferno é uma peça teatral escrita por Gil Vicente em 1517, considerada uma das obras-primas do teatro português renascentista. A peça combina humor, sátira e crítica social para explorar a moralidade da sociedade portuguesa da época. A narrativa apresenta personagens de diferentes classes sociais embarcando em duas barcas: uma para o Paraíso e outra para o Inferno. Cada personagem representa vícios e virtudes, permitindo que Gil Vicente critique de forma irônica a hipocrisia, a ganância e outros comportamentos humanos. A obra é essencial para entender a literatura renascentista portuguesa e a tradição de teatro moralizante. O Auto da Barca do Inferno continua sendo estudado por sua linguagem viva, crítica social afiada e relevância histórica.`,
    pdf: "AutoDaBarcaDoInferno.pdf",
  },
  "eu-profundo": {
    titulo: "O Eu Profundo e os Outros Eus",
    autor: "Fernando Pessoa",
    paginas: "22 Páginas - PDF",
    paginas2: "22 Páginas - ONLINE",
    capa: "../Capas/OEuProfundoEOsOutrosEus.jpg",
    pdf: "O Eu profundo e os outros Eus.pdf",
    sinopse: `O Conde de Monte Cristo é um clássico romance de Alexandre Dumas publicado em 1844, narrando a história de Edmond Dantès, um jovem injustamente preso que busca vingança contra aqueles que o traíram. A trama combina intriga, aventura e reflexão sobre justiça e moralidade.
    Dantès descobre um tesouro escondido na ilha de Monte Cristo, transforma-se em um homem rico e poderoso e começa a executar sua vingança cuidadosamente planejada. O romance explora temas como lealdade, traição, amor e redenção, com personagens complexos e múltiplas subtramas.
    A obra é considerada uma das maiores aventuras literárias de todos os tempos, mantendo relevância por sua narrativa envolvente e análise psicológica profunda. O Conde de Monte Cristo inspira leitores a refletir sobre justiça, destino e ética pessoal.`,
    pdf: "OEuProfundoEOsOutrosEus.pdf",
  },

  "contos-para-velhos": {
    titulo: "Contos para Velhos",
    autor: "Olavo Bilac",
    paginas: "15 Páginas - PDF",
    paginas2: "34 Páginas - ONLINE",
    capa: "../Capas/ContosParaVelhos.jpg",
    sinopse: `Olavo Brás Martins dos Guimarães Bilac, poeta, nascido em 1865, no Rio de Janeiro, e falecido na mesma cidade em 1918. Autor de sonetos de grande sensibilidade (Exemplo: o soneto XIII – “Ora –direis – ouvir estrelas! – de ViaLactea) e outros famosos como: Velhas árvores ( de Alma inquieta); Nel mezzo del camim, Quarenta anos, Vestígios (de Sarças de fogo); A ronda noturna, A sesta de Nero (de Panóplias); Língua Portuguesa, As estrelas, Anchieta, A um poeta (Tarde) e muitos outros. Em Contos para velhos, temos o Príncipe dos Poetas, o parnasiano criador de rimas perfeitas, tateando, farejando no espaço ficcional do conto, lembrando coisas cotidianas (óculos, cães, costuras, pecado, anjos, anéis, vaso, etc.) querendo produzir um livro atraente e agradável aos leitores. O poeta saiu-se bem, isto é, “estruturou” um livro interessante com doze contos e quatro poesias aproveitando-se de fatos do cotidiano e dos espaços ficcionais mínimos oferecidos por esta interessante manifestação literária, ou seja, o conto. Boas leituras!`,
    pdf: "ContosParaVelhos.pdf",
  },

  "guardador-de-rebanhos": {
    titulo: "O Guardador de Rebanhos",
    autor: "Fernando Pessoa (Alberto Caeiro)",
    paginas: "25 Páginas - PDF",
    paginas2: "51 Páginas - ONLINE",
    capa: "../Capas/OGuardadorDeRebanhos.jpg",
    sinopse: `O Guardador de Rebanhos é a coletânea de poemas de Alberto Caeiro, heterônimo de Fernando Pessoa, publicada postumamente em 1925. A obra apresenta uma poesia bucólica, simples e direta, focada na contemplação da natureza e na percepção sensorial do mundo ao redor. Os poemas destacam a filosofia de Caeiro, que valoriza o instante presente e rejeita especulações metafísicas. Cada poema é curto, mas profundamente expressivo, mostrando a habilidade de Pessoa em criar uma voz poética única para esse heterônimo. A coletânea é fundamental para compreender a multiplicidade literária de Fernando Pessoa e sua capacidade de explorar diferentes perspectivas poéticas. O Guardador de Rebanhos continua influente, sendo estudado como marco do Modernismo português.`,
    pdf: "OGuardadorDeRebanhos.pdf",
  },

  "pastor-amoroso": {
    titulo: "O Pastor Amoroso",
    autor: "Fernando Pessoa (Alberto Caeiro)",
    paginas: "11 Páginas - PDF",
    paginas2: "14 Páginas - ONLINE",
    capa: "../Capas/OPastorAmoroso.jpg",
    sinopse: `O Pastor Amoroso reúne poemas de Alberto Caeiro, heterônimo de Fernando Pessoa, focados na simplicidade, amor à natureza e contemplação da vida rural. A obra apresenta uma visão poética da vida simples e da harmonia com o mundo natural. A poesia valoriza o instante presente, a percepção sensorial e a ausência de preocupação com reflexões filosóficas complexas. Caeiro expressa sentimentos puros e observa o cotidiano de forma direta e lírica, tornando cada poema uma experiência sensorial e emocional. O Pastor Amoroso complementa O Guardador de Rebanhos e é essencial para entender a visão poética de Caeiro. A obra permanece relevante como estudo do Modernismo português e da riqueza heteronímica de Fernando Pessoa.`,
    pdf: "OPastorAmoroso.pdf",
  },

  "os-sertoes": {
    titulo: "Os Sertoes",
    autor: "Euclides da Cunha",
    paginas: "119 Páginas - PDF",
    paginas2: "289 Páginas - ONLINE",
    capa: "../Capas/OsSertoes.jpg",
    sinopse: `Publicado em 1902, Os Sertoes é uma obra de não-ficção literária que combina jornalismo, história e literatura. Euclides da Cunha relata a Guerra de Canudos, que ocorreu no interior da Bahia, explorando a vida, a geografia e a cultura do sertanejo brasileiro. A obra é dividida em três partes: "A Terra", "O Homem" e "A Luta", abordando respectivamente o cenário natural do sertão, o perfil e a resistência do povo sertanejo e o confronto com o exército republicano. Cunha analisa causas, consequências e aspectos sociais, políticos e culturais do conflito, oferecendo uma visão profunda e crítica do Brasil da época. Os Sertoes é considerado um marco da literatura e da historiografia brasileira. A obra combina rigor científico com sensibilidade literária, tornando-se leitura essencial para entender o sertão, seus habitantes e os conflitos que marcaram a história nacional.`,
    pdf: "OsSertoes.pdf",
  },

  "os-maias": {
    titulo: "Os Maias",
    autor: "Eça de Queirós",
    paginas: "407 Páginas - PDF",
    paginas2: "203 Páginas - ONLINE",
    capa: "../Capas/OsMaias.jpg",
    sinopse: `Publicado em 1888, Os Maias é o romance mais conhecido de Eça de Queirós, retratando a decadência de uma família aristocrática portuguesa ao longo de três gerações. A obra combina crítica social, análise psicológica e narrativa detalhada, explorando a vida urbana de Lisboa e os dilemas da elite. O romance acompanha Carlos da Maia, um jovem que busca sentido na vida após experiências amorosas e desilusões familiares. Eça utiliza personagens complexos e situações bem construídas para revelar hipocrisia, vaidade e conflitos morais da sociedade portuguesa do século XIX. Os Maias é considerado um marco do realismo português, destacando-se pela profundidade de seus personagens e pela crítica social minuciosa. A obra permanece atual como estudo das relações humanas, tradições familiares e os desafios de se viver em uma sociedade rígida e conservadora.`,
    pdf: "OsMaias.pdf",
  },

  "a-mensageira-das-violetas": {
    titulo: "A Mensageira das Violetas",
    autor: "Florbela Espanca",
    paginas: "22 Páginas - PDF",
    paginas2: "72 Páginas - ONLINE",
    capa: "../Capas/AMensageiraDasVioletas.jpg",
    sinopse: `Poetisa de belos sonetos, reconhecida pela expressividade da linguagem feminina na poesia, Florbela Espanca traz até nós o sofrimento humano, o amor, a sofreguidão e a efemeridade da vida. Pelo lirismo, expressa o seu íntimo, e em uma atmosfera de sofrimento faz nascer os mais belos versos da literatura portuguesa.`,
    pdf: "AMensageiraDasVioletas.pdf",
  },

  "cancioneiro": {
    titulo: "Cancioneiro",
    autor: "Fernando Pessoa",
    paginas: "105 Páginas - PDF",
    paginas2: "112 Páginas - ONLINE",
    capa: "../Capas/Cancioneiro.jpg",
    sinopse: `O poeta é um fingidor. Finge tão completamente Que chega a fingir que é dor A dor que deveras sente. E os que lêem o que escreve, Na dor lida sentem bem, Não as duas que ele teve, Mas só a que eles não têm. E assim nas calhas de roda Gira, a entreter a razão, Esse comboio de corda Que se chama coração.`,
    pdf: "Cancioneiro.pdf",
  },

  "o-que-e-o-casamento": {
    titulo: "O que é o Casamento?",
    autor: "José de Alencar",
    paginas: "108 Páginas - PDF",
    paginas2: "164 Páginas - ONLINE",
    capa: "../Capas/OqueEOCasamento.jpg",
    sinopse: `O Que é o Casamento? de José de Alencar, publicado em 1861, é um romance que explora as nuances e desafios do casamento através de uma narrativa envolvente e crítica. A história centra-se na vida de um casal que, apesar de apaixonado, enfrenta diversas dificuldades e desentendimentos. Alencar, com sua habilidade literária, apresenta uma análise profunda das expectativas sociais e pessoais que cercam o casamento, questionando os valores e normas da sociedade da época. O livro é uma reflexão sobre o amor, a convivência e os sacrifícios necessários para manter um relacionamento. Através de personagens bem desenvolvidos e situações realistas, Alencar oferece ao leitor uma visão perspicaz das complexidades da vida conjugal.`,
    pdf: "OqueEOCasamento.pdf",
  },
  "farsa-de-ines-pereira": {
    titulo: "Farsa de Inês Pereira",
    autor: "Gil Vicente",
    paginas: "24 Páginas - PDF",
    paginas2: "58 Páginas - ONLINE",
    capa: "../Capas/FarsaDeInesPereira.jpg",
    sinopse: `Farsa de Inês Pereira, considerada a peça mais divertida de Gil Vicente, foi apresentada pela primeira vez ao rei D. João III em 1523, no Convento de Tomar. Acusado de plagiar o dramaturgo espanhol Juan del Encina, pediu àqueles que o acusavam um tema para que pudesse provar sua capacidade criadora. Recebeu como desafio o ditado popular: Mais vale asno que me leve que cavalo que me derrube. A temática – o desejo de ascensão da pequena burguesia – está ligada à realidade vivida pela sociedade portuguesa da época. As personagens – tipos sociais – agem de acordo com seus interesses. Queres casar por prazer/ no tempo de agora Inês? Antes casa, em que te pés,/ que não é tempo de escolher. Nesta publicação, adaptada por Cecilia R. Lopes e ilustrada por Lélis, o jovem leitor conhecerá o texto do criador do teatro português e sua riquíssima galeria de tipos humanos que, de uma certa forma, circulam na sociedade contemporânea.`,
    pdf: "FarsaDeInesPereira.pdf",
  },
  "alegria-da-revolucao": {
    titulo: "A Alegria da Revolução",
    autor: "Ken Knab",
    paginas: "230 Páginas - PDF",
    paginas2: "230 Páginas - ONLINE",
    capa: "../Capas/AAlegriaDaRevolucao.webp",
    sinopse: `A Alegria da Revolução, de Ken Knabb, é uma obra que combina reflexões políticas profundas com uma abordagem prática e humanista para questionar o sistema social atual e imaginar alternativas. Inspirado pelas ideias situacionistas, o autor explora como o capitalismo moderno afeta as relações humanas, o ambiente e a liberdade individual. Ao longo do texto, Knabb apresenta críticas contundentes ao conformismo e ao autoritarismo, enquanto celebra a possibilidade de transformação coletiva por meio da ação direta e da criatividade humana.Mais do que um manifesto teórico, o livro é um convite à experimentação, à quebra de paradigmas e à busca por uma vida mais autêntica e significativa. Com uma escrita clara e provocadora, Knabb busca despertar nos leitores o entusiasmo e a coragem necessários para desafiar o status quo. A Alegria da Revolução é uma leitura indispensável para aqueles que desejam pensar além das estruturas existentes e cultivar uma visão de mundo onde a solidariedade e a alegria sejam centrais.`,
    pdf: "AAlegriaDaRevolucao.pdf",
  },
  "os-escravos": {
    titulo: "Os Escravos",
    autor: "Antônio Frederico de Castro Alves",
    paginas: "97 Páginas - PDF",
    paginas2: "179 Páginas - ONLINE",
    capa: "../Capas/OsEscravos.jpg",
    sinopse: `O poeta baiano Antonio Frederico de Castro Alves (1847-1871), apesar de sua morte precoce, é considerado um dos mais importantes poetas brasileiros de todos os tempos. De formação cultural sofisticada, construiu sua poesia sobre temáticas eminentemente brasileiras, alcançando uma admirável compreensão da alma popular. Com seu lirismo exacerbado compôs poemas antológicos do romantismo brasileiro, mas não afastou-se jamais de sua veia libertária de onde emergiu o poeta social, o republicano, o grande abolicionista, o cantor dos escravos. Alguns poemas, como "O navio negreiro" e "Vozes d'Africa", obtiveram enorme sucesso popular quando declamados pelo poeta e se transformaram em verdadeiras bandeiras na luta contra a escravidão. O livro Os escravos foi publicado de forma independente pela primeira vez em 1883. `,
    pdf: "OsEscravos.pdf",
  },

  "este-mundo": {
    titulo: "Este Mundo da Injustiça Globalizada",
    autor: "José Saramago",
    paginas: "6 Páginas - PDF",
    paginas2: "8 Páginas - ONLINE",
    capa: "../Capas/EsteMundoDaInjusticaGlobalizada.jpg",
    sinopse: `"Este mundo da injustiça globalizada" é um texto escrito e lido por José Saramago na cerimônia de encerramento do Fórum Social Mundial em 2002. Na ocasião, o autor lusitano mais conhecido pelo seu best-seller "Ensaio sobre a cegueira", comenta sobre as questões sociais, econômicas e políticas que permeiam a sociedade capitalista.`,
    pdf: "EsteMundoDaInjusticaGlobalizada.pdf",
  },

  "a-viuvinha": {
    titulo: "A Viuvinha",
    autor: "José de Alencar",
    paginas: "33 Páginas - PDF",
    paginas2: "788 Páginas - ONLINE",
    capa: "../Capas/AViuvinha.jpg",
    sinopse: `A viuvinha é a história curiosa de um homem que simula sua morte para não sucumbir à vergonha de uma situação financeira desastrada. Publicado em 1857, é o terceiro livro de José de Alencar. Como Senhora, Lucíola e Cinco minutos, A viuvinha se inclui entre os romances urbanos escritos pelo autor, que nos dão uma riquíssima descrição da vida na corte, a vida burguesa do Rio de Janeiro de meados do século XIX, seus costumes, modas e tipos característicos.`,
    pdf: "AViuvinha.pdf",
  },
  "dragon-ball-um": {
    titulo: "Dragon Ball Vol. 1",
    autor: "Akira Toriyama",
    paginas: "196 Páginas - PDF",
    paginas2: "196 Páginas - ONLINE",
    capa: "../Capas/DragonBallUm.webp",
    sinopse: "Son Goku é um pequeno órfão de coração puro, mas com uma tremenda força. Depois de viver tanto tempo isolado da civilização, ele recebe a inesperada visita de uma garota! Bulma lhe propõe uma parceria para buscar as sete Esferas do Dragão, que, quando reunidas, são capazes de realizar qualquer desejo! Perigos e adversários não faltarão no caminho dessa dupla inusitada, e os mais variados personagens marcarão presença nesta aventura cheia de humor!",
    pdf: "DragonBallUm.pdf",
    genero: "Mangá"
  },
  "dragon-ball-dois": {
    titulo: "Dragon Ball Vol. 2",
    autor: "Akira Toriyama",
    paginas: "197 Páginas - PDF",
    paginas2: "197 Páginas - ONLINE",
    capa: "../Capas/DragonBallDois.jpg",
    sinopse: "Depois de passar tantos apuros, Goku, Bulma e seus companheiros seguem sua jornada e já conseguiram cinco das sete Esferas do Dragão!A sexta esfera já foi localizada, mas precisarão novamente da ajuda do Mestre Kame! E logo eles descobrirão também que há outros interessados na dádiva do Rei Dragão Sheng Long.",
    pdf: "DragonBallDois.pdf",
    genero: "Mangá"
  },
  "dragon-ball-três": {
    titulo: "Dragon Ball Vol. 3",
    autor: "Akira Toriyama",
    paginas: "196 Páginas - PDF",
    paginas2: "196 Páginas - ONLINE",
    capa: "../Capas/DragonBallTrês.jpg",
    sinopse: "O treinamento do mestre Mutenroshi é mais rigoroso do que Son Goku e Kulilin esperavam. E para testar os conhecimentos adquiridos, os garotos se inscrevem no incrível Torneio das Artes Marciais, onde competirão pelo título de maior lutador do mundo contra adversários muito peculiares. Um homem que nunca tomou banho, uma linda garota dissimulada, um resiliente guerreiro de uma terra árida e um poderoso ancião que lembra muito um conhecido pervertido são apenas alguns dos lutadores que separam Goku e Kulilin da grande final. ",
    pdf: "DragonBallTrês.pdf",
    genero: "Mangá"
  },
  "dragon-ball-quatro": {
    titulo: "Dragon Ball Vol. 4",
    autor: "Akira Toriyama",
    paginas: "196 Páginas - PDF",
    paginas2: "196 Páginas - ONLINE",
    capa: "../Capas/DragonBallQuatro.jpg",
    sinopse: "A grande final do Torneio de Artes Marciais se aproxima. Goku, candidato ao título, usará tudo o que aprendeu como discípulo de Mutenroshi, e seu vigor e entusiasmo o conduzirão em uma batalha que surpreenderá a todos. E quem será o misterioso Jackie Chun, que parece conhecer tanto sobre Goku e seus amigos? E ainda neste volume, começa uma nova aventura em busca das Esferas do Dragão. Son Goku se deparará com agentes da organização Red Ribbon, o Exército da Aliança Vermelha, que também estão reunindo as Esferas. Então a missão de Goku o levará a invadir a Muscle Tower, uma base militar cheia de poderosos adversários.",
    pdf: "DragonBallQuatro.pdf",
    genero: "Mangá"
  },
  "dragon-ball-cinco": {
    titulo: "Dragon Ball Vol. 5",
    autor: "Akira Toriyama",
    paginas: "196 Páginas - PDF",
    paginas2: "196 Páginas - ONLINE",
    capa: "../Capas/DragonBallCinco.webp",
    sinopse: "Mesmo depois de mostrar um excelente desempenho na grande final do Torneio de Artes Marciais, Son Goku foi derrotado pelo misterioso Jackei Chun. Convencido de que ainda tem muito o que aprender, Goku parte novamente à procura das Esferas do Dragão. Porém, nessa aventura ele encontrará os terríveis agentes da organização Red Ribbon! Ao invadir a Muscle Tower, reduto do General White, ele terá que enfrentar inimigos poderosos para avançar em direção ao topo. E ainda neste volume, Goku contará com a ajuda de velhos amigos para enfrentar o temível General Blue!",
    pdf: "DragonBallCinco.pdf",
    genero: "Mangá"
  },
  "invencível-sessenta": {
    titulo: "Invencível Vol. 60",
    autor: "Robert Kirkman",
    paginas: "34 Páginas - PDF",
    paginas2: "34 Páginas - ONLINE",
    capa: "../Capas/Invencivel60.jpg",
    sinopse: "A Vingança de Angstrom Levy. Após ser desfigurado por Mark em um confronto anterior, Angstrom Levy sobreviveu e usou seus poderes para viajar por dimensões e tratar seus ferimentos. No volume 60, ele retorna com um plano de vingança contra Mark. Usando sua tecnologia, Angstrom libera dezesseis versões malignas de Mark Grayson, recrutadas em diferentes dimensões, com a missão de causar o máximo de destruição possível.",
    pdf: "Invencível60.pdf",
    genero: "História em Quadrinhos"
  },
  "invencível-sessentaeum": {
    titulo: "Invencível Vol. 61",
    autor: "Robert Kirkman",
    paginas: "22 Páginas - PDF",
    paginas2: "22 Páginas - ONLINE",
    capa: "../Capas/Invencivel61.jpg",
    sinopse: "Após a devastadora invasão que acabou com cidades inteiras e deixou muitos heróis mortos ou hospitalizados, Mark Grayson (Invincible) vê-se sozinho no meio de um mundo em ruínas, encarregado de ajudar na reconstrução enquanto carrega culpa e dúvidas sobre o que aconteceu. Durante esse momento frágil, surge um novo e formidável inimigo: Conquest, um guerreiro Viltrumita que desafia Mark não apenas fisicamente, mas em seu papel como herói e como parte de algo maior.Mark então precisa decidir se continuará como salvador, se assumirá suas responsabilidades e como lidará com as consequências de ações que talvez nem tenha tomado diretamente — enquanto uma ameaça maior se aproxima.",
    pdf: "Invencível61.pdf",
    genero: "História em Quadrinhos"
  },

  "deadpool-mata-o-universo-marvel-edição1": {
    titulo: "Deadpool Mata o Universo Marvel Vol. 1",
    autor: "Cullen Bunn ",
    paginas: "24 Páginas - PDF",
    paginas2: "24 Páginas - ONLINE",
    capa: "../Capas/DeadPoolMataOUniversoMarvelUm.jpg",
    sinopse: "A PIADA ACABOU! E se tudo o que você acha engraçado no Deadpool fosse, na verdade, perturbador? E se ele decidisse matar todo mundo do Universo Marvel? E se ele fizesse mesmo isso? Seria ENGRAÇADO para você? O Mercenário Tagarela joga tudo para o alto e coloca cada herói Marvel em sua mira neste gibi de terror sem igual! ",
    pdf: "Deadpool Kills the Marvel Universe - 2012 (Marvel) - 001.pdf",
    genero: "História em Quadrinhos"
  },
  "Jujutsu-Kaisen-edicao1": {
    titulo: "Jujutsu Kaisen Vol. 1",
    autor: "Gege Akutami",
    paginas: "174 Páginas - PDF",
    paginas2: "174 Páginas - ONLINE",
    capa: "../Capas/JujutsuKaisenVolume1.jpg",
    sinopse: "Yuuji Itadori, um colegial com força física incomum, se junta ao Clube de Ocultismo. Eles acabam libertando uma Maldição poderosa ao abrir um objeto selado. Para salvar seus amigos, Itadori engole o objeto — um dedo de Ryomen Sukuna — e se torna o hospedeiro do temido Rei das Maldições. Agora, ele entra para a Escola Jujutsu com a sentença de morte de ser executado após encontrar todos os dedos de Sukuna.",
    pdf: "JujutsuKaisenVolume1.pdf",
    genero: "Mangá"
  },
  "Jujutsu-Kaisen-edicao2": {
    titulo: "Jujutsu Kaisen Vol. 2",
    autor: "Gege Akutami",
    paginas: "168 Páginas - PDF",
    paginas2: "168 Páginas - ONLINE",
    capa: "../Capas/JujutsuKaisenVolume2.jpg",
    sinopse: 'Itadori, Megumi e Nobara são enviados para resgatar pessoas de um reformatório onde surgiu um "Útero Amaldiçoado". No local, eles se deparam com um Espírito Amaldiçoado de Nível Especial, muito além de suas capacidades. Para tentar sobreviver, Itadori troca de lugar com Sukuna, mas o Rei das Maldições aproveita a situação, arrancando o coração de Itadori para mantê-lo refém em seu próprio corpo.',
    pdf: "JujutsuKaisenVolume2.pdf",
    genero: "Mangá"
  },
  "Jujutsu-Kaisen-edicao3": {
    titulo: "Jujutsu Kaisen Vol. 3",
    autor: "Gege Akutami",
    paginas: "173 Páginas - PDF",
    paginas2: "173 Páginas - ONLINE",
    capa: "../Capas/JujutsuKaisenVolume3.jpg",
    sinopse: "Enquanto Megumi e Nobara encontram os alunos da escola rival de Kyoto, Aoi Toudou e Mai Zenin, Itadori (que todos acreditam estar morto) continua seu treinamento intensivo com Satoru Gojo. Ele é então enviado para uma missão prática com o feiticeiro de Grau 1, Kento Nanami. Juntos, eles investigam uma série de assassinatos horríveis causados por Maldições transfiguradas, o que os leva a um confronto direto com a sinistra Maldição Mahito.",
    pdf: "JujutsuKaisenVolume3.pdf",
    genero: "Mangá"
  },
  "Jujutsu-Kaisen-edicao4": {
    titulo: "Jujutsu Kaisen Vol. 4",
    autor: "Gege Akutami",
    paginas: "168 Páginas - PDF",
    paginas2: "168 Páginas - ONLINE",
    capa: "../Capas/JujutsuKaisenVolume4.jpg",
    sinopse: "Itadori e o feiticeiro Kento Nanami continuam a caçar a maldição Mahito. A investigação leva Itadori a Junpei Yoshikawa, um estudante que sofre bullying e que se aliou perigosamente a Mahito. Itadori tenta salvar Junpei, mas Mahito o atrai para uma armadilha cruel, transfigurando Junpei tragicamente na frente de Itadori. Isso força Itadori e Nanami a uma batalha desesperada contra Mahito, que revela sua terrível técnica.",
    pdf: "JujutsuKaisenVolume4.pdf",
    genero: "Mangá"
  },
  "Jujutsu-Kaisen-edicao5": {
    titulo: "Jujutsu Kaisen Vol. 5",
    autor: "Gege Akutami",
    paginas: "172 Páginas - PDF",
    paginas2: "172 Páginas - ONLINE",
    capa: "../Capas/JujutsuKaisenVolume5.jpg",
    sinopse: "Itadori retorna triunfante (e para a surpresa de todos) bem a tempo do início do Evento de Intercâmbio com a escola-irmã de Kyoto. A primeira prova é uma competição em equipe, mas os alunos de Kyoto têm ordens secretas para matar Itadori. O poderoso Aoi Toudou imediatamente ataca a equipe de Tóquio e isola Itadori para um confronto direto, testando a força e as convicções do receptáculo de Sukuna.",
    pdf: "JujutsuKaisenVolume5.pdf",
    genero: "Mangá"
  },

  "DeathNoteVol01": {
    titulo: "Death Note Vol. 1",
    autor: "Tsugumi Ohba",
    paginas: "203 Páginas - PDF",
    paginas2: "203 Páginas - ONLINE",
    capa: "../Capas/DeathNoteVol01.jpg",
    sinopse: 'Light Yagami, um estudante genial, encontra um caderno sobrenatural chamado "Death Note", que permite matar qualquer pessoa cujo nome seja escrito nele. Ele decide usá-lo para eliminar criminosos e criar um mundo perfeito, adotando o pseudônimo "Kira". No entanto, suas ações atraem a atenção do maior detetive do mundo, conhecido apenas como "L", que jura capturá-lo. Inicia-se assim um jogo mortal de gato e rato entre os dois.',
    pdf: "DeathNoteVol01.pdf",
    genero: "Mangá"
  },
  "DeathNoteVol02": {
    titulo: "Death Note Vol. 2",
    autor: "Tsugumi Ohba",
    paginas: "195 Páginas - PDF",
    paginas2: "195 Páginas - ONLINE",
    capa: "../Capas/DeathNoteVol02.jpg",
    sinopse: 'A caçada de L se intensifica. O detetive instala câmeras e escutas secretas na casa de seus principais suspeitos, incluindo a família Yagami. Light agora enfrenta seu maior desafio: ele precisa descobrir uma forma de continuar executando criminosos como "Kira" e se comunicar com o shinigami Ryuk sem ser pego pela vigilância 24 horas por dia de L, que observa todos os seus movimentos.',
    pdf: "DeathNoteVol02.pdf",
    genero: "Mangá"
  },
  "DeathNoteVol03": {
    titulo: "Death Note Volume.3",
    autor: "Tsugumi Ohba",
    paginas: "185 Páginas - PDF",
    paginas2: "185 Páginas - ONLINE",
    capa: "../Capas/DeathNoteVol03.jpg",
    sinopse: 'A tensão aumenta com o surgimento de um "Segundo Kira" (Misa Amane), que possui seus próprios olhos de Shinigami e uma admiração fanática pelo Kira original. Light tenta usar essa nova aliada a seu favor para descobrir a verdadeira identidade de L. Ao mesmo tempo, L consegue encurralar Light, levando-o a tomar uma decisão drástica: renunciar temporariamente à posse do Death Note, perdendo todas as suas memórias como Kira para tentar provar sua inocência.',
    pdf: "DeathNoteVol03.pdf",
    genero: "Mangá"
  },
  "DeathNoteVol04": {
    titulo: "Death Note Volume.4",
    autor: "Tsugumi Ohba",
    paginas: "191 Páginas - PDF",
    paginas2: "191 Páginas - ONLINE",
    capa: "../Capas/DeathNoteVol04.jpg",
    sinopse: 'L e Light (que renunciou ao Death Note e perdeu suas memórias como Kira) agora trabalham juntos na força-tarefa para encontrar o novo Kira. A investigação os leva à poderosa Corporação Yotsuba. Eles descobrem que um grupo de executivos da empresa está usando o caderno para matar concorrentes e aumentar seus lucros. O plano agora é identificar qual dos membros do grupo é o Kira e como capturá-lo em flagrante.',
    pdf: "DeathNoteVol04.pdf",
    genero: "Mangá"
  },
  "DeathNoteVol05": {
    titulo: "Death Note Volume.5",
    autor: "Tsugumi Ohba",
    paginas: "192 Páginas - PDF",
    paginas2: "192 Páginas - ONLINE",
    capa: "../Capas/DeathNoteVol05.jpg",
    sinopse: 'Para provar sua inocência e a de Misa Amane, Light executa seu plano mais arriscado: ele renuncia à posse do Death Note, apagando completamente suas memórias de ser o Kira. Misa também renuncia ao seu caderno. Enquanto os dois estão confinados, as mortes de criminosos recomeçam, deixando L perplexo. O Death Note agora está nas mãos de um terceiro Kira (Higuchi, da Corporação Yotsuba), e L, desconfiado, decide libertar Light para que ele se junte à investigação.',
    pdf: "DeathNoteVol05.pdf",
    genero: "Mangá"
  },
  "HarryPotterEAPedraFilosofal": {
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K.Rowling",
    paginas: "274 Páginas - PDF",
    paginas2: "274 Páginas - ONLINE",
    capa: "../Capas/HarryPotterEAPedraFilosofal.jpg",
    sinopse: '',
    pdf: "HarryPotterEAPedraFilosofal.pdf",
    genero: "Aventura"
  },
  //Modelo
  "---": {
    titulo: "",
    autor: "",
    paginas: "--- Páginas - PDF",
    paginas2: "--- Páginas - ONLINE",
    capa: "../Capas/---.jpg",
    sinopse: '',
    pdf: "---.pdf",
    genero: "---"
  },
//
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const livro = livros[id];

  if (livro) {
    // Preenche informações na página
    document.getElementById("titulo").innerText = livro.titulo;
    document.getElementById("autor").innerText = livro.autor;
    document.getElementById("paginas").innerText = livro.paginas;
    document.getElementById("paginas2").innerText = livro.paginas2;
    document.getElementById("capa").src = livro.capa;
    document.getElementById("sinopse").innerText = livro.sinopse;
  }
});

// Pega o ID do livro da URL, tipo: ?id=divina-comedia
const params = new URLSearchParams(window.location.search);
const livroId = params.get("id");

const livro = livros[livroId];

const btn = document.getElementById('btn-download');
const progress = btn.querySelector('.progress');
const text = btn.querySelector('.text');
const icon = btn.querySelector('.icon');
const check = btn.querySelector('.check');

let hasDownloaded = false;

btn.addEventListener('click', () => {
  if (hasDownloaded) return;

  hasDownloaded = true;
  btn.disabled = true;

  text.textContent = 'Baixando...';
  progress.style.width = '0%';
  check.style.display = 'none';

  setTimeout(() => {
    progress.style.width = '100%';
  }, 100);

  setTimeout(() => {
    text.textContent = 'Download concluído!';
    check.style.display = 'inline';
  }, 2100);
});

// Este código deve estar na sua página de 'livros.html' ou 'livros.js'
// ... (seu código que define o objeto 'livro') ...

// Assumindo que seu objeto 'livro' tem:
// livro.pdf (ex: "A-Carteira.pdf")
// livro.genero (ex: "Literatura")
// livro.titulo (ex: "A Carteira")
// livro.capa (ex: "../Capas/A-Carteira.jpg")

document.getElementById("btn-Ler").addEventListener("click", () => {
  // Nós vamos passar TODOS os dados do livro pela URL
  const params = new URLSearchParams();
  params.set('pdf', livro.pdf);
  params.set('genre', livro.genero);
  params.set('title', livro.titulo); // <-- NOVO
  params.set('cover', livro.capa); // <-- NOVO

  window.location.href = `../livro/leitura.php?${params.toString()}`;
});

// ... (seu código do botão "Ler" está correto, pode deixar como está) ...

const btnDownload = document.getElementById("btn-download");

btnDownload.addEventListener("click", () => {
  // 1. Define o caminho PADRÃO
  let folderPath = '../livro/livros-pdf-padrao/';

  // 2. Pega o gênero e "normaliza" (tira acentos e maiúsculas)
  const genre = livro.genero.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  // ex: "História em Quadrinhos" -> "historia em quadrinhos"
  // ex: "Mangá" -> "manga"

  // 3. Verifica se o gênero normalizado é um dos casos especiais
  if (genre === 'manga' || genre === 'historia em quadrinhos') {
    // 4. Se for, muda o caminho para a pasta principal de PDFs
    folderPath = '../livro/livros-pdf/';
  }

  // 5. Constrói o caminho final
  const pdfPath = `${folderPath}${livro.pdf}`;

  // O resto do seu código de download continua igual
  const a = document.createElement("a");
  a.href = pdfPath;
  a.setAttribute("download", livro.pdf);
  document.body.appendChild(a);
  a.click();
  a.remove();
});
