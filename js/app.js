function player1Draw() {
    // let elem = document.getElementById('card');
    elem.classList.add('player1Draw');
}

var elem = document.getElementById('card1');
elem.addEventListener('click', e => {
    let elem2 = document.getElementById('card1_flip');
    elem2.classList.add('flipp');
})