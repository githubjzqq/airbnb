$(function() {

    //地图按钮
    $('.map_btn').on('click', function() {
        $('.dui').toggleClass('cuo');
        if ($('.dui')[0].innerHTML === "√") {
            //按钮
            $('.dui')[0].innerHTML = "×";
            $('.map_btn').addClass('map_btn_bgc');
            //地图
            $('.content_left').removeClass('col-lg-8 col-md-8').addClass('col-lg-12 col-md-12');
            $('.choose>div').removeClass('col-lg-3 col-md-4 col-sm-6 col-xs-6').addClass('col-lg-2 col-md-3 col-sm-4 col-xs-6');
            $('.content_right').addClass('map_hide');
            //餐厅显示
            $('.shanghai>.choose>div:gt(5)').addClass('choose_hide');
            $('.hangzhou>.choose>div:gt(5)').addClass('choose_hide');
            $('.shenzhen>.choose>div:gt(5)').addClass('choose_hide');
            $('.jinan>.choose>div:gt(5)').addClass('choose_hide');

        } else {
            //按钮
            $('.dui')[0].innerHTML = "√";
            $('.map_btn').removeClass('map_btn_bgc');
            //地图
            $('.content_left').removeClass('col-lg-12 col-md-12').addClass('col-lg-8 col-md-8');
            $('.choose>div').removeClass('col-lg-2 col-md-3 col-sm-4 col-xs-6').addClass('col-lg-3 col-md-4 col-sm-6 col-xs-6');
            $('.content_right').removeClass('map_hide');
            //餐厅显示
            $('.shanghai>.choose>div:gt(5)').removeClass('choose_hide');
            $('.hangzhou>.choose>div:gt(5)').removeClass('choose_hide');
            $('.shenzhen>.choose>div:gt(5)').removeClass('choose_hide');
            $('.jinan>.choose>div:gt(5)').removeClass('choose_hide');
        }
    });

    //地图
    var top = Number($('.content')[0].offsetTop);
    // var h = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(window.screen.height - top * 2.5);
    $('#allmap').css('height', document.body.clientHeight - top);

    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(121.47, 31.23);
    map.centerAndZoom(point, 15);
    // 编写自定义函数,创建标注
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
    // 随机向地图添加25个标注
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);
    for (var i = 0; i < 8; i++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
        addMarker(point);
    }

    //地图控件
    //比例尺
    var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
    var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL }); //右上角，仅包含平移和缩放按钮
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
    map.addControl(top_right_navigation);


    //心
    $('.choose>div').append('<span class="iconfont choose_like">&#xe6e2;</span>');
    //坐标
    $('.content_left>div>div').eq(0).append('<span class="iconfont choose_coord">&#xe680;</span>');

});