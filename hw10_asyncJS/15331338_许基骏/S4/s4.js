(function() {
	$(function() { new RingMenu(); });

	var RingMenu = function() {
		this.initial();
		this.listenButtonClick();
		this.listenLeave();
		this.listenResultGetting();
		this.listenRobotCalling();
	}

	var rm = RingMenu.prototype;

	rm.xhrArr = new Array();

	rm.initial = function() {
		while (this.xhrArr.length > 0) {
			this.xhrArr.shift().abort();
		}

		this.begin = true;
		this.resetResult();
		this.resetUnread();
		this.resetButton();
	}

	rm.resetUnread = function() {
		$('.unread').html('...');
		$('.unread').hide();
	}

	rm.resetButton = function() {
		$('.button .button_letter_div').attr('class', 'button_letter_div abled_button');
	}

	rm.resetResult = function() {
		$('#order_sequence').html('');
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
						that.triggerNextClick();
					}
				}));
	}

	rm.triggerNextClick = function() {
		var clickEvent = jQuery.Event('click');
		// $('.apb').trigger(clickEvent);
		this.buttonNumToTrriger++;
		if (this.buttonNumToTrriger < 5) {
			// console.log(this.orderArr[this.buttonNumToTrriger]);
			$($('.button')[this.orderArr[this.buttonNumToTrriger]]).trigger(clickEvent);
		} else {
			$('#calculation_result').trigger(clickEvent);			
		}
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
		$('#calculation_result').click(function(event) {
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

	rm.listenRobotCalling = function() {
		var clickEvent = jQuery.Event('click');
		var idx;
		var that = this;

		$('.apb').click(function(event) {
			that.orderArr = that.shuffleArr();
			that.orderSeq = that.getOrderStr(that.orderArr);
			that.buttonNumToTrriger = 0;
			// console.log(that.orderArr);
			// console.log(that.orderSeq);
			$('#order_sequence').html(that.orderSeq);
			// console.log(that.orderArr[that.buttonNumToTrriger]);
			$($('.button')[that.orderArr[that.buttonNumToTrriger]]).trigger(clickEvent);
		});
	}

	rm.shuffleArr = function() {
		var arr = new Array(5);
		var rnd, idx;
		for (idx = 0; idx < 5; idx ++) {
			rnd = Math.floor(Math.random() * (idx + 0.99999));
			arr[idx] = arr[rnd];
			arr[rnd] = idx;
		}
		return arr;
	};

	rm.getOrderStr = function(arr) {
		var orderSeq = '', tmpStr = 'ABCDE';
		for (idx = 0; idx < 5; idx ++) {
			orderSeq += tmpStr[arr[idx]];
		}
		return orderSeq;
	}

})();