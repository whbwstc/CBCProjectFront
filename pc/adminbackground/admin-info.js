layui.use(['element', 'rate'], function() {
	var rate = layui.rate;
	var element = layui.element;

	rate.render({
		elem: '#score',
		value: 0 //初始值
			,
		text: true //开启文本
	});

});

//获取管理员id
var admin_id = sessionStorage.getItem("admin_id");

$("#input1,#input2,#input3,#input4").ready(function() {
	sendRequestGet("cbcadmin/info/" + admin_id, {}, function(result) {
		$("#input1").val(result.data.adminId);
		$("#input2").val(result.data.adminName);
		$("#input3").val(result.data.adminPhone);
		$("#input4").val(result.data.adminEmail);
	});
});

//管理员信息页面修改名字的事件
$("#alterName").click(function() {
	sendRequest("cbcadmin/info/" + admin_id, {}, function(result) {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.prompt({
				//0为文本 1为密码 2为多行文本 
				formType: 0,
				value: result.data.adminName,
				title: '修改姓名',
				// offset: 'auto'
				offset: ['250px', '500px']
			}, function(value, index) {
				var admin_name = value;
				var admin = {
					adminId: result.data.adminId,
					adminName: admin_name,
					adminPhone: result.data.adminPhone,
					adminEmail: result.data.adminEmail
				};
				console.log(admin);
				console.log(JSON.stringify(admin));
				sendRequest("cbcadmin/update", JSON.stringify(admin), function(result) {
					if (result != 0) {
						layer.msg("修改成功", {
							time: 1000
						}, function(result) {
							location.href = "admin-info.html";
						});
					}
				});
			});
		});
	});
});

//管理员信息页面修改按钮的事件
$("#alterPhone").click(function() {
	sendRequest("cbcadmin/info/" + admin_id, {}, function(result) {
		layui.use('layer', function() {
			var layer = layui.layer;
			layer.prompt({
				//0为文本 1为密码 2为多行文本 
				formType: 0,
				value: result.data.adminPhone,
				title: '修改手机号码',
				offset: ['250px', '500px']
			}, function(value, index) {
				var admin_phone = value;
				var admin = {
					adminId: result.data.adminId,
					adminName: result.data.adminName,
					adminPhone: admin_phone,
					adminEmail: result.data.adminEmail
				};
				console.log(admin);
				console.log(JSON.stringify(admin));
				sendRequest("cbcadmin/update", JSON.stringify(admin), function(result) {
					if (result != 0) {
						layer.msg("修改成功", {
							time: 1000
						}, function(result) {
							location.href = "admin-info.html";
						});
					}
				});
			});
		});
	});
});
