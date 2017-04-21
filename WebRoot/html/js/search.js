var rp = 10;

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
				if (num != 1)
					getdata(num, false)
			}
		});
	}
}

function getdata(page, b) {
	var keywords = $('#suggestId').val();
	$.ajax({
		type: "post",
		url: system.queryurl + "?jsoncallback=?", 
		dataType: "jsonp",
		data: { page: page, rp: rp, keyword: keywords, type: 'list', random: Math.random() },
		beforeSend: function() {
			$(".search_load").show();
		},
		success: function(ret) {
			ret = eval(ret);
			var ul = "";
			totalitems = ret.totalitems;
			if (totalitems == 0) {
				ul = '<li>没有查询到相关数据</li>';
			}
			clearBillboard();
			var minx = 0,
			maxx = 0,
			miny = 0,
			maxy = 0;
			for (var i = 0; i < ret.data.length; i++) {
				var lat = ret.data[i].lat;
				var lng = ret.data[i].lng;
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
				var imgtag = "img/tag/" + ret.data[i].typeimg + "_07.png";
				var star = "";
				var num = parseInt(5 * Math.random());
				for (var j = 1; j < num; j++) {
					star += "<img style='width:12px;' src='img/tag/ax_03.png' />"
				}
				var type = 'poi';
				var name = ret.data[i].NAME;
				if (name.indexOf("天安门") == 0) {
					type = 'tiananmen';
				}
				addBillboard(ret.data[i].lng, ret.data[i].lat, ret.data[i].ID, imgurl, type);
				var state = '',
				option = '';

				var name11 = "<span style='color:#e80707;'>" + keywords + "</span>";
				dataNAME = ret.data[i].NAME.replace(keywords, name11);
				dataADRESS = ret.data[i].address.replace(keywords, name11);

				ul += '<li class="list-li clearfix" id="' + ret.data[i].ID + '" onclick="flyto(' + ret.data[i].lng + ',' + ret.data[i].lat + ',2000,-90)">' +
				'<div class="adr-left">' +
				'<p style="margin-bottom:0;">' +
				'<span>' + '<img id="image' + i + '" src=' + imgurl + ' />' + '</span>' +
				'<span class="text" style="display:inline-block;">' + dataNAME + '</span>' +
				'</p>' +
				'<p class="adr refg">' + dataADRESS + '</p>' +
				'<p class="adr tag">' + ret.data[i].typeimg + star + '</p>' +
				'</div>' +
				'<aside class="aside_img">' + '<img src="' + imgtag + '">' + '</aside>' +
				'</li>'
			}
			if (minx != 0) {
				minx = minx - 0.03;
				maxx = parseFloat(maxx) + 0.005;
				miny = miny - 0.005;
				maxy = parseFloat(maxy) + 0.005;
				flytoRectangle(minx, miny, maxx, maxy);
			}
			$('#itemContainer').html(ul);

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
	getdata(1, true);
	$("#searchResult").slideDown('slow');
})
//搜索内容回车事件
$('#suggestId').keydown(function(e) {
	if (e.keyCode == 13) {
		getdata(1, true);
		$("#searchResult").slideDown('slow');
	}
});

//搜索结果高度
var resulth = $(window).height() - 200;
$("#searchResult").height(resulth);


// $("#cesiumContainer").click(function () {
//     $("#searchResult").stop().animate({ height: '50px' }, function () {
//         $("#getdown").css("display", "block");
//     });
// })
// $("#searchResult").hover(function () {
//     $("#getdown").css("display", "none");
//     $(this).stop().animate({ height: '600px' }, 1000);
// })


function showdetail(url) {
	$(".md-effect-1").addClass('md-show');
	$("#framdetail").attr("src", url);
}

function showvideo(url) {
	$(".md-effect-19").addClass('md-show');
	$("#framvideo").attr("src", url);
}

function shownet(url) {
	$(".md-effect-17").addClass('md-show');
	$("#framnet").attr("src", url);
}
