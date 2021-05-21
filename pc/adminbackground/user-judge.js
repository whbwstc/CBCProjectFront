var acc_store_id = sessionStorage.getItem("acc_store_id");

layui.use(['element', 'table'], function() {
	var element = layui.element;
	var table = layui.table;
	
	table.render({
		elem: '#test',
		url: global_url + 'cbcjudge/list', //json数据的url地址
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
				field: 'order_code', //和数据库中的字段名一致
				title: '订单编号',
				width: '20%',
				fixed: 'left',
				unresize: true,
				align: 'center'
			}, {
				field: 'judge_grade',
				title: '评价等级',
				width: '20%',
				align: 'center',
				templet: function(d) {
					switch(d.judge_grade){
						case 1:
							res = "极差";
							break;
						case 2:
							res = "差";
							break;
						case 3:
							res = "中等";
							break;
						case 4:
							res = "好";
							break;
						case 5:
							res = "极好";
							break;
					}
					return res;
				}
			}, {
				field: 'judge_time',
				title: '评价时间',
				width: '20%',
				align: 'center'
			}, {
				field: 'judge_text',
				title: '评价内容',
				width: '40%',
				align: 'center'
			}]
		],
		id: 'order_info',
		page: true
	});

});
