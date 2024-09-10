
var x = window.innerWidth;
if (x < 1025){
	var mobileButton = document.getElementById("buttonHolder");
	mobileButton.style.visibility = 'visible';
}

var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i += 1) {
    buttons[i].onclick = function(e) {
    	document.getElementById('feedback').innerHTML = ("");
	    if(arrows > 0){
			var hit = false   
			switch(this.id) {
				case 'left' :
					if((gameboard[1] -1) % 5 != 0){
						move(gameboard[1]-1);
					} else {
						feedback("Du är redan längst till vänster");	
					}
					break;
	        	case 'up' :
	        		if((gameboard[1] -5) > 0){
						move(gameboard[1]-5);	
					} else {
						cfeedback("Du kan inte gå högre");	
					}
					break;
	        	case 'down' :
					if((gameboard[1] +5) <= (25)){
						move(gameboard[1]+5);
					} 
					else {
						feedback("Du är redan längst ner");	
					}
					break;
	        	case 'right' :
	        		if(gameboard[1] % 5 == 0){
						feedback("Du är redan längst till höger");
					} else {
						move(gameboard[1]+1);				
					}
					break;
				case 'aim-left':
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
				case 'aim-up':
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
				case 'aim-down':
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
				case 'aim-right':
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
	        }
	        checkRoom();
			score();
	        if (hit == true){
				alert("TRÄFF!!! Du mulade Wumpus, du är ett grymt hen \n Score " + moves);
				newGame();
			}
	    } else {
		alert("Torsk, dina pilar är slut!");
		newGame();
		}
	}
}