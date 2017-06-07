
$(window).load(function() {
	$('body').delay(350).css({
		'overflow': 'visible'
	});
})

$(document).ready(function() {

	$(".ghty").click(function() {
		$(this).animate({
			width: '350px',
			height: '350px'
		}, 500, function() {
			$(".mapType").show();
			$(".checkboxe").show();
		});
		$(".msg_block").animate({
			width: '340px',
			height: '340px'
		}, 500);
		$("#pageflip").css({
			"width": "350px",
			"height": "350px"
		});
		$('.close2').delay(500).fadeIn(1500);
	});

	$(".close2").click(function() {
		$('.ghty').animate({
			width: '50px',
			height: '50px'
		}, 500);
		$(".msg_block").animate({
			width: '49px',
			height: '49px'
		}, 500);
		$("#pageflip").css({
			"width": "50px",
			"height": "50px"
		});
		$(this).hide();
		$(".mapType").hide();
		$(".checkboxe").hide();
	});

	var ss = $(window).height(),
		ww = $(window).width(),
		cr = 50;

	$(".papere").css("height", ss);
});
//------------------------------------------------------------- 


$(function() {
	//登陆注册弹出框
	$(".fontawesome-user").click(function() {
		$(".nor").addClass('md-show');
		$("#cesiumContainer").hide();
	})
	$(".close,.hidden-close").click(function() {
		$(".nor").removeClass('md-show');
		$("#cesiumContainer").show();
	})

	//切换效果
	$(".titled>ul>li").click(function() {
		var index = $(this).index();
		$(this).addClass('e').siblings().removeClass('e');
		$(".con").eq(index).show().siblings().hide();
	})

	$("#slides>ul>li").click(function() {
		var index = $(this).index();
		$(this).addClass('ot').siblings().removeClass('ot');
		$(".figge").eq(index).show().siblings(".figge").hide();
	})


	//点击logo返回首页
	$(".company-logo").click(function() {
		window.location.href = "index.html";
	})
})


$(function() {
	$("#suggestId").keyup(function() {
		var inputse = $("#suggestId").val();
		if (inputse == "") {
			$(".closes").css("visibility", "hidden");
			$("#searchResult").hide();
			clearBillboard();
		} else {
			$(".closes").css("visibility", "visible");
			tik();
		}
	})

	$("#suggestId").focus(function(){
		$(".place_more").show();
		$("#searchResult").hide();
	})
	$(".place_close").click(function() {
		$(".place_more").hide();
	});

	function tik() {
		$(".closes").click(function() {
			$("#suggestId").val("");
			$(".closes").css("visibility", "hidden");
			$("#searchResult").hide();
			clearBillboard();
		})
	}

	//关闭弹窗
	$(".md-close1").click(function() {
		$(".md-effect-1").removeClass('md-show');
		$("#cesiumContainer").show();
	})
	$(".md-close17").click(function() {
		$(".md-effect-17").removeClass('md-show');
	})
	$(".md-close19").click(function() {
		$(".md-effect-19").removeClass('md-show');
	})
})



//右下角仿百度图层切换开始
	var $mapTypeCard = $(".mapTypeCard");

	$mapTypeCard.click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
//右下角仿百度图层切换结束

var fontawesome_zoom_out = $(".fontawesome-zoom-out");
var fontawesome_zoom_in = $(".fontawesome-zoom-in");



fontawesome_zoom_in.on("click",function(evt){
	var zoomIn = "fontawesome-zoom-in";
	var zoomOut = "fontawesome-zoom-out";
	if(evt.target.className == zoomIn){
		$('#modal-1').animate({  
			width:1200 
		},{ 
			easing: 'easeInOutQuad', 
			duration: 500
		});

		$('#framdetail').animate({  
			height:600 
		},{ 
			easing: 'easeInOutQuad', 
			duration: 500, 
		}); 
		//$("#framdetail")[0].contentWindow.ew()

		$("#fd").removeClass("fontawesome-zoom-in").addClass("fontawesome-zoom-out");
	}else if(evt.target.className == zoomOut){
		$('#modal-1').animate({  
			width:480 
		},{ 
			easing: 'easeInOutQuad', 
			duration: 500
		});

		$('#framdetail').animate({  
			height:500 
		},{ 
			easing: 'easeInOutQuad', 
			duration: 500, 
		}); 

		$("#fd").removeClass("fontawesome-zoom-out").addClass("fontawesome-zoom-in");
	}
})
