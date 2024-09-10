var gameboard = {};
//	playerID = 1;
//	wumpusID = 2;
//	bat1ID = 3;
//	bat2ID = 4;
//	pit1ID = 5;
//	pit2ID = 6;
//  golden treasure = 7
var arrows = 8;
var moves = 100;

init();

function init() {
	gameboard[1] = 23;
	gameboard[7] = 3;
	gameboard[2] = getRandomEmptySquare();
	gameboard[3] = getRandomEmptySquare();
	gameboard[4] = getRandomEmptySquare();
	gameboard[5] = getRandomEmptySquare();
	gameboard[6] = getRandomEmptySquare();
	
	document.getElementById('room-3').style.backgroundColor = 'gold';
	document.getElementById('room-23').style.backgroundColor = 'orange';
	document.getElementById('feedback-3').innerHTML = ("Du har " + arrows + " pilar");
	document.getElementById('feedback-4').innerHTML = ('Score ' + moves); 
	checkRoom();
}

window.addEventListener('keydown', function(direction) { walk (direction); });

function walk(direction){
	document.getElementById('feedback').innerHTML = ("");
	switch(direction.keyCode) {
		//gå höger
		case 39:
			if(gameboard[1] % 5 == 0){
				feedback("Du är redan längst till höger");
			} else {
				move(gameboard[1]+1);				
			}
			break;
		//gå vänster
		case 37:
			if((gameboard[1] -1) % 5 != 0){
				move(gameboard[1]-1);
			} else {
				feedback("Du är redan längst till vänster");	
			}
			break;
		//gå upp
		case 38:
			if((gameboard[1] -5) > 0){
				move(gameboard[1]-5);	
			} else {
				cfeedback("Du kan inte gå högre");	
			}
			break;
		//gå ner
		case 40:
			if((gameboard[1] +5) <= (25)){
				move(gameboard[1]+5);
			} 
			else {
				feedback("Du är redan längst ner");	
			}
			break;
	}
	checkRoom();
	score();
}

function getRandomEmptySquare(){
	while(true){		
		var x = Math.floor(Math.random() * 25) + 1;//Här görs spelplanen
		if((gameboard[1] != x) &&
		(gameboard[2] != x) &&
		(gameboard[3] != x) &&
		(gameboard[4] != x) &&
		(gameboard[5] != x) &&
		(gameboard[6] != x) &&
		(gameboard[7] != x))
			return x;
	}
}

function isSquareEmpty(squareNum){
	for(var i in gameboard){ 
		if(squareNum == gameboard[i]) {
			return false;//rutan FINNS! i arrayen
		}
	}
	return true;// rutan finns INTE! i arrayen
}

function move(to){
	if(isSquareEmpty(to)){
		updateUI(gameboard[1], to);//färgar dit playern ska
		gameboard[1] = to;// lagrar ny positionen
	}
	else{
		if(to == gameboard[2]){
			redroom(gameboard[1], to);
			alert("Du är döööööööd!! Wupus åt dig.");
			newGame();
		}
		else if((to == gameboard[3]) || (to == gameboard[4])){
			alert("Fladermusen tar dig till en annan plats i grottan");
			var newroom = getRandomEmptySquare();
			updateUI(gameboard[1], newroom); 
			gameboard[1] = newroom; 			
		}
		else if(to == gameboard[7]) {
			gameboard[7] = 0;
			updateUI(gameboard[1], to);
			gameboard[1] = to;
			moves = moves + 20;
		}
		else {
			document.getElementById('room-' + gameboard[1]).style.backgroundColor = 'lightgreen';
			document.getElementById('room-' + to).style.backgroundColor = 'red';
			alert("Du trillar och gör dig jätteilla typ dör");
			newGame();
		}
	}	
}

function checkRoom(){
	if(gameboard[1] % 5 != 0) {
		//check right
		if(gameboard[1] + 1 == gameboard[2]){
			feedback("Det luktar Wumpus!");
		} else if ((gameboard[1] + 1 == gameboard[3]) || (gameboard[1] + 1 == gameboard[4])){
			feedback("Du hör vingslag!");
		} else if ((gameboard[1] + 1 == gameboard[5]) || (gameboard[1] + 1 == gameboard[6])){
			feedback("Det blåser från en avgrund!");
		}
	}
	if((gameboard[1] - 1) % 5 != 0) {
		//check left
		if(gameboard[1] - 1 == gameboard[2]){
			feedback("Det luktar Wumpus!");
		} else if ((gameboard[1] - 1 == gameboard[3]) || (gameboard[1] - 1 == gameboard[4])){
			feedback("Du hör vingslag!");
		} else if ((gameboard[1] - 1 == gameboard[5]) || (gameboard[1] - 1 == gameboard[6])){
			feedback("Det blåser från en avgrund!");
		}
	}
	if((gameboard[1] - 5) > 0) {
		//check up
		if(gameboard[1] - 5 == gameboard[2]){
			feedback("Det luktar Wumpus!");
		} else if ((gameboard[1] - 5 == gameboard[3]) || (gameboard[1] - 5 == gameboard[4])){
			feedback("Du hör vingslag!");
		} else if ((gameboard[1] - 5 == gameboard[5]) || (gameboard[1] -5 == gameboard[6])){
			feedback("Det blåser från en avgrund!");
		}
	}
	if((gameboard[1] + 5) <= 25) {
		//check down
		if(gameboard[1] + 5 == gameboard[2]){
			feedback("Det luktar Wumpus!");
		} else if ((gameboard[1] + 5 == gameboard[3]) || (gameboard[1] + 5 == gameboard[4])){
			feedback("Du hör vingslag!");
		} else if ((gameboard[1] + 5 == gameboard[5]) || (gameboard[1] + 5 == gameboard[6])){
			feedback("Det blåser från en avgrund!");
		}
	}
}

window.addEventListener('keydown', function(aim) { shoot (aim); });
function shoot(aim){
	if(arrows > 0){
		var hit = false
		switch(aim.keyCode){
			case 68:
				if(gameboard[1] % 5 != 0){
					if((gameboard[1] +1) == (gameboard[2])){
						hit = true;
					} else{
						miss();
					}
				} else{
					feedback("Sorry borry du kan inte skjuta in i väggen");
				}
				break;
			case 65:
				if((gameboard[1] - 1) % 5 != 0){
					if((gameboard[1] -1) == gameboard[2]){
						hit = true;
					} else{
						miss();
					}
				} else{
					feedback("Du kan inte skjuta in i väggen");
				}
				break;
			case 87:
				if((gameboard[1] - 5) > 0){
					if((gameboard[1] -5) == gameboard[2]){
						hit = true; 
					} else{
						miss();
					}
				} else{
					feedback("Du kan inte skjuta in i väggen");
				}
				break;
			case 83:
				if((gameboard[1] + 5) < 26){
					if((gameboard[1] +5) == gameboard[2]){
						hit = true;
					} else{
						miss();
					}
				} else{
					feedback("Du kan inte skjuta in i väggen");
				}
				break;
		}
		
		if (hit == true){
			alert("TRÄFF!!! Du mulade Wupus, du är ett grymt hen \n Score " + moves);
			newGame();
		}
		
	} else {
		alert("Torsk, dina pilar är slut!");
		newGame();
	}
}	

function updateUI(oldroom, newroom){
		document.getElementById('room-' + oldroom).style.backgroundColor = 'lightgreen';
		var x = window.innerWidth;
			if (x < 321){
				document.getElementById('room-' + oldroom).style.backgroundColor = '#cecece';
			}
		document.getElementById('room-' + newroom).style.backgroundColor = 'orange';	
}	

function miss(){
	feedback("MISS! Wumpus flyttar sig!");
	arrows--;
	score();
	document.getElementById('feedback-3').innerHTML = ("Du har " + arrows + " pilar kvar"); 
	gameboard[2] = getRandomEmptySquare();
}

function newGame(){
	playAgain = confirm("Vill du spela igen?");
	if (playAgain == true) {
	location.reload();		
	}	
}

function redroom(greyroom, to){
	document.getElementById('room-' + greyroom).style.backgroundColor = '#cecece';
	document.getElementById('room-' + to).style.backgroundColor = 'red';
}

function score(){
	moves --;
	document.getElementById('feedback-4').innerHTML = ('Score ' + moves);
}

function feedback(t1) { 
    var text = document.getElementById('feedback'); 
    text.innerHTML = text.innerHTML + t1 + "<br/>" + "<br/>"; //för att man ska kunna ta in flera varningar samtidigt
}