document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const mensagem = document.getElementById('mensagem');
    const boxMsg = document.querySelector('.box-msg');

    function mostrarMensagem(texto, cor) {
        mensagem.textContent = texto;
        mensagem.style.color = cor;
        if (texto.trim() !== "") {
            boxMsg.style.display = 'block';  // Mostrar
        } else {
            boxMsg.style.display = 'none';   // Ocultar se vazio
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const resposta = await fetch('../pasta-php/login.php', {
                method: 'POST',
                body: formData
            });

            const texto = await resposta.text();

            if (texto.includes('sucesso')) {
                mostrarMensagem('Login realizado com sucesso!', 'green');

                setTimeout(() => {
                    window.location.href = '../pasta-html/index.html';
                }, 3000);
            } else {
                mostrarMensagem(`❌ ${texto}`, 'red');
            }
        } catch (erro) {
            mostrarMensagem('Erro de comunicação com o servidor.', 'red');
        }
    });

    boxMsg.style.display = 'none';  // <- Inicialmente oculta
});
