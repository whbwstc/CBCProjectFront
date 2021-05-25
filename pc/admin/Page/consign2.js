var user_id = sessionStorage.getItem("user_id");
var store_id = sessionStorage.getItem("store_id");
var store_name = sessionStorage.getItem("store_name");
var enter_time = sessionStorage.getItem("enter_time");
var out_time = sessionStorage.getItem("out_time");
var luggage_num = sessionStorage.getItem("luggage_num");
var bag_num = sessionStorage.getItem("bag_num");
var days = sessionStorage.getItem("days");
var order_money = (Number(luggage_num) * 10 + Number(bag_num) * 5) * days;

layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//日期
	laydate.render({
		elem: '#enter_time'
	});
	laydate.render({
		elem: '#out_time'
	});

	if (enter_time != null && out_time != null && luggage_num != null && bag_num != null && order_money !=
		null) {
		//寄存下单
		form.on('submit(demo1)', function(data) {
			var cbcOrder = {
				userId: user_id,
				storeId: store_id,
				enterTime: enter_time,
				outTime: out_time,
				luggageNum: luggage_num,
				bagNum: bag_num,
				orderMoney: order_money,
				orderCode: Math.ceil(Math.random() * 100000000),
				orderState: 1
			};
			sendRequest("cbcorder/save", JSON.stringify(cbcOrder), function(result) {
				if (result.code == 0) {
					layer.msg("添加成功！", {
						icon: 1,
						time: 2000
					},function(){
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
						parent.layer.close(index); //再执行关闭  
					});
   
				} else {
					layer.msg(result.msg, {
						icon: 2,
						time: 2000
					},function(){
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
						parent.layer.close(index); //再执行关闭  
					});
				}
				sessionStorage.removeItem("store_id");
				sessionStorage.removeItem("store_name");
				sessionStorage.removeItem("enter_time");
				sessionStorage.removeItem("out_time");
				sessionStorage.removeItem("luggage_num");
				sessionStorage.removeItem("bag_num");
				sessionStorage.removeItem("days");
			});
			return false;
		});
	}

});

// 显示用户信息
$("#input1,#input2,#input3,#input4").ready(function() {
	$("#input1").val(store_name);
	$("#input2").val(luggage_num);
	$("#input3").val(bag_num);
	if (order_money != null) {
		$("#input4").val(order_money);
	}
});
