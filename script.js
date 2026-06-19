window.addEventListener("DOMContentLoaded", function () {

    const titulo = document.getElementById("titulo");
    const btn = document.getElementById("btnInfo");
    const infoBox = document.getElementById("infoBox");

    // 🌱 1. Clique no título muda texto
    titulo.addEventListener("click", function () {
        titulo.textContent = "🚜 Futuro do Agro é Sustentável!";
    });

    // 💡 2. Botão interativo com mensagem
    btn.addEventListener("click", function () {

        infoBox.style.display = "block";

        infoBox.innerHTML = `
            🌱 A sustentabilidade no agro garante produção de alimentos sem destruir o planeta.<br><br>
            💧 Economiza água, preserva o solo e reduz impactos ambientais.<br><br>
            🌎 Pequenas mudanças no campo geram grandes resultados para o futuro.
        `;
    });

    // 🌿 3. Efeito visual ao passar o mouse no título
    titulo.addEventListener("mouseover", function () {
        titulo.style.transform = "scale(1.05)";
        titulo.style.transition = "0.3s";
    });

    titulo.addEventListener("mouseout", function () {
        titulo.style.transform = "scale(1)";
    });

    // ⚡ 4. Mensagem no console (profissional)
    console.log("🌱 Projeto Agro Sustentável carregado com sucesso!");

});
