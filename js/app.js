function generateGame() {

    start_div.classList.add('hidden');
    deck_div.classList.remove('hidden');
    buttons_div.classList.remove('hidden');
    score_div.classList.remove('hidden');

    var setGame = setInterval(function() {

        if (count == 0) {
            createCard('p1');
        } else if (count == 1) {
            createCard('crupier');

            if (crupier_deck[0].type == 'AS') {
                crupier_bj_button.classList.remove('hidden');
            }

        } else if (count == 2) {
            createCard('p1');
        } else if (count == 3) {
            createCard('crupier');
            clearInterval(setGame);
            canHit = true;
        }

        count++;
    }, 1600);
}

function createCard(type) {

    let new_card = generateCard();
    let main_container = document.createElement('div');
    let second_container = document.createElement('div');
    let front = document.createElement('div');
    let front_img = document.createElement('img');
    let back = document.createElement('div');
    let back_img = document.createElement('img');

    main_container.classList.add('flip-card');
    second_container.classList.add('flip-card-inner');
    front.classList.add('flip-card-front');
    front_img.src = "https://images.freeimages.com/images/premium/previews/1760/17608565-playing-card-back-side-62x90-mm.jpg";
    back.classList.add('flip-card-back');
    back_img.src = "img/deck/" + new_card.card;

    deck_div.appendChild(main_container);
    main_container.appendChild(second_container);
    second_container.appendChild(front);
    second_container.appendChild(back);
    front.appendChild(front_img);
    back.appendChild(back_img);

    if (type == 'p1') {
        main_container.classList.add('drawPlayer1');
        main_container.style.setProperty('--tXp1', tXp1 + "%");
        tXp1 = tXp1+25;
        p1_deck.push(new_card);

        calculateValue('p1');

    } else if (type == 'crupier') {

        if (crupier_deck.length == 1) {
            main_container.classList.add('drawCrupierUnder');
            main_container.setAttribute('id', 'downC');
        } else {
            main_container.classList.add('drawCrupier');
        }

        main_container.style.setProperty('--tXc', tXc + "%");
        tXc = tXc+25;
        crupier_deck.push(new_card);

        calculateValue('crupier');
    }

}

function generateCard() {
    let rand = Math.ceil(Math.random() * ((deck.length-1) - 0) + 0);
    let random_card = deck[rand];
    deck.splice(deck.indexOf(random_card), 1);
    return random_card;
}

function stand() {
    let elem = document.getElementById('downC');
    elem.classList.add('flipCrupierUnder');
    canHit = false;
    standed = true;
    calculateValue('crupier');
}

function calculateValue(type) {
    if (type == 'p1') {
        p1_deck.forEach(element => {

            if (count_values == 0) {
                p1value = element.value;
            } else {
                p1value = p1value + element.value;
            }

            if (element.type == 'AS') {
                p1HasAs = true;
                p1CountAs++;
            }

            count_values++;
        });

        if (p1HasAs && p1value > 21) {
            p1value = p1value-(p1CountAs*10);
        }

        if (p1value > 21) {
            canHit = false;

            setTimeout(() => {
                stand();
            }, 1500);

            console.log('p1 se ha pasado de 21');
        }

        p1CountAs = 0;
        p1score.innerText = p1value; 

    } else if (type == 'crupier') {
        crupier_deck.forEach(element => {
            if (count_values == 0) {
                cvalue = element.value;
            } else {
                cvalue = cvalue + element.value;
            }

            if (element.type == 'AS') {
                crupierHasAs = true;
                crupierCountAs++;
            }

            count_values++;
        });

        if (crupierHasAs && cvalue > 21) {
            cvalue = cvalue-(crupierCountAs*10);
        }

        if (cvalue > 21) {
            console.log('sa pasao la maquinita');
        }

        crupierCountAs = 0;
        if (crupier_deck.length == 1 || standed) {
            crupierscore.innerText = cvalue;
        }
    }

    count_values = 0;
}

var deck = [
    {card: "clubs/AC.png", value: 11, type: 'AS'}, {card: "clubs/2C.png", value: 2}, {card: "clubs/3C.png", value: 3}, {card: "clubs/4C.png", value: 4}, {card: "clubs/5C.png", value: 5}, {card: "clubs/6C.png", value: 6}, {card: "clubs/7C.png", value: 7}, {card: "clubs/8C.png", value: 8}, {card: "clubs/9C.png", value: 9}, {card: "clubs/0C.png", value: 10}, {card: "clubs/JC.png", value: 10}, {card: "clubs/QC.png", value: 10}, {card: "clubs/KC.png", value: 10},
    {card: "diamonds/AD.png", value: 11, type: 'AS'}, {card: "diamonds/2D.png", value: 2}, {card: "diamonds/3D.png", value: 3}, {card: "diamonds/4D.png", value: 4}, {card: "diamonds/5D.png", value: 5}, {card: "diamonds/6D.png", value: 6}, {card: "diamonds/7D.png", value: 7}, {card: "diamonds/8D.png", value: 8}, {card: "diamonds/9D.png", value: 9}, {card: "diamonds/0D.png", value: 10}, {card: "diamonds/JD.png", value: 10}, {card: "diamonds/QD.png", value: 10}, {card: "diamonds/KD.png", value: 10},
    {card: "hearts/AH.png", value: 11, type: 'AS'}, {card: "hearts/2H.png", value: 2}, {card: "hearts/3H.png", value: 3}, {card: "hearts/4H.png", value: 4}, {card: "hearts/5H.png", value: 5}, {card: "hearts/6H.png", value: 6}, {card: "hearts/7H.png", value: 7}, {card: "hearts/8H.png", value: 8}, {card: "hearts/9H.png", value: 9}, {card: "hearts/0H.png", value: 10}, {card: "hearts/JH.png", value: 10}, {card: "hearts/QH.png", value: 10}, {card: "hearts/KH.png", value: 10},
    {card: "spades/AS.png", value: 11, type: 'AS'}, {card: "spades/2S.png", value: 2}, {card: "spades/3S.png", value: 3}, {card: "spades/4S.png", value: 4}, {card: "spades/5S.png", value: 5}, {card: "spades/6S.png", value: 6}, {card: "spades/7S.png", value: 7}, {card: "spades/8S.png", value: 8}, {card: "spades/9S.png", value: 9}, {card: "spades/0S.png", value: 10}, {card: "spades/JS.png", value: 10}, {card: "spades/QS.png", value: 10}, {card: "spades/KS.png", value: 10},
];

var crupier_deck = [];
var p1_deck = [];
var start_div = document.getElementById('start');
var deck_div = document.getElementById('deck');
var buttons_div = document.getElementById('buttons');
var score_div = document.getElementById('score');
var crupierscore = document.getElementById('crupierscore');
var p1score = document.getElementById('p1score');
var play = document.getElementById('play');
var hitButton = document.getElementById('hit');
var standButton = document.getElementById('stand');
var crupier_bj_button = document.getElementById('bj');
var cvalue = 0;
var p1value = 0;
var tXp1 = 425;
var tXc = 425;
var count = 0;
var count_values = 0;
var crupierCountAs = 0;
var p1CountAs = 0;
var canHit = false;
var p1HasAs = false;
var crupierHasAs = false;
var standed = false;


hitButton.addEventListener('click', () => {
    if (canHit) {
        createCard('p1');
    }
})

standButton.addEventListener('click', () => {
    stand();
})

play.addEventListener('click', () => {
    generateGame();
})