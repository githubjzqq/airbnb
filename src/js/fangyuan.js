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

    //预定窗口
    //日期
    $(".datepicker1").datepicker();
    $(".datepicker2").datepicker();
    //获取焦点、失去焦点
    $('.datepicker1').on('focus', function() {
        $('.datepicker1').addClass('input_col');
    });
    $('.datepicker1').on('blur', function() {
        $('.datepicker1').removeClass('input_col');
    });
    $('.datepicker2').on('focus', function() {
        $('.datepicker2').addClass('input_col');
    });
    $('.datepicker2').on('blur', function() {
        $('.datepicker2').removeClass('input_col');
    });





    //添加人员
    $('.num_btn').on('click', function() {
        $('.change').toggleClass('active');
        $('.shang').toggleClass('active2').siblings().toggleClass('active1');
        $('.num_btn>span').eq(0).toggleClass('input_col');

        //房客
        var adult_count = Number($('.adult_count')[0].innerHTML);
        var child_count = Number($('.child_count')[0].innerHTML);
        var baby_count = Number($('.baby_count')[0].innerHTML);
        //成人
        $('.adult_btn1').on('click', function() {
            if (adult_count <= 1) {
                $('.adult_count')[0].innerHTML = adult_count;
            } else {
                adult_count--;
                $('.adult_count')[0].innerHTML = adult_count;
            }
        });
        $('.adult_btn2').on('click', function() {
            if (adult_count < 5) {
                adult_count++;
                $('.adult_count')[0].innerHTML = adult_count;
            } else {
                $('.adult_count')[0].innerHTML = 5;
            }
        });
        //儿童
        $('.child_btn1').on('click', function() {
            if (child_count <= 0) {
                $('.child_count')[0].innerHTML = child_count;
            } else {
                child_count--;
                $('.child_count')[0].innerHTML = child_count;
            }
        });
        $('.child_btn2').on('click', function() {
            if (child_count < 5) {
                child_count++;
                $('.child_count')[0].innerHTML = child_count;
            } else {
                $('.child_count')[0].innerHTML = 5;
            }
        });
        //婴儿
        $('.baby_btn1').on('click', function() {
            if (baby_count <= 0) {
                $('.baby_count')[0].innerHTML = baby_count;
            } else {
                baby_count--;
                $('.baby_count')[0].innerHTML = baby_count;
            }
        });
        $('.baby_btn2').on('click', function() {
            if (baby_count < 5) {
                baby_count++;
                $('.baby_count')[0].innerHTML = baby_count;
            } else {
                $('.baby_count')[0].innerHTML = 5;
            }
        });
        //总人数
        $('.all_num')[0].innerHTML = baby_count + child_count + adult_count + "位房客";



    });
    $('.datepicker1').on('change', function() {
        //费用

        // console.log($('.datepicker1').val());
        if ($('.datepicker1').val() != "" && $('.datepicker2').val() != "") {
            //入住时间
            var day1_str1 = $('.datepicker1').val();
            var day1_arr1 = day1_str1.split('/');
            var day1_arr2 = day1_arr1.reverse();
            var day1_arr3 = [];
            day1_arr3.push(day1_arr2[0]);
            day1_arr3.push(day1_arr2[2]);
            day1_arr3.push(day1_arr2[1]);
            var day1_str = day1_arr3.join("-");

            //退房时间
            var day2_str1 = $('.datepicker2').val();
            var day2_arr1 = day2_str1.split('/');
            var day2_arr2 = day2_arr1.reverse();
            var day2_arr3 = [];
            day2_arr3.push(day2_arr2[0]);
            day2_arr3.push(day2_arr2[2]);
            day2_arr3.push(day2_arr2[1]);
            var day2_str = day2_arr3.join("-");

            //计算天数
            var day1 = new Date(day1_str);
            var day2 = new Date(day2_str);
            var days = (day2 - day1) / (1000 * 60 * 60 * 24);
            // console.log(days);


            if (days > 0) {
                var house_price = Number($('.house_price')[0].innerHTML);
                $('.house_cost')[0].innerHTML = "￥" + house_price + "&times;" + days;
                $('.house_total')[0].innerHTML = "￥" + (house_price * days);
                $('.total')[0].innerHTML = (house_price * days) + 92 + 68;
            } else {
                alert('请填写正确的日期');
                $('.datepicker1')[0].value = "";
                $('.datepicker2')[0].value = "";
            }
        } else {
            var house_price = Number($('.house_price')[0].innerHTML);
            $('.house_cost')[0].innerHTML = "￥" + house_price + "&times;" + 1;
            $('.house_total')[0].innerHTML = "￥" + house_price;
            $('.total')[0].innerHTML = house_price + 92 + 68;
        }
        if ($('.datepicker1').val() != "" && $('.datepicker2').val() != "") {
            $('.cost').addClass('active');
        } else {
            $('.cost').removeClass('active');
        }
    });
    $('.datepicker2').on('change', function() {
        //费用

        // console.log($('.datepicker1').val());
        if ($('.datepicker1').val() != "" && $('.datepicker2').val() != "") {
            //入住时间
            var day1_str1 = $('.datepicker1').val();
            var day1_arr1 = day1_str1.split('/');
            var day1_arr2 = day1_arr1.reverse();
            var day1_arr3 = [];
            day1_arr3.push(day1_arr2[0]);
            day1_arr3.push(day1_arr2[2]);
            day1_arr3.push(day1_arr2[1]);
            var day1_str = day1_arr3.join("-");

            //退房时间
            var day2_str1 = $('.datepicker2').val();
            var day2_arr1 = day2_str1.split('/');
            var day2_arr2 = day2_arr1.reverse();
            var day2_arr3 = [];
            day2_arr3.push(day2_arr2[0]);
            day2_arr3.push(day2_arr2[2]);
            day2_arr3.push(day2_arr2[1]);
            var day2_str = day2_arr3.join("-");

            //计算天数
            var day1 = new Date(day1_str);
            var day2 = new Date(day2_str);
            var days = (day2 - day1) / (1000 * 60 * 60 * 24);
            // console.log(days);


            if (days > 0) {
                var house_price = Number($('.house_price')[0].innerHTML);
                $('.house_cost')[0].innerHTML = "￥" + house_price + "&times;" + days;
                $('.house_total')[0].innerHTML = "￥" + (house_price * days);
                $('.total')[0].innerHTML = (house_price * days) + 92 + 68;
            } else {
                alert('请填写正确的日期');
                $('.datepicker1')[0].value = "";
                $('.datepicker2')[0].value = "";
            }
        } else {
            var house_price = Number($('.house_price')[0].innerHTML);
            $('.house_cost')[0].innerHTML = "￥" + house_price + "&times;" + 1;
            $('.house_total')[0].innerHTML = "￥" + house_price;
            $('.total')[0].innerHTML = house_price + 92 + 68;
        }
        if ($('.datepicker1').val() != "" && $('.datepicker2').val() != "") {
            $('.cost').addClass('active');
        } else {
            $('.cost').removeClass('active');
        }
    });
    //关闭按钮
    $('.close_change>button').on('click', function() {
        $('.change').toggleClass('active');
        $('.shang').toggleClass('active2').siblings().toggleClass('active1');
        $('.num_btn>span').eq(0).toggleClass('input_col');

        //房客
        var adult_count = Number($('.adult_count')[0].innerHTML);
        var child_count = Number($('.child_count')[0].innerHTML);
        var baby_count = Number($('.baby_count')[0].innerHTML);
        //成人
        $('.adult_btn1').on('click', function() {
            if (adult_count <= 1) {
                $('.adult_count')[0].innerHTML = adult_count;
            } else {
                adult_count--;
                $('.adult_count')[0].innerHTML = adult_count;
            }
        });
        $('.adult_btn2').on('click', function() {
            if (adult_count < 5) {
                adult_count++;
                $('.adult_count')[0].innerHTML = adult_count;
            } else {
                $('.adult_count')[0].innerHTML = 5;
            }
        });
        //儿童
        $('.child_btn1').on('click', function() {
            if (child_count <= 0) {
                $('.child_count')[0].innerHTML = child_count;
            } else {
                child_count--;
                $('.child_count')[0].innerHTML = child_count;
            }
        });
        $('.child_btn2').on('click', function() {
            if (child_count < 5) {
                child_count++;
                $('.child_count')[0].innerHTML = child_count;
            } else {
                $('.child_count')[0].innerHTML = 5;
            }
        });
        //婴儿
        $('.baby_btn1').on('click', function() {
            if (baby_count <= 0) {
                $('.baby_count')[0].innerHTML = baby_count;
            } else {
                baby_count--;
                $('.baby_count')[0].innerHTML = baby_count;
            }
        });
        $('.baby_btn2').on('click', function() {
            if (baby_count < 5) {
                baby_count++;
                $('.baby_count')[0].innerHTML = baby_count;
            } else {
                $('.baby_count')[0].innerHTML = 5;
            }
        });
        //总人数
        $('.all_num')[0].innerHTML = baby_count + child_count + adult_count + "位房客";
    });


    //


    //滚动条事件
    window.onscroll = function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop;

        //
        // if (top > $('.list')[0].offsetTop) {
        //     $('.content').addClass('fix1');
        // } else {
        //     $('.content').removeClass('fix1');
        // }

        //
        if (top > $('.list')[0].offsetTop && top < 3500) {
            $('.reserve').addClass('fix');
        } else {
            $('.reserve').removeClass('fix');
        }

        //
        if (top > 3500) {
            $('.reserve').addClass('abso');
        } else {
            $('.reserve').removeClass('abso');
        }
    }
})