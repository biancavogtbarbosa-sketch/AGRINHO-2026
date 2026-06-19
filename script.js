// Espera a página carregar
window.addEventListener("DOMContentLoaded", function () {

    console.log("🌱 Site Agro Sustentável carregado!");

    // Seleciona elementos
    const titulo = document.querySelector("header h1");
    const main = document.querySelector("main");

    // 1. Mudar texto do título ao clicar
    titulo.addEventListener("click", function () {
        titulo.textContent = "Agro + Sustentabilidade = Futuro!";
    });

    // 2. Criar botão dinamicamente
    const botao = document.createElement("button");
    botao.textContent = "Clique para ver uma mensagem";
    botao.style.marginTop = "20px";
    botao.style.padding = "10px 20px";
    botao.style.border = "none";
    botao.style.borderRadius = "10px";
    botao.style.cursor = "pointer";
    botao.style.backgroundColor = "#27ae60";
    botao.style.color = "white";
    botao.style.fontSize = "1rem";

    main.appendChild(botao);

    botao.addEventListener("click", function () {
        alert("🌾 A agricultura sustentável ajuda a preservar o solo, a água e o futuro!");
    });

    // 3. Efeito de destaque no main
    main.addEventListener("mouseover", function () {
        main.style.transform = "scale(1.02)";
        main.style.transition = "0.3s";
    });

    main.addEventListener("mouseout", function () {
        main.style.transform = "scale(1)";
    });

    // 4. Modo escuro simples (ao pressionar tecla D)
    document.addEventListener("keydown", function (event) {
        if (event.key === "d") {
            document.body.style.backgroundColor =
                document.body.style.backgroundColor === "black" ? "#f0f7f4" : "black";

            document.body.style.color =
                document.body.style.color === "white" ? "#2d3436" : "white";
        }
    });

});
