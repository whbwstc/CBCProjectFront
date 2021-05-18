layui.use(['form', 'layedit', 'laydate', 'layer', 'rate'], function() {
	form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		rate = layui.rate,
		laydate = layui.laydate,

	judge_grade = 3;
	//自定义文本
	rate.render({
		elem: '#test5',
		value: 3,
		text: true,
		setText: function(value) { //自定义文本的回调
			var arrs = {
				'1': '极差',
				'2': '差',
				'3': '中等',
				'4': '好',
				'5': '极好'
			};
			this.span.text(arrs[value] || (value + "星"));
		},
		choose: function(value) {
			judge_grade = value;
		}
	});


	//监听提交
	form.on('submit(demo1)', function(data) {

		order_id = sessionStorage.getItem("order_id");

		cbcJudge = {
			orderId: order_id,
			judgeGrade: judge_grade,
			judgeText: $("#judgeText").val()
		};

		sendRequest("cbcjudge/update", JSON.stringify(cbcJudge), function(result) {
			if (result.code == 0) {
				layer.msg("评价成功！", {
					icon: 1,
					time: 2000
				}, function() {
					var index = parent.layer.getFrameIndex(window
						.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭  
				});
			} else {
				layer.msg(result.msg, {
					icon: 1,
					time: 2000
				});
			}
			sessionStorage.removeItem("order_id");
		})
		return false;
	});

});
