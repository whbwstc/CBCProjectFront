		layui.use(['layer'], function() {
			var layer = layui.layer;

			var token = sessionStorage.getItem("token");
			if (token != null) {
				$("#loginIndexLi1").hide();
				$("#exitLogin").show();
			}


		});

		//寄存按钮点击事件
		function btnClick() {
			//获取浏览器的token值
			var token = sessionStorage.getItem("token");

			if (token == null) { //还未登录
				layer.msg('您还未登录，请先登录', {
					icon: 4,
					time: 2000 //3秒关闭（如果不配置，默认是3秒）
				}, function() {
					window.location.href = "login.html";
				});
			} else { //已经登录
				//跳转界面
				location.href = "personalPage.html";

			}
		}

		//微信点击事件
		function btnClick2() {
			//示范一个公告层
			layer.open({
				type: 1,
				title: false //不显示标题栏
					,
				closeBtn: false,
				area: '400px;',
				shade: 0.8,
				id: 'LAY_layuipro' //设定一个id，防止重复弹出
					,
				btn: ['确定'],
				btnAlign: 'c',
				moveType: 1 //拖拽模式，0或者1
					,
				content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;"><img style="width:300px;height:300px" src="../中级项目imges/页脚3.jpg"/></div>',
				success: function(layero) {
					var btn = layero.find('.layui-layer-btn');
					btn.find('.layui-layer-btn0').attr({
						target: '_blank'
					})
				}
			});
		}
		
		//微博点击事件
		function btnClick3() {
			layer.msg('尚未开通微博', {
				time: 2000
			});
		}
		
		//退出登录的方法
		function exitLogin() {
			layer.confirm("是否确认退出？", {
				icon: 3,
				title: '系统提示'
			}, function(index) {
				//删除token
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("acc_user_id");
				window.location.href = "index.html";
			});
		}