
$(function () {
	//登陆注册弹出框
	$("#usert").click(function () {
		$(".nor").addClass('md-show');
	})
	$(".close").click(function () {
		$(".nor").removeClass('md-show');
	})


	//帮助
	$("#helos").click(function () {
		$("#slides").slideToggle();
	})


	//IE9以下出现  点击更多
	$("#morw").click(function () {
		$("#more table").show(0, function () {
			$("#more>p").html("<span id='erd' class='entypo-cancel' style='color:#000;font-size:18px;'></span>").css("text-align", "right");
			$("#erd").click(function () {
				$("#more").hide();
			});
		});
	})

	//明细
	$(".detail>span").hover(function () {
		$("#more,#more>table").show();
		$("#more>p").hide();
	}, function () {
		$("#more,#more>table").hide();
		$("#more>p").show();
	});

$(".position>img").attr("src","img/home/sy_dw_07.png");
	//解决方案列表效果
	var a = true;
	$(".position").click(function(){
		if(a){
			$(".Solution_list").show();
		}else{
			$(".Solution_list").hide();
		};
		a =!a;
	})
	
	
	//解决方案二级菜单
	$(".jjfa").click(function(){
		var block = $(this).children("ul").css("display");
		if(block == 'none'){
			$(this).children("ul").slideDown();
		}else{
			$(this).children("ul").slideUp();
		}
		
	})
})




//退出框效果
	var quitshow = true;
	$("#loginuser").click(function () {
		if (quitshow) {
			$(".exits").show();
		} else {
			$(".exits").hide();
		}
		quitshow = !quitshow;
		
	});
	


//背景星空
$(document).ready(function() {
	$('body').height($(window).height());
	$('#particles').particleground({
		dotColor: '#fff',
		density: 55000,
		lineColor: 'rgba(255,255,255,.4)',
	});
});










