            $(function() {
                var map = new BMap.Map("map"); // 创建Map实例
                var point = new BMap.Point(120.21551, 30.253082)
                    // var searchMap = $('#search_map');
                    // var mapInput = $('#map_input')
                map.centerAndZoom(point, 11); // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.centerAndZoom(point, 15);
                map.addControl(new BMap.MapTypeControl({
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]
                }));
                //比例尺
                var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
                var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
                var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL });
                map.addControl(top_left_control)
                map.addControl(top_left_navigation)
                map.addControl(top_right_navigation)
                map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
                // map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
                var scaleCtrl = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    offset: new BMap.Size(10, 40)
                });
                map.addControl(scaleCtrl);
                var marker = new BMap.Marker(point); // 创建标注
                map.addOverlay(marker); // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);

                // 城市输入
                // var mapValue = window.location.search;
                // mapValue = mapValue.split('=')[1];
                // console.log(mapValue)
                $(document).on('keyup', function(e) {
                        if (e.key == "Enter") {
                            var local = new BMap.LocalSearch(map, {
                                renderOptions: {
                                    map: map
                                }
                            })
                            local.search($('#search').val())
                        }
                    })
                    // $('#search').val();
            })