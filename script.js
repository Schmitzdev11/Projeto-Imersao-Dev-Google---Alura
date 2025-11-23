const cardContainer = document.querySelector("main"); // Usando 'main' como seletor, conforme o CSS.
const campoBusca = document.querySelector(".search-container input");
const botaoBusca = document.getElementById("botao-busca");
let dados = [];

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
    }
}

function realizarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(items) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos

    if (items.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (const dado of items) {
        const article = document.createElement("article");
        article.innerHTML = `
         <h2>${dado.nome}</h2>
         <p>${dado.descrição}</p>
         <p>Fundado em ${dado.ano}</p>
         <p>Último Título Expressivo: ${dado.titulo}</p>
         <a href="${dado.link}" target="_blank">Saiba sobre a história do clube</a>`;
        cardContainer.appendChild(article);
    }
}

// Inicia o processo quando a página carrega
document.addEventListener("DOMContentLoaded", carregarDados);

// Adiciona os eventos de busca
botaoBusca.addEventListener("click", realizarBusca);
campoBusca.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        realizarBusca();
    }
});