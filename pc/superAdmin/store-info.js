layui.use(['element', 'table', 'form'], function() {
	var element = layui.element;
	var table = layui.table,
		form = layui.form;


	table.render({
		elem: '#test',
		url: global_url + 'cbcstore/list', //json数据的url地址
		parseData: function(res) { //res 即为原始返回的数据
			return {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.arg1, //解析数据长度
				"data": res.data //解析数据列表
			}
		},
		title: '寄存点信息',
		cols: [
			[{
				field: 'store_id', //和数据库中的字段名一致
				title: 'ID',
				width: '10%',
				fixed: 'left',
				unresize: true,
				sort: true,
				edit: false,
				align: 'center'
			}, {
				field: 'store_name',
				title: '名称',
				width: '15%',
				edit: false,
				align: 'center'
			}, {
				field: 'store_addr',
				title: '地址',
				width: '15%',
				edit: false,
				align: 'center'
			}, {
				field: 'store_city',
				title: '所属城市',
				width: '15%',
				edit: false,
				align: 'center'
			}, {
				field: 'luggage_num',
				title: '行李箱类空位数量',
				width: '13%',
				edit: false,
				align: 'center'
			}, {
				field: 'bag_num',
				title: '背包类空位数量',
				width: '12%',
				edit: false,
				align: 'center'
			}, {
				field: 'store_state',
				title: '状态',
				width: '11%',
				edit: false,
				align: 'center',
				templet: function(d) {
					var state = "";
					if (d.store_state == "1") {
						state = "<input type='checkbox' value='" + d.store_id +
							"' id='status' lay-filter='stat' checked='checked' name='status'  lay-skin='switch' lay-text='ON|OFF' >";
					} else {
						state = "<input type='checkbox' value='" + d.store_id +
							"' id='status' lay-filter='stat'  name='status'  lay-skin='switch' lay-text='ON|OFF' >";
					}
					return state;
				}
			}, {
				fixed: 'right',
				title: '操作',
				toolbar: '#barDemo',
				width: '10%',
				align: 'center'
			}]
		],
		page: true
	});

	//监听开关事件
	form.on('switch(stat)', function(data) {
		var contexts;
		var sta;
		var x = data.elem.checked; //判断开关状态
		console.log(x);
		console.log(data);
		if (x == true) {
			contexts = "开启";
			sta = 1;
		} else {
			contexts = "关闭";
			sta = 2;
		}
		//自定义弹窗
		layer.open({
			content: "确定要使寄存点的状态改变为" + contexts + "?",
			btn: ['确定', '取消'],
			btnAlign: 'c',
			yes: function(index, layero) {
				sendRequest("cbcstore/updateState/" + sta + "/" + data.value, {},
					function(result) {
						if (result.code == 0) {
							layer.msg("修改成功", {
								icon: 1,
								time: 2000
							},function(){
								location.href = "store-info.html";
							});
						} else {
							layer.msg("修改失败", {
								icon: 2,
								time: 2000
							});
						}
						table.render();
					});
			}
		});
		return false;
	});

	//监听行工具事件
	table.on('tool(test)', function(obj) {
		var data = obj.data;
		var store_id = data.store_id;
		var store_state = data.store_state;
		var store_addr = data.store_addr;

		if (obj.event === 'delete') {
			layer.confirm('确定删除寄存点信息？', function(index) {
				if (store_state == 2) {
					obj.del();
					sendRequest("cbcstore/delete/" + store_id, {}, function(result) {
						if (result.code == 0) {
							layer.msg("删除成功！", {
								icon: 1,
								time: 2000
							},function(){
								location.href = "store-info.html";
							});
						} else {
							layer.msg("删除失败！", {
								icon: 2,
								time: 2000
							});
						}
					});
				} else {
					layer.msg("该寄存点尚在营业！", {
						icon: 2,
						time: 2000
					});
				}
			});
		}
	});
});
