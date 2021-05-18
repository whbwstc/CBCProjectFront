$(function() {
   FastClick.attach(document.body);

   $("#btnReg").click(function(){
	   //取帐号和密码
	   var  acc_name=$("#acc_name").val();
	   var acc_pwd=$("#acc_pwd").val();
	   var acc_email=$("#acc_email").val();
	   var verCode=$("#verCode").val();
	   if(!(/^[0-9]{11}$/.test(acc_name))){
		   $.alert("手机号不正确！","存不存提示", function() {
		     $("#acc_name").focus();
		   });
		   return;
	   }
	   if(acc_pwd==''){
		   $.alert("密码不能为空","存不存提示", function() {
			 $("#acc_pwd").focus();
		   });
		   return;
	   }
	   if(!(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(acc_email))){
	   		   $.alert("邮箱不正确！","存不存提示", function() {
	   		     $("#acc_name").focus();
	   		   });
	   		   return;
	   }
	   if(verCode==''){
	   		   $.alert("验证码不能为空","存不存提示", function() {
	   		     $("#acc_name").focus();
	   		   });
	   		   return;
	   }
	   sendRequest("account.user?m=login",{username:acc_name,password:acc_pwd},function(result){
			if(result.code==0){
				var value=$("#switchCP").prop("checked");
				if(value){
					sessionStorage.setItem("login_flag","ok");
				}
				
				sessionStorage.setItem("token",result.data.token);
				window.location.href="main.html";
			}else if(result.code==3){
				$.alert("帐号被锁定","卓应宝提示");
			}else{
				$.alert("帐号或密码错误！","卓应宝提示", function() {
				  $("#acc_name").focus();
				});
			}
	   })
   });
   
 });