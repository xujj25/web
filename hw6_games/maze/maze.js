var in_game = false;
var cheated = true;
/* -------------------- basic operations -------------------- */
function change_cursor() {  // change the style of cursor when in game or game over
	document.body.style.cursor = (in_game ? "pointer" : "default");
}

function reset_wall() {  // reset the style of walls to default
	for (var index = 0; index < 5; index ++)
	{
		walls[index].className = "wall";
	}
}

function set_result_tip(choice) {  // set result tip for different choices
	switch (choice)
	{
		case -1:
			result_tip.textContent = "You lose";
			break;
		case 0:
			result_tip.textContent = "";
			break;
		case 1:
			result_tip.textContent = "You win";
			break;
		case 2:
			result_tip.textContent = 
				"Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
			break;
	}
}

function reset() {  // reset all the elements and bool values
	cheated = true;
	in_game = true;
	change_cursor();
	reset_wall();
	set_result_tip(0);
}
/*-------------------- control operations --------------------*/
function start() {  // start the game
	reset();
}

function end() {  // end the game
	if (in_game){
		in_game = false;
		change_cursor();
	}
}

function win() {  // determine wether the player won without cheating
	if (in_game) {
		end();
		if (cheated) {
			set_result_tip(2);
		} else {
			set_result_tip(1);
		}
	}
}

function lose() {  // determine loss
	if (in_game) {
		this.className = "wall lose_wall";
		set_result_tip(-1);
		end();
	}
}

function not_cheat() {  // determine wether the player has cheated before winning
	if (in_game)
		cheated = false;
}
/* -------------------- get elements from the web pages -------------------- */
window.onload = function() {

	document.getElementById("end_block").onmouseover = win;

	document.getElementById("start_block").onmouseover = start;

	document.getElementById("test_cheat_div").onmouseout = not_cheat;

	result_tip = document.getElementById("result_tip");

	walls = document.getElementsByClassName("wall");
	for (var index = 0; index < 5; index ++)
	{
		walls[index].onmouseover = lose;
	}
}
