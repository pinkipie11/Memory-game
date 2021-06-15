const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    // add/ toggle: ako nema flip class dodaj je, ako ima ukloni je
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        // hasFlippedCard = false; because resetBoard()
        secondCard = this;

        // do cards match? / html/data-framework = js/dataset.framework
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // its a match! 
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            resetBoard();
        } else {
            lockBoard = true;
            // not a match
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                resetBoard();
            }, 1500);
        }
    }

}

function resetBoard() {
    // hasFlippedCard=false and lockBoard=false
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
// invokeing function before game starts
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));