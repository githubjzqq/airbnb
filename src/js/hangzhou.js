//获取数据
$.get("../houseshuju.txt", function(data) {
    // console.log(data)
    var arr = JSON.parse(data);
    console.log(arr);

    //一开始将所有图片显示到页面

    // var arr1 = [];
    // for (var i = 0; i < arr.length; i++) {
    //     if (arr1.indexOf(arr[i].houseposition) == -1) {
    //         arr1.push(arr[i].houseposition)
    //     }
    // }
    var countimg;
    if (innerWidth > 980) {
        countimg = 8;
    } else if (innerWidth > 760) {
        countimg = 4;
    } else if (innerWidth < 760) {
        countimg = 2;
    }

    // console.log(arr1)

    function fn() {
        $('#go').on('click', function() {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (arr[i].housecity == $('#search_inp').val()) {
                    if (k < countimg) {
                        var tempLi = $("<li class='col-lg-3 col-md-3 col-sm-6' style='cursor:pointer;font-weight:700;height:330px'><div class='gif' style=overflow:hidden;><img style='width:100%;height:190px' src=." + arr[i].houseimg + "></div></li>");
                        $('.tabs_house').append(tempLi);
                        var housePrice = $("<div style=display:flex;justify-content:space-between>" + "<div>" + "<p class='house_price'>每晚￥" + arr[i].houseprice + '<br>' +
                            '<span class="tabs_pj"style="color: rgb(0, 132, 137);"><i class="glyphicon glyphicon-flash"style="color: red;"></i><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' +
                            "69条评价</span>" + "</p>" + "<p class='house_name'>" + arr[i].housetext + "</p>" + "<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>" + "</div>" +
                            "<div>" + "<p class='user_tx'>" + "<img style='border-radius: 50%!important;' src=." + arr[i].userheadimg + "> </p>" + "</div>" + "</div>");
                        tempLi.append(housePrice);
                        k++;
                    } else {
                        break;
                    }
                }
            }
        })
    }
    fn();

    function fn2() {
        $('#go').on('click', function() {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (arr[i].housecity == $('#search_inp').val()) {
                    if (k < countimg) {
                        var tempLi = $("<li class='col-lg-3 col-md-3 col-sm-6' style='cursor:pointer;font-weight:700;height:330px'><div class='gif' style=overflow:hidden;><img style='width:100%;height:190px' src=." + arr[i].houseimg + "></div></li>");
                        $('.tabs_house1').append(tempLi);
                        var housePrice = $("<div style=display:flex;justify-content:space-between>" + "<div>" + "<p class='house_price'>每晚￥" + arr[i].houseprice + '<br>' +
                            '<span class="tabs_pj"style="color: rgb(0, 132, 137);"><i class="glyphicon glyphicon-flash"style="color: red;"></i><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' +
                            "69条评价</span>" + "</p>" + "<p class='house_name'>" + arr[i].housetext + "</p>" + "<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>" + "</div>" +
                            "<div>" + "<p class='user_tx'>" + "<img style='border-radius: 50%!important;' src=." + arr[i].userheadimg + "> </p>" + "</div>" + "</div>");
                        tempLi.append(housePrice);
                        k++;
                    } else {
                        break;
                    }
                }
            }
        })
    }
    fn2();


});