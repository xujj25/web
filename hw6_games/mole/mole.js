var player_data = {
	in_game: false,  // in game flag
	is_pause: false,  // pause flag
	random_pos: 0,  // random position of chozen mole going to be hit
	current_time: 0,  // current time left for playing
	current_score: 0,  // current score
	situation: ""
}

var timer;  // timer

/* --------------------output operations-------------------- */
function output_time() {  // output the current time
	time.value = player_data.current_time;
}

function output_score() {  // output the current score
	score.value = player_data.current_score;
}

function output_result() {  // output the playing situation
	result.value = player_data.situation;
}
/* --------------------timer operations-------------------- */
function run_timer() {  // run the game timer
	output_time();
	player_data.current_time--;
	if (player_data.current_time < 0) {
		game_over();
	}
}

function start_timer() {  // start the timer
	timer = self.setInterval("run_timer()", 1000);
}

function stop_timer() {  // stop the timer
	if (!player_data.in_game) {
		player_data.current_time = 0;
		output_time();
	}
	timer = window.clearInterval(timer);
}
/* --------------------moles operations-------------------- */
function make_moles() {  // draw all the moles on the web page
	var frag = document.createDocumentFragment();
	var row, col;
	for (row = 0; row < 6; row ++)
	{
		for (col = 0; col < 10; col ++)
		{
			var mole = document.createElement("button");
			mole.className = 'mole';
			frag.appendChild(mole);
		}
		if (row != 5)
		{
			var newlineCharactor = document.createElement("br");
			frag.appendChild(newlineCharactor);
		}
	}
	document.getElementById("mole_area").appendChild(frag);
}

function reset_moles() {  // reset all the moles
	moles[player_data.random_pos].className = "mole";
}

function set_mole() {  // set a mole to chozen situation
	if (player_data.in_game)
		reset_moles();
	player_data.random_pos = parseInt(Math.random() * 60);
	moles[player_data.random_pos].className = "mole chozen_mole";
}
/* --------------------playing operations-------------------- */
function hit() {  // get the hit operation of the player and dealing with it
	if (player_data.in_game && !player_data.is_pause) {
		if (this.className == "mole chozen_mole") {  // hit the correct position
			player_data.current_score++;
			output_score();
			set_mole();
		} else {  // hit the wrong position
			if (player_data.current_score > 0) {
				player_data.current_score--;
				output_score();
			}
		}
	}
}

function game_over() {  // set the game to gameover situation
	player_data.situation = "Game Over";
	output_result();
	alert("Game Over\nYour score: " + 
		(player_data.current_score == -1 ? 0 : player_data.current_score));
	player_data.in_game = false;
	stop_timer();
	reset_moles();
}

function start_game() {  // start game
	set_mole();
	if (!player_data.in_game){
		player_data.in_game = true;
		player_data.current_time = 30;
		player_data.current_score = 0;
		output_score();
	}
	start_timer();
	player_data.is_pause = false;
	player_data.situation = "Playing";
	output_result();
}

function stop_game() {  // pause game
	player_data.is_pause = true;
	stop_timer();

	if (player_data.situation == "Playing") {
		player_data.situation = "Stop";
		output_result();
	}
}

function start_and_stop() {  // dealing with the start_and_stop button operations
	if (player_data.in_game && !player_data.is_pause) {  // if playing and has not paused, pause
		stop_game();
	} else {  // if not playing or has paused, start
		start_game();
	}
}

/* --------------------get elements we need on the page-------------------- */
window.onload = function() {
	make_moles();
	moles = document.getElementsByClassName("mole");
	for (var index = 0; index < 60; index ++)
	{
		moles[index].onclick = hit;
	}

	start_and_stop_button = document.getElementById("start_and_stop");
	result = document.getElementById("result");
	time = document.getElementById("time");
	score = document.getElementById("score");

	start_and_stop_button.onclick = start_and_stop;
}