var rp = 10;
var keywords;

function initPage(totalPages) {
	if (totalPages > 0) {
		$.jqPaginator('#pagination2', {
			totalPages: Math.ceil(totalPages / rp),
			visiblePages: 3,
			currentPage: 1,
			prev: '<li class="prev"><a href="javascript:;"><上一页</a></li>',
			next: '<li class="next"><a href="javascript:;">下一页></a></li>',
			page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
			onPageChange: function(num, type) {
				if (num == Math.ceil(totalitems / rp)) {
					$("#showitems").html("显示" + ((num - 1) * rp + 1) + "到" + totalitems + ",");
				} else {
					$("#showitems").html("显示" + ((num - 1) * rp + 1) + "到" + num * rp + ",");
				}
				if (num != 1){
					getdata(num, false);
				}else if(num == 1){
					getdata(1, false);
				}
			}
		});
	}
}
function getdata(page, b) {
	$.ajax({
		type: "post",
		url:"poi!searchPOI.action", 
		dataType: "json",
		data: { statr: page, keyword: keywords},
		beforeSend: function() {
			$(".search_load").show();
		},
		success: function(ret) {
			ret = eval(ret);
			var ul = "";
			totalitems = ret.num;
			if (totalitems == 0) {
				ul = '<li>没有查询到相关数据</li>';
			}
			clearBillboard();
			var minx = 0,
			maxx = 0,
			miny = 0,
			maxy = 0;
			for (var i = 0; i < ret.list.length; i++) {
				var lat = ret.list[i].lat;
				var lng = ret.list[i].lng;
				if (i == 0 || lng < minx) {
					minx = lng;
				}
				if (i == 0 || lng > maxx) {
					maxx = lng;
				}
				if (i == 0 || lat < miny) {
					miny = lat;
				}
				if (i == 0 || lat > maxy) {
					maxy = lat;
				}
				var imgurl = "img/biaozhu/" + i + "_1.png";
				var imgtag =null;
				if(ret.list[i].typeimg == '丽人'){
					imgtag = "img/tag/lr_07.png";
				}else if(ret.list[i].typeimg == '交通设施'){
					imgtag = "img/tag/jtss_07.png";
				}else if(ret.list[i].typeimg == '休闲娱乐'){
					imgtag = "img/tag/xxyl_07.png";
				}else if(ret.list[i].typeimg == '公司企业'){
					imgtag = "img/tag/gsqy_07.png";
				}else if(ret.list[i].typeimg == '出入口'){
					imgtag = "img/tag/crk_07.png";
				}else if(ret.list[i].typeimg == '医疗'){
					imgtag = "img/tag/yl_07.png";
				}else if(ret.list[i].typeimg == '房地产'){
					imgtag = "img/tag/fdc_07.png";
				}else if(ret.list[i].typeimg == '政府机构'){
					imgtag = "img/tag/zfjg_07.png";
				}else if(ret.list[i].typeimg == '教育培训'){
					imgtag = "img/tag/jypx_07.png";
				}else if(ret.list[i].typeimg == '文化传媒'){
					imgtag = "img/tag/whcm_07.png";
				}else if(ret.list[i].typeimg == '旅游景点'){
					imgtag = "img/tag/lyjd_07.png";
				}else if(ret.list[i].typeimg == '无'){
					imgtag = "img/tag/w_07.png";
				}else if(ret.list[i].typeimg == '汽车服务'){
					imgtag = "img/tag/qcfw_07.png";
				}else if(ret.list[i].typeimg == '生活服务'){
					imgtag = "img/tag/shfw_07.png";
				}else if(ret.list[i].typeimg == '美食'){
					imgtag = "img/tag/ms_07.png";
				}else if(ret.list[i].typeimg == '行政地标'){
					imgtag = "img/tag/xzdb_07.png";
				}else if(ret.list[i].typeimg == '购物'){
					imgtag = "img/tag/gw_07.png";
				}else if(ret.list[i].typeimg == '运动健身'){
					imgtag = "img/tag/ydjs_07.png";
				}else if(ret.list[i].typeimg == '道路'){
					imgtag = "img/tag/dl_07.png";
				}else if(ret.list[i].typeimg == '酒店'){
					imgtag = "img/tag/jd_07.png";
				}else if(ret.list[i].typeimg == '金融'){
					imgtag = "img/tag/jr_07.png";
				}else if(ret.list[i].typeimg == '铁路'){
					imgtag = "img/tag/tl_07.png";
				}
				var star = "<img style='width:12px;' src='img/tag/ax_03.png' />";
				var serve = "<img src='img/search/sx_33.png' /><img src='img/search/sw_36.png' /><img src='img/search/wb_39.png' />"
				var num = parseInt(5 * Math.random());
				for (var j = 1; j < num; j++) {
					star += "<img style='width:12px;' src='img/tag/ax_03.png' />"
				}
				var type = 'poi';
				var name = ret.list[i].name;
				var address = ret.list[i].address;
				var typeimg = ret.list[i].typeimg;
				addBillboard(ret.list[i].lng, ret.list[i].lat, ret.list[i].ID, imgurl, type,name,address,typeimg);
				var state = '',
				option = '';

				var name11 = "<span style='color:#e80707;'>" + keywords + "</span>";
				dataNAME = ret.list[i].name.replace(keywords, name11);
				dataADRESS = ret.list[i].address.replace(keywords, name11);

				ul += '<li class="list-li clearfix" id="' + ret.list[i].ID + '" onclick="flyto(' + ret.list[i].lng + ',' + ret.list[i].lat + ',2000,-90)">' +
				'<div class="adr-left">' +
				'<p style="margin-bottom:0;">' +
				'<span>' + '<img style = "width:35px;" src="' + imgtag + '">' + '</span>' +
				'<span class="text1">' + dataNAME + '</span>' +
				'<span>' +star + '</span>' +
				'</p>' +
				'<p class="adr refg">' +'<span class="tag">地址：</span>'+ dataADRESS + '</p>' +
				'<p class="adr">' +'<span class="tag">类型：</span>'+ret.list[i].typeimg +  '</p>' +
				'<p class="adr1">' + serve + '</p>' +
				'</div>' +
				'<aside class="aside_img">' + '<img id="image' + i + '" src=' + imgurl + ' />' +
				 
				 '</aside>' +
				'</li>'
			}
			if (minx != 0) {
				minx = minx - 0.03;
				maxx = parseFloat(maxx) + 0.005;
				miny = miny - 0.005;
				maxy = parseFloat(maxy) + 0.005;
				flytoRectangle(minx, miny, maxx, maxy);
			}
			$('#itemContainer').html(ul+'<div style = "height:81px;">'+'</div>');
			

			// $(".list-li").click(function () {
			//     $("#searchResult").stop().animate({ height: '50px' }, 1000);
			// });

			$("#itemContainer li").hover(function() {
				var index = $(this).index();
				$("#image" + index).attr("src", "img/biaozhu/" + index + "_0.png");
				var id = $(this).attr("id");
				updateBillboard(id, "img/biaozhu/" + index + "_0.png");
			}, function() {
				var index = $(this).index();
				$("#image" + index).attr("src", "img/biaozhu/" + index + "_1.png");
				var id = $(this).attr("id");
				updateBillboard(id, "img/biaozhu/" + index + "_1.png");
			});

			if (b) {
				$("#showitems").html("显示1到" + rp);
				$("#totalitems").html(totalitems);
				initPage(totalitems);
			}
		},
		complete: function() {
			$(".search_load").hide();
		},
		error: function(ret, ret1, ret2) {
			debugger;
		}
	});
}
$(".search_more").click(function() {
	keywords = $('#suggestId').val();
	getdata(1, true);
	$("#searchResult").show();
})
var $sblack = $('.sblack');
$sblack.click(function() {
	keywords = $(this).text();
	getdata(1, true);
	$("#searchResult").show();
});
//搜索内容回车事件
$('#suggestId').keydown(function(e) {
	if (e.keyCode == 13) {
		keywords = $('#suggestId').val();
		getdata(1, true);
		$("#searchResult").show();
	}
});

//搜索结果高度
var resulth = $(window).height() - 200;
$("#searchResult").height(resulth);

function showdetail(url) {
	$(".md-effect-1").addClass('md-show');
	$("#framdetail").attr("src", url);
	$("#cesiumContainer").hide();
}

function showvideo(url) {
	$(".md-effect-19").addClass('md-show');
	$("#framvideo").attr("src", url);
}

function shownet(url) {
	$(".md-effect-17").addClass('md-show');
	$("#framnet").attr("src", url);
}
