layui.use(['form', 'layer'],function(){
			var form = layui.form,
			    layer = layui.layer;
			//自定义验证规则
			form.verify({
				phone: [
							/^1\d{10}$/, '手机号格式不正确'
						],
				code: function(value){
					if(value.length != 6){
						return '验证码必须为4位哦';
					}
				}
			});
			
			form.on('submit(demo2)',function(date){
				//获取手机号码
				var phone = $("#phone").val();
				//alert(phone);
				var userCode = $("#userCode").val();
				//提交后台
				sendRequest("account.user",
					{"m":"findPwd","phone":phone,"userCode":userCode},
						function(result){
							//alert(result.code +"-------"+result.msg);
							//获取返回值，反馈给用户
							//window.alert(result.msg);
								if(result.code != 1){
									//重置失败
									layer.msg(result.msg, {
									  //icon: 1,
									  time: 2000 //2秒关闭（如果不配置，默认是3秒）
									});
								}else{
									//重置成功
									//示范一个公告层
								  layer.open({
									type: 1
									,title: false //不显示标题栏
									,closeBtn: false
									,area: '300px;'
									,shade: 0.8
									,id: 'LAY_layuipro' //设定一个id，防止重复弹出
									,btn: ['暂不修改',"前去修改"]
									,btnAlign: 'c'
									,moveType: 1 //拖拽模式，0或者1
									,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">'+result.msg+'<br/>温馨提示:您的密码安全较低，是否需要修改密码？</div>'
									,success: function(layero){
										var btn = layero.find('.layui-layer-btn');
										//不修改 就跳转到登录
										btn.find('.layui-layer-btn0').attr({
											href:'login.html',
											target: '_blank'
										})
									}
									,btn2:function(){
										//打开修改密码窗口
										window.location.href="updateUserPwd.html?phone="+phone;
									}
								  });
							}		
						})
						//阻止表单提交
						return false;
				})	
		});
		
		
		//发送验证码按钮点击事件
		function setMsg(){
				//alert(12345);
				//向后台发送验证码
				//获取手机号码
				var phone = $("#phone").val();
				var regex= /^1\d{10}$/; 
				if(phone.length == 0){
					layer.msg("手机号码不能为空哦", {
					  icon: 2,
					  time: 1000 //2秒关闭（如果不配置，默认是3秒）
					});
				}else if(!regex.exec(phone)){
					layer.msg("手机号码格式不正确哦", {
					  icon: 2,
					  time: 1000 //2秒关闭（如果不配置，默认是3秒）
					});
				}else{
						//向输入的手机号码发送短信验证码
						sendRequest("account.user",
							{"m":"sendMsg","phone":phone},
								function(result){
									//alert(result.code +"-------"+result.msg);
									//获取返回值，反馈给用户
									if(result.code == 1 || result.code == 2){//发送失败
										layer.msg(result.msg, {
										  icon: 4,
										  time: 1000 //2秒关闭（如果不配置，默认是3秒
										});
									}else{
										layer.msg("发送成功", {
										  icon: 1,
										  time: 2000 //2秒关闭（如果不配置，默认是3秒）
										},settime());
										$("#span").text("😀请在倒计时结束前填写......");
									}
							})
							//阻止表单提交 阻止页面刷新
							return false;
					}
				};
		
		<!--倒计时函数实现-->
		var countdown = 60;
		function settime() {
			var obj = document.getElementById('button');
			if (countdown == 0) {
				obj.removeAttribute("disabled");
				obj.value="获取验证码";
				countdown = 60;
				return;
			} else {
				obj.setAttribute("disabled", true);
				obj.value="重新发送(" + countdown + ")";
				countdown--;
			}
		setTimeout(function() {
			settime() }
			,1000)
		}