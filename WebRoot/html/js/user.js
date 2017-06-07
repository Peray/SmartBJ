var userId = 0;      
var _username,txName;      
function getUser () {
		$.ajax({
			type: "get",
			url: "../../session/get_session_all?jsoncallback=?",
			data:{"keys":"all","t":new Date().getTime()},
			dataType: "jsonp",
			success: function(ret) {
				userId =  ret.success.U_ID;
				_username = ret.success.U_LoginName;
				txName = ret.success.U_PhotoUrl;
				var data = eval(ret);
				if(data.success.U_LoginName != null){
					$("#loginuser").show();
					$("#loginuser>img").attr("src","img/tx/"+txName);
					$("#usert").hide();
				}else{
					return;
				}
			},
			error: function(ret, ret1, ret2) {
				alert(ret.responseText);
				debugger;
			}
		});
}
