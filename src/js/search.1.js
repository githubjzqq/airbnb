    // console.log($('.ul1').width())
    $(function() {
            $('.btn').on('click', function() {
                $('#map').toggle();
                if ($('#map')[0].style.display == "none") {
                    $('.ul1').animate({
                        width: 100 + '%'
                    }, 100)
                    $('.ul1>li').animate({
                        width: 22 + '%',
                        height: 250
                    }, 100)
                } else {
                    $('.ul1').animate({
                        width: 60 + '%'
                    }, 100)
                    $('.ul1>li').animate({
                        width: 45 + '%',
                        height: 350
                    }, 100)
                }
            })
        })
        //获取数据
    $.get("./php/aby.php", function(data) {
        var arr = JSON.parse(data);
        console.log(arr)
            //一开始将所有图片显示到页面
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr1.indexOf(arr[i].houseposition) == -1) {
                arr1.push(arr[i].houseposition)
            }
        }
        console.log(arr1)

        function fn() {
            for (var i = 0; i < arr.length; i++) {
                var tempLi = $("<li><img src=" + arr[i].houseurl + "></li>");
                $('.ul1').append(tempLi);
                var houseSize = $("<p class='house_size'>独立房间·" + arr[i].housesize + "</p>");
                $($('.ul1>li')[i]).append($(houseSize));
                var houseName = $("<p class='house_name'>" + arr[i].houseposition + " " + arr[i].housename + "欢迎你的光临" + "</p>");
                $($('.ul1>li')[i]).append($(houseName));
                var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + "起·免费取消" + "</p>");
                $($('.ul1>li')[i]).append($(housePrice));
            }
        }
        fn();
        // 当我点击价格时添加一个检索条件
        //搜索时查询对应图片
        $(document).on('keyup', function(e) {
            if (e.key == "Enter") {
                $('.ul1').empty();
                for (var i = 0; i < arr.length; i++) {
                    if ($('#search').val() == arr[i].houseposition) {
                        var tempLi = $("<li><img src=" + arr[i].houseurl + "></li>");
                        $('.ul1').append(tempLi);
                        var houseSize = $("<p class='house_size'>独立房间·" + arr[i].housesize + "</p>");
                        tempLi.append(houseSize)
                        var houseName = $("<p class='house_name'>" + arr[i].houseposition + " " + arr[i].housename + "欢迎你的光临" + "</p>");
                        tempLi.append(houseName)
                        var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + "起·免费取消" + "</p>");
                        tempLi.append(housePrice);
                    }
                }
                //         //判断输入值在不在检索范围内如果数据库中没有将返回值
                if (arr1.indexOf($('#search').val()) == -1) {
                    $('.ul1').empty();
                    var p1 = $('<p>没有您搜索的内容</p>')
                    p1.css({
                        'textAlign': 'center',
                        'fontSize': '40px'
                    })
                    $('.ul1').append(p1);
                }
                //判断如果是控字符串不做反映还是出现所有的值
                if ($('#search').val() == '') {
                    $('.ul1').empty();
                    fn();
                }
            }
        })

    })