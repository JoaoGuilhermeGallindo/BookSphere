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

        // Função para recalcular tempo total de leitura (1 minuto por página)
        function recalcTempo() {
            let totalMinutesLocal = 0;
            inProgress.forEach(b => totalMinutesLocal += Number(b.lastPage || 0));
            concluded.forEach(b => totalMinutesLocal += Number(b.totalPages || 0));
            const hoursLocal = Math.floor(totalMinutesLocal / 60);
            const minutesLocal = totalMinutesLocal % 60;
            if (leituraContainer) leituraContainer.textContent = `${hoursLocal}h ${minutesLocal}m`;
        }

        // calcula tempo inicial
        recalcTempo();

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
                // Barra de progresso
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

                // Campo de edição do progresso (apenas para usuários logados)
                const editWrap = document.createElement('div');
                editWrap.className = 'progress-edit-wrap';

                const input = document.createElement('input');
                input.type = 'number';
                input.min = 0;
                input.max = book.totalPages;
                input.value = book.lastPage;
                input.className = 'progress-input';
                input.title = 'Atualizar página lida (máx ' + book.totalPages + ')';

                const saveBtn = document.createElement('button');
                saveBtn.className = 'progress-save-btn';
                saveBtn.type = 'button';
                saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';

                editWrap.appendChild(input);
                editWrap.appendChild(saveBtn);
                item.appendChild(editWrap);

                // Handler de salvar progresso
                saveBtn.addEventListener('click', async () => {
                    const newPage = parseInt(input.value || '0', 10);
                    if (isNaN(newPage) || newPage < 0) return alert('Informe um número válido de páginas.');
                    const payload = { action: 'save_progress', book_identifier: book.pdf, last_page: newPage };
                    try {
                        const res = await fetch('../pasta-php/getUsers.php', {
                            method: 'POST',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        if (!res.ok) {
                            const t = await res.json().catch(() => ({}));
                            return alert(t.erro || 'Falha ao salvar progresso.');
                        }
                        const updated = await res.json();
                        // Atualiza valores locais e UI
                        book.lastPage = newPage;
                        book.percentage = Math.min(100, Math.round((book.lastPage / book.totalPages) * 100));
                        bar.style.width = book.percentage + '%';
                        perc.textContent = book.percentage + '%';

                        // Se concluiu, mover para a coluna concluídos
                        if (book.percentage >= 100) {
                            // remove do grid atual
                            if (item.parentNode) item.parentNode.removeChild(item);
                            // atualiza arrays de estado: remove de inProgress e adiciona em concluded
                            const idx = inProgress.findIndex(x => x.pdf === book.pdf);
                            if (idx !== -1) inProgress.splice(idx, 1);
                            if (!concluded.find(x => x.pdf === book.pdf)) concluded.push(book);
                            // cria o card de concluído e adiciona
                            const concludedCard = createBookCard(book, true);
                            outGrid.appendChild(concludedCard);
                        } else {
                            // apenas atualiza o objeto em inProgress
                            const idx2 = inProgress.findIndex(x => x.pdf === book.pdf);
                            if (idx2 !== -1) inProgress[idx2].lastPage = book.lastPage;
                            inProgress[idx2].percentage = book.percentage;
                        }

                        // Recalcula tempo total
                        recalcTempo();
                    } catch (e) {
                        console.error(e);
                        alert('Erro ao salvar progresso.');
                    }
                });
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
        // Se ocorrer erro (normalmente usuário não logado), mostra mensagem curta e redireciona para login
        // Usamos location.replace para não deixar o perfil em histórico (opção solicitada)
        try {
            const center = document.querySelector('.profile-center');
            if (center) {
                // cria um elemento de mensagem simples
                const msg = document.createElement('div');
                msg.style.padding = '20px';
                msg.style.textAlign = 'center';
                msg.style.fontWeight = '600';
                msg.textContent = 'Você precisa entrar para acessar o perfil. Redirecionando...';
                // limpa e insere mensagem
                center.innerHTML = '';
                center.appendChild(msg);
            }

            // espera 500ms para melhor UX, depois substitui a localização (sem histórico)
            setTimeout(() => {
                try {
                    window.location.replace('../pasta-html/login.html');
                } catch (e) {
                    // se replace falhar, tenta href
                    window.location.href = '../pasta-html/login.html';
                }
            }, 500);
        } catch (e) {
            // fallback simples: tenta redirecionar imediatamente
            try { window.location.replace('../pasta-html/login.html'); } catch (er) { window.location.href = '../pasta-html/login.html'; }
        }
    }
});
