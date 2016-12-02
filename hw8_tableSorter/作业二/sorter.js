/// <reference path="jquery.js">
/// <reference path="lodash.js">
(function() {
	$(function() { new tableSorter(); });

	var tableSorter = function() {
		this.initial();
		this.listenClickThead();
	};

	var ts = tableSorter.prototype;

	ts.initial = function() {
		this.tables = $('table');
		this.setColor();
		this.addCendPointerAreaInThead();
	};

	ts.addCendPointerAreaInThead = function() {
		this.tables.each(function() {
			$(this).find('thead th').append("<div class='cend'></div>");
		});
	};

	ts.setColor = function() {
		this.tables.each(function() {
			$(this).find('thead th').attr('class', 'thStyle');
			$(this).find('tbody tr:odd').attr('class', 'oddTrStyle');
		});
	};

	ts.listenClickThead = function() {
		var that = this;
		this.tables.each(function() {
			$(this).find('th').click(function() {
				that.dealClick($(this));
			});
		});
	};

	ts.dealClick = function(thisth) {
		this.resetTh(thisth);
		var flag = (thisth.find('div').attr('class') == 'ascend');
		thisth.find('div').attr('class', flag ? 'descend' : 'ascend');
		this.sort(!flag, thisth.index(), thisth.parents('table').find('tbody tr'));
	};

	ts.resetTh = function(thisth) {
		if (!thisth.hasClass('chosenTh')) {
			this.setColor();
			thisth.find('div').attr('class', 'cend');
			thisth.addClass('chosenTh');
		}
	}

	ts.sort = function(flag, idx, arr) {
		var i, j, tmp, arrLen = arr.length;
		for (i = 0; i < arrLen - 1; i ++)
		for (j = 0; j < arrLen - 1 - i; j ++) {
			if (!(flag ^ ($($(arr[j]).find('td')[idx]).html() > $($(arr[j + 1]).find('td')[idx]).html()))) {
				tmp = $(arr[j]).html();
				$(arr[j]).html($(arr[j + 1]).html());
				$(arr[j + 1]).html(tmp);
			}
		}
	};

})();