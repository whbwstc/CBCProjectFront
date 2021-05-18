$(function() {
	//请求头部HTML
	$.get("header.html", function(res) {
		$("#header_box").html(res);
	});
	//请求尾部HTML
	$.get("footer.html", function(res) {
		$("#footer_box").html(res);
	});
});