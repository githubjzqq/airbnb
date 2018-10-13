// input输入下拉框
// if (typeof sessionStorage.getItem("x") == "object") {
//     // console.log(1)
//     sessionStorage.setItem("x", "true")
//     location.reload();
// } else {
//     // sessionStorage.removeItem("x")
// }


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
            localStorage.setItem('arr1', data)

        })
        //获取数据
    $.get("../php/index.php", function(data) {

            var arr = JSON.parse(data);
            var arr1 = localStorage.getItem('arr1')
            var arr1 = JSON.parse(arr1);
            console.log(arr.housecity)
                // console.log(arr)
                //一开始将所有图片显示到页面
            sessionStorage.setItem("arr", data);
            sessionStorage.getItem('arr')

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

            var arrcity = [];
            for (var i = 0; i < arr.length; i++) {
                if (arrcity.indexOf(arr[i].housecity) == -1) {
                    arrcity.push(arr[i].housecity)
                }
            }

            // console.log(arrcity)
            var searchinp;
            $(document).on("keyup", function(e) {
                if (e.key == "Enter") {
                    if (arrcity.indexOf($('#search_inp').val()) != -1) {
                        searchinp = $('#search_inp').val()
                        console.log(searchinp)
                        sessionStorage.setItem("city", searchinp)
                        window.location.href = "../html/houseinfo.html"
                    }
                    if (typeof sessionStorage.getItem("head_search") == "object") {
                        var arr = [];
                        searchinp = $('#search_inp').val()
                        var date = new Date();
                        date = date.toLocaleString()
                        var obj = {
                            city: searchinp,
                            time: date
                        };
                        arr.unshift(obj);
                        arr = JSON.stringify(arr)
                        sessionStorage.setItem("head_search", arr)
                    } else {
                        arr = sessionStorage.getItem("head_search");
                        arr = JSON.parse(arr)
                        searchinp = $('#search_inp').val();
                        date = new Date();
                        date = date.toLocaleString()
                        obj = {
                            city: searchinp,
                            time: date
                        }
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].city == obj.city) {
                                arr.splice(i, 1)
                            }
                        }
                        arr.unshift(obj);
                        arr = JSON.stringify(arr)
                        sessionStorage.setItem("head_search", arr)
                    }
                }
            })

            // 当我在input中遍历最近搜索时点击li做跳转页面
            $(".lastest").on('click', 'li', function() {
                var s = $(this).children().children("span:nth-child(1)").text();
                console.log(s);
                if (arrcity.indexOf(s) != -1) {
                    sessionStorage.setItem('city', s);
                    location.href = "../html/houseinfo.html"
                }

            })



        })
        // 在input中遍历最近搜索
    function lastest() {

        var arr = sessionStorage.getItem("head_search");
        arr = JSON.parse(arr);
        for (var i = 0, k = 0; i < arr.length; i++) {
            if (k < 6) {
                var tempLi = $("<li class='col-lg-4 col-md-4'><a herf=''><span class='lastest_span1'>" + arr[i].city + "</span><span class='lastest_span1'>" + arr[i].time + "</span></a></li>");
                $('.lastest').append(tempLi);
                // tempLi.html(arr[i]);
                k++;
            } else {
                break;
            }
        }
    }
    lastest();


    //点击查看更多房源跳转到houseINFO页面 并发送search
    $('.tabs_more').on('click', function() {
        console.log('1')
        sessionStorage.setItem("city", $('.tabs_more_city').html())
        window.location.href = '../html/houseinfo.html';

        return false;
    })


    ///历史浏览记录
    // 判断是否存在历史记录

    if (typeof sessionStorage.getItem('housearr') == "object") {
        $('.aby_history').css({
            display: "none"
        })

    } else {
        $('.aby_history').css({
            display: "block"
        })
    }

    function history() {
        var countimg;
        if (innerWidth > 1200) {
            countimg = 3;
        } else if (innerWidth > 1000) {
            countimg = 2;
        } else if (innerWidth < 760) {
            countimg = 1;
        }
        var arr = sessionStorage.getItem("housearr");
        arr = JSON.parse(arr);
        for (var i = 0, k = 0; i < arr.length; i++) {
            if (k < countimg) {
                // console.log(arr1[i])
                var tempLi = $("<li class='col-lg-4 col-md-6 col-sm-6 col-xs-10'></li>");
                $('.history_ul').append(tempLi);
                tempLi.html(arr[i])
                k++;
            } else {
                break;
            }
        }
    }
    history();
    ///输出城市信息跳转页面
})