
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
//initialize move counter by 1 at start of game
let moves = 0;

//array to hold selected cards
let clickedCards =[];

let cardClick = function(e){
	
	let symbol = e.target.nextElementSibling.firstChild.className; //get symbols of clicked card
	
	this.classList.toggle('flipped');
	this.classList.toggle('disabled');
	
//	let flippedCard = e.target.parentElement.classList; //get classes of flipped card
	
	let flippedCount = 1;

	//insert selected cards into array to change class if matched or mismatched
	clickedCards.push(this);
	
	compareCards(flippedCount, symbol); 
	
}
	
function compareCards(flippedCount, symbol, flippedCard) {
	
	flippedCards.push(flippedCount);
	cardSymbols.push(symbol); //get symbols, insert into cardSymbols to compare flipped cards
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
	console.log('cards match');
	flippedCards = [];
}	

function pairMismatch() {
	setTimeout(function() {
		
		console.log('cards do not match');
		clickedCards[0].classList.toggle('flipped');
		clickedCards[1].classList.toggle('flipped');
		clickedCards[0].classList.toggle('disabled');
		clickedCards[1].classList.toggle('disabled');
		flippedCards = [];
		
	}, 1100);
	
	reset();
}

//increase the moves counter by 1 after every two cards flipped over
function moveCounter() {
	moves++;
	counter.innerHTML = 'Moves: ' + moves;
}

function reset() {
	
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
	
	
});