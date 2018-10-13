$(function() {
    $.get('../php/wl_data.txt', function(data) {
        var data = JSON.parse(data);
        console.log(data);

        for (var j = 0; j < 4; j++) {
            var city_name = $('.city_name')[j].innerHTML.slice(0, 2);
            console.log(city_name);

            function fnmin(name, ind) {
                for (var i = 0, k = 0; i < data.length; i++) {
                    if (k < ind) {
                        if (city_name == data[i].housecity) {
                            var tempLi = $("<li class='col-lg-2 col-md-4 col-sm-6 col-xs-6'><img src=." + data[i].houseimg + "></li>");
                            $(name).append(tempLi);
                            var plus_p1 = $("<p class='plus_p1'><span>PLUS</span>已验证 ·" + data[i].housetype + "</p>");
                            tempLi.append(plus_p1);
                            var plus_name = $("<p class='plus_name'>" + data[i].housetext + "</p>");
                            tempLi.append(plus_name);
                            var plus_price = $("<p class='plus_price'>每晚￥ " + data[i].houseprice + "</p>");
                            tempLi.append(plus_price);
                            var plus_starpj = $("<p class='plus_starpj'><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b>" + data[i].countpj + "</p>");
                            tempLi.append(plus_starpj);
                            k++;
                        }
                    } else {
                        break;
                    }
                }
            }
            fnmin('.fy_show' + j, 6);

        }




    });

    //遍历
    // for (var i = 0; i < data.length; i++) {
    //     if ($('.city_name')[0].innerHTML.slice(0, 2) === data[i].housecity) {
    //         $('.fy_show').append(
    //             '<div class="fy_show1">' +
    //             '<div class="fy_show1_img">' +
    //             '<img src=".' + data[i].houseimg + '" alt="">' +
    //             '</div>' +
    //             '<div class="fy_show1_detail">' +
    //             '<div>' +
    //             '<span>plus</span>' +
    //             '<span>已验证 · ' + data[i].housetype + '</span>' +
    //             '</div><div><span>' +
    //             data[i].housetext +
    //             '</span></div><div><span>每晚￥</span><span>' +
    //             data[i].houseprice +
    //             '</span></div><div><span class="iconfont">&#xe698;&#xe698;&#xe698;&#xe698;&#xe698;</span><span>' +
    //             1 +
    //             '</span></div></div>' +
    //             '</div>'
    //         );
    //     }
    // }


})