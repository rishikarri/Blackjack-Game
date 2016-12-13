// ------------------------------------------
// --------------GLOBALS---------------------
// ------------------------------------------
// Create the deck and shuffle it
var theDeck = [];
var playersHand = [];
var dealersHand = [];
createDeck();

$(document).ready(function(){



	//Get a deal working
	$(".deal-button").click(function(){
		console.log(this);
		// Need a way to make the deck
		shuffleDeck();

		// Add card 0 to players hand, add card 1 to the dealer's hand, add card 2 to the player's hand and add card 3 to the dealer face down
		playersHand.push(theDeck[0]);
		dealersHand.push(theDeck[1]);
		playersHand.push(theDeck[2]);
		dealersHand.push(theDeck[3]);

		placeCard(playersHand[0], "player", "one");

		placeCard(playersHand[1], "player", "two");

		placeCard(dealersHand[0], "dealer", "one");

		placeCard(dealersHand[1], "dealer", "two");

		calculateTotal("player", playersHand);
		calculateTotal("dealer", dealersHand);

	});

	$(".hit-button").click(function(){
		console.log(this);	
	});

	$(".stand-button").click(function(){
		console.log(this);
	})
});

function createDeck(){
	// clear the deck before creating a new one
	// Fill the deck with 52 cards 
	// -4 suits (h,s,d,c)
	// -- 1-13 (11 = j, 12 = q, 13 = K)
	// Loop through all four suits (suits array)
	suits = ["h", "s", "d", "c"];
	for (let s = 0; s < suits.length; s++){
		// loop through all 13 cards for each suits
		for(let c = 1; c <= 13; c++){
			theDeck.push(c+suits[s]);
			
		}
	}
}

function placeCard(whatCard, who, whichSlot){

	var classToTarget = "."+who+"-cards .card-" + whichSlot; //could be .dealer-cards or .player-cards
	console.log(classToTarget);
	// classToTarget = String(classToTarget);

	$(classToTarget).html(whatCard);

	$(classToTarget).html('<img src="images/cards/'+whatCard+'.png">');

	// var dealerCardOne = $(".dcard-one");
	// var dealerCardTwo = $(".dcard-two");

	// var playerCardOne = $(".pcard-one");
	// var playerCardTwo = $(".pcard-two");	

	// console.log(dealerCardOne, dealerCardTwo, playerCardOne, playerCardTwo);
	// var topCard = theDeck[0];
	// var secondCard = theDeck[1];

	// // generate string version of card

	// topCardImage = "<img src='Images/cards/"+topCard+".png"+"'"+">";
	// console.log(topCardImage);
	// dealerCardOne.html(topCardImage);

	// delete top card after you hand it out


}


function calculateTotal(who, theirHand){
	var cardValue = 0; 
	var total = 0; 
	for(let i = 0; i < theirHand.length; i++){
		cardValue = Number(theirHand[i].slice(0, -1)); //start at the beginning and go until the end but not the last one
		console.log(cardValue);
		total+=cardValue;
	}
	var classToTarget = "."+who+"-total-number"; 
	console.log(classToTarget);
	$(classToTarget).html(total);
}

function shuffleDeck(){
	//grab two cards and swap them 1000 times 
	for (let i = 0; i < 900; i++){
		let randomNumber1 = Math.floor(Math.random()*theDeck.length); 
		let randomNumber2 = Math.floor(Math.random()*theDeck.length); 

		
		
		
		var temp = theDeck[randomNumber1];
		// console.log(randomNumber1, randomNumber2, temp);

		theDeck[randomNumber1] = theDeck[randomNumber2];
		theDeck[randomNumber2] = temp;
		
	}	

}