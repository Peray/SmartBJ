$(function() {
	// 读取body data-type 判断是哪个页面然后执行相应页面方法，方法在下面。
	var dataType = $('body').attr('data-type');
	console.log(dataType);
	for (key in pageData) {
		if (key == dataType) {
			pageData[key]();
		}
	}
	//     // 判断用户是否已有自己选择的模板风格
	//    if(storageLoad('SelcetColor')){
	//      $('body').attr('class',storageLoad('SelcetColor').Color)
	//    }else{
	//        storageSave(saveSelectColor);
	//        $('body').attr('class','theme-black')
	//    }

	autoLeftNav();
	$(window).resize(function() {
		autoLeftNav();
		console.log($(window).width())
	});

	//    if(storageLoad('SelcetColor')){

	//     }else{
	//       storageSave(saveSelectColor);
	//     }
})




// 页面数据
var pageData = {

	'users': function indexData() {
		$('#example-u').DataTable({
			bInfo: false, //页脚信息
			dom: 'ti'
		});

		var echartsA = echarts.init(document.getElementById('tpl-echarts'));
		option = {
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '3%',
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}],
			yAxis: [{
				type: 'value'
			}],
			textStyle: {
				color: '#838FA1'
			},
			series: [{
				name: '注册用户数量',
				type: 'line',
				stack: '总量',
				areaStyle: { normal: {} },
				data: [120, 132, 101, 134, 90,100,40],
				itemStyle: {
					normal: {
						color: '#1cabdb',
						borderColor: '#1cabdb',
						borderWidth: '2',
						borderType: 'solid',
						opacity: '1'
					},
					emphasis: {

					}
				}
			}]
		};

		echartsA.setOption(option);
	}
}




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
		type: "post",
		url: 'qiyeAdmin!execute.action',
		dataType: 'json',
		data: { statr: page,rp:rp},
		//data:{id:id,qyName:qymc,qyFr:qyfr,qyUrl:qywz,yeZz:yyzz,lxr:lxr,tel:dh,email:yx,sqTime:sqTime,sqQx:qixian},
		success:function(ret){
			ret = eval(ret);
			var div = "";
			totalitems = ret.num;
			if (totalitems == 0) {
				ul = '<li>没有查询到相关数据</li>';
			}
			for (var i = 0; i < ret.list.length; i++) {
				var date = new Date(ret.list[i].sqTime.time);
						Y = date.getFullYear() + '-';
						M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						D = date.getDate();
						if(ret.list[i].tgTime != null){
							var date1 = new Date(ret.list[i].tgTime.time);
							Y1 = date1.getFullYear() + '-';
							M1 = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '-';
							D1 = date1.getDate();
						}
				div += '<tr class="gradeX">'+
							'<td class="id">'+(i+1)+'</td>'+
							'<td class="qymc">'+ret.list[i].qiyeName+'</td>'+
							'<td class="qyfr">'+ret.list[i].faren+'</td>'+
							'<td class="sqTime">'+Y+M+D+'</td>';
							if(ret.list[i].tgTime != null){
								div += '<td class="sqTime">'+Y1+M1+D1+'</td>';
							}else{
								div += '<td class="oldtime">'+'-- -- -- -- -- --'+'</td>';
							}
							div += '<td class="qixian">'+ret.list[i].term+'</td>'+
							'<td>'+
								'<div class="tpl-table-black-operation">'+
									'<a href="javascript:;" class="tpl-table-black-operation-del" onclick="detal('+ret.list[i].qiyeId+')">'+
										'<i class="am-icon-trash">'+'</i>查看'+
									'</a>'+
								'</div>'+
							'</td>'+
							'<td class="six_td">';
								if(ret.list[i].status == 0){
									div += '<span class="am-badge am-badge-secondary">未审核</span>';
								}else if(ret.list[i].status == 1){
									div += '<span class="am-badge am-badge-warning">未通过</span>';
								}else if(ret.list[i].status == 2){
									div += '<span class="am-badge am-badge-success">已开通</span>';
								}else{
									div += '<span class="am-badge am-badge-danger">已过期</span>';
								}
							div += '</td>'+
						'</tr>'
			}
			$(".tr1").html(div);

			if(b){
				initPage(totalitems);
				//排序
				$('#example-f').DataTable({
					bInfo: false, //页脚信息
					dom: 'ti'
				});
			}
			
		},
		error: function(ret, ret1, ret2) {
			debugger;
		}
	})
	
};

$('#example-t').DataTable({
	bInfo: false, //页脚信息
	dom: 'ti'
});

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
		type: "post",
		url: 'qiyeAdmin!detail.action',
		dataType: 'json',
		data:{qiyeId:id},
		success:function(ret){
			ret = eval(ret);
			var div="";
			div += 	'<table width="100%" class="am-table">'+
						'<tbody class="ta_info">'+
					'<tr>'+
						'<td>公司名称：</td>'+
						'<td id="qymc">'+ret.list[0].qiyeName+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人姓名：</td>'+
						'<td id="lxr">'+ret.list[0].lxrName+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人电话：</td>'+
						'<td id="dh">'+ret.list[0].telephone+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人邮箱：</td>'+
						'<td id="yx">'+ret.list[0].email+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>企业网址：</td>'+
						'<td id="yx">'+ret.list[0].websiteAdd+'</td>'+
					'</tr>'+

					'<tr>'+
						'<td>法人姓名：</td>'+
						'<td id="qyfr">'+ret.list[0].faren+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>营业执照：</td>'+
						'<td id="yyzz"><img src="'+system.pojUrl+'share/'+ret.list[0].zzImg+'" alt="" data-action="zoom"></td>'+
					'</tr>'+
					'<tr>'+
						'<td>期限：</td>'+
						'<td id="qixian">'+ret.list[0].term+'</td>'+
					'</tr>';
					if(ret.list[0].content != null || ret.list[0].content != 'undefined'){
						div += '<tr>'+
							'<td>未通过原因：</td>'+
							'<td id="qixian">'+ret.list[0].content+'</td>'+
						'</tr>';
					}
					div += '</tbody></table>';
					if(ret.list[0].status == 0){
						div += '<div class="am-modal-footer btn_am">'+
						'<span class="am-modal-btn" onclick="cancel('+ret.list[0].qiyeId+',0)">拒绝</span>'+
						'<span class="am-modal-btn" onclick="cancel('+ret.list[0].qiyeId+',1)">通过</span>'+
						'</div>';
					}
			$(".am_info").html(div);
		}
	})
}
// //通过
// function  confirm(i){
// 	time();
// 	var time1 = new Date().Format("yyyy-MM-dd hh:mm:ss");
// 	$(".tr1>tr").eq(i).children(".six_td").html(yikaitong);
// 	$(".tr1>tr").eq(i).children(".oldtime").text(time1);
// };


function cancel(id,val){
	//$(".tr1>tr").eq(i).children(".six_td").html(weitongguo);
	if(val == 0){
		var div1="";
			div1 += '<div class="am-modal-hd">审核不通过原因</div>'+
				'<div class="am-modal-bd">'+
					'<textarea id="liyou" style="width:90%;"></textarea>'+
				'</div>'+
				'<div class="am-modal-footer">'+
						'<span class="am-modal-btn" data-am-modal-cancel>取消</span>'+
						'<span class="am-modal-btn" data-am-modal-confirm onclick="yuanyin('+id+')">提交</span>'+
					'</div>'
		$("#nopass").html(div1);
		$('#my-alert1').modal('open');
	}else{
		$.ajax({
			type: "post",
			url: "qiyeAdmin!deleteupdate.action", //url, //
			data: { qiyeId: id,status:2},
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
};

function yuanyin(id){
	var content = $("#liyou").val();
	$.ajax({
		type: "post",
		url: "qiyeAdmin!deleteupdate.action", //url, //
		data: { qiyeId: id,status:1,content:content},
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
};

// //判定是否过期
// $(".tr1>tr").each(function(index) {
// 	var weee = $(".tr1>tr").eq(index).children(".oldtime").html();//获取开通时间
// 	var qoxian = $(".tr1>tr").eq(index).children(".qixian").html();//获取申请期限
// 	var num= qoxian.replace(/[^0-9]/ig,"");//提取期限数字
// 	var num1= weee.replace(/[^0-9]/ig,"");//提取哀痛时间数字

// 	var nowTime = new Date().getTime();//获取当前时间毫秒
// 	var oldTime = (new Date(weee)).getTime(); //开通时间转化为毫秒
// 	var time = (nowTime-oldTime)/1000/60/60/24/30;//计算实际使用时间
// 	if(num1 > 0){
// 		if(time>num){
// 			$(this).children(".six_td").html(yiguoqi);
// 		}
// 	}
// });




// //格式化时间
// function time(){
// 	Date.prototype.Format = function (fmt) { //author: meizz 
// 		var o = {
// 			"M+": this.getMonth() + 1, //月份 
// 			"d+": this.getDate(), //日 
// 			"h+": this.getHours(), //小时 
// 			"m+": this.getMinutes(), //分 
// 			"s+": this.getSeconds(), //秒 
// 			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
// 			"S": this.getMilliseconds() //毫秒 
// 		};
// 		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
// 		for (var k in o)
// 			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
// 		return fmt;
// 	}
// }

























//users.html 地图

	var points = [  
		{"lng":116.467523,"lat":39.914435,"url":"http://www.baidu.com","id":1,"name":"p1"},  
		{"lng":116.403963,"lat":39.915119,"url":"http://www.mi.com","id":2,"name":"p2"},  
		{"lng":116.295779,"lat":40.103182,"url":"http://www.csdn.com","id":3,"name":"p3"}  
	]; 
	//创建标注点并添加到地图中
	function addMarker(points) {
		//循环建立标注点
		for(var i=0, pointsLen = points.length; i<pointsLen; i++) {
			var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
			var marker = new BMap.Marker(point); //将点转化成标注点
			map.addOverlay(marker);  //将标注点添加到地图上
			//添加监听事件
			(function() {
				var thePoint = points[i];
				marker.addEventListener("click",
					function() {
						showInfo(this,thePoint);
					});
			})();  
		}
	}
	function showInfo(thisMarker,point) {
		//获取点的信息
		var sContent = 
			'<ul style="margin:0 0 5px 0;padding:0.2em 0">'  
				+'<li style="line-height: 26px;font-size: 15px;">'  
				+'<span style="width: 50px;display: inline-block;">id：</span>' + point.id + '</li>'  
				+'<li style="line-height: 26px;font-size: 15px;">'  
				+'<span style="width: 50px;display: inline-block;">名称：</span>' + point.name + '</li>'  
				+'<li style="line-height: 26px;font-size: 15px;"><span style="width: 50px;display: inline-block;">查看：</span><a href="'+point.url+'">详情</a></li>'  
			+'</ul>';
		var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
		thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
	}
	//创建地图
	var map = new BMap.Map("fbMap");    
	map.centerAndZoom(new BMap.Point(116.331398,39.897445), 12);  // 设置中心点
	map.enableScrollWheelZoom(true);     
	addMarker(points);
