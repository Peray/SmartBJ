
//切换效果
$(".titled>ul>li").click(function () {
	var index = $(this).index();
	$(this).addClass('e').siblings().removeClass('e');
	$(".con").eq(index).show().siblings().hide();
})

//验证协议是否选中
$("#xieyi").click(function(event) {
	if($("#xieyi").is(":checked")){
		$("#subzhuce1").removeAttr("disabled").css("background-color","#2795dc");
		
	}else{
		$("#subzhuce1").attr("disabled","disabled").css("background-color","#ccc");
	}
});


var userlogId;
//验证用户名是否注册
function yzname(val) {
	var yhm = $("#logName").val();
	if (yhm.length >= 4) {
		$.ajax({
			type: "get",
			url: "/session/get__all_users",
			data: { "all": yhm },
			dataType: "text",
			success: function(ret) {
				var data = eval(ret);
				for(var i=0;i<data.length;i++){
					if (data[i].U_LoginName == yhm) {
						alert("该用户名已注册，请更换！");
						$("#logName").val("");
					}
				}
			},
			error: function(ret, ret1, ret2) {
				debugger;
			}
		});
	}
	if (val == '2') {
		registerSubmit();
	};
};






//注册账号
function registerSubmit() {
	var txImg = $(".txList.checked>img").attr("src");
	index = txImg.lastIndexOf("/");
	var txName = txImg.substring(index+1,txImg.length);
	var longName = $("#logName").val();
	var logonPwd = $("#logPwd").val();	
	var checkpwdObj = $("#checkpwd").val();
	var zcTime = new Date();
	$.ajax({
		type: "get",
		url: "/session/add_platformuser?jsoncallback=?",
		data: {
			"photourl": txName,
			"datetime":zcTime,
			"username": longName, 
			"pwd": logonPwd,
			"roleid":1,
			"servervalue":55,
			"modelvalue":55
		},
		dataType: "text",
		success: function(ret) {
			$("#tab1").click();
			alert("恭喜您！注册成功。请登录");
			$("#logName").val("");
			$("#logPwd").val("");
			$("#checkpwd").val("");
		},
		error: function(ret, ret1, ret2) {
			debugger;
		}
	});	
}




//头像选择
var _tx = $(".tx"),
	_txList = $(".txList"),
	_tx_ul = $(".tx_ul");
_tx.click(function() {
	_tx_ul.show();
});
_txList.click(function(){
	$(this).addClass("checked").siblings().removeClass("checked");
	var tx_check = $(".txList.checked>img").attr("src");
	_tx.attr("src",tx_check)
	_tx_ul.hide();

});
