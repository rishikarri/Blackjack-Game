// ------------------------------------------
// --------------GLOBALS---------------------
// ------------------------------------------
var theDeck = [];

$(document).ready(function(){



	//Get a deal working
	$(".deal-button").click(function(){
		console.log(this);
		// Need a way to make the deck
		createDeck(); 

	});

	$(".hit-button").click(function(){
		console.log(this);	
	});

	$(".stand-button").click(function(){
		console.log(this);
	})
});

function createDeck(){
	// Fill the deck with 52 cards 
	// -4 suits (h,s,d,c)
	// -- 1-13 (11 = j, 12 = q, 13 = K)
	// Loop through all four suits (suits array)
	suits = ["h", "s", "d", "c"];
	for (let s = 0; s < suits.length; s++){
		// loop through all 13 cards for each suits
		for(let c = 1; c <= 13; c++){
			theDeck.push(c+suits[s]);
			console.log(theDeck);
		}
	}
}

function shuffleDeck(){
	
}