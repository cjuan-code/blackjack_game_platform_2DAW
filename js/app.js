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
        p1value = p1value + new_card.value;
        ccp1++;
    } else if (type == 'crupier') {

        if (ccc == 1) {
            main_container.classList.add('drawCrupierUnder');
        } else {
            main_container.classList.add('drawCrupier');
        }
        main_container.style.setProperty('--tXc', tXc + "%");
        tXc = tXc+25;
        cvalue = cvalue + new_card.value;
        ccc++;
    }
}

function generateCard() {

    let rand = Math.ceil(Math.random() * ((deck.length+1) - 0) + 0);
    let random_card = deck[rand];
    deck.splice(deck.indexOf(random_card), 1);
    return random_card;
}

var deck = [
    {card: "clubs/AC.png", value: [1, 11]}, {card: "clubs/2C.png", value: 2}, {card: "clubs/3C.png", value: 3}, {card: "clubs/4C.png", value: 4}, {card: "clubs/5C.png", value: 5}, {card: "clubs/6C.png", value: 6}, {card: "clubs/7C.png", value: 7}, {card: "clubs/8C.png", value: 8}, {card: "clubs/9C.png", value: 9}, {card: "clubs/0C.png", value: 10}, {card: "clubs/JC.png", value: 10}, {card: "clubs/QC.png", value: 10}, {card: "clubs/KC.png", value: 10},
    {card: "diamonds/AD.png", value: 10}, {card: "diamonds/2D.png", value: 2}, {card: "diamonds/3D.png", value: 3}, {card: "diamonds/4D.png", value: 4}, {card: "diamonds/5D.png", value: 5}, {card: "diamonds/6D.png", value: 6}, {card: "diamonds/7D.png", value: 7}, {card: "diamonds/8D.png", value: 8}, {card: "diamonds/9D.png", value: 9}, {card: "diamonds/0D.png", value: 10}, {card: "diamonds/JD.png", value: 10}, {card: "diamonds/QD.png", value: 10}, {card: "diamonds/KD.png", value: 10},
    {card: "hearts/AH.png", value: 10}, {card: "hearts/2H.png", value: 2}, {card: "hearts/3H.png", value: 3}, {card: "hearts/4H.png", value: 4}, {card: "hearts/5H.png", value: 5}, {card: "hearts/6H.png", value: 6}, {card: "hearts/7H.png", value: 7}, {card: "hearts/8H.png", value: 8}, {card: "hearts/9H.png", value: 9}, {card: "hearts/0H.png", value: 10}, {card: "hearts/JH.png", value: 10}, {card: "hearts/QH.png", value: 10}, {card: "hearts/KH.png", value: 10},
    {card: "spades/AS.png", value: 10}, {card: "spades/2S.png", value: 2}, {card: "spades/3S.png", value: 3}, {card: "spades/4S.png", value: 4}, {card: "spades/5S.png", value: 5}, {card: "spades/6S.png", value: 6}, {card: "spades/7S.png", value: 7}, {card: "spades/8S.png", value: 8}, {card: "spades/9S.png", value: 9}, {card: "spades/0S.png", value: 10}, {card: "spades/JS.png", value: 10}, {card: "spades/QS.png", value: 10}, {card: "spades/KS.png", value: 10},
];

var deck_div = document.getElementById('deck');
var cvalue = 0;
var p1value = 0;
var tXp1 = 400;
var tXc = 400;
var ccc = 0;
var ccp1 = 0;