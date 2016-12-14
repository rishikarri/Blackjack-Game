// -------------------------------------------------
// ------------------GLOBALS------------------------
// -------------------------------------------------



var theDeck = createDeck();
var playersHand = []; 
var dealersHand = [];


// no named function =>
// load this after the dom is ready
$(document).ready(function(){
	$(".deal-button").click(function(){
		// deck is already created when javascript loads
		//next we have to shuffle the deck
		shuffleDeck();

		// give the player the first and third card
		playersHand.push(theDeck[0]);
		playersHand.push(theDeck[2]);

		dealersHand.push(theDeck[1]);
		dealersHand.push(theDeck[3]);

		// place the PLAYER's first two cards in the DOM
		placeCard("player", "one", playersHand[0]);
		placeCard("player", "two", playersHand[1]);

		// place the first two DEALER's cards in teh DOM 

		placeCard("dealer", "one", dealersHand[0]);
		placeCard("dealer", "two", dealersHand[1]);

	})

	$(".hit-button").click(function(){
		
	})

	$(".stand-button").click(function(){
		
	})


});

function createDeck(){
	var suits = ["h", "s", "d", "c"];
	var newDeck = []

	// suits / outer loop
	for(let s = 0; s < suits.length; s++){
		// card values / inner loop
		for(c = 1; c <= 13; c++){
			newDeck.push(c+suits[s]);
		}
	}
	// console.log(newDeck);
	return newDeck;
}

//shuffle the deck so it is not in order
function shuffleDeck(){
	// create two random numbers between 0 and 51 and swap the locations of the cards located at those two spots in the deck

	for (let i = 0; i < 989; i++){


		var randomNumber1 = Math.floor(Math.random() * theDeck.length); 
		var randomNumber2 = Math.floor(Math.random() * theDeck.length);

		var firstCardToSwitch = theDeck[randomNumber1];
		var secondCardToSwitch = theDeck[randomNumber2];
		var temp  = firstCardToSwitch;//hold the first card because it's about to get overwritten

		
		theDeck[randomNumber2] = firstCardToSwitch;
		theDeck[randomNumber1] = secondCardToSwitch;
	}
}

//place the card in the dom

function placeCard(who, where, whatCard){
	//get the class we want to target
	var classSelector = "." + who + "-cards .card-" + where; 
	console.log(classSelector);	

	// physically change the html so that it has an image in it
	$(classSelector).html('<img src="Images/cards/'+ whatCard + '.png">');					
}