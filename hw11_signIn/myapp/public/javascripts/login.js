(function() {
	$(function() {
		new LoginPage();
	});

	var LoginPage = function() {
		this.listenLogin();
		this.listenRegist();
		this.listenChange();
	}

	var lp = LoginPage.prototype;

	lp.listenLogin = function() {
		$('#Submit').click(function(event) {
			// console.log(formJson);
			if ($('#username').val() === '' || $('#password').val() === '') {
				alert('请将账户信息填写完整！');
			} else {
				var formJson = $('#login_form').serialize();
				$.ajax({
					url: '/loginPost',
					type: 'POST',
					data: formJson,
					success: function(data, status) {
						console.log(data);
						if (data === 'ok') {
							console.log('success');
							window.location.href = "?username=" + ($('#username').val());
						} else {
							$('#repeat_notice').html(data);
						}
					},
					complete: function(xhr, ts) {
						console.log('complete: ', ts);
					},
					error: function(obj, info, err) {
						if (err) {
							console.log(err);
							console.log('info: ' + info);
						}
					}
				});
			}
		});
	}

	lp.listenRegist = function() {
		$('#Regist').click(function(event) {
			window.location.href = '/regist';
		});
	}

	lp.listenChange = function() {
		$('#repeat_notice').html('');
	}

})();