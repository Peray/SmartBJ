var viewer, scene, widget, camera, canvas;
var currentPosition, currentPitch; //切换全景地图前的位置和角度
var S3Mlayer, imagelayer;
var polylineHandler, polygonHandler, handler;
var locationlng, locationlat;
var Convurl = system.Convurl;
var DEMurl = system.DEMurl;
var baidumap, Angle, baidheading, baidpitch;
var modeldataSource; //模型覆盖面
var modelshow = true; //模型覆盖面是否显示
var poishow = false; //POI分布是否显示
var panoramaService = new BMap.PanoramaService();

var lngy,latx;
var _addname,_address,typeimg;

//声明页面变量
var $outerDiv = $("#outerDiv");


//初始化地图
function initmap(Cesium) {

	viewer = new Cesium.Viewer('cesiumContainer', {
		animation: false, //是否创建动画小器件，左下角仪表  
		baseLayerPicker: false, //是否显示图层选择器  
		fullscreenButton: false, //是否显示全屏按钮  
		geocoder: false, //是否显示geocoder小器件，右上角查询按钮  
		homeButton: false, //是否显示Home按钮  
		infoBox: false, //是否显示信息框  
		sceneModePicker: false, //是否显示3D/2D选择器  
		selectionIndicator: false, //是否显示选取指示器组件  
		timeline: false, //是否显示时间轴  
		navigationHelpButton: false, //是否显示右上角的帮助按钮  
		imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
			url: "http://t0.tianditu.com/img_w/wmts",
			layer: "img",
			style: "default",
			format: "tiles",
			tileMatrixSetID: "w",
			show: true,
			maximumLevel: 18
		})
	});


	//加载天地图
	var labelImagery = new Cesium.WebMapTileServiceImageryProvider({
		url: "http://t0.tianditu.com/cia_w/wmts",
		layer: 'cia',
		style: 'default',
		format: 'tiles',
		tileMatrixSetID: 'w',
		credit: new Cesium.Credit('天地图全球影像中文注记服务'),
		subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
	});
	viewer.imageryLayers.addImageryProvider(labelImagery);


	scene = viewer.scene;
	widget = viewer.cesiumWidget;
	camera = scene.camera;
	canvas = viewer.canvas;
	viewer.bottomContainer.innerHTML = "";


	//得到当前三维场景的椭球体
	var ellipsoid = scene.globe.ellipsoid;
	var longitudeString = null;
	var latitudeString = null;
	var heighttop = null;
	var cartesian = null;

	handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
	//设置鼠标滚动事件的处理函数，这里负责监听高度值变化
	handler.setInputAction(function (wheelment) {
		//获取相机高度
		heighttop = Math.ceil(viewer.camera.positionCartographic.height);
		if (heighttop < 2500) {
			for (var i = 0; i < viewer.dataSources._dataSources.length; i++) {
				if (viewer.dataSources.get(i)._name == 'model.topojson') {
					viewer.dataSources.remove(viewer.dataSources.get(i));
					modelshow = false;
					break;
				}
			}
		} else {
			if (!modelshow) {
				viewer.dataSources.add(modeldataSource);
				modelshow = true;
			}
		}
	}, Cesium.ScreenSpaceEventType.WHEEL);

	//设置鼠标左键点击事件
	handler.setInputAction(function (movement) {
		starBurst(movement.position);
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);



	setTimeout(function () {
		flyto(116.341603, 39.557606, 26000, -40);
		loadModeldataSource();
	}, 600);



	setTimeout(function () {
		//旋转地图与指北同步
		scene.postRender.addEventListener(function () {
			var heading = scene.camera.heading;
			var x = Cesium.Math.toDegrees(heading);
			var degrees = "rotate(-" + x + "deg)";
				//$outerDiv.rotate(degrees);
				$('#outerDiv').css("transform", degrees);
			});
	}, 5000);		

};

//图层是否可见
function layerVisble(layername, index, n1, n2) {
	if (layername == 'tianditu') {
		viewer.imageryLayers.get(index).show = !viewer.imageryLayers.get(index).show;
		//viewer.imageryLayers.get(1).show = !viewer.imageryLayers.get(1).show;
	} else {
		var layers = scene.layers;
		var layer = layers.find(layername);
		if (layer)
			layer.visible = !layer.visible;
		else {
			LoadS3MLayer(n1, n2);
		}
	}
}

//飞向
function flyto(lng, lat, height, pitch) {
	var destination = Cesium.Cartesian3.fromDegrees(lng, lat, height);
	viewer.camera.flyTo({
		destination: destination,
		orientation: { heading: Cesium.Math.toRadians(0), pitch: Cesium.Math.toRadians(pitch), roll: 0.0 },
		duration: 5
	});
}

function flyto1(lng, lat, height, pitch) {
	var position = Cesium.Cartesian3.fromDegrees(lng, lat, height);
	var entity = viewer.entities.add({
		billboard: {
			image: 'img/sxt_07.png'
		},
		position: position

	});
	viewer.flyTo(entity);
}

//定位到范围
function flytoRectangle(west, south, east, north) {
	var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

	viewer.camera.flyTo({
		destination: rectangle
	});
}


//指北
function north() {
	$outerDiv.css("transform", "rotate(0deg)");
	scene.camera.flyTo({
		destination: scene.camera.position,
		orientation: {
			heading: Cesium.Math.toRadians(0)
		}
	});
}

//地图旋转
function maprotate(angle) {
	scene.camera.flyTo({
		destination: scene.camera.position,
		orientation: {
			heading: Cesium.Math.toRadians(angle)
		}
	});
}

//地图倾斜
function tiltdown() {
	var position = viewer.camera.position;
	scene.camera.flyTo({
		destination: position,
		orientation: {
			pitch: Cesium.Math.toRadians(Cesium.Math.toDegrees(scene.camera.pitch) + 10)
		}
	});

}
//地图正摄
function tiltup() {
	scene.camera.flyTo({
		destination: scene.camera.position,
		orientation: {
			pitch: Cesium.Math.toRadians(-90) //Cesium.Math.toDegrees(scene.camera.pitch) - 10
		}
	});
}

//向左
function lookLeft() {
	currentPosition = viewer.camera.position; //当前坐标
	currentPitch = scene.camera.pitch; //当前角度
	var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition); //将笛卡尔坐标转化为地理坐标
	var heighttop = Math.ceil(viewer.camera.positionCartographic.height); //获取当前高度
	var lng = Cesium.Math.toDegrees(cartographic.longitude); //获取当前经度
	var lat = Cesium.Math.toDegrees(cartographic.latitude); //获取当前纬度
	scene.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(lng - 0.005, lat, heighttop),
		orientation: { pitch: currentPitch },
		duration: 1
	});
}

//向右
function lookRight() {
	currentPosition = viewer.camera.position; //当前坐标
	currentPitch = scene.camera.pitch; //当前角度
	var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition); //将笛卡尔坐标转化为地理坐标
	var heighttop = Math.ceil(viewer.camera.positionCartographic.height); //获取当前高度
	var lng = Cesium.Math.toDegrees(cartographic.longitude); //获取当前经度
	var lat = Cesium.Math.toDegrees(cartographic.latitude); //获取当前纬度
	scene.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(lng + 0.005, lat, heighttop),
		orientation: { pitch: currentPitch },
		duration: 1
	});
}

//向上
function lookUp() {
	currentPosition = viewer.camera.position; //当前坐标
	currentPitch = scene.camera.pitch; //当前角度
	var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition); //将笛卡尔坐标转化为地理坐标
	var heighttop = Math.ceil(viewer.camera.positionCartographic.height); //获取当前高度
	var lng = Cesium.Math.toDegrees(cartographic.longitude); //获取当前经度
	var lat = Cesium.Math.toDegrees(cartographic.latitude); //获取当前纬度
	scene.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(lng, lat + 0.005, heighttop),
		orientation: { pitch: currentPitch },
		duration: 1
	});
}

//向下
function lookDown() {
	currentPosition = viewer.camera.position; //当前坐标
	currentPitch = scene.camera.pitch; //当前角度
	var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition); //将笛卡尔坐标转化为地理坐标
	var heighttop = Math.ceil(viewer.camera.positionCartographic.height); //获取当前高度
	var lng = Cesium.Math.toDegrees(cartographic.longitude); //获取当前经度
	var lat = Cesium.Math.toDegrees(cartographic.latitude); //获取当前纬度
	scene.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(lng, lat - 0.005, heighttop),
		orientation: { pitch: currentPitch },
		duration: 1
	});
}

//全屏
function fullscreen() {
	Cesium.Fullscreen.requestFullscreen(scene.canvas);
}

var Convurl = system.Convurl;

//添加标注
function addBillboard(lng, lat, id, image, type,_addname,_address,typeimg) {
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(lng, lat),
		billboard: {
			image: image
		},
		id: id,
		coords:[lng,lat],
		name: type,
		addname:_addname,
		address:_address,
		typeimg:typeimg
	});
}

//更换标注
function updateBillboard(id, image) {
	var entitie = viewer.entities.getById(id);
	if (entitie) {
		entitie.billboard.image = image;
	}
}

//清除标注
function clearBillboard() {
	viewer.entities.removeAll();
}

//鼠标左键点击事件方法
function starBurst(mousePosition) {
	var pickedObjects = scene.drillPick(mousePosition);
	if (pickedObjects.length > 0) {
		var type = pickedObjects[0].id._name;
		lngy = pickedObjects[0].id.coords[0];
		latx = pickedObjects[0].id.coords[1];
		_address = pickedObjects[0].id._address;
		_addname = pickedObjects[0].id._addname;
		typeimg  = pickedObjects[0].id.typeimg;
		showdetail("detial_i.html?id=" + pickedObjects[0].id._id);
	}
}

//摄像头视角
function cameralook(mousePosition) {
	var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(mousePosition); //将笛卡尔坐标转化为地理坐标
	var lng = Cesium.Math.toDegrees(cartographic.longitude); //获取当前经度
	var lat = Cesium.Math.toDegrees(cartographic.latitude); //获取当前纬度
	scene.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(lng, lat, 400),
		orientation: { pitch: Cesium.Math.toRadians(-60) },
		duration: 8
	});
}


// function getcoors() {
// 	var coors = "Polygon row";
// 	$.getJSON("title.json", function (data) {
// 		var ds = new Cesium.DataSource()
// 		for (var i = 0; i < data.views.length; i++) {
// 			var r = i + 1; ;
// 			coors += " " + r + " 0 row";
// 			var x1 = data.views[i].extent[0];
// 			var y1 = data.views[i].extent[1];
// 			var z1 = data.views[i].extent[2];
// 			var leftpoint = convertcoor(x1, y1, z1);
// 			coors += " 0 " + leftpoint.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";
// 			var x2 = data.views[i].extent[3];
// 			var y2 = data.views[i].extent[4];
// 			var z2 = data.views[i].extent[5];
// 			var rightpoing = convertcoor(x2, y2, z2);
// 			coors += " 1 " + rightpoing.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";
// 			coors += " 2 " + rightpoing.lng + " " + rightpoing.lat + " 1.#QNAN 1.#QNAN row";
// 			coors += " 3 " + leftpoint.lng + " " + rightpoing.lat + " 1.#QNAN 1.#QNAN row";
// 			coors += " 4 " + leftpoint.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";


// 		}
// 		coors += " END row";
// 		var a = coors;

// 	});
// }

function convertcoor(x, y, z) {
	var ellipsoid = scene.globe.ellipsoid;
	var matrix = Cesium.Transforms.eastNorthUpToFixedFrame(
		Cesium.Cartesian3.fromDegrees(116.3678, 39.92873, 0));
	var p = new Cesium.Cartesian3(x, y, z);
	var result = Cesium.Matrix4.multiplyByPoint(matrix, p, new Cesium.Cartesian3());
	var wgs84 = ellipsoid.cartesianToCartographic(result);
	var lng = Cesium.Math.toDegrees(wgs84.longitude);
	var lat = Cesium.Math.toDegrees(wgs84.latitude);
	return { "lng": lng, "lat": lat };
}

//加载模型覆盖面
function loadModeldataSource() {
	modeldataSource = Cesium.GeoJsonDataSource.load('data/model.topojson', {
		stroke: Cesium.Color.ORANGE,
		fill: Cesium.Color.GOLD.withAlpha(0.2),
		strokeWidth: 3
	});
	viewer.dataSources.add(modeldataSource);
}

//viewer.dataSources._dataSources[0]._name
//POI分布统计
var poidataSource = new Cesium.CustomDataSource('poi');

function loadpoi() {
	$.getJSON("data/poi.json", function (data) {
		for (var i = 0; i < data.poi.length; i += 3) {
			var latitude = data.poi[i + 1];
			var longitude = data.poi[i];
			var height = data.poi[i + 2];

			//Ignore lines of zero height.
			if (height == 0) {
				continue;
			}

			var color = Cesium.Color.fromHsl((0.6 - (height * 0.00002)), 1, 0.5);
			var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
			var test = Cesium.Cartesian3.fromDegrees(longitude, latitude, 200)
			var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);

			//WebGL Globe only contains lines, so that's the only graphics we create.
			var polyline = new Cesium.PolylineGraphics();
			polyline.material = new Cesium.ColorMaterialProperty(color);
			polyline.width = new Cesium.ConstantProperty(2);
			polyline.followSurface = new Cesium.ConstantProperty(false);
			polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);

			//The polyline instance itself needs to be on an entity.
			var entity = poidataSource.entities.add({
				id: i.toString(),
				polyline: polyline
			});
		}
		//plcllection.add(dataSource);

	});
}

//显示POI
function showpoi() {
	if (poishow) {
		for (var i = 0; i < viewer.dataSources._dataSources.length; i++) {
			if (viewer.dataSources.get(i)._name == 'poi') {
				viewer.dataSources.remove(viewer.dataSources.get(i));
				break;
			}
		}
	} else {
		viewer.dataSources.add(poidataSource);
	}
	poishow = !poishow
}
