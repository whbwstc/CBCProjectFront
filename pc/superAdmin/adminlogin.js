layui.use(['form', 'layer'], function() {
				var form = layui.form;
				var layer = layui.layer;

				//自定义验证规则
				form.verify({
					password: [
						/^[\S]{4,18}$/, '密码格式填写错误'
					]
				});

				//监听提交
				form.on('submit(login)', function(data) {
					var email = $("#email").val();
					var password = $("#password").val();

					sendRequestGet("cbcaccountadmin/login", {
						"username": email,
						"password": password
					}, function(res) {
						if (res.code == 0) {
							//则登陆成功
							sessionStorage.setItem("admin_id", res.arg1);
							sessionStorage.setItem("token", res.data.token);
							location.href = "adminPage.html";
						} else if (res.code == 1) {
							layer.msg("登陆失败");
						}
					});

					return false;
				});

			});
