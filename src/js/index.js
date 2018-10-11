// input输入下拉框

if (typeof sessionStorage.getItem("x") == "object") {
    sessionStorage.setItem("x", true)
    location.reload();
}


// $('.index_top').load('../html/indextop.html')
// $('.indexbtn').load('../html/indexbtn.html')
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
    $.get("../php/indexpj.php", function(data) {
            // var arr1 = JSON.parse(data);
            // console.log(arr);
            sessionStorage.setItem('arr1', data)

        })
        //获取数据
    $.get("../php/index.php", function(data) {

            var arr = JSON.parse(data);
            var arr1 = sessionStorage.getItem('arr1')
            var arr1 = JSON.parse(arr1);
            console.log(arr.housecity)
                // console.log(arr)
                //一开始将所有图片显示到页面
            sessionStorage.setItem("arr", data);
            sessionStorage.getItem('arr')
                // for (var i = 0; i < arr.length; i++) {
                //     if (arr1.indexOf(arr[i].houseposition) == -1) {
                //         arr1.push(arr[i].houseposition)
                //     }
                // }
            var countimg;
            if (innerWidth > 980) {
                countimg = 6;
            } else if (innerWidth > 760) {
                countimg = 4;
            } else if (innerWidth < 760) {
                countimg = 2;
            }

            // console.log(arr1)

            function fn() {
                for (var i = 0, k = 0; i < arr.length; i++) {
                    if (arr[i].housecity == "上海") {
                        if (Number(arr1[i].countpj) > 12) {
                            if (k < countimg) {
                                // console.log(arr1[i])
                                var tempLi = $("<li class='col-lg-4 col-md-4 col-sm-6'><img src=." + arr[i].houseimg + "></li>");
                                $('.tabs_house').append(tempLi);
                                var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + '<i class="glyphicon glyphicon-flash"></i>' + '<span class="tabs_pj"><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' + arr1[i].countpj + "条评价</span>" + "</p>");
                                tempLi.append(housePrice)
                                var houseName = $("<p class='house_name'>" + arr[i].housetext + "</p>");
                                tempLi.append(houseName)
                                var houseSize = $("<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                                tempLi.append(houseSize)
                                var userimg = $("<p class='user_tx'>" + "<img src=." + arr[i].userheadimg + "> </p>");
                                tempLi.append(userimg);
                                k++;
                            } else {
                                break;
                            }
                        }
                    }
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
                        if (Number(arr1[i].countpj) > 12) {
                            if (k < countimg) {
                                var tempLi = $("<li class='col-lg-4 col-md-4 col-sm-6'><img src=." + arr[i].houseimg + "></li>");
                                $('.tabs_house').append(tempLi);
                                var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + '<i class="glyphicon glyphicon-flash"></i>' + '<span class="tabs_pj"><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' + arr1[i].countpj + "条评价</span>" + "</p>");
                                tempLi.append(housePrice)
                                var houseName = $("<p class='house_name'>" + arr[i].housetext + "</p>");
                                tempLi.append(houseName)
                                var houseSize = $("<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                                tempLi.append(houseSize)
                                var userimg = $("<p class='user_tx'>" + "<img src=." + arr[i].userheadimg + "> </p>");
                                tempLi.append(userimg);
                                k++;
                            } else {
                                break;
                            }
                        }
                    }
                }
                // 查看更多房源城市改变
                console.log($('.tabs_more_city'))
                $('.tabs_more_city').html($(ev.target).text());

                return false;
            })
        })
        //点击查看更多房源跳转到houseINFO页面 并发送search
    $('.tabs_more').on('click', function() {
        console.log('1')
        sessionStorage.setItem("city", $('.tabs_more_city').html())
        window.location.href = '../html/houseinfo.html';

        return false;
    })









})