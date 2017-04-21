
$(function () {
	//加载进入动画
	$("section").css({ "bottom": "40px", "right": "0" });
	$("section").addClass('runb');
	//登陆注册弹出框
	$("#usert").click(function () {
		$(".nor").addClass('md-show');
	})
	$(".close").click(function () {
		$(".nor").removeClass('md-show');
	})

	//切换效果
	$(".titled>ul>li").click(function () {
		var index = $(this).index();
		$(this).addClass('e').siblings().removeClass('e');
		$(".con").eq(index).show().siblings().hide();
	})

	$("#slides>ul>li").click(function () {
		var index = $(this).index();
		$(this).addClass('ot').siblings().removeClass('ot');
		$(".figge").eq(index).show().siblings(".figge").hide();
	})

	//帮助
	$("#helos").click(function () {
		$("#slides").slideToggle();
	})

	//退出
	var quitshow = true;
	$("#loginuser").click(function () {
		if (quitshow) {
			$(".exits").show();
			//delAllCookie();
		} else {
			$(".exits").hide();
		}
		quitshow = !quitshow;
		
	});
	$(".exit-user").click(function () {
		$.post("logon!logout.action",
	        function(data,ret){
			    var data = eval("("+data+")");
			    	if(data == 1){
			    		$("#loginuser").hide();
						$("#usert").show();
						$(".exits").hide();
			    	}
			},
		"text");
	})

	//点击更多
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



	//注册输入框抖动
	$("#subzhuce1").click(function () {
		var zhuce = $("#subzhuce p").eq(0).children('input');
		var zhuce1 = $("#subzhuce p").eq(1).children('input');
		var zhuce2 = $("#subzhuce p").eq(2).children('input');
		if (zhuce.val() == 0) {
			zhuce.addClass('shake');
			zhuce1.removeClass('shake');
			zhuce2.removeClass('shake');
		} else if (zhuce1.val() == 0) {
			zhuce1.addClass('shake');
			zhuce.removeClass('shake');
			zhuce2.removeClass('shake');
		} else if (zhuce2.val() == 0) {
			zhuce2.addClass('shake');
			zhuce.removeClass('shake');
			zhuce1.removeClass('shake');
		} else {
			zhuce.removeClass('shake');
			zhuce2.removeClass('shake');
			zhuce1.removeClass('shake');
		}
	});

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




$(document).ready(function() {
	$('body').height($(window).height());
	$('#particles').particleground({
		dotColor: '#fff',
		density: 55000,
		lineColor: 'rgba(255,255,255,.4)',
	});
});









//earth
function Earth() {

	var stage = new Clay.Stage(800, 600);
	var world = stage.getWorld();
	var camera = stage.getCamera();

	camera.set(0,0,0);
	camera.setResolution(800, 600);
	camera.setTarget(new Clay.Vector(-100,0,100));

	window.onresize = function() {
		stage.resizeTo(
			window.innerWidth || document.documentElement.clientWidth,
			window.innerHeight || document.documentElement.clientHeight
			);
	};

	window.onresize();

	Clay.Collada.load('img/collada/earth.xml', function(scene) {
		scene.init(stage);

		var earth = new Clay.Texture('img/collada/map_01.png', stage);

		var clouds = new Image();
		clouds.src = 'img/collada/earthclouds1k.png';

		var waiting = setInterval(function(){
			if (earth.complete && clouds.complete){ //在括号里面 && dark.complete 
				clearInterval(waiting);
				play();
				$(".position>img").attr("src","img/home/sy_dw_07.png");
			}
		}, 1);
		

		function play() {
			var shape = world.getShapes()[0];
			shape.setMaterial(earth);

			var x, y, z, t = Math.PI/8, r = 0, tick = 0.01, radius = 250;
			
			var ttx = earth.canvas.getContext('2d');
			var base = earth.image;
			var wind = 0;
			
			stage.addEvent('enterframe', function(){

				ttx.drawImage(base, 0,0);
				var pos = (++wind)%1000;
				ttx.drawImage(clouds, pos, 0);
				ttx.drawImage(clouds, pos-1000, 0);		

				t += tick;
				x = -100 + Math.sin(t) * radius;
				z = 100 + Math.cos(t) * radius;
				y = Math.cos(t/3) * 50
				camera.set(x, 0, z);
			});

			stage.run();
		}
	});
	
}

window.addEventListener('load', function(){
	//$(".md-overlay").addClass("loading");
	new Earth();
	
}, false);
//$(".md-overlay").removeClass("loading");



