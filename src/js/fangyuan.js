$(function() {
    $("#datepicker").datepicker();

    //地图
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom("上海", 15); // 初始化地图,用城市名设置地图中心点
    //覆盖物
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(121.47, 31.23);
    map.centerAndZoom(point, 15);

    //创建小狐狸
    var pt = new BMap.Point(121.47, 31.23);
    var myIcon = new BMap.Icon("../images/fangyuan/images/map-icon.png", new BMap.Size(300, 157));
    var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
    map.addOverlay(marker2); // 将标注添加到地图中

    //放大地图
    // $('.add_map').on('click',function(){
    //     $('.all-map').css
    // });
})