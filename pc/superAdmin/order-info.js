// var acc_store_id = sessionStorage.getItem("acc_store_id");

layui.use(['element', 'table', 'form', 'laytpl'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var laytpl = layui.laytpl;

	//管理员查询所有订单信息
	table.render({
		elem: '#test',
		url: global_url + 'cbcorder/list', //json数据的url地址
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
				width: '10%',
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
			}]
		],
		id: 'order_info',
		page: true
	});

	//查询按钮
	var $ = layui.$,
		active = {
			reload: function() {
				var order_code = $('#order_code');
				var store_id = null;
				//执行重载
				table.reload('order_info', {
					url: global_url + 'cbcorder/userStoreOrder',
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						"store_id": store_id,
						order_code: order_code.val()
					}
				});
			}
		};

	$('.demoTable .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

});
