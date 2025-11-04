document.addEventListener('DOMContentLoaded', () => {
  const form    = document.querySelector('.contact-form');
  const sendBtn = document.getElementById('btn-send');
  const text    = sendBtn.querySelector('.btn-text');

  // Envio via FormSubmit
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.name.value.trim() ||
        !form.email.value.trim() ||
        !form.message.value.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    sendBtn.disabled = true;
    sendBtn.classList.add('sending');

    setTimeout(() => {
      text.textContent = 'Enviado!';
      form.submit();  // dispara FormSubmit
    }, 800);
  });
});