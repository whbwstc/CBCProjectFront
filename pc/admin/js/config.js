//公共的后台接口
var global_url = "http://localhost:8080/";
// var global_url="http://localhost:8080/CBCProject/";

//公用的发送请求的接口 自带token
function sendRequestAndToken(url, param, callBack) { //callback表示一个函数引用

	//如果没有参数 则创建
	if (!(param)) {
		param = new Object();
	}
	//取得本地的token值
	param.token = sessionStorage.getItem("token");
	$.ajax({
		//请求方式
		type: "POST",
		//请求地址
		url: global_url + url,
		//数据，json字符串
		data: param,
		//请求成功
		success: function(result) {
			if (result.code == 0) {
				//调用回调函数并给结果
				if (typeof callBack == "function") {
					callBack(result);
				}
			} else if (result.code == 2) {
				alert("请登录后再操作");
				//父窗体跳转
				parent.location.href = "../adminbackground/adminlogin.html";
			}
		},
		//请求失败，包含具体的错误信息
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
}

//公用的不带token的post请求(不能用RequestParam接受参数)
function sendRequest(url, param, callBack) {
	$.ajax({
		//请求方式
		type: "POST",
		//请求地址
		url: global_url + url,
		//数据，json字符串
		data: param,
		//数据类型
		dataType: "json",
		//内容类型
		contentType: "application/json",
		//请求成功
		success: function(result) {
			if (typeof callBack == "function") {
				callBack(result);
			}
		},
		//请求失败，包含具体的错误信息
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
}

//公用的不带token的post请求(可以用RequestParam接受参数)
function sendRequestParam(url, param, callBack) {
	$.ajax({
		//请求方式
		type: "POST",
		//请求地址
		url: global_url + url,
		//数据，json字符串
		data: param,
		//请求成功
		success: function(result) {
			if (typeof callBack == "function") {
				callBack(result);
			}
		},
		//请求失败，包含具体的错误信息
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
}

//公用的不带token的get请求
function sendRequestGet(url, param, callBack) {
	$.ajax({
		//请求方式
		type: "GET",
		//请求地址
		url: global_url + url,
		//数据，json字符串
		data: param,
		//数据类型
		dataType: "json",
		//内容类型
		contentType: "application/json",
		//请求成功
		success: function(result) {
			if (typeof callBack == "function") {
				callBack(result);
			}
		},
		//请求失败，包含具体的错误信息
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
}
