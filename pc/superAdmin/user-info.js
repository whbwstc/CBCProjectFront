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
				width: '15%',
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
				width: '20%',
				align: 'center'
			}, {
				field: 'user_email',
				title: '邮件',
				width: '20%',
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
			}]
		],
		page: true
	});

});
