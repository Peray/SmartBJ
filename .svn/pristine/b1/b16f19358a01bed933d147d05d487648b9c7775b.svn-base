/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-27 17:31:32
 * @version $Id$
 */



$(document).ready(function() {  
	//导航栏背景颜色
	// var navOffset=$(".top_bar").offset().top;  
	$(window).scroll(function(){  
		var scrollPos=$(window).scrollTop();  
		if(scrollPos >=400){  
			$(".top_bar").addClass('shadow');
			$(".ul_bar>li>a").addClass('f'); 
			$(".nav").addClass("fix"); 
		}else{  
			$(".top_bar").removeClass("shadow");  
			$(".ul_bar>li>a").removeClass('f'); 
			$(".nav").removeClass("fix");  
		}  
	});  
});  


 //解决方案列表效果
	 $(".Solution").hover(function(){
	 	$(".Solution_list").slideDown(500,function(){
	 		$(this).stop();
	 	});
	 },function(){
	 	$(".Solution_list").slideUp();
	 });


 
//控制texarea字数
// var textCount = {
// 	input:null,
// 	init:function(config){
// 		this.input = $(config.id);
// 		this.bind();
// 		//这边范围对应的对象，可以实现链式调用
// 		return this;
// 	},
// 	bind:function(){
// 		var self = this;
// 		this.input.on('keyup',function(){
// 			self.render();
// 		});
// 	},
// 	getNum:function(){
// 		return this.input.val().length;
// 	},
// 	//渲染元素
// 	render:function(){
// 		var num = this.getNum();

// 		if ($('.J_input_count').length == 0) {
// 			this.input.after('<span class="J_input_count" style="display:block;"></span>');
// 		};
// 		if(num >= 500){
// 			alert("字数超出限制");
// 		}
// 		$('.J_input_count').html('还可以输入'+(500-num)+'个字');
// 	}
// }

// $(function() {
// 	//在domready后调用
// 	textCount.init({id:'#textarea1'}).render();
// })




function sheheimg(value){
	var arr =[];
	$(".flow_span>span").each(function(i, e) {
		arr.push($(e).children('img'))
	});
	arr.length = value;
	for (var i = 0; i < arr.length; i++) {
		var tez =arr[i].attr('src').replace("1_", "2_");
		arr[i].attr('src',tez);
	}
}



























//图片上传
var n = 0;
function uploads(obj){
	//alert(obj.files.length);
	if (!obj.value.match(/.jpg|.gif|.png|.bmp/i))
	{
		alert("请选择图片文件！");
	}else{
		n = obj.files.length;
		var html = "";
		for (var i=0;i<n ;i++ ){
			var url = window.URL.createObjectURL(obj.files[i]);
			var txt = obj.files[i].name.split(judge(obj.files[i]));
			//txt = txt.split("")
			html += "<div class='imgBox'>" +
			"<div class='bg' style='background:url("+url+") no-repeat center;background-size:100% 100%'>" +
			"</div>"+
			"<p style='text-align:center;'>"+txt[0]+
			"</p>"+
			"<span class='del'>删除"+
			"</span>"+
			"</div>";
		}
		$(".upfile").remove();
		$(".newUpload").remove();
		$("#imgs").append(html+"<div class='newUpload'>"+
			"<span>"+"<img src='img/timg.jpg' alt=''>"+"</span>"+
			"<input type='file' name='file' multiple='true' id='btn' onchange='uploads(this)' >"+
			"<p>按住Ctrl可多选照片</p>"+
			"</div>");
	}

}
function judge(obj){
	var str = "";
	if (obj.name.match(/.jpg/i))
	{
		str = ".jpg";
	}else if (obj.name.match(/.png/i))
	{
		str = ".png";
	}else if (obj.name.match(/.gif/i))
	{
		str = ".gif";
	}else if (obj.name.match(/.bmp/i))
	{
		str = ".bmp";
	}
	return str;
};

$(".del").click(function(){
	$(".imgBox").remove();
})
$("td input").click(function(){
	var a = $("input[name='date']:checked").val();
console.log(a);
})

