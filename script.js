function generateRandomShuffleNumber() {
    return Math.random() - 0.5;
}

function getNumberOfCards() {
    let numberOfCards;

    do {
        numberOfCards = Number(prompt("Com quantas cartas você quer jogar o jogo da memória? (precisa ser um número par entre 4 e 14)"));
    } while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0);

    return numberOfCards;
}

function generateDeck(numberOfCards) {
    const cardFaces = [
        "/utils/bobrossparrot.gif",
        "/utils/explodyparrot.gif",
        "/utils/fiestaparrot.gif",
        "/utils/metalparrot.gif",
        "/utils/revertitparrot.gif",
        "/utils/tripletsparrot.gif",
        "/utils/unicornparrot.gif",
    ]
    const cards = [];

    for (let i = 0; i < numberOfCards / 2; i++) {
        cards.push(`<div><img src=${cardFaces[i]}></img></div>`);
        cards.push(`<div><img src=${cardFaces[i]}></img></div>`);
    }

    return cards;
}

function shuffle(deck) {
    deck.sort(generateRandomShuffleNumber);
}

function display(deck) {
    for (let i = 0; i < deck.length; i++) {
        cardsDisplay.innerHTML += deck[i];
    }
}

function gameInit() {
    const cards = generateDeck(getNumberOfCards());
    shuffle(cards);
    display(cards);
}

const cardsDisplay = document.querySelector(".cards");