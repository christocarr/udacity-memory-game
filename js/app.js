
//get cards with class name card and make array called cards
const allCards = document.getElementsByClassName('card');
let cards = [...allCards];

//get container that contains the cards
const board = document.querySelector('.container');

//add event listener for each card in cards array
cards.forEach(function(card) {
	card.addEventListener('click', function (){
		console.log('card clicked');
		
	})
});

//function to shuffle cards at on load and 
function shuffle(arr) {
	let randomCard;
	let tempCard; //for swopping
	for (let i = arr.length-1; i >= 0; i--) {
		
		randomCard = Math.floor(Math.random() * i); //gets random card in array
		
		tempCard = arr[i];
		arr[i] = arr[randomCard];
		arr[randomCard] = tempCard;
	}
	
	return arr;
}

//shuffle pack when page loads
window.addEventListener('load', function() {
	
	const PACK = shuffle(cards);
	
	for (let i = 0; i < PACK.length; i++) {
		[].forEach.call(PACK, function(item) {
			board.appendChild(item);
		});
	}
	
});