// Menu Responsivo
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Depoimentos - Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if (i === index) t.classList.add('active');
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

// Popup de Lead Magnet (aparece após 10 segundos)
const leadPopup = document.getElementById('leadPopup');
const closePopup = document.getElementById('closePopup');
const sendLead = document.getElementById('sendLead');
const leadEmail = document.getElementById('leadEmail');

setTimeout(() => {
  if (!localStorage.getItem('leadPopupSeen')) {
    leadPopup.style.display = 'flex';
  }
}, 10000);

closePopup.addEventListener('click', () => {
  leadPopup.style.display = 'none';
  localStorage.setItem('leadPopupSeen', 'true');
});

window.addEventListener('click', (e) => {
  if (e.target === leadPopup) {
    leadPopup.style.display = 'none';
    localStorage.setItem('leadPopupSeen', 'true');
  }
});

sendLead.addEventListener('click', () => {
  if (!leadEmail.value) {
    alert('Por favor, insira seu e-mail.');
    return;
  }
  alert('Guia enviado para ' + leadEmail.value + '! 🎉');
  leadPopup.style.display = 'none';
  localStorage.setItem('leadPopupSeen', 'true');
});

// Formulário com EmailJS
(function() {
  emailjs.init("1LP-8a5h2Mgj3qCtM"); // 🔥 Substitua
})();

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  emailjs.sendForm('service_rm9brxh', 'template_hncv83g', this)
    .then(() => {
      // ✅ Enviou! Redireciona
      window.location.href = 'obrigado.html';
    })
    .catch((error) => {
      alert('Erro ao enviar. Envie pelo WhatsApp: (11) 99999-8888');
      console.error('EmailJS Error:', error);
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Popup de Agendamento Rápido
document.getElementById('quickAgendaBtn').addEventListener('click', () => {
  window.open('https://calendly.com/seuusuario-eugestor/consulta-gratuita', '_blank');
});