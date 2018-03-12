
//get cards with class name card and make array called cards
const allCards = document.querySelectorAll('.card');
const cards = [...allCards];

//add event listener for each card in cards array
cards.forEach(function(card) {
	card.addEventListener('click', function (){
		console.log('card clicked');
		
	})
});

