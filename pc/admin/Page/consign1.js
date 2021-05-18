layui.use(['form', 'layedit', 'laydate', 'layer'], function() {
	form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//自定义验证规则
	form.verify({
		number1: [/^[0-9][0-9]*$/, '数量必须为正整数'],
	});

	//存入日期
	laydate.render({
		elem: '#enter_time',
		type: 'date',
		lang: 'cn',
		format: 'yyyy/MM/dd',
		trigger: 'click',
		min: 0, // 这里是设置最小日期
		max: 10, // 这里是设置最大日期
		btns: ['clear', 'now', 'confirm']
	});

	//取出日期
	laydate.render({
		elem: '#out_time',
		type: 'date',
		lang: 'cn',
		format: 'yyyy/MM/dd',
		trigger: 'click',
		min: 0, // 这里是设置最小日期
		max: 10, // 这里是设置最大日期
		btns: ['clear', 'now', 'confirm']
	});

	//监听提交
	form.on('submit(demo1)', function(data) {
		//获取寄存点的空位数
		var bagNum =parseInt(sessionStorage.getItem("bagNum"));
		var luggageNum = parseInt(sessionStorage.getItem("luggageNum"));

		var enter_time = $("#enter_time").val();
		var out_time = $("#out_time").val();
		var luggage_num = $("#luggage_num").val();
		var bag_num = $("#bag_num").val();

		if (luggage_num == 0 && bag_num == 0) {
			layer.msg("行李箱和背包类数量不能都为0",{
				icon: 2,
				time: 2000
			});
		} else if (luggage_num > luggageNum && bag_num > bagNum) {
			layer.msg("该寄存点行李箱和背包类空位数量不足,请选择其他的寄存点进行寄存", {
				icon: 2,
				time: 2000
			});
		} else if (luggage_num > luggageNum) {
			layer.msg("该寄存点行李箱空位数量不足,请选择其他的寄存点进行寄存", {
				icon: 2,
				time: 2000
			});
		} else if (bag_num > bagNum) {
			layer.msg("该寄存点背包类空位数量不足,请选择其他的寄存点进行寄存", {
				icon: 2,
				time: 2000
			});
		} else {
			sendRequestParam("cbcorder/countDayPC", {
				enter_time: enter_time,
				out_time: out_time
			}, function(result) {
				if (result.code == 0) {
					sessionStorage.removeItem("bagNum");
					sessionStorage.removeItem("luggageNum");
					sessionStorage.setItem("days", result.data + 1);
					sessionStorage.setItem("enter_time", enter_time);
					sessionStorage.setItem("out_time", out_time);
					sessionStorage.setItem("luggage_num", luggage_num);
					sessionStorage.setItem("bag_num", bag_num);
					
					layer.open({
						type: 2,
						content: 'consign2.html',
						area: ['600px', '400px'],
						offset: ['0px', '0px'],
						title: '',
						closeBtn: 0,
						end: function() {
							parent.location.reload(); // 父页面刷新
							var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
							parent.layer.close(index); //再执行关闭
						}
					   
					});
				} else {
					layer.msg(result.msg, {
						icon: 2,
						time: 2000
					},function(){
						$("#enter_time").focus();
					});
				}
			})
		}
		return false;
	});

});
