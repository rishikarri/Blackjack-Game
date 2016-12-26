// -------------------------------------------------
// ------------------GLOBALS------------------------
// -------------------------------------------------


const freshDeck = createDeck(); 
var theDeck = freshDeck;
var playersHand = []; 
var dealersHand = [];
var topOfDeck = 4;



// no named function =>
// load this after the dom is ready
$(document).ready(function(){
	$(".deal-button").click(function(){
		// deck is already created when javascript loads
		//next we have to shuffle the deck
		shuffleDeck();

		// give the player the first and third card
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		

		// place the PLAYER's first two cards in the DOM
		placeCard("player", 1, playersHand[0]);
		placeCard("player", 2, playersHand[1]);

		// place the first two DEALER's cards in teh DOM 

		placeCard("dealer", 1, dealersHand[0]);
		placeCard("dealer", 2, dealersHand[1]);

		calculateTotal(dealersHand, "dealer");
		calculateTotal(playersHand, "player");

		// Target deal button and disable until reset is called
		$(".deal-button").attr("disabled", true);
		$(".deal-button").addClass(" disabled");
		$(".deal-button").removeClass("btn-primary");						
	})

	$(".hit-button").click(function(){
		// define cardDrawn so that the same card is used
		cardDrawn = theDeck.shift();
		// push it to the player array
		playersHand.push(cardDrawn);

		// now when I calculate total, it's as if I drew a card, only draw the card if it's not a bust
		if(calculateTotal(playersHand, "player") > 21){
			checkWin();
			var lastCardIndex = playersHand.length - 1;
			placeCard("player", playersHand.length, playersHand[lastCardIndex]);

			// now disable button because the player lost
			$(".hit-button").attr("disabled", true);
			$(".hit-button").addClass(" disabled");
			$(".hit-button").removeClass("btn-success");						
		}else if(calculateTotal(playersHand, "player") <= 21){
			// playersHand.push(theDeck.shift());
			var lastCardIndex = playersHand.length - 1;
			placeCard("player", playersHand.length, playersHand[lastCardIndex]);
			calculateTotal(playersHand, "player");
		}	
		// push the new card to player's hand
		// code for dealer's response
		// dealersHand.push(theDeck.shift());


		// place it in the DOM
	})

	$(".stand-button").click(function(){
		// Nothing happens to the player, control now goes to the dealer 

		dealerTotal = calculateTotal(dealersHand, "dealer");
		while(dealerTotal < 17){
			// dealer has less than 17...hit away!
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length -1; 
			var slotForNewCard = dealersHand.length;
			placeCard("dealer", slotForNewCard, dealersHand[lastCardIndex]);
			dealerTotal = calculateTotal(dealersHand, "dealer");
		}

		//Dealer has 17 or more, player hit stand

		checkWin(); 

	})

	$("#resetButton").click(function(){
		reset();
	})


});

function checkWin(){
	var playerTotal = calculateTotal(playersHand, "player");
	var dealerTotal = calculateTotal(dealersHand, "dealer") + cardValueOmmitted;
	console.log("dealer Total is" + dealerTotal);

	// player has more than 21, Player busts and loses

	if (playerTotal > 21){
		// Player busted put a message in the DOM
		//we will get to the second condition if the player has not busted
		$(".player-total").html("BUST!"); 
		$("#spaceForText").html("Sorry :............(   YOU LOST!");

	}else if(dealerTotal > 21){
		// player safe, dealer busts
		$(".dealer-total").html("BUST!");
		$("#spaceForText").html("YOU WIN!!!!!!!");
	}else{
		// no one busted, see who won
		if (playerTotal > dealerTotal){
			$("#spaceForText").html("YOU WIN!!!!!!!");
		}else if(playerTotal < dealerTotal){
			$("#spaceForText").html("Sorry :............(   YOU LOST!");
		}else{
			// tie
			$("#spaceForText").html("Tie!...PUSH!");

		}
	}

	// disable all buttons; 
	$(".hit-button").attr("disabled", true);
	$(".hit-button").addClass(" disabled");
	$(".hit-button").removeClass("btn-success");

	$(".deal-button").attr("disabled", true);
	$(".deal-button").addClass(" disabled");
	$(".deal-button").removeClass("btn-primary");												

	$(".stand-button").attr("disabled", true);
	$(".stand-button").addClass(" disabled");
	$(".stand-button").removeClass("btn-danger");												
}

function reset(){
	theDeck = freshDeck;
	playersHand = [];
	dealersHand = [];

	//reset the DOM 
	// empty every single card
	$(".card").html("");

	// hands are empty so calculate 0 now
	calculateTotal(playersHand, "player");
	calculateTotal(dealersHand, "dealer");

	//enable Deal button again
	$(".deal-button").attr("disabled", false);
	$(".deal-button").addClass(" btn-primary");
	$(".deal-button").removeClass("disabled");	

	//enable Hit button again
	$(".hit-button").attr("disabled", false);
	$(".hit-button").addClass("btn-success");
	$(".hit-button").removeClass(" disabled");

	//re-enable the stand button
	$(".stand-button").attr("disabled", false);
	$(".stand-button").addClass("btn-danger");
	$(".stand-button").removeClass(" disabled");							

	//clear text that talks to user 	
	$("#spaceForText").html("&nbsp");
	$(".dealer-total").html('Dealer Total: <span class="dealer-total-number">0</span>');
	$(".player-total").html('Player Total: <span class="player-total-number">0</span>');				

}

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
	return newDeck;
}

//shuffle the deck so it is not in order
function shuffleDeck(){
	// create two random numbers between 0 and 51 and swap the locations of the cards located at those two spots in the deck
	//shuffle the deck 989 times 
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

	// physically change the html so that it has an image in it

	//logic for dealer's card here

	// if it is the second dealer card then show the back
	// placeCard("dealer", 2, dealersHand[1]);
	if(who === "dealer" && where === 2){
		$(classSelector).html('<img src="Images/cards/deck.png">');

	}else{
		$(classSelector).html('<img src="Images/cards/'+ whatCard + '.png">');						
	}
	
}

function calculateTotal(hand, who){
	var total = 0; 
	var dealerTotalDisplay = 0;

	var cardValue = 0; //temp var for value of current card 
	var ace = false;

	for (let i = 0; i < hand.length; i++){
		//program Ace Logic
		//if the card is an ace
		// if this is the second dealer card, don't add it to the total	
		if(who === "dealer" && i == 1){
			
			// console.log("second card");
			// console.log(hand[i].slice(0,-1));
			total -= Number(hand[i].slice(0,-1));
			cardValueOmmitted = Number(hand[i].slice(0,-1));
		}
		if(hand[i].slice(0,-1) === "1"){
			//we have an ace
			if((total + 11) >21){
				//if the player/dealer busts, the card is 1 otherwise it's 11
				cardValue = 1;
			}else{
				cardValue = 11;
			}
		}else{
			cardValue = Number(hand[i].slice(0,-1));//copy the first character all the way to the end with the exdception of the last character 
			if(cardValue > 10){
				cardValue = 10;
			}	
		}
		total+=cardValue;
	}
	var classSelector = "." + who + "-total-number"; 

	$(classSelector).text(total);
	return total;
}