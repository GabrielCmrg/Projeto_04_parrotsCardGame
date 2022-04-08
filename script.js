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
        cards.push(`
        <div class="flip" onclick="flipCard(this)">
            <div class="back-face face"><img src="utils/front.png"></img></div>
            <div class="front-face face"><img src=${cardFaces[i]}></img></div>
        </div>
        `);
        cards.push(`
        <div class="flip" onclick="flipCard(this)">
            <div class="back-face face"><img src="utils/front.png"></img></div>
            <div class="front-face face"><img src=${cardFaces[i]}></img></div>
        </div>
        `);
    }

    return cards;
}

function shuffle(deck) {
    deck.sort(generateRandomShuffleNumber);
}

function display(deck) {
    cardsDisplay.innerHTML = "";
    for (let i = 0; i < deck.length; i++) {
        cardsDisplay.innerHTML += deck[i];
    }
}

function gameInit() {
    lastCardFlipped = undefined;
    cardsPlayed = 0;
    min = 0;
    sec = 0;
    document.querySelector(".clock").innerHTML = `Tempo decorrido: ${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
    const cards = generateDeck(getNumberOfCards());
    shuffle(cards);
    display(cards);
    gameStart = setInterval(changeClock, 1000);
}

function flip(card) {
    card.classList.toggle("flip");
}

function restart() {
    let restart;
    do {
        restart = prompt("Gostaria de reiniciar a partida?");
    } while (restart !== "não" && restart !== "sim");
    if (restart === "sim") {
        gameInit();
    }
}

function winCheck() {
    const unflippedCards = document.querySelectorAll(".flip");
    if (unflippedCards.length == 0) {
        clearInterval(gameStart);
        setTimeout(alert, 1000, `Você ganhou em ${cardsPlayed} jogadas e com um tempo de ${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}!`);
        setTimeout(restart, 1002);
    }
}

function flipCard(card) {
    flip(card);
    card.removeAttribute("onclick");
    cardsPlayed++;

    if (lastCardFlipped === undefined) {
        lastCardFlipped = card;
    } else if (lastCardFlipped.innerHTML !== card.innerHTML){
        setTimeout(flip, 1000, card);
        card.setAttribute("onclick", "flipCard(this)");
        setTimeout(flip, 1000, lastCardFlipped);
        lastCardFlipped.setAttribute("onclick", "flipCard(this)");
        lastCardFlipped = undefined;
    } else {
        lastCardFlipped = undefined;
        winCheck();
    }
}

function changeClock() {
    sec++;
    if (sec > 59) {
        sec = 0;
        min++;
    }
    document.querySelector(".clock").innerHTML = `Tempo decorrido: ${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
}

const cardsDisplay = document.querySelector(".cards");
let lastCardFlipped;
let cardsPlayed = 0;
let min = 0;
let sec = 0;
let gameStart = 0;
gameInit();