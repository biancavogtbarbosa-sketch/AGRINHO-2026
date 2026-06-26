window.addEventListener("DOMContentLoaded", function () {
    const titulo = document.getElementById("titulo");
    const btnInfo = document.getElementById("btnInfo");
    const infoBox = document.getElementById("infoBox");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    const closeModal = document.querySelector(".close");
    const toggleTheme = document.getElementById("toggleTheme");
    const form = document.getElementById("formContato");
    const formFeedback = document.getElementById("formFeedback");

    // 1. Clique no título muda texto
    titulo.addEventListener("click", function () {
        titulo.textContent = "🚜 Futuro do Agro é Sustentável!";
    });

    // 2. Botão abre modal com mensagem
    btnInfo.addEventListener("click", function () {
        modalMessage.innerHTML = `
            🌱 A sustentabilidade no agro garante produção de alimentos sem destruir o planeta.<br>
            💧 Economiza água, preserva o solo e reduz impactos ambientais.<br>
            🌎 Pequenas mudanças no campo geram grandes resultados para o futuro.
        `;
        modal.style.display = "flex";
    });

    // Fechar modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 3. Modo escuro
    toggleTheme.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    });

    // 4. Scroll suave nos links do menu
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // 5. Animação fade-in ao scroll (já feita no CSS, mas forçar recalculo)
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "none";
                entry.target.offsetHeight; // reflow
                entry.target.style.animation = "fadeInUp 0.6s forwards";
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    // 6. Formulário simples
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        formFeedback.textContent = "✅ Mensagem enviada com sucesso!";
        form.reset();
        setTimeout(() => formFeedback.textContent = "", 4000);
    });

    // 7. Console profissional
    console.log("🌱 Projeto Agro Sustentável carregado com sucesso!");
});
