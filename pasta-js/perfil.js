document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch('../pasta-php/getUsers.php', {
            credentials: 'include'
        });

        if (!resposta.ok) throw new Error('Usuário não logado');

        const dados = await resposta.json();

        // Atualiza os textos do perfil
        document.getElementById('user-name').textContent = dados.nome;
        document.getElementById('profile-nome').textContent = dados.usuario;
        document.getElementById('user-username').textContent = '@' + dados.usuario;

        // Atualiza a imagem principal do perfil
        const avatar = document.getElementById('profile-avatar');
        const headerAvatar = document.querySelector('.profile-img img'); // <-- imagem do cabeçalho

        if (dados.imagem && dados.imagem.trim() !== '') {
            const caminhoImagem = '../pasta-php/uploads/' + dados.imagem + '?v=' + new Date().getTime();
            avatar.src = caminhoImagem;
            if (headerAvatar) headerAvatar.src = caminhoImagem; // <-- atualiza o cabeçalho também
        } else {
            avatar.src = '../IMAGENS/SemFoto.jpg';
            if (headerAvatar) headerAvatar.src = '../IMAGENS/SemFoto.jpg';
        }

        // tempo de leitura estimado (simples estimativa: 1 min por página lida)
        const leituraContainer = document.getElementById('tempo-leitura');
        // dados.progress será um array de {book_identifier, last_page}
        const progressList = dados.progress || [];

        // Função utilitária: busca metadados em `livros` (arquivo sinopse.js) quando disponível
        function findBookMetaByPdf(pdfName) {
            if (typeof livros === 'object') {
                for (const key in livros) {
                    if (livros[key].pdf === pdfName) return livros[key];
                }
            }
            return null;
        }

        // Constrói arrays de progresso e concluidos
        const inProgress = [];
        const concluded = [];

        progressList.forEach(entry => {
            const pdf = entry.book_identifier || entry.book_id || entry.book;
            const lastPage = parseInt(entry.last_page ?? entry.page ?? entry.lastPage ?? 0, 10) || 0;

            const meta = findBookMetaByPdf(pdf);
            let title = meta ? meta.titulo : (pdf ? pdf.replace(/\.[^.]+$/, '') : 'Livro');
            let cover = meta ? meta.capa : ('../Capas/' + (pdf ? pdf.replace(/\.[^.]+$/, '') + '.jpg' : 'SemCapa.jpg'));
            let totalPages = null;
            if (meta && meta.paginas) {
                // tenta extrair número de páginas de strings como "788 Páginas - PDF"
                const m = meta.paginas.match(/(\d+)\s*P/);
                if (m) totalPages = parseInt(m[1], 10);
            }

            // se não encontrou, tenta outras propriedades
            if (!totalPages && meta && meta.paginas2) {
                const m2 = meta.paginas2.match(/(\d+)\s*P/);
                if (m2) totalPages = parseInt(m2[1], 10);
            }

            // fallback razoável
            if (!totalPages) totalPages = 200; // suposição conservadora

            const percentage = Math.min(100, Math.round((lastPage / totalPages) * 100));

            const item = { pdf, lastPage, title, cover, totalPages, percentage };

            if (percentage >= 100) concluded.push(item);
            else inProgress.push(item);
        });

        // calcula tempo estimado: soma de páginas lidas * 1 minuto
        let totalMinutes = 0;
        inProgress.forEach(b => totalMinutes += b.lastPage);
        concluded.forEach(b => totalMinutes += b.totalPages);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (leituraContainer) leituraContainer.textContent = `${hours}h ${minutes}m`;

        // Renderiza os cards nas colunas
        function createBookCard(book, isConcluded) {
            const item = document.createElement('div');
            item.className = 'book-item';

            const coverWrapper = document.createElement('div');
            coverWrapper.className = 'cover-wrapper';

            const img = document.createElement('img');
            img.className = 'book-cover';
            img.src = book.cover;
            img.alt = book.title;
            coverWrapper.appendChild(img);

            if (isConcluded) {
                const badge = document.createElement('div');
                badge.className = 'concluded-badge';
                badge.innerHTML = '<i class="fa-solid fa-check"></i>';
                coverWrapper.appendChild(badge);
            }

            const title = document.createElement('p');
            title.className = 'book-title';
            title.textContent = book.title;

            item.appendChild(coverWrapper);

            if (!isConcluded) {
                const barCont = document.createElement('div');
                barCont.className = 'progress-bar-container';
                const bar = document.createElement('div');
                bar.className = 'progress-bar';
                bar.style.width = book.percentage + '%';
                barCont.appendChild(bar);

                const perc = document.createElement('div');
                perc.className = 'progress-percentage';
                perc.textContent = book.percentage + '%';

                item.appendChild(barCont);
                item.appendChild(perc);
            }

            item.appendChild(title);
            return item;
        }

        const inGrid = document.getElementById('inprogress-grid');
        const outGrid = document.getElementById('concluded-grid');

        if (inGrid) {
            if (inProgress.length === 0) inGrid.innerHTML = '<p>Sem livros em progresso.</p>';
            else {
                inProgress.forEach(b => inGrid.appendChild(createBookCard(b, false)));
            }
        }

        if (outGrid) {
            if (concluded.length === 0) outGrid.innerHTML = '<p>Sem livros concluídos.</p>';
            else concluded.forEach(b => outGrid.appendChild(createBookCard(b, true)));
        }

    } catch (erro) {
     
    }
});
