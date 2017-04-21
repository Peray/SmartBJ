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

var rp = 5;
//加载企业信息
function getdata(page,b){
	// qymc = $(".qymc").text(),
	// qyfr = $(".qyfr").text(),
	// qywz = $(".qywz").text(),
	// yyzz = $(".yyzz").text(),
	// lxr = $(".lxr").text(),
	// dh = $(".dh").text(),
	// yx = $(".yx").text(),
	// sqTime = $(".sqTime").text(),
	// qixian = $(".qixian").text();
	$.ajax({
		url: 'assets/js/qy.json',
		dataType: 'json',
		data: { page: page, rp: rp},
		//data:{id:id,qyName:qymc,qyFr:qyfr,qyUrl:qywz,yeZz:yyzz,lxr:lxr,tel:dh,email:yx,sqTime:sqTime,sqQx:qixian},
		success:function(ret){
			ret = eval(ret);
			var div = "";
			totalitems = ret.length;
			if (totalitems == 0) {
				ul = '<li>没有查询到相关数据</li>';
			}
			for (var i = 0; i < ret.length; i++) {
				div += '<tr class="gradeX">'+
							'<td class="id">'+ret[i].id+'</td>'+
							'<td class="qymc">'+ret[i].qyName+'</td>'+
							'<td class="qyfr">'+ret[i].qyFr+'</td>'+
							'<td class="sqTime">'+ret[i].sqTime+'</td>'+
							'<td class="oldtime">'+'-- -- -- -- -- --'+'</td>'+
							'<td class="qixian">'+ret[i].sqQx+'个月'+'</td>'+
							'<td>'+
								'<div class="tpl-table-black-operation">'+
									'<a href="javascript:;" class="tpl-table-black-operation-del" onclick="detal('+ret[i].id+')">'+
										'<i class="am-icon-trash">'+'</i>查看'+
									'</a>'+
								'</div>'+
							'</td>'+
							'<td class="six_td">'+
								'<span class="am-badge am-badge-secondary">'+'未审核'+'</span>'+
							'</td>'+
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
			visiblePages: 5,
			currentPage: 1,
			activeClass:'am-active',
			disableClass:'am-disabled',
			prev: '<li class="prev"><a href="javascript:;">«</a></li>',
			next: '<li class="next"><a href="javascript:;">»</a></li>',
			page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
			onPageChange:function(num,type){
				if(num!=1){
					getdata(num,false);
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
	i = id-1;
	$.ajax({
		url: 'assets/js/qy.json',
		dataType: 'json',
		data:{id:id},
		success:function(ret){
			ret = eval(ret);
			var div="";
			div += 	'<table width="100%" class="am-table tpl-table-black ">'+
						'<tbody class="ta_info">'+
					'<tr>'+
						'<td>公司名称：</td>'+
						'<td id="qymc">'+ret[id-1].qyName+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人姓名：</td>'+
						'<td id="lxr">'+ret[id-1].lxr+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人电话：</td>'+
						'<td id="dh">'+ret[id-1].tel+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>联系人邮箱：</td>'+
						'<td id="yx">'+ret[id-1].email+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>企业网址：</td>'+
						'<td id="yx">'+ret[id-1].qyUrl+'</td>'+
					'</tr>'+

					'<tr>'+
						'<td>法人姓名：</td>'+
						'<td id="qyfr">'+ret[id-1].qyFr+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>营业执照：</td>'+
						'<td id="yyzz">'+ret[id-1].yeZz+'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>期限：</td>'+
						'<td id="qixian">'+ret[id-1].sqQx+'个月</td>'+
					'</tr>'+
					'</tbody>'+
					'</table>'+
					'<div class="am-modal-footer btn_am">'+
						'<span class="am-modal-btn" onclick="cancel(i)">拒绝</span>'+
						'<span class="am-modal-btn" onclick="confirm(i)">通过</span>'+
					'</div>'
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
function cancel(i){
	$(".tr1>tr").eq(i).children(".six_td").html(weitongguo);
};





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

