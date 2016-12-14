function canUse(that) {
	that.html('格式合法');
	that.attr('class', 'tip canUse');
}

function cannotUse(that) {
	that.attr('class', 'tip');
}

function checkUsername() {
	cannotUse($('#username_tip'));
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
	canUse($('#username_tip'));
}

function checkStuId() {
	cannotUse($('#stu_id_tip'));
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
	canUse($('#stu_id_tip'));
}

function checkPhone() {
	cannotUse($('#phone_tip'));
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
	canUse($('#phone_tip'));
}

function checkEmail() {
	cannotUse($('#email_tip'));
	var str = $('#email_address').val();
	if (!str.match(/^\w+@(\w+\.)+\w+$/)) {
		$('#email_tip').html('邮箱格式非法！');
		return;
	}
	$('#email_tip').html('可用');
	canUse($('#email_tip'));
}

function listenReset() {
	$("#Reset").click(function() {
		$('.tip').html("");
		// $('input[type="text"]').attr('value', '');
	});
}

function checkAllInfo() {
	checkUsername();
	checkStuId();
	checkPhone();
	checkEmail();
}

function allCanUse() {
	checkAllInfo();
	var idx = -1;
	$('.tip').each(function(index, el) {
		if ($(this).attr('class') != 'tip canUse') {
			idx = index;
			return false;
		}
	});
	return idx;
}

function listenSubmit() {
	$('#Submit').click(function(event) {
		if (allCanUse() != -1) {
			alert('信息项仍有错误，请修改后再提交！');
			// event.preventDefault();
		} else {
			var usernameNow = $('#username').val();
			var formjson = $('#register_form').serialize();
			console.log(formjson);
			$.ajax({
				url: "/handlePost",
				type: "POST",
				data: formjson,
				// async: false,
				success: function(data, status) {
					if (data === 'yes')
						window.location.href = "?username=" + usernameNow;
					else
						alert('信息重复!');
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

function listenChange() {
	$('#username').change(function(event) {
		checkUsername();
	});

	$('#student_id').change(function(event) {
		checkStuId();
	});

	$('#phone_number').change(function(event) {
		checkPhone();
	});

	$('#email_address').change(function(event) {
		checkEmail();
	});

}

$(function() {
	listenChange();
	listenSubmit();
	listenReset();
});