layui.use(['form', 'layer'], function() {
	var form = layui.form;
	var layer = layui.layer;

	//自定义验证规则
	form.verify({

		password: [
			/^[\S]{6,18}$/, '密码格式填写错误'
		],
		ver: function(value) {
			if (value.length != 4) {
				return '验证码必须四位';
			}
		},
		ver2: function(value) {
			if (value.length != 6) {
				return '验证码必须六位';
			}
		}
	});

	//监听提交
	form.on('submit(button)', function(data) {
		var phone = $("#phone").val();
		var password = $("#password").val();
		var ver = $("#ver").val();

		//提交后台 
		$.post(global_url + "cbcaccountuser/login", {
			"username": phone,
			"password": password,
			"ver": ver
		}, function(result) {
			if (result.code == 0) {
				//则登陆成功
				//设置token值
				sessionStorage.setItem("token", result.data.token);
				sessionStorage.setItem("user_id", result.arg1);
				//重置失败
				layer.msg(result.msg, {
					time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function(result) {
					location.href = "index.html";
				});

			} else {
				layer.msg(result.msg, {
					time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function() {
					location.reload();
				});
			}

		});
		return false;
	});

	// form.on('submit(button2)', function(data) {
	// 	var phone = $("#phone2").val();
	// 	var ver = $("#ver2").val();
	// 	$.post(global_url + "cbcaccountuser/login", {
	// 		"username": phone,
	// 		"password": password,
	// 		"ver": ver
	// 	}, function(result) {
	// 		if (result.code == 0) {
	// 			//则登录成功
	// 			sessionStorage.setItem("token", result.data.token);
	// 			sessionStorage.setItem("user_id", result.arg1);
	// 			layer.msg("登录成功", {
	// 				//icon: 1,
	// 				time: 1000 //2秒关闭（如果不配置，默认是3秒）
	// 			}, function() {
	// 				location.href = "index.html";
	// 			});
	// 		}else {
	// 			//验证码错误
	// 			layer.msg("验证码错误", {
	// 				//icon: 1,
	// 				time: 1000 //2秒关闭（如果不配置，默认是3秒）
	// 			},function(){
	// 				location.reload();
	// 			});
	// 		}

	// 	});
	// 	//阻止表单提交
	// 	return false;
	// });

})

//发送验证码按钮点击事件
function setMsg() {
	//alert(12345);
	//向后台发送验证码
	//获取手机号码
	var phone = $("#phone2").val();
	var regex = /^1\d{10}$/;
	if (phone.length == 0) {
		layer.msg("手机号码不能为空哦", {
			icon: 2,
			time: 1000 //2秒关闭（如果不配置，默认是3秒）
		});
	} else if (!regex.exec(phone)) {
		layer.msg("手机号码格式不正确哦", {
			icon: 2,
			time: 1000 //2秒关闭（如果不配置，默认是3秒）
		});
	} else {
		//向输入的手机号码发送短信验证码
		sendRequest("account.user", {
				"m": "sendMsg",
				"phone": phone
			},
			function(result) {
				//alert(result.code +"-------"+result.msg);
				//获取返回值，反馈给用户
				if (result.code == 1 || result.code == 2) { //发送失败
					layer.msg(result.msg, {
						icon: 4,
						time: 1000 //2秒关闭（如果不配置，默认是3秒
					});
				} else {
					layer.msg("发送成功", {
						icon: 1,
						time: 1000 //2秒关闭（如果不配置，默认是3秒）
					}, settime());
					$("#span").text("😀请在倒计时结束前填写......");
				}
			});
		//阻止表单提交 阻止页面刷新
		return false;
	}
};

function btn1() {
	var btn = document.getElementById('btn');
	var btn2 = document.getElementById('btn2');
	btn.setAttribute('style', 'background-color: lightcyan');
	btn2.setAttribute('style', 'background-color: white');
}

function btn2() {
	var btn2 = document.getElementById('btn2');
	var btn = document.getElementById('btn');
	btn2.setAttribute('style', 'background-color: lightcyan');
	btn.setAttribute('style', 'background-color: white');
}

$("#imageCode").attr("src", global_url + "cbcaccountuser/image?t=" + Math.random());

//验证码点击事件
function changeVerificationCode(imageCode) {

	// imageCode = global_url + "cbcaccountuser/image?t=" + new Date().getTime();
	$("#imageCode").attr("src", global_url + "cbcaccountuser/image?t=" + Math.random());

}

<!--倒计时函数实现-->
var countdown = 60;

function settime() {
	var obj = document.getElementById('button');
	if (countdown == 0) {
		obj.removeAttribute("disabled");
		obj.value = "获取验证码";
		countdown = 60;
		return;
	} else {
		obj.setAttribute("disabled", true);
		obj.value = "重新发送(" + countdown + ")";
		countdown--;
	}
	setTimeout(function() {
		settime()
	}, 1000)
}
