(function() {
	$(function() { new RingMenu(); });

	var RingMenu = function() {
		this.initial();
		this.listenButtonClick();
		this.listenLeave();
		this.listenResultGetting();
	}

	var rm = RingMenu.prototype;

	rm.xhrArr = new Array();

	rm.initial = function() {
		while (this.xhrArr.length > 0) {
			this.xhrArr.shift().abort();
		}
		this.begin = true;
		this.resetUnread();
		this.resetButton();
		this.resetResult();
	}

	rm.resetUnread = function() {
		$('.unread').html('...');
		$('.unread').hide();
	}

	rm.resetButton = function() {
		$('.button .button_letter_div').attr('class', 'button_letter_div abled_button');
	}

	rm.resetResult = function() {
		$('#calculation_result').html('');
	}

	rm.listenButtonClick = function() {
		var that = this;
		$('.button').click(function(event) {
			var parentButton = $(event.currentTarget);
			if (!(parentButton.find('.button_letter_div')).hasClass('disabled_button')) {
				parentButton.find('.unread').show();
				var thisClass = parentButton.attr('class');
				// that.disableSelfButton(parentButton.find('.unread'));
				that.changeButton(thisClass);
				that.ajaxRandomNumRequest(parentButton.find('.unread'));
			}
		});
	}

	rm.changeButton = function(thisClass) {
		$('.button').each(function(index, el) {
			if ($(this).attr('class') != thisClass) {
				$(this).find('.button_letter_div').attr('class', 'button_letter_div disabled_button');
			}
		});
	}

	rm.ajaxRandomNumRequest = function(unreadDiv) {
		var that = this;
		this.xhrArr.push($.ajax({
					url: 'randNumReq',
					success: function(data, status) {
						unreadDiv.html(data);
						// console.log(unreadDiv);
						unreadDiv.parents('.button').find('.button_letter_div').attr('class', 'button_letter_div disabled_button');
						that.enableOtherButtons();
					}
				}));
	}

	rm.enableOtherButtons = function() {
		$('.button').each(function() {
			if ($(this).find('.unread').html() == '...') {
				$(this).find('.button_letter_div').attr('class', 'button_letter_div abled_button');
			}
		});
	}

	rm.listenLeave = function() {
		var that = this;
		$('body').mouseout(function(event) {
			if($(event.target).attr('id') == 'at-plus-container')
				that.initial();
		});
	}

	rm.listenResultGetting = function() {
		var that = this;
		$('#info-bar').click(function(event) {
			console.log(event.target);
			if (that.checkFiveRandNum()) {
				// console.log('ready to calculate');
				that.outputResult();
			}
		});
	}

	rm.checkFiveRandNum = function() {
		var flag = true;
		$('.button_letter_div').each(function(index, el) {
			if ($(this).hasClass('abled_button')) {
				flag = false;
				return false;
			}
		});
		return flag;
	}

	rm.outputResult = function() {
		var result = 0;
		$('.unread').each(function(index, el) {
			result += parseInt($(this).text());
		});
		$('#calculation_result').html(result);
	}

})();