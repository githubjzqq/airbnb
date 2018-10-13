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
    $('#allmap').css('height', document.documentElement.clientHeight - top);
    $(window).on('resize', function() {
        $('#allmap').css('height', document.documentElement.clientHeight - top);
    });

    // 百度地图API功能
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom('上海', 15);
    var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
    });
    local.search('上海的餐厅');
    $('.choose_coord').on('click', function() {
        var str = $(this).siblings()[0].innerHTML;
        // map.centerAndZoom(str.slice(0, 2), 15); // 初始化地图,用城市名设置地图中心点

        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(str);
    });
    //具体餐厅信息
    $('.choose>div>div').on('click', function() {
        // console.log($(this).siblings().children().children().eq(1)[0].innerHTML);
        console.log($(this).parent().parent().siblings().children().eq(0)[0].innerHTML.slice(0, 2));

        var str1 = $(this).parent().parent().siblings().children().eq(0)[0].innerHTML.slice(0, 2);
        var name = str1 + $(this).siblings().children().children().eq(1)[0].innerHTML;
        console.log(name);
        var local = new BMap.LocalSearch(map, {
            renderOptions: { map: map }
        });
        local.search(name);
    });



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
    // $('.content_left>div>div:first').append('<span class="iconfont choose_coord">&#xe680;</span>');
    //文本超出变省略号
    $('.choose>div>div').siblings().children().children().eq(1).css({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    });
});