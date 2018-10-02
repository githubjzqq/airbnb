// input输入下拉框
$(function() {
    // console.log($(".aby_all:not('.search_hover')"))
    $(document).on('click', function() {
        $('.search_hover').css({
            display: "none"
        })
    })

    function inpclick() {
        $(".search_hover,#search_inp").on('click', function(ev) {
            event.stopPropagation();
            $('.search_hover').css({
                display: "block"
            })
        })
    }
    inpclick()
        // console.log(screen.width)
    console.log(window.innerWidth)
    if (window.innerWidth < 1100) {
        $('#search_inp')[0].placeholder = "";
        $(".search_hover,#search_inp").off()
    }
    $(window).on('resize', function() {
        if (screen.width < 1100) {
            $('#search_inp')[0].placeholder = "";
            $(".search_hover,#search_inp").off()
            $('.search_hover').css({
                display: "none"
            })

        } else {
            $('#search_inp')[0].placeholder = "目的地，城市，地址";
            inpclick();
        }
    })





    // 输入搜索tabs //ajax----------------------------------

    // console.log($('.ul1').width())
    //获取数据
    $.get("./php/index.php", function(data) {
        var arr = JSON.parse(data);
        // console.log(arr)
        //一开始将所有图片显示到页面
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr1.indexOf(arr[i].houseposition) == -1) {
                arr1.push(arr[i].houseposition)
            }
        }
        // console.log(arr1)

        function fn() {
            for (var i = 0; i < 6; i++) {
                var tempLi = $("<li class='col-lg-4'><img src=" + arr[i].houseimg + "></li>");
                $('.tabs_house').append(tempLi);
                var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + '<i class="glyphicon glyphicon-flash"></i>' + '<span class="tabs_pj"><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' + arr[i].count + "条评价</span>" + "</p>");
                $($('.tabs_house>li')[i]).append($(housePrice));
                var houseName = $("<p class='house_name'>" + arr[i].housetext + "</p>");
                $($('.tabs_house>li')[i]).append($(houseName));
                var houseSize = $("<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                $($('.tabs_house>li')[i]).append($(houseSize));
                var userimg = $("<p class='user_tx'>" + "<img src=" + arr[i].userheadimg + "> </p>");
                $($('.tabs_house>li')[i]).append($(userimg));

            }
        }
        fn();

        ///tabs 标题点击变色
        console.log($('.tabs_title'))

        $('.tabs_title>li>a').on('click', function(ev) {
                ev.stopPropagation;
                $(ev.target).addClass('active1').parent().siblings().children('a').removeClass('active1');
                console.log($(ev.target).text());
                $('.tabs_house').empty();
                for (var i = 0, k = 0; i < arr.length; i++) {
                    if ($(ev.target).text() == arr[i].housecity) {
                        if (k < 6) {
                            var tempLi = $("<li class='col-lg-4'><img src=" + arr[i].houseimg + "></li>");
                            $('.tabs_house').append(tempLi);
                            var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + '<i class="glyphicon glyphicon-flash"></i>' + '<span class="tabs_pj"><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' + arr[i].count + "条评价</span>" + "</p>");
                            tempLi.append(housePrice)
                            var houseName = $("<p class='house_name'>" + arr[i].housetext + "</p>");
                            tempLi.append(houseName)
                            var houseSize = $("<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                            tempLi.append(houseSize)
                            var userimg = $("<p class='user_tx'>" + "<img src=" + arr[i].userheadimg + "> </p>");
                            tempLi.append(userimg);
                            k++;
                        } else {
                            break;
                        }
                    }
                }
                return false;
            })
            // 当我点击价格时添加一个检索条件
            //搜索时查询对应图片

        //         $('.ul1').empty();
        //         for (var i = 0; i < arr.length; i++) {
        //             if ($('#search').val() == arr[i].houseposition) {
        //                 var tempLi = $("<li><img src=" + arr[i].houseurl + "></li>");
        //                 $('.ul1').append(tempLi);
        //                 var houseSize = $("<p class='house_size'>独立房间·" + arr[i].housesize + "</p>");
        //                 tempLi.append(houseSize)
        //                 var houseName = $("<p class='house_name'>" + arr[i].houseposition + " " + arr[i].housename + "欢迎你的光临" + "</p>");
        //                 tempLi.append(houseName)
        //                 var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + "起·免费取消" + "</p>");
        //                 tempLi.append(housePrice);
        //             }
        //         }
        //         //         //判断输入值在不在检索范围内如果数据库中没有将返回值
        //         if (arr1.indexOf($('#search').val()) == -1) {
        //             $('.ul1').empty();
        //             var p1 = $('<p>没有您搜索的内容</p>')
        //             p1.css({
        //                 'textAlign': 'center',
        //                 'fontSize': '40px'
        //             })
        //             $('.ul1').append(p1);
        //         }
        //         //判断如果是控字符串不做反映还是出现所有的值
        //         if ($('#search').val() == '') {
        //             $('.ul1').empty();
        //             fn();
        //         }
        //     }
        // })

    })
})