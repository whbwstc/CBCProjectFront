$(function() {
	FastClick.attach(document.body);

	$("#imageCode").attr("src", global_url + "cbcaccountuser/image?t=" + Math.random());

	//取得token
	var token = sessionStorage.getItem("token");

	// var login_flag = localStorage.getItem("login_flag");

	//如果有则直接去主页
	//if (token != "" && login_flag) {
	//window.location.href = "main.html";
	//return;
	//}

	$("#btnLogin").click(function() {
		//获取用户输入信息
		var acc_name = $("#acc_name").val();
		var acc_pwd = $("#acc_pwd").val();
		var verCode = $("#acc_code").val();

		sessionStorage.setItem("acc_name", acc_name);

		//进行验证判断
		if (!(/^[0-9]{11}$/.test(acc_name))) {
			$.alert("手机号不正确！", "存不存提示", function() {
				$("#acc_name").focus();
			});
			return;
		}
		if (acc_pwd == '') {
			$.alert("密码不能为空", "存不存提示", function() {
				$("#acc_pwd").focus();
			});
			return;
		}
		if (verCode == '') {
			$.alert("验证码不能为空", "存不存提示", function() {
				$("#acc_code").focus();
			});
			return;
		}

		//发送到后台
		sendRequestParam("cbcaccountuser/login", {
			"username": acc_name,
			"password": acc_pwd,
			"ver": verCode
		}, function(result) {

			console.log(result.code);
			if (result.code == 0) {
				// $.alert(result.msg, "存不存提示", function() {
				// 	sessionStorage.setItem("token", result.data.token);
				// 	sessionStorage.setItem("user_id", result.arg1);
				// 	//跳转到主页面
				// 	window.location.href = "main.html";
				// });
				$.toast.prototype.defaults.duration = 1000;
				
				$.toast(result.msg, function() {
					sessionStorage.setItem("token", result.data.token);
					sessionStorage.setItem("user_id", result.arg1);
					//跳转到主页面
					window.location.href = "main.html";
				});

			} else {
				//登录失败
				$.alert(result.msg, "存不存提示", function() {
					$("#acc_code").focus();
				});
			}
		})
	});

});


//验证码点击事件
function changeVerificationCode(imageCode) {

	$("#imageCode").attr("src", global_url + "cbcaccountuser/image?t=" + Math.random());

}
