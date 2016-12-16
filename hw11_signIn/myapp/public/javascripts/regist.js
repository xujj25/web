(function() {
	$(function() {
		new RegistPage();
	});

	var RegistPage = function() {
		this.listenSubmit();
		this.listenChange();
		this.listenReset();
	}

	var rp = RegistPage.prototype;

	rp.listenSubmit = function() {
		var that = this;
		$('#Submit').click(function(event) {
			if (that.allCanUse() != -1) {
				alert('信息项仍有错误，请修改后再提交！');
				// event.preventDefault();
			} else {
				var usernameNow = $('#username').val();
				var formjson = $('form').serialize();
				console.log(formjson);
				$.ajax({
					url: "/registPost",
					type: "POST",
					data: formjson,
					// async: false,
					success: function(data, status) {
						// if (data === 'yes')
						// 	window.location.href = "?username=" + usernameNow;
						// else
						// 	alert('信息重复!');
					},
					complete: function(xhr, ts) {
						console.log(ts);
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

	rp.listenReset = function() {
		$("#Reset").click(function() {
			$('.tip').html('');
			$('input[type="text"]').val('');
		});
	}

	rp.checkUsername = function() {
		this.cannotUse($('#username_tip'));
		var str = $('#username').val();
		if (str.match(/\W/)) {
			$('#username_tip').html('含有非法字符！');
			return;
		}
		if (str.length < 6 || str.length > 18) {
			$('#username_tip').html('6~18位英文字母、数字或下划线，必须以英文字母开头');
			return;
		}
		if (!str.substr(0, 1).match(/[a-zA-Z]/)) {
			$('#username_tip').html('必须以英文字母开头!');
			return;
		}
		this.canUse($('#username_tip'));
	}

	rp.checkStuId = function() {
		this.cannotUse($('#stu_id_tip'));
		var str = $('#student_id').val();
		if (str.match(/[^0-9]/)) {
			$('#stu_id_tip').html('含有非数字字符！');
			return;
		}
		if (str.length != 8 ) {
			$('#stu_id_tip').html('8位数字，不能以0开头');
			return;
		}
		if (str.substr(0, 1).match(/0/)) {
			$('#stu_id_tip').html('不能以0开头!');
			return;
		}
		this.canUse($('#stu_id_tip'));
	}

	rp.checkPhone = function() {
		this.cannotUse($('#phone_tip'));
		var str = $('#phone_number').val();
		if (str.match(/[^0-9]/)) {
			$('#phone_tip').html('含有非数字字符！');
			return;
		}
		if (str.length != 11) {
			$('#phone_tip').html('11位数字，不能以0开头');
			return;
		}
		if (str.substr(0, 1).match(/0/)) {
			$('#phone_tip').html('不能以0开头!');
			return;
		}
		this.canUse($('#phone_tip'));
	}

	rp.checkEmail = function() {
		this.cannotUse($('#email_tip'));
		var str = $('#email_address').val();
		if (!str.match(/^\w+@(\w+\.)+\w+$/)) {
			$('#email_tip').html('邮箱格式非法！');
			return;
		}
		$('#email_tip').html('可用');
		this.canUse($('#email_tip'));
	}

	rp.checkPasswd = function() {
		this.cannotUse($('#password_tip'));
		var passwd = $('#password').val();
		if (passwd.match(/^([\w\-]){6,12}$/) === null) {
			$('#password_tip').html('6~12位数字、大小写字母、中划线、下划线');
			return;
		}
		// console.log('password:' + passwd);
		this.canUse($('#password_tip'));
	}

	rp.checkConfirmPasswd = function() {
		this.cannotUse($('#confirm_password_tip'));
		var passwd = $('#password').val();
		var comfirm_passwd = $('#confirm_password').val();
		// console.log('confirm_passwd:' + comfirm_passwd);
		if (passwd != comfirm_passwd) {
			$('#confirm_password_tip').html('校验密码与原密码不同！');
			return;
		}
		$('#confirm_password_tip').html('可用');
		$('#confirm_password_tip').attr('class', 'tip canUse');
	}

	rp.cannotUse = function(that) {
		that.attr('class', 'tip');
	}

	rp.canUse = function(that) {
		that.html('格式合法');
		that.attr('class', 'tip canUse');
	}

	rp.listenChange = function() {
		var that = this;
		$('#username').change(function(event) {
			that.checkUsername();
		});

		$('#student_id').change(function(event) {
			that.checkStuId();
		});

		$('#phone_number').change(function(event) {
			that.checkPhone();
		});

		$('#email_address').change(function(event) {
			that.checkEmail();
		});

		$('#password').change(function(event) {
			that.checkPasswd();
		});

		$('#confirm_password').change(function(event) {
			that.checkConfirmPasswd();
		});
	}

	rp.checkAllInfo = function() {
		this.checkUsername();
		this.checkStuId();
		this.checkPhone();
		this.checkEmail();
		this.checkPasswd();
		this.checkConfirmPasswd();
	}

	rp.allCanUse = function() {
		this.checkAllInfo();
		var idx = -1;
		$('.tip').each(function(index, el) {
			if ($(this).attr('class') != 'tip canUse') {
				idx = index;
				return false;
			}
		});
		return idx;
	}
})();