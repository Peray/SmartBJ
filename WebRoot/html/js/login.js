﻿// $(document).ready(function () {
// 	var username = getCookie("username");
// 	var password = getCookie("password");
// 	if (username == "edit" && password == "eastdawn010") {
// 		$("#usert").hide();
// 		$("#loginuser").show();
// 		$("#loginuser").html("<img src='img/user.png' />");
// 		if (window.location.href.indexOf('map.html') > 0) {
// 			$(".left-direction").addClass('vis-show');
// 		}
// 	}
// });

// function login() {
// 	var username = $("#users").val(); ;
// 	var password = $("#password").val();
// 	if (username == "edit" && password == "eastdawn010") {
// 		setCookie("username", username);
// 		setCookie("password", password);
// 		$("#usert").hide();
// 		$("#loginuser").show();
// 		$("#loginuser").html("<img src='img/user.png' />")
// 		if (window.location.href.indexOf('map.html') > 0) {
// 			$(".left-direction").addClass('vis-show');
// 		}
// 	}
// }

// //写cookies
// function setCookie(name, value) {
// 	var Days = 7;
// 	var exp = new Date();
// 	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
// 	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
// }

// //删除cookie中所有定变量函数    
// function delAllCookie() {
// 	var data = document.cookie;
// 	var dataArray = data.split("; ");
// 	for (var i = 0; i < dataArray.length; i++) {
// 		var varName = dataArray[i].split("=");
// 		document.cookie = varName[0] + "=''";
// 	}

// }

// //读取cookies
// function getCookie(name) {
// 	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
// 	if (arr = document.cookie.match(reg))
// 		return unescape(arr[2]);
// 	else
// 		return null;
// }


//随机数
function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                    return parseInt(Math.random()*minNum+1); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
            break; 
            default: 
                return 0; 
            break; 
        } 
} 

function loginsuccess(){
	var num = randomNum(0,2);
	var arrImg = ['user.png','tx_03.png','toux2_14.png'];
	var n = arrImg[num];
	$.post("logon!getUserName.action",
        function(data,ret){
		    var data = eval("("+data+")");
		    	if(data != 1){
		    		$("#usert").hide();
					$("#loginuser").show();
		    		$("#loginuser").html("<img src='img/"+ n +" '  alt='"+ data +"'/>")
		    		if (window.location.href.indexOf('map.html') > 0) {
					    $(".left-direction").addClass('vis-show');
					}
		    	}else{
		    		$("#usert").hide();
					$("#usert").show();
		    	}
		},
	"text");
}


//登陆输入框抖动
$("#subdeng1").click(function () {
	// login();
	var index_we = $("#subdeng p").eq(0).children('input');
	var index_we1 = $("#subdeng p").eq(1).children('input');
	if (index_we.val() == 0) {
		index_we.addClass('shake')
		index_we1.removeClass('shake');
	} else if (index_we1.val() == 0) {
		index_we1.addClass('shake')
		index_we.removeClass('shake');
	} else {
		index_we.removeClass('shake');
		index_we1.removeClass('shake');
	}
});