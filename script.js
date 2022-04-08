let numberOfCards;
const cardsDisplay = document.querySelector(".cards");

do {
    numberOfCards = Number(prompt("Com quantas cartas você quer jogar o jogo da memória? (precisa ser um número par entre 4 e 14)"));
} while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0);

for (let i = 0; i < numberOfCards; i++) {
    cardsDisplay.innerHTML += "<div></div>";
}