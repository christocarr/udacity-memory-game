
//get cards with class name card and make array called cards
const allCards = document.getElementsByClassName('card');
const cards = [...allCards];
// array that holds all card symbols by class name
let cardSymbols = [];
let flippedCards = [];
//get container that contains the cards
const board = document.querySelector('.board');

//get counter element
const counter = document.querySelector('.counter');
//initialize move counter by 0 at start of game
let moves = 0;

//get all star elements and insert into array called stars
const allStars = document.getElementsByClassName('star');
const stars = [...allStars];
console.log(stars);

let cardClick = function(e){
	
	let symbol = e.target.nextElementSibling.firstChild.className; //get symbols of clicked card
	
	this.classList.toggle('flipped');
	this.classList.toggle('disabled');
	
	cardSymbols.push(symbol);

	//insert selected cards into array to allow change class if matched or mismatched
	flippedCards.push(this);

	compareCards(); 
	
}
	
function compareCards() {

	if (flippedCards.length === 2) {
		moveCounter()
		
		if (cardSymbols[0] === cardSymbols[1]) {
			pairMatch();
		} else {
			pairMismatch();
		}
		
	}
}

	
function pairMatch() {
	flippedCards[0].classList.toggle('disabled');
	flippedCards[1].classList.toggle('disabled');
	flippedCards = [];
	cardSymbols =[];
}	

function pairMismatch() {
	setTimeout(function() {
		flippedCards[0].classList.toggle('flipped');
		flippedCards[1].classList.toggle('flipped');
		flippedCards[0].classList.toggle('disabled');
		flippedCards[1].classList.toggle('disabled');
		flippedCards = [];
		cardSymbols =[];
	}, 1100);
	
}

//increase the moves counter by 1 after every two cards flipped over
function moveCounter() {
	moves++;
	counter.innerHTML = 'Moves: ' + moves;
	
	if (moves > 8 && moves < 14) {
		stars[2].style.visibility = "collapse" ;
	} else if (moves > 14) {
		stars[2].style.visibility = "collapse";
		stars[1].style.visibility = "collapse";
	}

}



//add event listener for each card in cards array
cards.forEach(function(card, index) {
//	card.setAttribute('id', index);
	card.addEventListener('click', cardClick)
	
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
	
	counter.innerHTML = 'Moves: 0';
	
	//get reset button and attach window reload when clicked
	reset = document.querySelector('.reset');
	reset.addEventListener('mousedown', function() {
		window.location.reload(true);
		reset.style.boxShadow = "inset 0px 0px 11px 0.2px rgba(0,0,0,0.6)"
	});
	
	
});