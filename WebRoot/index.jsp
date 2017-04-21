<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%> 
<%@ taglib prefix="ct" uri="/WEB-INF/custom-tag.tld"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <html lang="cn" class="no-js"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<title>世界文化遗产 | 大足石刻监测预警</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="media/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->

	<!-- BEGIN PAGE LEVEL STYLES --> 
	<link href="media/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/daterangepicker.css" rel="stylesheet" type="text/css" />
	<link href="media/css/fullcalendar.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/jqvmap.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="media/css/jquery.easy-pie-chart.css" rel="stylesheet" type="text/css" media="screen"/>
	<!-- END PAGE LEVEL STYLES -->
	<link rel="shortcut icon" href="media/image/favicon.ico" />
	<!-- 下拉条css样式 -->
	
    <script type="text/javascript">
	window.onload=function(){  
     changeDivHeight();  
    }//当浏览器窗口大小改变时，设置显示内容的高度  
    window.onresize=function(){  
       changeDivHeight();  
    }
    function changeDivHeight(){               
     var mapheight = $(window).height() - $('#header').height();
     $('#aside').css("height", mapheight);
     var youceH = $(window).height() - $('#header').height();
     var youceW = $(window).width() - $('#xiala').width();
     
     $("#rightDiv4").height($('#xiala').height()-2);
     $("#rightDiv4").width($('#contentY').width());
     //$("#rightDiv4").width($(window).width() - $('#xiala').width());
	}
	</script>
	<script type="text/javascript">
		function pageScroll(){ 
		 //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数） 
			window.scrollBy(0,-100); 
			//延时递归调用，模拟滚动向上效果 
			scrolldelay = setTimeout('pageScroll()',100); 
			//获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值 
			var sTop=document.documentElement.scrollTop+document.body.scrollTop; 
			//判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面） 
		    if(sTop==0) clearTimeout(scrolldelay); 
		} 
	</script>
	
	<script type="text/javascript">
	    function checkRadioMap(a,b,c){
			window.frames['rightDiv4'].centerAtlevel(a, b, c);
	    }
	</script>
</head>
<body class="page-header-fixed">
<a name="top"></a>
	<!-- 头部样式 -->
	<div class="header navbar navbar-inverse navbar-fixed-top" id="header">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div class="container-fluid">
				<!-- BEGIN LOGO -->
				<a class="brand" href="index.jsp">
				    <img src="media/image/logo_03.png"/>
				</a>
				<!-- END LOGO -->
				<!-- BEGIN RESPONSIVE MENU TOGGLER -->
				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
				 <img src="media/image/menu-toggler.png" alt="" />
				</a>          
				<!-- END RESPONSIVE MENU TOGGLER -->            
				<!-- BEGIN TOP NAVIGATION MENU -->              
				<ul class="nav pull-right">
					<!-- BEGIN NOTIFICATION DROPDOWN -->   
					<li class="dropdown" id="header_notification_bar">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-warning-sign"></i>
						<span class="badge">6</span>
						</a>
						<!-- 消息栏1 -->
						<ul class="dropdown-menu extended notification">
							<li>
								<p>监测预警消息</p>
							</li>
							<li>
								<a href="#">
								<span class="label label-success"><i class="icon-plus"></i></span>
								圆觉洞微环境报警
								<span class="time">Just now</span>
								</a>
							</li>
							<li class="external">
								<a href="#">查看所有预警消息 <i class="m-icon-swapright"></i></a>
							</li>
						</ul>
					</li>
					<!-- 消息栏2 -->
					<li class="dropdown" id="header_inbox_bar">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="icon-envelope"></i>
							<span class="badge">5</span>
						</a>
						<ul class="dropdown-menu extended inbox">
							<li>
								<p>系统消息</p>
							</li>
							<li>
								<a href="inbox.html?a=view">
									<span class="photo"><img src="media/image/avatar2.jpg" alt="" /></span>
									<span class="subject">
									<span class="from">赵岗</span>
									<span class="time">2015年11月25日</span>
									</span>
								    <span class="message">
										消息留言。。。。。。。。。。。。。。。。
								    </span>  
								</a>
							</li>
							<li class="external">
								<a href="inbox.html">查看所有消息 <i class="m-icon-swapright"></i></a>
							</li>
						</ul>
					</li>
					<!-- 消息栏3 -->
					<li class="dropdown" id="header_task_bar">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="icon-tasks"></i>
							<span class="badge">5</span>
						</a>
						<ul class="dropdown-menu extended tasks">
							<li>
								<p>其他信息</p>
							</li>
							<li>
								<a href="#">
									<span class="task">
										<span class="desc">系统完成总进度</span>
										<span class="percent">60%</span>
									</span>
									<span class="progress progress-success ">
										<span style="width: 60%;" class="bar"></span>
									</span>
								</a>
							</li>
							<li class="external">
								<a href="#">查看所有信息 <i class="m-icon-swapright"></i></a>
							</li>
						</ul>
					</li>
					<!-- 用户信息 -->
					<li class="dropdown user">

						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img alt="" src="media/image/avatar1_small.jpg" />
							<span class="username">张　三</span>
							<i class="icon-angle-down"></i>
						</a>
						<ul class="dropdown-menu">
							<li><a href="extra_profile.html"><i class="icon-user"></i> 个人简介</a></li>
							<li><a href="inbox.html"><i class="icon-envelope"></i> 消息(3)</a></li>
							<li class="divider"></li>
							<li><a href="extra_lock.html"><i class="icon-lock"></i> 账户管理</a></li>
							<li><a href="login.html"><i class="icon-key"></i> 退出登陆</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="page-container" id="aside">
  	       <div class="page-sidebar nav-collapse collapse" >
  	       
			<ul class="page-sidebar-menu"  id="xiala" style="overflow-y:scroll;">
				 <li>
					<div class="sidebar-toggler hidden-phone"></div>
					
				</li>
				<!--<li>
					<form class="sidebar-search">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" placeholder="Search..." />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
					 首页搜索框 
				</li> -->
				<li class="open">
					<a class="active" href="javascript:;">
						<i class="icon-map-marker"></i>
						<span class="title">宝顶山</span>
						<span class="arrow open"></span>
					</a>
					<ul class="sub-menu" style="display: block; ">
						<li>
							<a href="javascript:;">
								大佛湾
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li><a href="#">猛虎下山图</a></li>
								<li><a href="#">九护法神像</a></li>
								<li><a href="#">六道轮回图</a></li>
								<li><a href="#">三仙人图</a></li>
								<li><a href="#">华严三圣像</a></li>
								<li><a href="#">舍利宝塔</a></li>
								<li><a href="#">毗卢庵</a></li>
								<li><a href="#"><img alt="" src="media/image/zhuan.png" style="margin-left:-48px;"/>&nbsp;&nbsp;<img alt="" src="media/image/qing.png"  style="margin-left:-12px;"/>&nbsp;大悲阁（千手观音）</a></li>
								<li><a href="#">化城品图</a></li>
								<li><a href="#">人天毕会图</a></li>
								<li><a href="#"><img alt="" src="media/image/zhuan.png" style="margin-left:-30px;"/>&nbsp;&nbsp;释迦牟尼涅槃图</a></li>
								<li><a href="#">九龙浴太子图</a></li>
								<li><a href="#">孔雀明王经变相</a></li>
								<li><a href="#">毗卢道场</a></li>
								<li><a href="#">父母恩重经变相</a></li>
								<li><a href="#">雷音图</a></li>
								<li><a href="#">大方便佛报恩经变相</a></li>
								<li><a href="#">观无量寿佛经变相</a></li>
								<li><a href="#">锁六耗图</a></li>
								<li><a href="#">地狱变相</a></li>
								<li><a href="#">柳本尊行化道场</a></li>
								<li><a href="#">十大明王像</a></li>
								<li><a href="#">三清龛及赵公明夫妇龛</a></li>
								<li><a href="#">道祖、山君龛</a></li>
								<li><a href="#">地母、玉皇龛</a></li>
								<li><a href="#">鲁班仓</a></li>
								<li><a href="#">正觉像</a></li>
								<li><a href="#">石狮</a></li>
								<li>
									<a href="#" onclick="checkRadioMap(105.79361291608342,29.75478187651851,17)"><img alt="" src="media/image/wei.png" style="margin-left:-48px;"/>&nbsp;&nbsp;<img alt="" src="media/image/weiyi.png"  style="margin-left:-12px;"/>&nbsp;圆觉洞</a>
								</li>
								<li><a href="#">牧牛图</a></li>
								<li><a href="#">粟咕婆子像</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:;">
								小佛湾
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li><a href="#">祖师法身塔</a></li>
								<li><a href="#">七佛龛</a></li>
								<li><a href="#">报恩经变洞</a></li>
								<li><a href="#">佛坛龛</a></li>
								<li><a href="#">毗卢庵窟</a></li>
								<li><a href="#">华严三圣窟</a></li>
								<li><a href="#">僧禅窟</a></li>
								<li><a href="#">金刚神窟</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:;">
								广大寺
							</a>
						</li>
						<li>
							<a href="#" onclick="checkRadioMap(105.79472871503361,29.75428835005977,17)">
								圣寿寺
							</a>
						</li>
						<li>
							<a href="javascript:;">
								宝顶山结界造像
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li><a href="#">珠始山</a></li>
								<li><a href="#">仁功山</a></li>
								<li><a href="#">龙头山</a></li>
								<li><a href="#">二十四位诸天</a></li>
								<li><a href="#">高观音</a></li>
								<li><a href="#">广大山</a></li>
								<li><a href="#">松林坡</a></li>
								<li><a href="#">断佛岩</a></li>
								<li><a href="#">佛祖寺</a></li>
								<li><a href="#">佛祖岩</a></li>
								<li><a href="#">对面佛</a></li>
								<li><a href="#">岩湾</a></li>
								<li><a href="#">龙潭</a></li>
								<li><a href="#">观音岩</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:;">
								其他
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li><a href="#">释迦真如舍利宝塔</a></li>
								<li><a href="#">转法轮塔</a></li>
								<li><a href="#">万岁楼</a></li>
							</ul>
						</li>
					</ul>
				</li>
				
				<li>
					<a class="active" href="javascript:;">
						<i class="icon-map-marker"></i>
						<span class="title">北山</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="javascript:;">
								佛湾
								<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li><a href="#">佛湾北段</a></li>
								<li><a href="#">佛湾南段</a></li>
							</ul>
						</li>
						<li>
							<a href="javascript:;">
								观音坡
							</a>
						</li>
						<li>
							<a href="javascript:;">
								营盘坡
							</a>
						</li>
						<li>
							<a href="javascript:;">
								佛耳岩
							</a>
						</li>
						<li>
							<a href="javascript:;">
								多宝塔
							</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="active" href="javascript:;">
						<i class="icon-map-marker"></i>
						<span class="title">南山</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="javascript:;">
								真武祖师龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								后土三圣母龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								三清古洞
							</a>
						</li>
						<li>
							<a href="javascript:;">
								佛、道合龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								残像龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								龙洞
							</a>
						</li>
					</ul>
				</li>
				
				<li>
					<a class="active" href="javascript:;">
						<i class="icon-map-marker"></i>
						<span class="title">石门山</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="javascript:;">
								药师佛经变龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								玉皇大帝龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								释迦佛龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								水月观音龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								阿弥陀佛龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								西方三圣及十圣观音窟
							</a>
						</li>
						<li>
							<a href="javascript:;">
								独脚五通龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								孔雀明王经变窟
							</a>
						</li>
						<li>
							<a href="javascript:;">
								诃利帝母龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								三皇洞窟
							</a>
						</li>
						<li>
							<a href="javascript:;">
								东岳夫妇龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								力士龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								山王龛
							</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="active" href="javascript:;">
						<i class="icon-map-marker"></i>
						<span class="title">石篆山</span>
						<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="javascript:;">
								诃利谛母龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								志公龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								长寿王龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								孔子及十哲龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								三身佛龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								老君龛
							</a>
						</li>
						<li>
							<a href="javascript:;">
								地藏十王龛
							</a>
						</li>
					</ul>
				</li>
			</ul>
			<!-- 菜单树结构 -->
		</div>
		<div class="page-content"  >
			<div class="container-fluid" id="contentY" style="height:100%;">
				<div style="float: left; height:100% margin-top:30px;" id="frame" >
				    <iframe src="bds_dfw_yjd.html" id="rightDiv4" name="rightDiv4" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" target="_self" ></iframe>
				    <!-- <iframe src="dfw_yjd.html" id="rightDiv4" name="rightDiv4" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" target="_self" ></iframe> -->
				</div>
			</div>
		</div>
    </div>
	<script src="media/js/jquery.min.js" type="text/javascript"></script> 
    <script type="text/javascript" src="media/js/jquery.nicescroll.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#xiala").height($(window).height()-43);
			$(window).resize(function(){
				$("#xiala").height($(window).height()-43);
			});
		});
	</script>
	<script type="text/javascript">
		$("#xiala").niceScroll({  
			cursorcolor:"#3D3D3D",  
			cursoropacitymax:1,  
			touchbehavior:false,  
			cursorwidth:"3px",  
			cursorborder:"0",  
			cursorborderradius:"5px"  
		}); 
	</script>
    <!-- 一下内容为左侧菜单导航栏 -->
	<script src="media/js/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<!-- IMPORTANT! Load jquery-ui-1.10.1.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
	<script src="media/js/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>      
	<script src="media/js/bootstrap.min.js" type="text/javascript"></script>
	<!--[if lt IE 9]>
		<script src="media/js/excanvas.min.js"></script>
		<script src="media/js/respond.min.js"></script>  
	<![endif]-->  
	<script src="media/js/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="media/js/jquery.blockui.min.js" type="text/javascript"></script>  
	<script src="media/js/jquery.cookie.min.js" type="text/javascript"></script>
	<script src="media/js/jquery.uniform.min.js" type="text/javascript" ></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="media/js/jquery.vmap.js" type="text/javascript"></script>   
	<script src="media/js/jquery.vmap.russia.js" type="text/javascript"></script>
	<script src="media/js/jquery.vmap.world.js" type="text/javascript"></script>
	<script src="media/js/jquery.vmap.europe.js" type="text/javascript"></script>
	<script src="media/js/jquery.vmap.germany.js" type="text/javascript"></script>
	<script src="media/js/jquery.vmap.usa.js" type="text/javascript"></script>
	<script src="media/js/jquery.vmap.sampledata.js" type="text/javascript"></script>  
	<script src="media/js/jquery.flot.js" type="text/javascript"></script>
	<script src="media/js/jquery.flot.resize.js" type="text/javascript"></script>
	<script src="media/js/jquery.pulsate.min.js" type="text/javascript"></script>
	<script src="media/js/date.js" type="text/javascript"></script>
	<script src="media/js/daterangepicker.js" type="text/javascript"></script>     
	<script src="media/js/jquery.gritter.js" type="text/javascript"></script>
	<script src="media/js/fullcalendar.min.js" type="text/javascript"></script>
	<script src="media/js/jquery.easy-pie-chart.js" type="text/javascript"></script>
	<script src="media/js/jquery.sparkline.min.js" type="text/javascript"></script>  
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script src="media/js/app.js" type="text/javascript"></script>
	<script src="media/js/index.js" type="text/javascript"></script>   
	<!-- END PAGE LEVEL SCRIPTS -->  
	<script>
		jQuery(document).ready(function() {    
		   App.init(); // initlayout and core plugins
		   Index.init();
		   Index.initJQVMAP(); // init index page's custom scripts
		   Index.initCalendar(); // init index page's custom scripts
		   Index.initCharts(); // init index page's custom scripts
		   Index.initChat();
		   Index.initMiniCharts();
		   Index.initDashboardDaterange();
		   Index.initIntro();
		});
	</script>
</body>
</html>