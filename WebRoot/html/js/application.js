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


//反馈页面控制输入字符
	var $fk_des = $("#fk_des");
	$fk_des.keyup(function(){
		var $spana = $(".textarea_tip");
		var len = $(this).val().length;
		var num = 500 - len;
		if($fk_des.val() > 0){
			$spana.show().children("span").text(num);
		}else{
			$spana.hide();
		}
	});
	
	
//设置section min-height
	var $window_h = $(window).height(),
		$section = $("section"),
		$section_h = $window_h - 432;
	$section.css("min-height",$section_h);
	
	
























//图片上传
var n = 0;
function uploads(obj){
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

// function upload(obj){
// 	if (!obj.value.match(/.jpg|.gif|.png|.bmp/i)){
// 		alert("请选择图片文件！");
// 	}else{
// 		var html = "";
// 		var url = window.URL.createObjectURL(obj.files[0]);
// 		var txt = obj.files[0].name.split(judge(obj.files[0]));
// 		html += "<img src='"+url+"' data-action='zoom'/>"+
// 				"<p class='p_txt'>"+txt[0]+"</p>"+
// 				"<span class='del'>删除</span>"
// 	}
// 	$("#imgs").html(html)
// 	$(".upfile").remove();	
// }


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



 