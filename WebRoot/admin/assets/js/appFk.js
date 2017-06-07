$(function() {
	// 读取body data-type 判断是哪个页面然后执行相应页面方法，方法在下面。
	var dataType = $('body').attr('data-type');
	console.log(dataType);

	autoLeftNav();
	$(window).resize(function() {
		autoLeftNav();
		console.log($(window).width())
	});
})




// 风格切换
$('.tpl-skiner-toggle').on('click', function() {
	$('.tpl-skiner').toggleClass('active');
})

$('.tpl-skiner-content-bar').find('span').on('click', function() {
	$('body').attr('class', $(this).attr('data-color'))
	saveSelectColor.Color = $(this).attr('data-color');
	// 保存选择项
	storageSave(saveSelectColor);

})






// 侧边菜单开关
function autoLeftNav() {
	$('.tpl-header-switch-button').on('click', function() {
		if ($('.left-sidebar').is('.active')) {
			if ($(window).width() > 1024) {
				$('.tpl-content-wrapper').removeClass('active');
			}
			$('.left-sidebar').removeClass('active');
		} else {

			$('.left-sidebar').addClass('active');
			if ($(window).width() > 1024) {
				$('.tpl-content-wrapper').addClass('active');
			}
		}
	})

	if ($(window).width() < 1024) {
		$('.left-sidebar').addClass('active');
	} else {
		$('.left-sidebar').removeClass('active');
	}
}




// 侧边菜单
$('.sidebar-nav-sub-title').on('click', function() {
	$(this).siblings('.sidebar-nav-sub').slideToggle(80).end().find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
})

$(window).load(function() {
	getdata(1,true);
});

var rp = 10;
//加载企业信息
function getdata(page,b){
	$.ajax({
		type:'post',
		url: 'fkAdmin!execute.action',
		dataType: 'json',
		data: { statr: page,rp:rp},
		success:function(ret){
			ret = eval(ret);
			var div = "";
			totalitems = ret.num;
			if (totalitems == 0) {
				ul = '<tr class="gradeX">没有查询到相关数据</tr>';
			}
			for (var i = 0; i < ret.list.length; i++) {
				var date = new Date(ret.list[i].time.time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						D = date.getDate();
				div += '<tr class="gradeX">'+
							'<td>'+(i+1)+'</td>'+
							'<td class="fb_content">'+ret.list[i].content+'</td>'+
							'<td>'+ret.list[i].telephone+'</td>'+
							'<td>'+Y+M+D+'</td>';
							if(ret.list[i].status == 1){
								div += '<td><span class="am-badge am-badge-warning">未读</span></td>';
							}else{
								div += '<td><span class="am-badge am-badge-secondary">已读</span></td>';
							}
							div += '<td>'+
								'<div class="tpl-table-black-operation">'+
									'<a href="javascript:;" class="tpl-table-black-operation-del" onclick="detal('+ret.list[i].fkId+')">'+
										'<i class="am-icon-trash">'+'</i>查看'+
									'</a>'+
								'</div>'+
							'</td>'+
						'</tr>'
			}
			$(".neirong").html(div);

			if(b){
				initPage(totalitems);
				//排序
				$('#example-e').DataTable({
					bInfo: false, 
					dom: 'ti'
				});
			}
			
		},
		error: function(ret, ret1, ret2) {
			debugger;
		}
	})
	
};

//分页
function initPage(totalitems) {
	if (totalitems > 0) {
		$.jqPaginator('#pagination2', {
			totalPages: Math.ceil(totalitems/rp),
			visiblePages: 10,
			currentPage: 1,
			activeClass:'am-active',
			disableClass:'am-disabled',
			prev: '<li class="prev"><a href="javascript:;">«</a></li>',
			next: '<li class="next"><a href="javascript:;">»</a></li>',
			page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
			onPageChange:function(num,type){
				if(num!=1){
					getdata(num,false);
				}if(num == 1){
					getdata(1,false);
				}
			}
		});
	}
}










//模态框

var i;
var weishenhe = '<span class="am-badge am-badge-secondary">未审核</span>';
var yiguoqi = '<span class="am-badge am-badge-danger">已过期</span>';											
var yikaitong = '<span class="am-badge am-badge-success">已开通</span>';
var weitongguo = '<span class="am-badge am-badge-warning">未通过</span>';


function detal(id){
	$("#my-alert").modal('open');
	$.ajax({
		type:'post',
		url: 'fkAdmin!detail.action',
		dataType: 'json',
		data:{fkId:id},
		success:function(ret){
			ret = eval(ret);
			getdata(1,false);
			var div="";
			div += 	'<table width="100%" class="am-table">'+
						'<tbody class="ta_info">'+
					'<tr>'+
						'<td>反馈内容：</td>'+
						'<td>'+ret.list[0].content+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系电话：</td>'+
						'<td>'+ret.list[0].telephone+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系邮箱：</td>'+
						'<td>'+ret.list[0].email+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>反馈截图：</td>'+
						'<td style="width:480px;text-align:left;">'
						for (var i = 0; i < ret.imgList.length; i++) {
							div += 	'<img class="img_w" src="'+system.pojUrl+'share/'+ret.imgList[i].onlinePath+'" alt="" data-action="zoom">';
						}
					div += 	'</td></tr></tbody></table>';
						div += '<div class="am-modal-footer btn_am">'+
						'<button style="width:200px;" type="button" onclick="kill('+id+')" class="am-btn am-btn-danger am-radius">删除</button>'+
						'</div>';
			$(".am_info").html(div);
		}
	})
}
//通过
function  confirm(i){
	time();
	var time1 = new Date().Format("yyyy-MM-dd hh:mm:ss");
	$(".tr1>tr").eq(i).children(".six_td").html(yikaitong);
	$(".tr1>tr").eq(i).children(".oldtime").text(time1);
};

//拒绝
function kill(id){
	$.ajax({
		type: "post",
		url: "fkAdmin!delete.action", //url, //
		data: { fkId: id},
		dataType: "text",
		success: function(ret) {
			var data = eval(ret);
			if (data == '1') {
				getdata(1,true);
			}
		},
		error: function(ret, ret1, ret2) {
			debugger;
		}
	});
}

//判定是否过期
$(".tr1>tr").each(function(index) {
	var weee = $(".tr1>tr").eq(index).children(".oldtime").html();//获取开通时间
	var qoxian = $(".tr1>tr").eq(index).children(".qixian").html();//获取申请期限
	var num= qoxian.replace(/[^0-9]/ig,"");//提取期限数字
	var num1= weee.replace(/[^0-9]/ig,"");//提取哀痛时间数字

	var nowTime = new Date().getTime();//获取当前时间毫秒
	var oldTime = (new Date(weee)).getTime(); //开通时间转化为毫秒
	var time = (nowTime-oldTime)/1000/60/60/24/30;//计算实际使用时间
	if(num1 > 0){
		if(time>num){
			$(this).children(".six_td").html(yiguoqi);
		}
	}
});




//格式化时间
function time(){
	Date.prototype.Format = function (fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}
