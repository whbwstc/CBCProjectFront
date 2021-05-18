layui.use(['form', 'layer'], function() {
	var form = layui.form,
		layer = layui.layer;


	//自定义验证规则
	form.verify({
		pass: [/(.+){6,12}$/, '密码必须6到12位'],
		repass: function(value) {
			if ($('#L_pass').val() != $('#L_repass').val()) {
				return '两次密码不一致';
			}
		}
	});

	//监听提交
	form.on('submit(updatePassword)', function(data) {
		//用户输入参数
		phone = $("#phone").val()
		oldPass  = $("#oldPass").val()
		password = $("#L_repass").val()
		sendRequest("cbcaccountuser/infoByName/"+phone,{},function(result){
			if(result.code == 0 && result.data == oldPass){
				sendRequestParam("cbcaccountuser/updatePassword", {
					"accUserName": phone,
					"accUserPwd": password
				}, function(result) {
					if (result.code == 0) {
						layer.msg("修改成功！即将转入登录页面", {
							icon: 1,
							time: 2000
						},function(){
							window.location.href = "login.html";
						});
					} else {
						layer.msg("添加失败！", {
							icon: 1,
							time: 2000
						});
					}
				})
			}else if(result.code == 0 && result.data == null){
				layer.msg("该账户未注册！", {
					icon: 1,
					time: 2000
				});
			}else if(result.code == 0 && result.data != oldPass){
				layer.msg("旧密码错误！", {
					icon: 1,
					time: 2000
				});
			}
		});
		//阻止表单提交
		return false;
	});
});
