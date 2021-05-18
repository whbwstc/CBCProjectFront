var vueApp; //公共的

layui.use(['laydate', 'form'], function() {

	//创建VUEAPP
	vueApp = new Vue({
		el: "#storeListApp", //指定绑定的html元素
		data: { //数据 双向绑定
			storeList: {}
		},
		methods: {
			orderManager: function(storeId, storeAddr, storeState, bagNum, luggageNum, storeCity) {
				//寄存点击事件
				orderManager(storeId, storeAddr, storeState, bagNum, luggageNum, storeCity);
			},
			addrManager: function(storeId, bagNum, luggageNum, storeCity, storeAddr, storeState) {
				//寄存点击事件
				addrManager(storeId, bagNum, luggageNum, storeCity, storeAddr, storeState);
			}
		}
	});
	//加载寄存点信息列表
	loadStoreList();
	//获取城市查询寄存点
	storeManager();
});



//专用加载数据
function loadStoreList() {
	//弹出加载窗口
	loading = layer.load(3, {
		shade: [0.1, '#000'] //0.1透明度的白色背景
	});
	sendRequest("cbcstore/listAll", {}, function(result) { //回调函数
		//将从后台查询过来的数据赋给vue 然后VUE会自动将数据显示绑定的指定位置
		vueApp.storeList = result.data;
		//关闭
		layer.closeAll('loading');
	})
}
//获取所选城市
function storeManager() {
	//取得所选城市
	$("#btn-query").click(function() {
		var store_city = $("#store_city").val();
		if (store_city == "") {
			$.alert("请先选择你的城市");
		} else {
			sendRequestParam("cbcstore/getStoreByCity", {
				store_city: store_city
			}, function(result) {
				//成功
				if (result.code == 0) {
					vueApp.storeList = result.data;
				} else { //失败
					$.alert(result.msg);
				}

			})
		}


	})
}
//寄存按钮
function orderManager(storeId, storeAddr, storeState, bagNum, luggageNum, storeCity) {
	$("#btn-store"+storeId).click(function() {
		if (storeState != 1) {
			$.alert("抱歉，该店暂未营业!", "提示");
			// layer.msg("抱歉，该店暂未营业!");
		} else if (bagNum == 0 && luggageNum == 0) {
			$.alert("抱歉，该店寄存柜已满");
		} else {
			sessionStorage.setItem("store_id", storeId);
			sessionStorage.setItem("store_city", storeCity);
			sessionStorage.setItem("store_addr", storeAddr);
			sessionStorage.setItem("bag_null", bagNum); //空位数量
			sessionStorage.setItem("luggage_null", luggageNum); //空位数量

			window.location.href = 'store_add.html';
		}


	})
}
//查看详情
function addrManager(storeId, bagNum, luggageNum, storeCity, storeAddr, storeState) {

	$("#btn-look" + storeId).click(function() {
		
		sessionStorage.setItem("store_id", storeId);
		sessionStorage.setItem("store_city", storeCity);
		sessionStorage.setItem("store_addr", storeAddr);
		sessionStorage.setItem("luggage_null", luggageNum); //空位数量
		sessionStorage.setItem("bag_null", bagNum); //空位数量
		sessionStorage.setItem("store_state", storeState);
		window.location.href = 'store_details.html';

	})
}
