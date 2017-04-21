
var map = new BMap.Map("baidumap");
var point = new BMap.Point(116.403963, 39.915119);
map.centerAndZoom(point, 11);
map.enableScrollWheelZoom();

var points = [
    { "lng": 116.413635, "lat": 39.910842, "count": 100 },
    { "lng": 116.365386, "lat": 39.909732, "count": 100 },
    { "lng": 116.386698, "lat": 39.90679, "count": 100 },
    { "lng": 116.276488, "lat": 39.960753, "count": 100 },
    { "lng": 116.431458, "lat": 39.991786, "count": 100 },
    { "lng": 116.35928, "lat": 39.888021, "count": 100 },
    { "lng": 116.411181, "lat": 39.907547, "count": 100 },
    { "lng": 116.316302, "lat": 39.885754, "count": 100 },
    { "lng": 116.457604, "lat": 39.93039, "count": 100 },
    { "lng": 116.36696, "lat": 39.942625, "count": 100 },
    { "lng": 116.325174, "lat": 39.930232, "count": 100 },
    { "lng": 116.396973, "lat": 39.878713, "count": 100 },
    { "lng": 116.359506, "lat": 39.915694, "count": 100 },
    { "lng": 116.331696, "lat": 39.937756, "count": 100 },
    { "lng": 116.282512, "lat": 39.922014, "count": 100 },
    { "lng": 116.38048, "lat": 39.921867, "count": 100 },
    { "lng": 116.314806, "lat": 39.884797, "count": 100 },
    { "lng": 116.358793, "lat": 39.888707, "count": 100 },
    { "lng": 116.335695, "lat": 39.916877, "count": 100 },
    { "lng": 116.44701, "lat": 39.85588, "count": 100 },
    { "lng": 116.443817, "lat": 39.912767, "count": 100 },
    { "lng": 116.350018, "lat": 39.953972, "count": 100 },
    { "lng": 116.358797, "lat": 39.888705, "count": 100 },
    { "lng": 116.35366, "lat": 39.879175, "count": 100 },
    { "lng": 116.413635, "lat": 39.910842, "count": 100 },
    { "lng": 116.414053, "lat": 39.907554, "count": 100 },
    { "lng": 116.3588, "lat": 39.88871, "count": 100 },
    { "lng": 116.34876, "lat": 39.937687, "count": 100 },
    { "lng": 116.313363, "lat": 39.979633, "count": 100 },
    { "lng": 116.437292, "lat": 39.992332, "count": 100 },
    { "lng": 116.368289, "lat": 39.901884, "count": 100 },
    { "lng": 116.358929, "lat": 39.888677, "count": 100 },
    { "lng": 116.358528, "lat": 39.936219, "count": 100 },
    { "lng": 116.438131, "lat": 39.931627, "count": 100 },
    { "lng": 116.416679, "lat": 39.941823, "count": 100 },
    { "lng": 116.415055, "lat": 39.860157, "count": 100 },
    { "lng": 116.357568, "lat": 39.882662, "count": 100 },
    { "lng": 116.368842, "lat": 39.901883, "count": 100 },
    { "lng": 116.395949, "lat": 39.954594, "count": 100 },
    { "lng": 116.362453, "lat": 39.902925, "count": 100 },
    { "lng": 116.374317, "lat": 39.945985, "count": 100 },
    { "lng": 116.414159, "lat": 39.912385, "count": 100 },
    { "lng": 116.413625, "lat": 39.910842, "count": 100 }
];

//随机获取两数据之间的整数
function getRandom(under, over) {
    return parseInt(Math.random() * (over - under + 1) + under);
}

for (var i = 0; i < points.length; i++) {
    var n = getRandom(1, 100);
    points[i].count = n;
}
heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({ data: points, max: 100 });

function updatehotmap() {

    for (var i = 0; i < points.length; i++) {
        var n = getRandom(1, 100);
        points[i].count = n;
    }
    heatmapOverlay.setDataSet({ data: points, max: 100 });
}

setInterval(updatehotmap, 5000);