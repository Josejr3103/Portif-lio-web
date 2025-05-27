// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Animação suave ao rolar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicialização do EmailJS
(function() {
    emailjs.init("d1cQKoq0iuNxiE9LT"); // Substitua com sua chave pública do EmailJS
})();

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Desabilita o botão e mostra "Enviando..."
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    // Prepara os parâmetros do e-mail
    const templateParams = {
        title: 'Nova Mensagem de Contato',
        user_name: contactForm.user_name.value,
        user_email: contactForm.user_email.value,
        message: contactForm.message.value,
        to_email: 'jose_roberto.junior@somosicev.com' // Seu e-mail
    };

    // Envia o e-mail usando EmailJS
    emailjs.send('service_pzje45k', 'template_8k3m11l', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            submitButton.textContent = 'Mensagem Enviada!';
            contactForm.reset();
            
            // Mostra mensagem de sucesso
            alert('Mensagem enviada com sucesso!');
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            submitButton.textContent = 'Erro ao Enviar';
            alert('Desculpe, houve um erro ao enviar a mensagem. Por favor, tente novamente.');
        })
        .finally(() => {
            // Restaura o botão após 2 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Remover a observação após a animação
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Função para inicializar as animações
function initializeAnimations() {
    // Observar seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Configurar e observar cards
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        // Adicionar classe inicial
        card.classList.add('fade-in');
        // Observar o card
        observer.observe(card);
    });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Remover o código antigo que estava causando o problema
// document.querySelectorAll('.skill-card, .project-card').forEach(card => {
//     card.style.opacity = '0';
//     card.style.transform = 'translateY(20px)';
//     card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     observer.observe(card);
// });

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.animate').forEach(element => {
//         element.style.opacity = '1';
//         element.style.transform = 'translateY(0)';
//     });
// }); 