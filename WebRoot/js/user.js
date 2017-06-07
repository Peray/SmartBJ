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

function searchSq(){
	if(userId == 0 || typeof(userId)  == 'undefined'){
		alert("请登录后在执行该项操作");
		return;
	}else{
		$.post("qiye!execute.action",{"userId":userId},
			  function(data,ret){
			      data = eval("("+data+")");
			      if(data.list.length == 0){
			      		window.location.href='app_qy/application_1.html';
			      }else if(data.list[0].status == '0'){
			      		window.location.href='app_qy/application_2.html';
			      }else if(data.list[0].status == '1'){
			      	    window.location.href='app_qy/application_3.html';
			      }else if(data.list[0].status == '2'){
			      		window.location.href='app_qy/application_5.html';
			      }
			  },
		"text");
	}
}




//退出
function deletesession(){
	$(".exits").hide();
	if(confirm("确定退出吗？")){
	    if(_username){
            $.ajax({
                type: 'get',
                url: '/session/clearsession?jsoncallback=?',//生成唯一标识
                data: {"username":_username,"t":new Date().getTime()} ,
                dataType:"jsonp",
                success: function(res){
                    res = eval(res);
                    $("#loginuser").hide();
					$(".fontawesome-user").show();
					$(".left-direction").removeClass('vis-show');
                    location.href = "index.html";
             }});
        }
	  }else{
		  //alert("no")
		return;
	  }
}

