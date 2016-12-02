/// <reference path="jquery.js">
/// <reference path="lodash.js">
(function() {
	$(function() { new Maze(); });

	var Maze = function() {
		this.listenWin();
		this.listenStart();
		this.listenCheat();
		this.listenLose();
	}

	var mz = Maze.prototype;

	mz.listenStart = function() {
		$('#start_block').mouseover(function(event) {
			this.reset();
		}.bind(this));
	}

	mz.reset = function() {
		this.cheated = true;
		this.inGame = true;
		this.changeCursor();
		this.resetWall();
		this.setResultTip(0);
	}

	mz.changeCursor = function() {
		var that = this;
		$('body').css('cursor', that.inGame ? 'pointer' : 'default');
	}

	mz.resetWall = function() {
		$('.wall').attr('class', 'wall');
	}

	mz.setResultTip = function(choice) {
		if (choice == -1) {
			$('#result_tip').html("You lose");
		} else if (choice == 0) {
			$('#result_tip').html("");
		} else if (choice == 1) {
			$('#result_tip').html("You win");			
		} else if (choice == 2) {
			$('#result_tip').html("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");			
		}
	}

	mz.listenWin = function() {
		$('#end_block').mouseover(function(event) {
			if (this.inGame) {
				this.end();
				if (this.cheated) {
					this.setResultTip(2);
				} else {
					this.setResultTip(1);
				}
			}
		}.bind(this));
	}

	mz.end = function() {
		if (this.inGame) {
			this.inGame = false;
			this.changeCursor();
		}
	}

	mz.listenLose = function() {
		$('#maze_area .wall').mouseover(function(event) {
			if (this.inGame) {
				console.log(event.target);
				$(event.target).attr('class', 'wall lose_wall');
				this.setResultTip(-1);
				this.end();
			}
		}.bind(this));
	}

	mz.listenCheat = function() {
		$('#test_cheat_div').mouseover(function(event) {
			if (this.inGame) this.cheated = false;
		}.bind(this));
	}

})();