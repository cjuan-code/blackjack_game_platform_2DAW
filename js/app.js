function generateGame() {

    start_div.classList.add('hidden');
    deck_div.classList.remove('hidden');
    buttons_div.classList.remove('hidden');
    score_div.classList.remove('hidden');
    modal_container_div.classList.add('hidden');

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

            if (p1Points == 21) {
                pBlackjack();
            }
        }

        count++;
    }, 1600);
}

function playCrupier() {
    let playCrupier = setInterval(function() {
        if (crupierPoints <= 16) {
            createCard('crupier');
        } else if (crupierPoints >= 17) {
            clearInterval(playCrupier);
            whoWins();
        }

    }, 1600);
}

function createCard(type) {

    let new_card = generateCard();
    let main_container = document.createElement('div');
    let front = document.createElement('div');
    let front_img = document.createElement('img');
    let back = document.createElement('div');
    let back_img = document.createElement('img');

    main_container.classList.add('flip-card');
    front.classList.add('flip-card-front');
    front_img.src = "media/img/backsite_card.jpg";
    back.classList.add('flip-card-back');
    back_img.src = "media/img/deck/" + new_card.card;

    deck_div.appendChild(main_container);
    main_container.appendChild(front);
    main_container.appendChild(back);
    front.appendChild(front_img);
    back.appendChild(back_img);

    if (type == 'p1') {
        main_container.classList.add('drawPlayer1');
        main_container.style.setProperty('--tXp1', tXp1 + "%");
        tXp1 = tXp1+25;
        p1_deck.push(new_card);

        calculatePoints('p1');

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

        calculatePoints('crupier');
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
    standed = true;
    calculatePoints('crupier');
    playCrupier();
}

function calculatePoints(type) {
    if (type == 'p1') {
        p1_deck.forEach(element => {

            if (count_values == 0) {
                p1Points = element.value;
            } else {
                p1Points = p1Points + element.value;
            }

            if (element.type == 'AS') {
                p1HasAs = true;
                p1CountAs++;
            }

            count_values++;
        });

        if (p1HasAs && p1Points > 21) {
            p1Points = p1Points-(p1CountAs*10);
        }

        if (p1Points > 21) {
            canHit = false;

            setTimeout(() => {
                stand();
            }, 1000);

            console.log('p1 se ha pasado de 21');
        }

        p1CountAs = 0;
        p1score.innerText = p1Points; 

    } else if (type == 'crupier') {
        crupier_deck.forEach(element => {
            if (count_values == 0) {
                crupierPoints = element.value;
            } else {
                crupierPoints = crupierPoints + element.value;
            }

            if (element.type == 'AS') {
                crupierHasAs = true;
                crupierCountAs++;
            }

            count_values++;
        });

        if (crupierHasAs && crupierPoints > 21) {
            crupierPoints = crupierPoints-(crupierCountAs*10);
        }

        if (crupierPoints > 21) {
            console.log('sa pasao la maquinita');
        }

        crupierCountAs = 0;
        if (crupier_deck.length == 1 || standed) {
            crupierscore.innerText = crupierPoints;
        }
    }

    count_values = 0;
}

function whoWins() {

    if (crupierPoints > 21 && p1Points <= 21) {
        winner.innerText = "Player wins";
        winnings = Number(bet.value) + Number(Number(bet.value)*1);
    } else if (p1Points > 21 && crupierPoints <= 21) {
        winner.innerText = "Crupier wins";
        winnings = -Number(bet.value);
    } else if (crupierPoints > 21 && crupierPoints > 21) {
        winner.innerText = "Tie";
        winnings = 0;
    } else if (crupierPoints > p1Points) {
        winner.innerText = "Crupier wins";
        winnings = -Number(bet.value);
    } else if (crupierPoints < p1Points) {
        winner.innerText = "Player wins";
        winnings = Number(bet.value) + Number(Number(bet.value)*1);
    } else if (crupierPoints == p1Points) {
        winner.innerText = "Tie";
        winnings = 0;
    }
}

function pBlackjack() {
    winnings = Number(bet.value) + Number(Number(bet.value)*1.5);
    setTimeout(() => {
        let elem = document.getElementById('downC');
        elem.classList.add('flipCrupierUnder');
        calculatePoints('crupier');
        winner.innerText = "Player's Blackjack!!";
    }, 1500);
}


var deck = [
    {card: "clubs/AC.png", value: 11, type: 'AS'}, {card: "clubs/2C.png", value: 2}, {card: "clubs/3C.png", value: 3}, {card: "clubs/4C.png", value: 4}, {card: "clubs/5C.png", value: 5}, {card: "clubs/6C.png", value: 6}, {card: "clubs/7C.png", value: 7}, {card: "clubs/8C.png", value: 8}, {card: "clubs/9C.png", value: 9}, {card: "clubs/0C.png", value: 10}, {card: "clubs/JC.png", value: 10}, {card: "clubs/QC.png", value: 10}, {card: "clubs/KC.png", value: 10},
    {card: "diamonds/AD.png", value: 11, type: 'AS'}, {card: "diamonds/2D.png", value: 2}, {card: "diamonds/3D.png", value: 3}, {card: "diamonds/4D.png", value: 4}, {card: "diamonds/5D.png", value: 5}, {card: "diamonds/6D.png", value: 6}, {card: "diamonds/7D.png", value: 7}, {card: "diamonds/8D.png", value: 8}, {card: "diamonds/9D.png", value: 9}, {card: "diamonds/0D.png", value: 10}, {card: "diamonds/JD.png", value: 10}, {card: "diamonds/QD.png", value: 10}, {card: "diamonds/KD.png", value: 10},
    {card: "hearts/AH.png", value: 11, type: 'AS'}, {card: "hearts/2H.png", value: 2}, {card: "hearts/3H.png", value: 3}, {card: "hearts/4H.png", value: 4}, {card: "hearts/5H.png", value: 5}, {card: "hearts/6H.png", value: 6}, {card: "hearts/7H.png", value: 7}, {card: "hearts/8H.png", value: 8}, {card: "hearts/9H.png", value: 9}, {card: "hearts/0H.png", value: 10}, {card: "hearts/JH.png", value: 10}, {card: "hearts/QH.png", value: 10}, {card: "hearts/KH.png", value: 10},
    {card: "spades/AS.png", value: 11, type: 'AS'}, {card: "spades/2S.png", value: 2}, {card: "spades/3S.png", value: 3}, {card: "spades/4S.png", value: 4}, {card: "spades/5S.png", value: 5}, {card: "spades/6S.png", value: 6}, {card: "spades/7S.png", value: 7}, {card: "spades/8S.png", value: 8}, {card: "spades/9S.png", value: 9}, {card: "spades/0S.png", value: 10}, {card: "spades/JS.png", value: 10}, {card: "spades/QS.png", value: 10}, {card: "spades/KS.png", value: 10},
];

var crupier_deck = [];
var p1_deck = [];
var start_div = document.getElementById('start-container');
var deck_div = document.getElementById('deck');
var buttons_div = document.getElementById('buttons');
var score_div = document.getElementById('score');
var modal_container_div = document.getElementById('modal-container');
var modal_div = document.getElementById('modal');
var chips_div = document.getElementById('chips');
var crupierscore = document.getElementById('crupierscore');
var p1score = document.getElementById('p1score');
var winner = document.getElementById('winner');
var play = document.getElementById('play');
var showRules = document.getElementById('showRules');
var closeRules = document.getElementById('closeRules');
var hitButton = document.getElementById('hit');
var standButton = document.getElementById('stand');
var crupier_bj_button = document.getElementById('bj');
var bet = document.getElementById('bet');
var crupierPoints = 0;
var p1Points = 0;
var tXp1 = 425;
var tXc = 425;
var count = 0;
var count_values = 0;
var crupierCountAs = 0;
var p1CountAs = 0;
var winnings = 0;
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

    if (canHit) {
        canHit = false;
        setTimeout(() => {
            stand();
        }, 1000);
    }
    
})

showRules.addEventListener('click', () => {
    modal_div.classList.remove('hidden');
    modal_div.classList.add('showModal');
    modal_div.classList.remove('closeModal');
    closeRules.classList.remove('hidden');
    start_div.classList.add('hidden');
    modal_container_div.classList.add('modal-container-color');
})

closeRules.addEventListener('click', () => {
    modal_div.classList.add('closeModal');
    modal_div.classList.remove('addModal');
    closeRules.classList.add('hidden');
    setTimeout(() => {
        start_div.classList.remove('hidden');
        modal_container_div.classList.remove('modal-container-color');
        modal_div.classList.add('hidden');
    }, 650);
})

chips_div.addEventListener('click', e => {
    let getval = e.target.src.split('/');
    let getval2 = getval[7].split('.');
    let value = Number(getval2[0]);
    
    bet.value = Number(bet.value) + value;
})

play.addEventListener('click', () => {
    if (Number(bet.value) > 0) {
        generateGame();
    } else {
        alert('You must bet!!!');
    }
})