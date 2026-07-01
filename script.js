const imagens = document.querySelectorAll(".personagens img");
const botao = document.getElementById("amongus");

const originais = Array.from(imagens, img => img.getAttribute("src"));

botao.addEventListener("click", () => {

    imagens.forEach(img => {
        img.src = "imagens/among-us-twerk.gif";
    });

    setTimeout(() => {
        imagens.forEach((img, i) => {
            img.src = originais[i];
        });
    }, 600);

});

