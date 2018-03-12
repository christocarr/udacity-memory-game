
//get cards with class name card and make array called cards
let allCards = document.querySelectorAll('.card');
const cards = [...allCards];

//add event listener for each card in cards array
cards.forEach(function(card) {
	card.addEventListener('click', function (){
		console.log('card clicked');
	})
});