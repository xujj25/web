var str = "";
var just_output = false;
/*-------------------------------------- useful functions --------------------------------------*/
function turn_off_just_output() {
	if (just_output)
	{
		just_output = false;
		str = "";
	}
}

function backspace() {
	str = str.substring(0, str.length - 1);
}

function add_num(num) {
	turn_off_just_output();
	str += num;
	document.getElementById("result").value = str;
}

/*---------------------------------------- add number ----------------------------------------*/
window.onload = function() {
	document.getElementById("button_0").onclick = function() {
		add_num(0);
	}

	document.getElementById("button_1").onclick = function() {
		add_num(1);
	}

	document.getElementById("button_2").onclick = function() {
		add_num(2);
	}

	document.getElementById("button_3").onclick = function() {
		add_num(3);
	}

	document.getElementById("button_4").onclick = function() {
		add_num(4);
	}

	document.getElementById("button_5").onclick = function() {
		add_num(5);
	}

	document.getElementById("button_6").onclick = function() {
		add_num(6);
	}

	document.getElementById("button_7").onclick = function() {
		add_num(7);
	}

	document.getElementById("button_8").onclick = function() {
		add_num(8);
	}

	document.getElementById("button_9").onclick = function() {
		add_num(9);
	}

/*---------------------------------------- add point ----------------------------------------*/
	document.getElementById("button_point").onclick = function() {
		turn_off_just_output();

		if (str.length == 0) {
			str += ".";
		} else {
			for (var i = str.length - 1; i >= 0; i--) {
				if (str[i] == '+' || str[i] == '-' ||
					str[i] == '*' || str[i] == '/' ||
					str[i] == '(' || str[i] == ')') {
					break;
				}
			}
			var point_exist = false;
			for (var j = i; j < str.length; j ++) {
				if (str[j] == '.') {
					point_exist = true;
				}
			}
			if (!point_exist) {
				str += ".";
			}
		}

		document.getElementById("result").value = str;
	}
/*---------------------------------------- add brace ----------------------------------------*/
	document.getElementById("button_leftbrace").onclick = function() {
		turn_off_just_output();

		str += "(";
		
		document.getElementById("result").value = str;
	}

	document.getElementById("button_rightbrace").onclick = function() {
		turn_off_just_output();

		str += ")";
		document.getElementById("result").value = str;
	}
/*---------------------------------------- add operator ----------------------------------------*/
	document.getElementById("button_add").onclick = function() {
		if (str.length != 0) {
			while (str.length != 0) {
				if (str[str.length - 1] == '+' || str[str.length - 1] == '-' ||
					str[str.length - 1] == '*' || str[str.length - 1] == '/') {
					backspace();
				} else {
					break;
				}
			}
			str += "+";
			if (just_output) {just_output = false;}
		}		
		document.getElementById("result").value = str;
	}

	document.getElementById("button_multiply").onclick = function() {
		if (str.length != 0) {
			while (str.length != 0) {
				if (str[str.length - 1] == '+' || str[str.length - 1] == '-' ||
					str[str.length - 1] == '*' || str[str.length - 1] == '/') {
					backspace();
				} else {
					break;
				}
			}
			str += "*";
			if (just_output) {just_output = false;}
		}		
		document.getElementById("result").value = str;
	}

	document.getElementById("button_subtract").onclick = function() {
		if (str.length == 0) {
			str += "-";
		} else {
			if (str[str.length - 1] == '+' || str[str.length - 1] == '-') {
					backspace();
			}
			str += "-";
			if (just_output) {just_output = false;}
		}
		
		document.getElementById("result").value = str;
	}

	document.getElementById("button_divide").onclick = function() {
		if (str.length != 0) {
			while (str.length != 0) {
				if (str[str.length - 1] == '+' || str[str.length - 1] == '-' ||
					str[str.length - 1] == '*' || str[str.length - 1] == '/') {
					backspace();
				} else {
					break;
				}
			}
			str += "/";
			if (just_output) {just_output = false;}
		}		
		document.getElementById("result").value = str;
	}

	document.getElementById("button_equal").onclick = function() {
		try  {
			str = eval(str).toString();
			document.getElementById("result").value = str;
			just_output = true;
		}

		catch(exception) {
			str = "";
			document.getElementById("result").value = str;
			alert(exception);
		}
		document.getElementById("result").value = str;
	}
/*------------------------------------- add delete functions -------------------------------------*/
	document.getElementById("button_backspace").onclick = function() {
		backspace();
		document.getElementById("result").value = str;
	}

	document.getElementById("button_CE").onclick = function() {
		str = "";
		document.getElementById("result").value = str;
	}
}