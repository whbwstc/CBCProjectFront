layui.use(['element', 'table'], function() {
	var element = layui.element;
	var table = layui.table;

	table.render({
		elem: '#test',
		url: global_url + '/cbcuser/list', //json数据的url地址
		parseData: function(res) { //res即为原始返回的数据
			return {
				"code": res.code,
				"msg": res.msg,
				"count": res.arg1,
				"data": res.data
			}
		},
		title: '用户信息',
		cols: [
			[{
				field: 'user_id', //和数据库中的字段名一致
				title: 'ID',
				width: '10%',
				fixed: 'left',
				unresize: true,
				sort: true,
				align: 'center'
			}, {
				field: 'user_name',
				title: '姓名',
				width: '15%',
				align: 'center'
			}, {
				field: 'user_phone',
				title: '手机号',
				width: '15%',
				align: 'center'
			}, {
				field: 'user_email',
				title: '邮件',
				width: '15%',
				align: 'center'
			}, {
				field: 'user_money',
				title: '钱包',
				width: '15%',
				align: 'center'
			}, {
				field: 'user_score',
				title: '积分',
				width: '15%',
				align: 'center'
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#barDemo',
				width: '15%',
				align: 'center'
			}]
		],
		page: true
	});

	//监听行工具事件
	table.on('tool(test)', function(obj) {
			var data = obj.data;
			var user_id = data.user_id;
			var user_money = data.user_money;

			console.log(user_id, user_money);

			if (obj.event === 'charge') {
				layer.prompt({
						title: '请输入充值的金额',
						formType: 3,
						value: '100'
					}, function(value, index) {
						if (!isNaN(value)) {
							if (value>0 && value<=500) {
								user_money = Number(user_money) + Number(value);
								//给后端发生请求
								sendRequestParam("cbcuser/chargeMoney", {
										"user_id": user_id,
										"user_money": user_money
									}, function(result) {
										if (result.code == 0) {
											layer.msg("充值成功", {
												icon: 1,
												time: 2000
											});
										} else {
											layer.msg("充值失败", {
												icon: 1,
												time: 2000
											});
										}
										//表格局部刷新
										obj.update({
											user_money: user_money
										});
										layer.close(index);
									}
								);
						}else{
							layer.msg("请输入正确金额", {
								icon: 2,
								time: 2000
							});
							layer.close(index);
						}
					} else {
						layer.msg("请输入正确金额", {
							icon: 2,
							time: 2000
						});
						layer.close(index);
					}


				});
		}
	});


});
