$(function(){
	//标题切换
	$(".ul-title>li").click(function(){
		var index = $(this).index();
		$(".ul-title>li").removeClass('title-style');
		$(".ul-title>li").eq(index).addClass('title-style')
		$(".ul-content").removeClass('e');
		$(".ul-content").eq(index).addClass('e');
	})
	//计算众筹的高度
	var h = 472-$(".ul-title").height();
	$("#ul_scroll").height(h);

	//添加滚动条
	$("#details").niceScroll({
		cursorcolor: "#ccc",
		cursoropacitymax: 1,
		touchbehavior: false,
		cursorwidth: "5px",
		cursorborder: "0",
		cursorborderradius: "5px"
	});
	//ajax获取数据
	var value = getUrlParam("id");
	$.ajax({
		type: 'post',
		url: system.queryurl + "?jsoncallback=?",
		dataType: 'jsonp',
		data: { id:value,type:'info', random: Math.random() },
		success:function(ret){
			ret = eval(ret);
			var div = "";
			for (var i = 0; i <  ret.data.length; i++) {
				div += '<p class="ajaxHtml_name">'+'<span>'+ret.data[i].NAME+'</span>'+'</p>'+
						'<p class="ajaxHtml_detail">'+ret.data[i].address+'</p>'
			}
			$(".ajaxHtml").html(div);
		}
	});
})
//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}