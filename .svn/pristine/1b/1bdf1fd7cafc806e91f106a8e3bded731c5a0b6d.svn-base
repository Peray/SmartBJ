var or = 60;
var ir = 60;
var mWidth = 22;
var mDLen = Math.sqrt(2 * Math.pow(mWidth, 2));
//第1菜单块中心点与以o(60,60)为圆心的的X轴的夹角为-90(-PI/2), 求菜单块中心点坐标
var m1X = parseInt((Math.cos(-1 * Math.PI / 2) * (ir + ((or - ir - mDLen) / 2) + mDLen / 2)) + 60 - mWidth / 2);
var m1Y = parseInt((Math.sin(-1 * Math.PI / 2) * (ir + ((or - ir - mDLen) / 2) + mDLen / 2)) + 143 - mWidth / 2);
var Cw = $(window).width();
$("#m1").width(mWidth);
$("#m1").height(mWidth);
$("#m1").offset({ top: m1Y, right: Cw - m1X });

var preX, preY; //上一次鼠标点的坐标
var curX, curY; //本次鼠标点的坐标
var preAngle; //上一次鼠标点与圆心(60,60)的X轴形成的角度(弧度单位)
var transferAngle; //当前鼠标点与上一次preAngle之间变化的角度

var a = 0;

//点击事件
$("#outerDiv").mousedown(function(event) {
	preX = event.clientX;
	preY = event.clientY;
	//计算当前点击的点与圆心(60,60)的X轴的夹角(弧度) --> 上半圆为负(0 ~ -180), 下半圆未正[0 ~ 180]
	preAngle = Math.atan2(preY - 140, Cw - preX - 60);
	//移动事件
	$("html").mousemove(function(event) {
		curX = event.clientX;
		curY = event.clientY;
			//计算当前点击的点与圆心(60,60)的X轴的夹角(弧度) --> 上半圆为负(0 ~ -180), 下半圆未正[0 ~ 180]
			var curAngle = Math.atan2(curY - 140, Cw - curX - 60);
			transferAngle = curAngle - preAngle;
			a += (transferAngle * 180 / Math.PI);
			$('#outerDiv').rotate(-a);
			//maprotate(-a)
			// for( var i = 1 ; i <= 8 ; i++ ){
			//     $("#m"+i).rotate(-a);
			// }
			preX = curX;
			preY = curY;
			preAngle = curAngle;
		});
	//释放事件
	$("html").mouseup(function(event) {
		$("html").unbind("mousemove");
	});
});
