//获取用户id
var user_id = sessionStorage.getItem("user_id");

// //显示用户信息
$("#input1,#input2,#input3,#input4,#input5,#input6").ready(function() {
	sendRequestGet("cbcuser/info/" + user_id, {}, function(result) {
		$("#input1").val(result.data.userId);
		$("#input2").val(result.data.userName);
		$("#input3").val(result.data.userEmail);
		$("#input4").val(result.data.userPhone);
		$("#input5").val(result.data.userMoney);
		$("#input6").val(result.data.userScore);
	});
});


layui.use(['element', 'table', 'rate', 'form', 'upload'], function() {
	var rate = layui.rate;
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var layer = layui.layer;
	var upload = layui.upload;


	//用户信息页面修改名字的事件
	$("#alterName").click(function() {
		sendRequest("cbcuser/info/" + user_id, {}, function(result) {
			layer.prompt({
				//0为文本 1为密码 2为多行文本 
				formType: 0,
				value: result.data.userName,
				title: '修改姓名',
				offset: 'auto'
			}, function(value, index) {
				var userName = value;
				var user = {
					userId: result.data.userId,
					userName: userName,
					userPhone: result.data.userPhone,
					userEmail: result.data.userEmail
				};
				sendRequest("cbcuser/update", JSON.stringify(user), function(result) {
					if (result.code == 0) {
						layer.msg("修改成功", {
							time: 1000
						}, function(result) {
							location.reload();
						});
					} else {
						layer.msg("修改失败", {
							time: 1000
						}, function(result) {
							location.reload();
						});
					}
				});
			});
		});
	});

	//用户信息页面修改邮箱的事件
	$("#alterEmail").click(function() {
		sendRequest("cbcuser/info/" + user_id, {}, function(result) {
			layer.prompt({
				//0为文本 1为密码 2为多行文本 
				formType: 0,
				value: result.data.userEmail,
				title: '修改邮箱',
				offset: 'auto'
			}, function(value, index) {
				var userEmail = value;
				var user = {
					userId: result.data.userId,
					userName: result.data.userName,
					userPhone: result.data.userPhone,
					userEmail: userEmail
				};
				sendRequest("cbcuser/update", JSON.stringify(user), function(result) {
					if (result.code == 0) {
						layer.msg("修改成功", {
							time: 1000
						}, function(result) {
							location.reload();
						});
					} else {
						layer.msg("修改失败", {
							time: 1000
						}, function(result) {
							location.reload();
						});
					}
				});
			});
		});
	});

	//寄存
	table.render({
		elem: '#table1',
		url: global_url + 'cbcstore/list', //json数据的url地址
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
				field: 'store_name',
				title: '寄存点名称',
				width: '27%',
				fixed: 'left',
				unresize: true,
				align: 'center'
			}, {
				field: 'store_city',
				title: '所属城市',
				width: '17%',
				align: 'center',
			}, {
				field: 'luggage_num',
				title: '行李箱类数量',
				width: '16%',
				align: 'center',
			}, {
				field: 'bag_num',
				title: '背包类数量',
				width: '14%',
				align: 'center',
			}, {
				field: 'store_state',
				title: '寄存点状态',
				width: '14%',
				align: 'center',
				templet: function(d) {
					if (d.store_state == 1) {
						res = "营业";
					} else {
						res = "未营业";
					}
					return res;
				}
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#barDemo',
				width: '13%',
				align: 'center'
			}]
		],
		page: true
	});

	//监听行工具事件
	table.on('tool(table1)', function(obj) {
		var data = obj.data;
		var store_id = data.store_id;
		var store_name = data.store_name;
		var luggageNum = data.luggage_num;
		var bagNum = data.bag_num;

		if (obj.event === 'store') {
			if ((luggageNum > 0 && bagNum > 0) || (luggageNum > 0 && bagNum == 0) || (
					luggageNum == 0 && bagNum > 0)) {
				sendRequestGet("cbcstore/info/" + store_id, {}, function(result) {
					//营业
					if (result.data.storeState == 1) {
						layer.open({
							type: 2,
							content: 'consign1.html',
							offset: 'auto',
							area: ['600px', '400px'],
							success: function(index, layero) {
								//do something
								sessionStorage.setItem("user_id", user_id);
								sessionStorage.setItem("store_id", store_id);
								sessionStorage.setItem("store_name", store_name);
								sessionStorage.setItem("bagNum", bagNum);
								sessionStorage.setItem("luggageNum", luggageNum);
							},
							cancel: function(index, layero){
							  sessionStorage.removeItem("luggage_num");
							  sessionStorage.removeItem("bag_num");
							}
						});
					} else {
						layer.msg("该寄存点暂时未营业！", {
							icon: 1,
							time: 2000
						}, );
					}
				});
			} else {
				layer.msg("该寄存点背包和行李箱都没有空位了", {
					icon: 1,
					time: 4000
				}, );
			}
		}

	});

	//用户订单查询
	table.render({
		elem: '#table2',
		url: global_url + 'cbcorder/orderInfo', //json数据的url地址
		where: {
			"user_id": user_id
		},
		parseData: function(res) { //res即为原始返回的数据
			return {
				"code": res.code,
				"msg": res.msg,
				"count": res.arg1,
				"data": res.data
			}
		},
		title: '订单详情',
		cols: [
			[{
				field: 'order_id',
				title: '订单ID',
				width: '13%',
				fixed: 'left',
				unresize: true,
				align: 'center'
			}, {
				field: 'enter_time',
				title: '存入时间',
				width: '13%',
				align: 'center',
			}, {
				field: 'out_time',
				title: '取件时间',
				width: '13%',
				align: 'center',
			}, {
				field: 'store_name',
				title: '寄存点',
				width: '20%',
				align: 'center',
			}, {
				field: 'order_money',
				title: '金额',
				width: '7%',
				align: 'center',
			}, {
				field: 'order_code',
				title: '订单编号',
				width: '11%',
				align: 'center',
			}, {
				field: 'order_state',
				title: '订单状态',
				width: '10%',
				align: 'center',
				templet: function(d) {
					if (d.order_state == 1) {
						res = "已存";
					} else {
						res = "已取";
					}
					return res;
				}
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#barDemo2',
				width: '14%',
				align: 'center'
			}]
		],
		page: true,
	});

	//监听行工具事件
	table.on('tool(table2)', function(obj) {
		var data = obj.data;
		var order_id = data.order_id;
		console.log(obj);

		//评价
		if (obj.event === 'evaluate') {
			if (order_id != null) {
				sendRequest("cbcorder/orderState/" + order_id, {}, function(result) {
					if (result.data.order_state == 2) {
						if(result.data.judge_state == 2){
							layer.msg("评价已完成，无法重复评价", {
								icon: 1,
								time: 2000
							}, );
						}else{
							layer.open({
								type: 2,
								content: 'judge.html',
								offset: 'auto',
								area: ['600px', '400px'],
								success: function(index, layero) {
									sessionStorage.setItem("order_id",order_id);
								}
							});
						}
					} else {
						layer.msg("订单未完成，无法评价", {
							icon: 1,
							time: 2000
						}, );
					}
				});
			} else {
				layer.msg("获取订单错误", {
					icon: 1,
					time: 4000
				}, );
			}

			//取件
		} else {
			layer.msg("取件请在手机端操作", {
				icon: 1,
				time: 2000,
			});
		}
	});
	
	//监听提交
	form.on('submit(demo1)', function(data) {
		
		cbcAdvice = {
			userId:user_id,
			adviceText:$("#adviceText").val()
		};
		sendRequest("cbcadvice/save",JSON.stringify(cbcAdvice), function(result) {
			if (result.code == 0) {
				layer.msg("反馈成功！", {
					icon: 1,
					time: 2000
				},function(){
					location.href = "personalPage.html";
				});
			} else {
				layer.msg(result.msg, {
					icon: 1,
					time: 2000
				},function(){
					location.href = "personalPage.html";
				});
			}
		})
		return false;
	});


});
