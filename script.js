window.addEventListener("DOMContentLoaded", function () {

    // Elementos
    const titulo = document.getElementById("titulo");
    const btn = document.getElementById("btnInfo");
    const infoBox = document.getElementById("infoBox");
    const clickCountSpan = document.getElementById("clickCount");
    const toggleDark = document.getElementById("toggleDark");
    let clickCount = 0;

    // ========== 1. TÍTULO INTERATIVO ==========
    titulo.addEventListener("click", function () {
        titulo.textContent = "🚜 Futuro do Agro é Sustentável!";
        titulo.style.color = "#fff";
    });

    titulo.addEventListener("mouseover", function () {
        titulo.style.transform = "scale(1.08)";
        titulo.style.transition = "0.3s";
    });

    titulo.addEventListener("mouseout", function () {
        titulo.style.transform = "scale(1)";
    });

    // ========== 2. BOTÃO MENSAGEM ==========
    btn.addEventListener("click", function () {
        clickCount++;
        clickCountSpan.textContent = clickCount;

        infoBox.style.display = "block";
        infoBox.innerHTML = `
            🌱 A sustentabilidade no agro garante produção de alimentos sem destruir o planeta.<br><br>
            💧 Economiza água, preserva o solo e reduz impactos ambientais.<br><br>
            🌎 Pequenas mudanças no campo geram grandes resultados para o futuro.
        `;
    });

    // ========== 3. MODO ESCURO ==========
    toggleDark.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        toggleDark.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    // ========== 4. ANIMAÇÃO DE CONTADORES (ESTATÍSTICAS) ==========
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"));
            const increment = target / 50; // 50 passos
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 30);
        });
    }

    // Dispara a animação quando a seção de tecnologia estiver visível
    const techSection = document.getElementById("tecnologia");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(techSection);

    // ========== 5. SCROLL SUAVE PARA NAVEGAÇÃO ==========
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

    // ========== 6. CONSOLE PROFISSIONAL ==========
    console.log("🌱 Projeto Agro Sustentável carregado com sucesso!");
    console.log("✨ Modo escuro disponível");
    console.log("📊 Contadores animados");

});
