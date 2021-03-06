//nextElementSibling polyfill
(function (arr) {
	arr.forEach(function (item) {
	  if (item.hasOwnProperty('nextElementSibling')) {
		return;
	  }
	  Object.defineProperty(item, 'nextElementSibling', {
		configurable: true,
		enumerable: true,
		get: function () {
		  var el = this;
		  while (el = el.nextSibling) {
			if (el.nodeType === 1) {
				return el;
			}
		  }
		  return null;
		},
		set: undefined
	  });
	});
  })([Element.prototype, CharacterData.prototype]);


//get cards with class name card and make array called cards
const ALL_CARDS = document.getElementsByClassName('card');
const CARDS = [...ALL_CARDS];
// array that holds all card symbols by class name
let cardSymbols = [];
let flippedCards = [];
//get container that contains the cards
const BOARD = document.querySelector('.board');

//flipped card counter
let flippedCardCount = 0;

//get counter element
const COUNTER = document.querySelector('.counter');

//initialize move counter by 0 at start of game
let moves = 0;

//get star elements and insert into stars array
const ALL_STARS = document.getElementsByClassName('star');
const STARS = [...ALL_STARS];

//get modal elements
const MODAL = document.getElementById('modal');
const MODAL_OVERLAY = document.getElementById('modalOverlay');

//set timer variables
let startTime, endTime, totalTime;


let cardClick = function(e) {

	console.log(e.target);
	
	let symbol = e.target.nextElementSibling.firstChild.className; //get symbols of clicked card
	
	this.classList.toggle('flipped');
	
	cardSymbols.push(symbol);

	//insert selected cards into array to allow change class if matched or mismatched
	flippedCards.push(this);

	compareCards();
	
	if (moves === 0) {
		startTime = new Date();
	}
}
	
function compareCards() {

	if (flippedCards.length === 2) {
		
		//disable all other cards when only two are flipped
		CARDS.forEach(function(card) {
			card.classList.add('disabled');
		})
		moveCounter() //increase move counter by one
		
		if (cardSymbols[0] === cardSymbols[1]) {
			pairMatch();
		} else {
			pairMismatch();
		}
		
	}
}

	
function pairMatch() {
	//if cards match give them the matched card class
	//which disables the pointer
	flippedCards[0].classList.add('matched-card');
	flippedCards[1].classList.add('matched-card');
	//and remove the disabled class
	CARDS.forEach(function(card) {
		card.classList.remove('disabled');
	})
	
	flippedCards = [];
	cardSymbols =[];
	flippedCardCount = flippedCardCount + 2;
	
	if (flippedCardCount === 16) {
		congratulationsModal();
		endTime = new Date();
		totalTime = endTime - startTime;
		totalTime /= 1000;
		totalTime = Math.round(totalTime);
	}
}

function pairMismatch() {
	setTimeout(function() {
		flippedCards[0].classList.toggle('flipped');
		flippedCards[1].classList.toggle('flipped');
		flippedCards = [];
		cardSymbols =[];
		//when two compared cards don't match then re-enable all cards but leaves matched cards disabled
		CARDS.forEach(function(card) {
			card.classList.toggle('disabled');
		})
		
	}, 900);
	
}

//increase the moves counter by 1 after every two cards flipped over
function moveCounter() {
	moves++;
	COUNTER.innerHTML = 'Moves: ' + moves;
	
	if (moves > 12 && moves <= 17) {
		STARS[2].style.visibility = "collapse";
	} else if (moves > 17) {
		STARS[1].style.visibility = "collapse";
	}

}

//add event listener for each card in cards array
CARDS.forEach(function(card, index) {

	card.addEventListener('click', cardClick)
	
});

//if Safari on iOS then use touch
window.onload = function() {
  if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
    document.body.addEventListener('touchstart', cardClick, false);
  }
};

//function to shuffle cards at on load and reset
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

function congratulationsModal() {
	setTimeout(function() {
		MODAL.style.display = "block";
		MODAL_OVERLAY.style.background = "black";
		MODAL_OVERLAY.style.display = "block";
		
		//display time taken to finish a game
		const TIME_DISPLAY = document.querySelector('.timer');
		TIME_DISPLAY.innerHTML = `You completed the game in a time of ${totalTime} seconds.`
		
		//display the amount of moves it took to complete the game
		const MOVES_DISPLAY = document.querySelector('.moves');
		MOVES_DISPLAY.innerHTML = `It took you ${moves} moves to comlete a round of Memory.`
		
		//display star rating
		const STAR_DISPLAY = document.querySelector('.rating');
		STARS.forEach(function(el) {
			STAR_DISPLAY.appendChild(el);
		
		})
		
		//display 'play again' button
		const PLAY_AGAIN = document.getElementById('playAgain');
			PLAY_AGAIN.addEventListener('click', function() {
				window.location.reload(true);
			})
		
	}, 1000)
	
	const MODAL_CLOSE = document.getElementById('modalClose');
	MODAL_CLOSE.addEventListener('click', function() {
		MODAL.style.display = "none";
		MODAL_OVERLAY.style.display = "none";
	});
}

//shuffle pack when page loads
window.addEventListener('load', function() {
	
	const PACK = shuffle(CARDS);
	
	for (let i = 0; i < PACK.length; i++) {
		[].forEach.call(PACK, function(item) {
			BOARD.appendChild(item);
		});
	}
	
	COUNTER.innerHTML = 'Moves: 0';
	
	//get reset button and attach window reload when clicked
	reset = document.querySelector('.reset');
	reset.addEventListener('mousedown', function() {
		window.location.reload(true);
		reset.style.boxShadow = "inset 0px 0px 11px 0.2px rgba(0,0,0,0.6)"
	});
	
	
});
