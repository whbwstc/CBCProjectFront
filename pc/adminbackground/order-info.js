var acc_store_id = sessionStorage.getItem("acc_store_id");

layui.use(['element', 'table', 'form', 'laytpl'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var laytpl = layui.laytpl;

	//管理员查询所有订单信息
	table.render({
		elem: '#test',
		url: global_url + 'cbcorder/storeOrder', //json数据的url地址
		where: {
			"store_id": acc_store_id
		},
		parseData: function(res) { //res即为原始返回的数据
			return {
				"code": res.code,
				"msg": res.msg,
				"count": res.arg1,
				"data": res.data
			}
		},
		title: '订单信息',
		cols: [
			[{
				field: 'order_id', //和数据库中的字段名一致
				title: '订单ID',
				width: '9%',
				fixed: 'left',
				unresize: true,
				sort: true,
				align: 'center'
			}, {
				field: 'user_name',
				title: '用户名',
				width: '10%',
				align: 'center'
			}, {
				field: 'enter_time',
				title: '存入时间',
				width: '10%',
				align: 'center'
			}, {
				field: 'out_time',
				title: '取件时间',
				width: '10%',
				align: 'center',
			}, {
				field: 'luggage_num',
				title: '行李箱类数量',
				width: '10%',
				align: 'center',
			}, {
				field: 'bag_num',
				title: '背包类数量',
				width: '10%',
				align: 'center',
			}, {
				field: 'store_addr',
				title: '寄存点地址',
				width: '10%',
				align: 'center',
			}, {
				field: 'order_money',
				title: '订单金额',
				width: '10%',
				align: 'center',
			}, {
				field: 'order_code',
				title: '订单编号',
				width: '10%',
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
				toolbar: '#barDemo',
				width: '10%',
				align: 'center'
			}]
		],
		id: 'order_info',
		page: true
	});

	//监听行工具事件
	table.on('tool(test)', function(obj) {
		var data = obj.data;
		var order_id = data.order_id;
		var order_state = data.order_state;
		var luggage_num = data.luggage_num;
		var bag_num = data.bag_num;
		var store_addr = data.store_addr;
		var order_code = data.order_code;

		if (obj.event === 'Pick_up') {
			//判断是否取件
			if (order_state == 2) {
				layer.msg("已取件", {
					icon: 1,
					time: 2000
				});
			} else {
				//获取没有取件，则弹出订单编码
				layer.prompt({
					//0为文本 1为密码 2为多行文本
					formType: 0,
					title: '请输入订单编号'
					// value: order_code1
				}, function(value, index) {
					var cbcOrder = {
						orderId: order_id,
						storeId: acc_store_id,
						luggageNum: luggage_num,
						bagNum: bag_num
					}
					if (value == order_code) {
						sendRequest("cbcorder/updateOrderState", JSON.stringify(cbcOrder),
							function(result) {
								if (result.code == 0) {
									layer.msg("取件成功", {
										icon: 1,
										time: 2000
									}, function() {
										location.href = "order-info.html";
									});
								} else {
									layer.msg("取件失败", {
										icon: 2,
										time: 2000
									});
								}
							});
					} else {
						layer.msg("订单编号错误", {
							icon: 2,
							time: 2000
						});
					}
					//关闭所有窗口
					layer.closeAll();
				});

			}

		}
	});

	//查询按钮
	var $ = layui.$,
		active = {
			reload: function() {
				var order_code = $('#order_code');

				//执行重载
				table.reload('order_info', {
					url: global_url + 'cbcorder/userStoreOrder',
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						"store_id": acc_store_id,
						"order_code": order_code.val()
					}
				});
			}
		};

	$('.demoTable .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

});
