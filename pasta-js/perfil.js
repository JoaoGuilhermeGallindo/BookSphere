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

        // Renderiza os cards nas colunas (layout mais profissional)
        function createBookCard(book, isConcluded) {
            const item = document.createElement('div');
            item.className = 'book-item professional';

            // Cover + overlay
            const coverWrapper = document.createElement('div');
            coverWrapper.className = 'cover-wrapper professional';

            const img = document.createElement('img');
            img.className = 'book-cover';
            img.src = book.cover;
            img.alt = book.title;
            coverWrapper.appendChild(img);

            // percentage badge (for in-progress)
            if (!isConcluded) {
                const pctBadge = document.createElement('div');
                pctBadge.className = 'percentage-badge';
                pctBadge.textContent = book.percentage + '%';
                coverWrapper.appendChild(pctBadge);
            } else {
                const conclBadge = document.createElement('div');
                conclBadge.className = 'concluded-badge professional';
                conclBadge.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17l-3.59-3.59L4 14l5 5 11-11-1.41-1.42L9 16.17z" fill="#fff"/></svg>';
                coverWrapper.appendChild(conclBadge);
            }

            // Title and meta area
            const info = document.createElement('div');
            info.className = 'book-info';
            const title = document.createElement('p');
            title.className = 'book-title';
            title.textContent = book.title;
            const meta = document.createElement('div');
            meta.className = 'book-meta';
            meta.textContent = `${book.lastPage} / ${book.totalPages} páginas`;
            info.appendChild(title);
            info.appendChild(meta);

            item.appendChild(coverWrapper);
            item.appendChild(info);

            if (!isConcluded) {
                // Progress bar and editable control
                const barCont = document.createElement('div');
                barCont.className = 'progress-bar-container professional';
                const bar = document.createElement('div');
                bar.className = 'progress-bar professional';
                bar.style.width = book.percentage + '%';
                barCont.appendChild(bar);

                const controls = document.createElement('div');
                controls.className = 'progress-controls';

                const input = document.createElement('input');
                input.type = 'number';
                input.min = 0;
                input.max = book.totalPages;
                input.value = book.lastPage;
                input.className = 'progress-input professional';
                input.title = 'Atualizar página lida (máx ' + book.totalPages + ')';

                const saveBtn = document.createElement('button');
                saveBtn.className = 'progress-save-btn professional';
                saveBtn.type = 'button';
                saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';

                controls.appendChild(input);
                controls.appendChild(saveBtn);

                item.appendChild(barCont);
                item.appendChild(controls);

                // Handler de salvar progresso (envia totalPages também para consistência)
                saveBtn.addEventListener('click', async () => {
                    const newPage = parseInt(input.value || '0', 10);
                    if (isNaN(newPage) || newPage < 0) return showToast('Informe um número válido de páginas.', 'error');

                    // Cap newPage to totalPages
                    const capped = Math.min(newPage, Number(book.totalPages || 0));

                    const payload = { action: 'save_progress', book_identifier: book.pdf, last_page: capped, total_pages: book.totalPages };

                    // UX: desabilita botão e mostra spinner pequeno
                    saveBtn.disabled = true;
                    saveBtn.classList.add('saving');

                    try {
                        const res = await fetch('../pasta-php/getUsers.php', {
                            method: 'POST',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!res.ok) {
                            const t = await res.json().catch(() => ({}));
                            showToast(t.erro || 'Falha ao salvar progresso.', 'error');
                            return;
                        }

                        const updated = await res.json();

                        // Atualiza valores locais e UI
                        book.lastPage = capped;
                        book.percentage = Math.min(100, Math.round((book.lastPage / book.totalPages) * 100));
                        bar.style.width = book.percentage + '%';
                        // update badge and meta
                        const badge = coverWrapper.querySelector('.percentage-badge');
                        if (badge) badge.textContent = book.percentage + '%';
                        meta.textContent = `${book.lastPage} / ${book.totalPages} páginas`;

                        // Se concluiu, mover para a coluna concluídos
                        if (book.percentage >= 100) {
                            // remove do grid atual
                            if (item.parentNode) item.parentNode.removeChild(item);
                            // atualiza arrays de estado
                            const idx = inProgress.findIndex(x => x.pdf === book.pdf);
                            if (idx !== -1) inProgress.splice(idx, 1);
                            if (!concluded.find(x => x.pdf === book.pdf)) concluded.push(book);
                            // cria o card de concluído e adiciona (com badge)
                            const concludedCard = createBookCard(book, true);
                            outGrid.appendChild(concludedCard);
                        } else {
                            // atualiza objeto em inProgress
                            const idx2 = inProgress.findIndex(x => x.pdf === book.pdf);
                            if (idx2 !== -1) { inProgress[idx2].lastPage = book.lastPage; inProgress[idx2].percentage = book.percentage; }
                        }

                        recalcTempo();
                        showToast('Progresso salvo com sucesso.', 'success');

                    } catch (e) {
                        console.error(e);
                        showToast('Erro ao salvar progresso.', 'error');
                    } finally {
                        // reabilita botão
                        saveBtn.disabled = false;
                        saveBtn.classList.remove('saving');
                    }
                });
            }

            return item;
        }

        const inGrid = document.getElementById('inprogress-grid');
        const outGrid = document.getElementById('concluded-grid');

        // Ordena listas para exibição mais coerente (maior progresso primeiro)
        inProgress.sort((a,b) => (b.percentage || 0) - (a.percentage || 0));
        concluded.sort((a,b) => (b.lastPage || 0) - (a.lastPage || 0));

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

        // Função de toasts simples (sucesso / erro)
        function showToast(message, type = 'success', timeout = 3200) {
            try {
                const container = document.getElementById('toast-container');
                if (!container) return alert(message);
                const toast = document.createElement('div');
                toast.className = 'toast ' + (type === 'error' ? 'error' : 'success');
                toast.setAttribute('role', 'status');

                const icon = document.createElement('div');
                icon.className = 't-icon';
                // SVG icons inline (crisp for TCC presentation)
                const svgError = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.001 10h2v5h-2z" fill="#e55353"/><path d="M11 16h2v2h-2z" fill="#e55353"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12a8 8 0 1016 0A8 8 0 004 12z" fill="#e55353"/></svg>';
                const svgOk = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17l-3.59-3.59L4 14l5 5 11-11-1.41-1.42L9 16.17z" fill="#28a745"/></svg>';
                icon.innerHTML = type === 'error' ? svgError : svgOk;

                const body = document.createElement('div');
                body.className = 't-body';
                body.textContent = message;

                toast.appendChild(icon);
                toast.appendChild(body);
                container.appendChild(toast);

                setTimeout(() => {
                    toast.style.transition = 'opacity 220ms ease, transform 220ms ease';
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(-6px)';
                    setTimeout(() => container.removeChild(toast), 240);
                }, timeout);
            } catch (e) {
                console.error('Toast error', e);
                alert(message);
            }
        }

    } catch (erro) {
        // Se ocorrer erro (normalmente usuário não logado), mostra modal com spinner e redireciona para login
        try {
            const modal = document.getElementById('login-modal');
            const loginNowBtn = document.getElementById('login-now');
            const redirectDelay = 800; // tempo em ms antes de redirecionar (ajustável para TCC)
            if (modal) {
                modal.removeAttribute('hidden');
                // Tenta dar foco para o botão 'Ir agora' para acessibilidade
                if (loginNowBtn) loginNowBtn.focus();

                // handler do botão para permitir redirecionamento imediato
                if (loginNowBtn) {
                    loginNowBtn.addEventListener('click', () => {
                        try { window.location.replace('../pasta-html/login.html'); } catch (e) { window.location.href = '../pasta-html/login.html'; }
                    });
                }
            }

            setTimeout(() => {
                try {
                    window.location.replace('../pasta-html/login.html');
                } catch (e) {
                    window.location.href = '../pasta-html/login.html';
                }
            }, redirectDelay);
        } catch (e) {
            // fallback: redireciona imediatamente
            try { window.location.replace('../pasta-html/login.html'); } catch (er) { window.location.href = '../pasta-html/login.html'; }
        }
    }
});
