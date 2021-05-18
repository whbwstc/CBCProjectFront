var vueApp; //公共的
var user_id = sessionStorage.getItem("user_id");

layui.use(['laydate', 'form'], function() {

	//创建VUEAPP
	vueApp = new Vue({
		el: "#scoreListApp", //指定绑定的html元素
		data: { //数据 双向绑定
			scoreList: {}
		}
	});
	//加载寄存点信息列表
	loadScoreList();
});

//专用加载数据
function loadScoreList() {
	//弹出加载窗口
	loading = layer.load(3, {
		shade: [0.1, '#000'] //0.1透明度的白色背景
	});
	
	sendRequestParam("cbcscore/scoreInfo", {page:null,limit:null,"user_id":user_id}, function(result) { //回调函数
		//将从后台查询过来的数据赋给vue 然后VUE会自动将数据显示绑定的指定位置
		vueApp.scoreList = result.data;
		//关闭
		layer.closeAll('loading');
	})
}

//获取积分总数
sendRequest("cbcuser/info/" + user_id, {}, function(result) {
	if (result.code == 0) {
		$("#score").val(result.data.userScore);
	}
});
