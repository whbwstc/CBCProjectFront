layui.use(['layer', 'form', 'layarea'], function() {
	var form = layui.form;
	var layer = layui.layer;
	var layarea = layui.layarea;

	var store_city = '湖南省 衡阳市';
	var store_state = 1;

	form.verify({
		EmptyNumber: [
			/^\+?[1-9][0-9]*$/, '格式错误'
		]
	});

	layarea.render({
		elem: '#area-picker',
		change: function(res) {
			//选择结果
			store_city = res.province +' '+ res.city;
			console.log(res);

		}
	});

	form.on('select(state)', function(data) {
		store_state = data.value;
	});


	//监听提交
	form.on('submit(ajaxTest)', function(data) {
		var cbcStore = {
			storeName: $("#store_name").val(),
			storeAddr: $("#store_addr").val(),
			storeCity: store_city,
			luggageNum: $("#luggage_num").val(),
			bagNum: $("#bag_num").val(),
			storeState: store_state
		};
		sendRequest("cbcstore/save", JSON.stringify(cbcStore), function(result) {
			if (result.code == 0) {
				layer.msg("添加成功！", {
					icon: 1,
					time: 2000
				});
			} else {
				layer.msg("添加失败！", {
					icon: 1,
					time: 2000
				});
			}
			$("#form")[0].reset();
			form.render();
		});
		return false;
	});

});
