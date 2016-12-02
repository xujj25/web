/// <reference path="jquery.js">
/// <reference path="lodash.js">
(function() {
	$(function() { new Puzzle(); });

	var Puzzle = function() {
		this.initialData();
		this.initialPuzzleArea();
		this.initialTipArea();
		this.listenShuffle();
		this.listenClickBlocks();
		this.listenSubmit();
	};

	var pz = Puzzle.prototype;

	pz.initialData = function() {
		this.inGame = false;
		this.steps = 0;
		this.mapArr = [[],[],[],[]];
	}

	pz.initialPuzzleArea = function() {
		var idx;
		for (idx = 0; idx < 16; idx ++)
			$('#puzzle_area').append("<div class='puzzle_block'></div>");
		$('.puzzle_block').each(function(index) {
			$(this).attr('id', 'b' + (index + 1));
			$(this).addClass('pos' + (index + 1));
		});
	};

	pz.initialTipArea =  function() {
		$('#tip').html("Click 'shuffle' to start");
	};

	pz.shuffleInitial = function() {
		this.inGame = true;
		this.steps = 0;
		var row, col;
		for (row = 0; row < 4; row ++)
		for (col = 0; col < 4; col ++) {
			this.mapArr[row][col] = row * 4 + col + 1;
		}
	};

	pz.swapMapArrElement = function(row1, col1, row2, col2) {
		this.mapArr[row1][col1] ^= this.mapArr[row2][col2];
		this.mapArr[row2][col2] ^= this.mapArr[row1][col1];
		this.mapArr[row1][col1] ^= this.mapArr[row2][col2];
	}

	pz.shuffle = function() {
		var blankRow = 3, blankCol = 3, randomTimes = 1000, random = 0;
		while (randomTimes--) {
			random = Math.floor(Math.random() * 4);
			if (random == 0 && blankRow - 1 >= 0) {
				this.swapMapArrElement(blankRow, blankCol, --blankRow, blankCol);
			} else if (random == 1 && blankRow + 1 <= 3) {
				this.swapMapArrElement(blankRow, blankCol, ++blankRow, blankCol);
			} else if (random == 2 && blankCol - 1 >= 0) {
				this.swapMapArrElement(blankRow, blankCol, blankRow, --blankCol);
			} else if (random == 3 && blankCol + 1 <= 3) {
				this.swapMapArrElement(blankRow, blankCol, blankRow, ++blankCol);
			}
		}
	};

	pz.updatePuzzle = function() {
		var that = this;
		$('.puzzle_block').each(function(index) {
			$(this).attr('class', 'puzzle_block pos' + that.mapArr[Math.floor(index / 4)][index % 4]);
		});
	};

	pz.moveBlock = function(idx, thisBlock) {
		var tempClassName;
		if ((this.blankRow + 1 <= 3 && idx == (this.blankRow + 1) * 4 + this.blankCol )||
			(this.blankRow - 1 >= 0 && idx == (this.blankRow - 1) * 4 + this.blankCol) ||
			(this.blankCol - 1 >= 0 && idx == this.blankRow * 4 + (this.blankCol - 1)) ||
			(this.blankCol + 1 <= 3 && idx == this.blankRow * 4 + (this.blankCol + 1))) {
			tempClassName = $(thisBlock).attr('class');
			$(thisBlock).attr('class', $('#b16').attr('class'));
			$('#b16').attr('class', tempClassName);
			this.steps++;
		}
		this.updateData();
	};

	pz.getBlockIdx = function(obj) {
		var tempClassName = $(obj).attr('class');
		return parseInt(tempClassName.substring(16)) - 1;
	};

	pz.updateData = function() {
		$('#tip').html("Steps: " + this.steps);
		this.blankIdx = this.getBlockIdx($('#b16'));
		this.blankRow = parseInt((this.blankIdx) / 4);
		this.blankCol = (this.blankIdx) % 4;
	};

	pz.listenClickBlocks = function() {
		var that = this;
		$('.puzzle_block').click(function() {
			if (that.isFinished()) return;
			that.moveBlock(that.getBlockIdx($(this)), this);			
		});
	};

	pz.listenShuffle = function() {
		var that = this;
		$('#shuffle_button').click(function() {
			that.shuffleInitial();
			that.shuffle();
			that.updatePuzzle();
			that.updateData();
		});
	};

	pz.isFinished = function() {
		var that = this;
		var flag = true;
		$('.puzzle_block').each(function(index) {
			if (that.getBlockIdx(this) != index) {
				flag = false;
				return false;
			}
		});
		return flag;
	};

	pz.listenSubmit = function() {
		var that = this;
		$('#submit_button').click(function() {
			if (!that.inGame) return;
			if(that.isFinished()) {
				$('#tip').html("You win! Your steps are " + that.steps);
			} else {
				$('#tip').html("The game is still unfinished!");
			}
		});
	};
})();