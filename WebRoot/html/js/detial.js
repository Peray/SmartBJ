$(function(){
	//标题切换
	$(".ul-title>li").click(function(){
		var index = $(this).index();
		$(".ul-title>li").removeClass('title-style');
		$(".ul-title>li").eq(index).addClass('title-style')
		$(".ul-content").removeClass('e');
		$(".ul-content").eq(index).addClass('e');
	})
	//计算位博内容的高度
	var $ul_content = $(".ul-content"),
	$details_imgh = $(".details_img");

	$ul_content.height($(".window").height()-37);
	$details_imgh.height($(".window").height()-162);
})


//百度全景地图
var blng = window.parent.lngy;
var blat = window.parent.latx;

var qjMap = new BMap.Panorama('viewerin');
qjMap.setOptions({ 
	'indoorSceneSwitchControl':true
});
var qjPoint = new BMap.Point(blng, blat);
//真实经纬度转成百度坐标
BMap.Convertor.translate(qjPoint,0,creatmap);
function creatmap(point){
	
	var text = "我的位置"
	var PanoramaLabel = new BMap.PanoramaLabel(text,qjPoint,1)
	qjMap.addOverlay(PanoramaLabel);
	qjMap.setPosition(point);
}






//获取名称地址
var addname = window.parent._addname;
var address = window.parent._address;
var typeimg = window.parent.typeimg;
var html = '';
html +='<p class="details_name bold">'+'名称：'+addname+'</p>'+
		'<p class="details_name">'+'地址：'+address+'</p>';

$("#details").html(html);


//微博内容切换
var $wb_li = $(".wb_list>li"),
	$wb_content = $(".wb_content>li");
$wb_li.click(function(){
	index = $(this).index();
	$wb_li.removeClass("ef");
	$wb_li.eq(index).addClass("ef");
	$wb_content.removeClass('fe');
	$wb_content.eq(index).addClass('fe');
})

//位博位信息
var _ckqw = $(".ckqw"),
	_wz = $(".wz");
_ckqw.click(function() {
	if($(this).text() == "查看全文"){
		$(this).parent().siblings(".wz").css("height","auto");
		$(this).text("隐藏");
	}else{
		$(this).parent().siblings(".wz").css("height","60px");
		$(this).text("查看全文");
	}
});



//位博评价雷达图
var myChart = echarts.init(document.getElementById('main'));
var myChart1 = echarts.init(document.getElementById('main1'));
var optionn = {
		title: {
				text: '500m内评价对比图'
			},
		color: ['#3398DB'],
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis : [
			{
				type : 'category',
				data : ['100m', '200m', '300m', '400m', '500m'],
				axisTick: {
					alignWithLabel: true
				}
			}
		],
		yAxis : [
			{type : 'value'}
		],
		series : [
			{
				name:'评价度：',
				type:'bar',
				barWidth: '30%',
				data:[10, 52, 200, 334, 390]
			}
		]
	};

var option1 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['丽人']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '店面规模', max: 10},
				{ name: '服务态度', max: 10},
				{ name: '整体环境', max: 10},
				{ name: '商品质量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [6, 7, 8, 7.5],
					name : ''
				}
			]
		}]
	};

var option2 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['交通设施']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option3 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['休闲娱乐']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '环境卫生', max: 10},
				{ name: '服务质量', max: 10},
				{ name: '交通情况', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option4 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['公司企业']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option5 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['出入口']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option6 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['医疗']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option7 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['房地产']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option8 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['政府机构']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option9 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['教育培训']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option10 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['文化传媒']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option11 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['旅游景点']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option12 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['汽车服务']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option13 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['生活服务']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option14 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['美食']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option15 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['行政地标']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option16 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['购物']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option17 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['运动健身']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option18 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['道路']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option19 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['酒店']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option20 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['金融']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option21 = {
		title: {
			text: '评价指标分布图'
		},
		tooltip: {},
		legend: {
			data: ['铁路']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [8, 4, 5, 6, 3, 7.6],
					name : ''
				}
			]
		}]
	};

var option22 = {
		title: {
			text: '无'
		},
		tooltip: {},
		legend: {
			data: ['无']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: '红绿灯', max: 10},
				{ name: '监控', max: 10},
				{ name: '拥堵', max:10},
				{ name: '指示标', max: 10},
				{ name: '站牌', max: 10},
				{ name: '人流量', max: 10}
			]
		},
		series: [{
			name: '指数',
			type: 'radar',
			// areaStyle: {normal: {}},
			data : [
				{
					value : [0, 0, 0, 0, 0, 0],
					name : ''
				}
			]
		}]
	};


switch (typeimg) {
	case '丽人':
		myChart.setOption(option1);
		break;
	case '交通设施':
		myChart.setOption(option2);
		break;
	case '休闲娱乐':
		myChart.setOption(option3);
		break;
	case '公司企业':
		myChart.setOption(option4);
		break;
	case '出入口':
		myChart.setOption(option5);
		break;
	case '医疗':
		myChart.setOption(option6);
		break;
	case '房地产':
		myChart.setOption(option7);
		break;
	case '政府机构':
		myChart.setOption(option8);
		break;
	case '教育培训':
		myChart.setOption(option9);
		break;
	case '文化传媒':
		myChart.setOption(option10);
		break;
	case '旅游景点':
		myChart.setOption(option11);
		break;
	case '汽车服务':
		myChart.setOption(option12);
		break;
	case '生活服务':
		myChart.setOption(option13);
		break;
	case '美食':
		myChart.setOption(option14);
		break;
	case '行政地标':
		myChart.setOption(option15);
		break;
	case '购物':
		myChart.setOption(option16);
		break;
	case '运动健身':
		myChart.setOption(option17);
		break;
	case '道路':
		myChart.setOption(option18);
		break;
	case '酒店':
		myChart.setOption(option19);
		break;
	case '金融':
		myChart.setOption(option20);
		break;
	case '铁路':
		myChart.setOption(option21);
		break;
	default:
		myChart.setOption(option22);
		break;
}
myChart1.setOption(optionn);