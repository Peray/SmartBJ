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




    //labelImagery();
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
        if (heighttop < 50) {
            var gpsPoint = new BMap.Point(longitudeString, latitudeString);
            BMap.Convertor.translate(gpsPoint, 0, translateOptions);
            baidumap = new BMap.Panorama('viewerin', {
                albumsControl: true,
                indoorSceneSwitchControl: true
            });
            baidumap.addEventListener('zoom_changed', function () {
                if (baidumap.getZoom() == 1) {
                    var ser = $("#viewerin");
                    ser.fadeOut(1000);
                    $(".direction").show();
                    $("#paper-middle").fadeIn();
                    $(".direction").show();
                    baidumapCallBack();
                }
            })
            baidumap.setPov({ heading: Angle, pitch: 0 });
        }
    }, Cesium.ScreenSpaceEventType.WHEEL);


    handler.setInputAction(function (movement) {
        starBurst(movement.position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function (movement) {
        // Star burst on left mouse click.
        //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
        cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        //将笛卡尔坐标转换为地理坐标
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        //将弧度转为度的十进制度表示
        longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        //获取相机高度
        heighttop = Math.ceil(viewer.camera.positionCartographic.height);
        //获取水平角度
        var heading = viewer.camera.heading;
        Angle = Cesium.Math.toDegrees(heading);
        // Remove the star burst when the mouse exits the circle or show the label of the billboard the mouse is hovering over.
        updateStarBurst(movement.endPosition);

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



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
            //$('#outerDiv').rotate(degrees);
            $("#outerDiv").css("transform", degrees);
        });
    }, 5000);

    setTimeout(function () {
        baidumap = new BMap.Panorama('viewerin', {
            albumsControl: true,
            indoorSceneSwitchControl: true
        });
        baidumap.addEventListener('zoom_changed', function () {
            if (baidumap.getZoom() == 1) {
                var ser = $("#viewerin");
                ser.fadeOut(1000);
                $("#paper-middle").fadeIn();
                $(".direction").show();
                baidumapCallBack();
            }
        })
        loadpoi();
    }, 10000);
    //getlocation();
    //heartmap();

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
    $("#outerDiv").css("transform", "rotate(0deg)");
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
// 选择模式
// function selectmodel() {
// 	handler.setInputAction(function (e) {
// 		var layers = scene.layers;
// 		var layer = layers.find('s3m');

// 		if (Cesium.defined(layer)) {
// 			id = scene.getSelectID(e.position, layer);
// 			if (id)
// 				showpopup();
// 		}
// 	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
// }

// 移除选择状态
// function removeselect() {
// 	handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
// }
// 清除
// function clearAll() {
// 	removeselect();
// 	removeBefore();
// }



//全屏
function fullscreen() {
    Cesium.Fullscreen.requestFullscreen(scene.canvas);
}

//显示信息窗口
function showpopup(url) {
    $("#modal-8").addClass('md-show');
    $('#ifmameblog').attr("src", "data.html");
    $(".md-close").click(function () {
        $("#modal-8").removeClass('md-show');
    });
}

function baidumapCallBack() {
    //获取经度
    var bailng = baidumap.getPosition().lng;
    //获取维度
    var bailat = baidumap.getPosition().lat;
    //获取水平角度
    baidheading = baidumap.getPov().heading;
    //获取垂直角度
    baidpitch = baidumap.getPov().pitch;
    //转换为三维坐标
    BDto84(bailng, bailat);
}

function translateOptions(point) {
    var x = point.lng;
    var y = point.lat;
    if (x && y) {
        panoramaService.getPanoramaByLocation(new BMap.Point(x, y), function (data) {
            var panoramaInfo = "";
            if (data != null) {
                join();
                baidumap.setPosition(new BMap.Point(x, y));
            }
        });
    }
}

var Convurl = system.Convurl;

function BDto84(lat, lng) {
    var coords = '[{"x":' + lat + ',"y":' + lng + '}]';
    $.ajax({
        type: "post",
        url: Convurl + "?jsoncallback=?",
        dataType: "json",
        data: { coords: coords, random: Math.random() },
        success: function (ret) {
            ret = eval(ret);
            var x = ret.coords[0].x;
            var y = ret.coords[0].y;
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(x, y, 300),
                orientation: { heading: Cesium.Math.toRadians(baidheading), pitch: Cesium.Math.toRadians(-60), roll: 0.0 }
            });
        },
        error: function (ret, ret1, ret2) {
            debugger
        }
    });
}
function join() {
    var ser = $("#viewerin");
    landscapedown();
    ser.fadeIn('500', function () {
        $("#paper-middle").fadeOut(500);
        $(".direction").hide();
    });
}

//进去全景
function landscapedown() {
    currentPosition = viewer.camera.position;
    // currentPitch = scene.camera.pitch;
    var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition);
    var heighttop = Math.ceil(viewer.camera.positionCartographic.height);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lng, lat, heighttop),
        orientation: { pitch: Cesium.Math.toRadians(0.0) }
    });
}


// //出来全景
// function landscapeup() {
//     currentPosition = viewer.camera.position;
//     // currentPitch = scene.camera.pitch;
//     var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(currentPosition);
//     var heighttop = Math.ceil(viewer.camera.positionCartographic.height);
//     var lng = Cesium.Math.toDegrees(cartographic.longitude);
//     var lat = Cesium.Math.toDegrees(cartographic.latitude);
//     scene.camera.flyTo({
//         destination: Cesium.Cartesian3.fromDegrees(lng, lat, 500),
//         orientation: { pitch: Cesium.Math.toRadians(-90.0) }
//     });
// }


//地图平移
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


//获取单击点坐标
// function GetPosition() {
// 	handler.setInputAction(function(movement) {
// 		// Star burst on left mouse click.   
// 		var cartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
// 		if (cartesian) {
// 			var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
// 			var lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
// 			var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
// 			alert(longitudeString + "," + latitudeString);
// 		}
// 		handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
// 	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
// }


//添加标注
function addBillboard(lng, lat, id, image, type) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lng, lat),
        billboard: {
            image: image
        },
        id: id,
        name: type
    });
}
//更换标注
function updateBillboard(id, image) {
    var entitie = viewer.entities.getById(id);
    if (entitie) {
        entitie.billboard.image = image;
    }
}


function starBurst(mousePosition) {
    var pickedObjects = scene.drillPick(mousePosition);
    if (pickedObjects.length > 0) {
        var type = pickedObjects[0].id._name;
        switch (type) {
            case "poi":
                showdetail("detial_i.html?id=" + pickedObjects[0].id._id);
                break;
            case "tiananmen":
                showdetail("detial.html?id=" + pickedObjects[0].id._id);
                break;
            case "guozijian":
                showdetail("detial_e.html?id=" + pickedObjects[0].id._id);
                break;
            case "camera":
                cameralook(pickedObjects[0].primitive._position);
                showvideo("video.html");
                break;
            case "gov":
                var id = pickedObjects[0].id._id;
                var urls = ['http://www.beijing.gov.cn/szfbgt/default.htm', 'http://www.bjpc.gov.cn/', 'http://www.bjedu.gov.cn/', 'http://www.bjkw.gov.cn/n8785584/index.html', 'http://www.bjeit.gov.cn/', 'http://www.bjethnic.gov.cn/', 'http://www.bjgaj.gov.cn/web/', 'http://www.bjsupervision.gov.cn/', 'http://www.bjmzj.gov.cn/templet/mzj/index.shtml', 'http://www.bjsf.gov.cn/publish/portal0/', 'http://www.bjcz.gov.cn/', 'http://www.bjrbj.gov.cn/', 'http://www.bjghw.gov.cn/web/index.htm', 'http://www.bjepb.gov.cn/', 'http://www.bjjs.gov.cn/publish/portal0/', 'http://www.bjmac.gov.cn/', 'http://www.bjjtw.gov.cn/', 'http://www.bjnw.gov.cn/', 'http://www.bjwater.gov.cn/pub/bjwater/index.html', 'http://www.bjcoc.gov.cn/', 'http://www.bjta.gov.cn/', 'http://www.bjwh.gov.cn/', 'http://www.bjchfp.gov.cn/', 'http://www.bjab.gov.cn/', 'http://www.bjfao.gov.cn/', 'http://www.bjshjs.gov.cn/', 'http://www.bjgzw.gov.cn/SyAction.do?method=init', 'http://www.tax861.gov.cn/', 'http://www.baic.gov.cn/', 'http://www.bjtsb.gov.cn/', 'http://www.bjsafety.gov.cn/', 'http://www.bjda.gov.cn/', 'http://www.bjwzb.gov.cn/', 'http://www.bjrt.gov.cn/jump.html', 'http://www.bjww.gov.cn/', 'http://www.bjsports.gov.cn/', 'http://www.bjstats.gov.cn/', 'http://www.bjyl.gov.cn/', 'http://www.bjjrj.gov.cn/', 'http://www.bjipo.gov.cn/', 'http://www.bjmf.gov.cn/', 'http://www.bjqb.gov.cn/', 'http://www.bjfzb.gov.cn/html/fzb/', 'http://www.bjxfb.gov.cn/'];
                // window.open(urls[id]);
                shownet(urls[id]);
                break;
            default:
                break;
        }
    }
}


var tempentitie, tempimage = "";

function updateStarBurst(mousePosition) {
    var pickedObjects = scene.drillPick(mousePosition);
    if (pickedObjects.length > 0) {
        var type = pickedObjects[0].id._name;
        if (type == "poi" || type == "tiananmen" || type == "guozijian") {
            var id = pickedObjects[0].id._id;
            tempentitie = viewer.entities.getById(id);
            var image = tempentitie.billboard.image.getValue();
            tempimage = image.split('_')[0] + "_0.png";
            tempentitie.billboard.image = tempimage;
        }
    } else {
        if (tempentitie) {
            tempimage = tempimage.split('_')[0] + "_1.png";
            tempentitie.billboard.image = tempimage;
        }
    }
}
//清除标注
function clearBillboard() {
    viewer.entities.removeAll();
}

//摄像头分布
function cameraimg() {
    var coors = [
	[116.39139092665364, 39.903387611601996],
	[116.40099887545077, 39.903115035709085],
	[116.31515194915083, 39.89357157701106],
	[116.35398771429907, 39.98105030608578],
	[116.29872372023367, 39.991546897183426],
	[116.30021974596396, 39.91813624509368],
	[116.45476518924268, 39.90745625826381],
	[116.4043510678468, 39.87876941692539],
	[116.31039016024818, 39.982774866710386]
	];
    var minx = 0,
	maxx = 0,
	miny = 0,
	maxy = 0;
    for (var i = 0; i < coors.length; i++) {
        var lng = coors[i][0];
        var lat = coors[i][1];

        var imgurl = "img/sxt_03.png";
        addBillboard(lng, lat, i, imgurl, 'camera');
    }
    flytoRectangle(116.26772372023367, 39.88457157701106, 116.40599887545076, 39.99954689718343);
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

//获取当前位置
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
            // 指示浏览器获取高精度的位置，默认为false  
            enableHighAcuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
            maximumAge: 3000
        });
    } else {
        alert("Your browser does not support Geolocation!");
    }
}

function locationError(error) {
    switch (error.code) {
        case error.TIMEOUT:
            alert("获取当前位置超时，请稍候再试!");
            break;
        case error.POSITION_UNAVAILABLE:
            alert('暂时无法获取当时位置，请稍候再试!');
            break;
        case error.PERMISSION_DENIED:
            alert('请设置浏览器允许本网站获取位置信息！');
            break;
        case error.UNKNOWN_ERROR:
            alert('发生未知错误，请稍候再试!');
            break;
    }
}

function locationSuccess(position) {
    var coords = position.coords;
    locationlng = coords.longitude
    locationlat = coords.latitude;
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(locationlng, locationlat),
        billboard: {
            image: 'img/position.png',
            sizeInMeters: true
        }
    });
}
//定位
function flytolocaction() {
    if (locationlng && locationlat) {
        flyto(locationlng, locationlat, 2000, -90);
    }
}

function getcoors() {
    var coors = "Polygon row";
    $.getJSON("title.json", function (data) {
        var ds = new Cesium.DataSource()
        for (var i = 0; i < data.views.length; i++) {
            var r = i + 1; ;
            coors += " " + r + " 0 row";
            var x1 = data.views[i].extent[0];
            var y1 = data.views[i].extent[1];
            var z1 = data.views[i].extent[2];
            var leftpoint = convertcoor(x1, y1, z1);
            coors += " 0 " + leftpoint.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";
            var x2 = data.views[i].extent[3];
            var y2 = data.views[i].extent[4];
            var z2 = data.views[i].extent[5];
            var rightpoing = convertcoor(x2, y2, z2);
            coors += " 1 " + rightpoing.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";
            coors += " 2 " + rightpoing.lng + " " + rightpoing.lat + " 1.#QNAN 1.#QNAN row";
            coors += " 3 " + leftpoint.lng + " " + rightpoing.lat + " 1.#QNAN 1.#QNAN row";
            coors += " 4 " + leftpoint.lng + " " + leftpoint.lat + " 1.#QNAN 1.#QNAN row";


        }
        coors += " END row";
        var a = coors;

    });
}

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

//创建位博
function createweibo() {
    flytoRectangle(116.355007, 39.875473, 116.443256, 39.960252);
    var coodrs = [
	[116.39134676607188, 39.90737234231261],
	[116.40703065939054, 39.94539556518074]
	];

    var lng = coodrs[0][0];
    var lat = coodrs[0][1];
    addBillboard(lng, lat, 246999, "img/biaozhu/0_1.png", "tiananmen");

    lng = coodrs[1][0];
    var lat = coodrs[1][1];
    addBillboard(lng, lat, 283758, "img/biaozhu/1_1.png", "guozijian");
}
//政府标注
function creategov(lng, lat, id) {

    clearBillboard();
    flyto(lng, lat, 2000, -90);
    var image = 'img/zf_03.png';
    addBillboard(lng, lat, id, image, 'gov');

}
var config = {
    container: document.getElementById('cesiumContainer'),
    radius: 40,
    maxOpacity: .5,
    minOpacity: 0,
    blur: .55
};
//var bb = { "north": 40.06132, "east": 116.558921, "south": 39.779769, "west": 116.169128 };
//
//function heartmap() {
//    var chmap = CesiumHeatmap.create(viewer, bb, config);
//    var points = [
//	{ "x": 116.413635, "y": 39.910842, "value": 100 },
//	{ "x": 116.365386, "y": 39.909732, "value": 100 },
//	{ "x": 116.386698, "y": 39.90679, "value": 100 },
//	{ "x": 116.276488, "y": 39.960753, "value": 100 },
//	{ "x": 116.431458, "y": 39.991786, "value": 100 },
//	{ "x": 116.35928, "y": 39.888021, "value": 100 },
//	{ "x": 116.411181, "y": 39.907547, "value": 100 },
//	{ "x": 116.316302, "y": 39.885754, "value": 100 },
//	{ "x": 116.457604, "y": 39.93039, "value": 100 },
//	{ "x": 116.36696, "y": 39.942625, "value": 100 },
//	{ "x": 116.325174, "y": 39.930232, "value": 100 },
//	{ "x": 116.396973, "y": 39.878713, "value": 100 },
//	{ "x": 116.359506, "y": 39.915694, "value": 100 },
//	{ "x": 116.331696, "y": 39.937756, "value": 100 },
//	{ "x": 116.282512, "y": 39.922014, "value": 100 },
//	{ "x": 116.38048, "y": 39.921867, "value": 100 },
//	{ "x": 116.314806, "y": 39.884797, "value": 100 },
//	{ "x": 116.358793, "y": 39.888707, "value": 100 },
//	{ "x": 116.335695, "y": 39.916877, "value": 100 },
//	{ "x": 116.44701, "y": 39.85588, "value": 100 },
//	{ "x": 116.443817, "y": 39.912767, "value": 100 },
//	{ "x": 116.350018, "y": 39.953972, "value": 100 },
//	{ "x": 116.358797, "y": 39.888705, "value": 100 },
//	{ "x": 116.35366, "y": 39.879175, "value": 100 },
//	{ "x": 116.413635, "y": 39.910842, "value": 100 },
//	{ "x": 116.414053, "y": 39.907554, "value": 100 },
//	{ "x": 116.3588, "y": 39.88871, "value": 100 },
//	{ "x": 116.34876, "y": 39.937687, "value": 100 },
//	{ "x": 116.313363, "y": 39.979633, "value": 100 },
//	{ "x": 116.437292, "y": 39.992332, "value": 100 },
//	{ "x": 116.368289, "y": 39.901884, "value": 100 },
//	{ "x": 116.358929, "y": 39.888677, "value": 100 },
//	{ "x": 116.358528, "y": 39.936219, "value": 100 },
//	{ "x": 116.438131, "y": 39.931627, "value": 100 },
//	{ "x": 116.416679, "y": 39.941823, "value": 100 },
//	{ "x": 116.415055, "y": 39.860157, "value": 100 },
//	{ "x": 116.357568, "y": 39.882662, "value": 100 },
//	{ "x": 116.368842, "y": 39.901883, "value": 100 },
//	{ "x": 116.395949, "y": 39.954594, "value": 100 },
//	{ "x": 116.362453, "y": 39.902925, "value": 100 },
//	{ "x": 116.374317, "y": 39.945985, "value": 100 },
//	{ "x": 116.414159, "y": 39.912385, "value": 100 },
//	{ "x": 116.413625, "y": 39.910842, "value": 100 }
//	];
//    for (var i = 0; i < points.length; i++) {
//        var n = getRandom(1, 100);
//        points[i].value = n;
//    }
//    var data = {
//        max: 100,
//        min: 0,
//        data: points
//    };
//    chmap.setWGS84Data(0, 100, points);
//    chmap.setData(data);
//    chmap.show(true);
//}

//随机获取两数据之间的整数
function getRandom(under, over) {
    return parseInt(Math.random() * (over - under + 1) + under);
}
