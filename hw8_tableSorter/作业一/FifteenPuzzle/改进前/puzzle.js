var player = {
	inGame: false,
	steps: 0,
	arr: [[],[],[],[]],
	puzzleBlocks: null,
	tip: null
}



function setPuzzleArea() {  // set puzzles for puzzle_area
	var frag = document.createDocumentFragment();
	var row, col, index;
	for (row = 0; row < 4; row ++)
	{
		for (col = 0; col < 4; col ++)
		{
			var puzzleBlock = document.createElement("div");
			index = row * 4 + col + 1;

			puzzleBlock.id = "b" + index;

			puzzleBlock.className = "puzzle_block";

			puzzleBlock.className += (" pos" + index);
		
			frag.appendChild(puzzleBlock);
		}
	}
	this.appendChild(frag);
}

function moveBlock() {  // determine and execute the moving of blocks
	var this_index = parseInt(this.className.substring(16)) - 1;
	if ((_row + 1 <= 3 && this_index == (_row + 1) * 4 + _col )||
		(_row - 1 >= 0 && this_index == (_row - 1) * 4 + _col) ||
		(_col - 1 >= 0 && this_index == _row * 4 + (_col - 1)) ||
		(_col + 1 <= 3 && this_index == _row * 4 + (_col + 1))) {
		
		var temp = this.className;
		this.className = white.className;
		white.className = temp;

		player.steps++;
	}
	
	update();
}

function update() {  // update the information of the blocks
	white = document.getElementById("b16");
	_index = parseInt(white.className.substring(16));
	_col = (_index - 1) % 4;
	_row = parseInt((_index - 1) / 4);
	player.puzzleBlocks = document.getElementsByClassName("puzzle_block");

	var idx;
	for (idx = 0; idx < player.puzzleBlocks.length; idx ++)
	{
		player.puzzleBlocks[idx].onclick = moveBlock;
	}

	player.tip.textContent = "Steps: " + player.steps;
}

function swapEle(r1, c1, r2, c2) {  // swap 2 blocks when shuffle blocks
	var temp;
	temp = player.arr[r1][c1];
	player.arr[r1][c1] = player.arr[r2][c2];
	player.arr[r2][c2] = temp;
}

function shuffleBlocks() {  // shuffle blocks
	player.steps = 0;
	player.inGame = true;
	var row, col;
	for (row = 0; row < 4; row ++) {
		for (col = 0; col < 4; col ++) {
			player.arr[row][col] = row * 4 + col + 1;
		}
	}
	
	var whiteR = 3, whiteC = 3;
	var randTimes = 1000;
	/* 
	here we take 1000 random player.steps to shuffle the blocks
	 */
	while (randTimes--) {
		switch(Math.floor(Math.random() * 4)) {
			case 0:
				if (whiteR - 1 >= 0) {
					swapEle(whiteR, whiteC, whiteR - 1, whiteC);
					whiteR--;
				}
				break;
			case 1:
				if (whiteR + 1 <= 3) {
					swapEle(whiteR, whiteC, whiteR + 1, whiteC);
					whiteR++;
				}
				break;
			case 2:
				if (whiteC - 1 >= 0) {
					swapEle(whiteR, whiteC, whiteR, whiteC - 1);
					whiteC--;
				}
				break;
			case 3:
				if (whiteC + 1 <= 3) {
					swapEle(whiteR, whiteC, whiteR, whiteC + 1);
					whiteC++;
				}
				break;
		}
	}
	
	player.puzzleBlocks = document.getElementsByClassName("puzzle_block");
	for (row = 0; row < 4; row ++) {
		for (col = 0; col < 4; col ++) {
			player.puzzleBlocks[row * 4 + col].className = "puzzle_block pos" + (player.arr[row][col]);
		}
	}

	update();
}

function submitResult() {  // deal with the result submitted by players and determine wether he win or not
	if (!player.inGame) return;
	var idx;
	var flag = true;
	player.puzzleBlocks = document.getElementsByClassName("puzzle_block");
	for (idx = 0; idx < 16; idx ++) {
		if (idx + 1 != parseInt(player.puzzleBlocks[idx].className.substring(16))) {
			flag = false;
			break;
		}
	}
	if (flag) {
		player.tip.textContent = "You win! Your steps are " + player.steps;
		player.inGame = false;
	} else {
		player.tip.textContent = "The game is still unfinished!";
	}
}

window.onload = function() {
	var puzzleArea = document.getElementById("puzzle_area");
	setPuzzleArea.call(puzzle_area);
	var shuffle = document.getElementById("shuffle_button");
	var submit = document.getElementById("submit_button");
	player.tip = document.getElementById("tip");
	player.tip.textContent = "Click 'shuffle' to start";
	shuffle.onclick = shuffleBlocks;
	submit.onclick = submitResult;
}
