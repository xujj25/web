(function() {
	$(function() {
		new LoginPage();
	});

	var LoginPage = function() {
		this.listenLogin();
		this.listenRegist();
	}

	var lp = LoginPage.prototype;

	lp.listenLogin = function() {
		// $('#Submit').click(function(event) {

		// });
	}

	lp.listenRegist = function() {
		$('#Regist').click(function(event) {
			window.location.href = '/regist';
		});
	}
})();