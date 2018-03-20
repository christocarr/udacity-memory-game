
//get cards with class name card and make array called cards
const allCards = document.getElementsByClassName('card');
const cards = [...allCards];
const cardMatch = [];
// array that holds all card symbols by class name
let cardSymbols = [];
let flippedCounter = [];
//get container that contains the cards
const board = document.querySelector('.board');
//get counter element
const counter = document.querySelector('.counter');


let cardClick = function(e){
	
 	this.classList.toggle('flipped');
	this.classList.add('stay-flipped');
	
	let symbol = e.target.nextElementSibling.firstChild.className;
//	cardSymbols.push(symbol); //get card symbols and insert into array cardSymbols
	flippedCards(symbol);
	
}
	
function flippedCards(symbol) {
	flippedCounter.push(symbol);
	console.log(flippedCounter);
	if (flippedCounter.length === 2) {
		//TODO increace counter by one.
		if (flippedCounter[0] === flippedCounter[1]) {
			pairMatch();
		} else {
			pairUnMatch();
		}
	}
}
	
function pairMatch() {
	console.log('cards match');
}	

function pairUnMatch() {
	console.log('cards do not match');
}

//add event listener for each card in cards array
cards.forEach(function(card, index) {
	card.setAttribute('id', index);
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