(function() {
	$(function() {
		new DetailPage();
	});

	var DetailPage = function() {
		this.listenLogout();
	}

	var dp = DetailPage.prototype;

	dp.listenLogout = function() {
		$('#Logout').click(function(event) {
			window.location.href = '/logout';
		});
	}
})();