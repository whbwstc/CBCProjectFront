var vueApp;//公共的
$(function() {
	vueApp = new Vue({
		el: "#odrListApp", //指定绑定的html元素
		data: { //数据 双向绑定
			odrList: {}
		},
		methods:{
			odrDetails: function(order_id) {
				sessionStorage.setItem("order_id",order_id);
				location.href="order_details.html";
			}
		}
	});	
	
	findOrderAll();
});

function findOrderAll() {
	var user_id = sessionStorage.getItem("user_id");
	sendRequestParam("cbcorder/orderInfo",{page:null,limit:null,user_id:user_id},function(result){
		if(result.code==0){
			vueApp.odrList = result.data;
		} else if(result.code==1) {
			$.alert(result.msg);
		}
	})
}