$(function() {
    $(function() {
        var login = 0; //储存登陆信息；
        var regist = {}; //储存注册信息；
        regist.url = '../php/regist.php';
        var regist = {}; //储存注册&登陆信息；

        //登陆成功后的DOM操作；
        function successDom() {
            //隐藏登陆注册内容；
            $('.header .header-nav li.sub').removeClass('active');
            $('.header .header-nav li.login .user-pic').css('display:block');
            $('.header .header-nav li.login a').css('display:none');

            //显示登陆后的用户基本信息；
            $('.header .header-nav li.sub.user-msg').attr('style', ''); //登陆后显示用户信息；
            $('.header .header-nav li.login .userpic').css('display', 'block').children('img').attr('src', sessionStorage.userheadimg); //登陆后显示用户头像；
            $('.header .header-nav li.login .index').css('display', 'none'); //登陆后隐藏登陆注册按钮；
            $('.header .header-nav li.login').attr('data-target', ''); //去除出点击出现模态框的绑定；
            $('.mod').css('display', 'none');
            $('.modal-backdrop').remove();
            $('body').attr({ 'style': '', 'class': '' });
            $('.header .header-nav>li').on('click', function(e) { //取消事件冒泡
                e.stopPropagation();
            });
        }

        //登陆功能函数；
        function phoneLogin(phonenmb, pwd, e) {
            var data = 'phoneNmb=' + phonenmb + '&pwd=' + pwd;
            var success = false; //登陆是否成功；
            regist.url = '../php/login.php?_dc=' + (new Date()).getTime(); //添加时间戳，解决缓存问题；
            $.ajax({
                url: regist.url,
                type: 'post',
                data: data,
                success: function(data) {
                    if (data) {
                        var user = JSON.parse(data);
                        if (user[1] == 'pwd_error') {
                            $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('密码错误');
                        } else {
                            //储存用户信息到本地；
                            var usermsg = sessionStorage;
                            usermsg.setItem('login', true);
                            for (var i in user) {
                                usermsg.setItem(i, user[i]);
                            };
                            $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '#fff', 'background': 'yellowgreen' }).html('登陆成功');
                            setTimeout(function() {
                                successDom();
                            }, 1000)
                        }
                    } else {
                        $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('用户名或密码错误');
                    }
                }
            });
        }

        function emailLogin(email, pwd, e) {
            var data = 'email=' + email + '&pwd=' + pwd;
            regist.url = '../php/login_email.php?_dc=' + (new Date()).getTime(); //添加时间戳，解决缓存问题；
            $.ajax({
                url: regist.url,
                type: 'post',
                data: data,
                success: function(data) {
                    if (data) {
                        var user = JSON.parse(data);
                        if (user[1] == 'pwd_error') {
                            $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('密码错误');
                        } else {
                            //储存用户信息；
                            var usermsg = sessionStorage;
                            usermsg.setItem('login', true);
                            for (var i in user) {
                                usermsg.setItem(i, user[i]);
                            }
                            $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': 'yellowgreen' }).html('登陆成功');
                            setTimeout(function() {
                                successDom();
                            }, 1000);
                        }
                    } else {
                        $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('用户名或密码错误');
                    }
                }
            })
        }

        //重新加载页面时判断是否为登陆状态；
        function adjust() {
            //判断登陆信息是否储存；
            if (sessionStorage.userid) {
                // // 若存在登陆信息，则登陆（显示及登陆后的用户信息）；
                // var pwd = sessionStorage.user_password;
                // var phoneNmb = sessionStorage.usertel;
                // var email = sessionStorage.useremail;
                // //判断登陆方式；
                successDom();
            } else {
                console.log('未登录，请登录！');
            }
        }
        adjust();

        //退出登陆；
        $('.header .header-nav li.sub.user-msg .exit').on('click', function() {
            sessionStorage.clear(); //清除用户信息；
            location.reload(); //重新加载页面；
        });

        //搜索框获得焦点时出发事件；
        $('.header .search .input-text').on('focus', function() {
            $(this).parent('.search').addClass('focus'); //边框高亮；
            $('.header .search .user-history').addClass('active'); //显示搜索历史；
            $('.header-nav-min').removeClass('active'); //关闭nav-min(移动端);
        });

        //搜索框失去焦点时触发事件；
        $('.header .search .input-text').on('blur', function() {
            setTimeout(function() {
                $('.header .search .user-history').removeClass('active'); //搜索历史隐藏；
            }, 100);
            $(this).parent('.search').removeClass('focus'); //清除边框的高亮；
        });

        if (window.innerWidth < 1370) {
            $('.header .header-nav>li:first-child a').html('<img src="../images/public/China.png" alt="" class="country">');
        };

        //屏幕宽度变化调整导航的隐藏与显示；
        $(window).resize(function() {
            if (window.innerWidth < 1370) {
                $('.header .header-nav>li:not(.sub):first-child a').html('<img src="../images/public/China.png" alt="" class="country">')
            };
            if (window.innerWidth >= 1370) {
                $('.header .header-nav>li:not(.sub):first-child a').html('<img src="../images/public/China.png" alt="" class="country">人民币（￥）')
            };
        });
        $(window).resize(function() {
            if (window.innerWidth < 1340) {
                $('.header .header-nav>li:not(.sub)').eq(2).empty();
                $('.header .header-nav>li:not(.sub)').eq(3).empty();
            };
            if (window.innerWidth >= 1340) {
                $('.header .header-nav>li:not(.sub)').eq(2).html('<a href="">成为房东/体验达人</a>');
                $('.header .header-nav>li:not(.sub)').eq(3).html('<a href="">故事</a>');
            };
        });
        $('#logo').on('click', function() {
            if (window.innerWidth < 1128) {
                $('.header .sub-btn .img').toggleClass('trans');
                $('.header-nav-min').toggleClass('show');
            } else {
                location.href = '../html/index.html';
            }
        });

        //点击导航出现/隐藏子菜单；
        $('.header .header-nav li:not(.sub)').on('click', function(e) {
            index = $(this).index('.header .header-nav li:not(.sub)');
            $('.header .header-nav>li.sub').not($('.header .header-nav li.sub').eq(index)).removeClass('active');
            $('.header .header-nav>li.sub').eq(index).toggleClass('active');
        });
        //点击其他位置子菜单消失；
        $('body').on('click', function() {
            $('.header .header-nav>li.sub').removeClass('active');
        })
        $('.header .header-nav>li:not(.login)').on('click', function(e) {
            e.stopPropagation();
        })

        //点击选择货币；
        $('.header .header-nav>li.sub.currency .list').on('click', function(e) {
            $('.header .header-nav>li.sub.currency .list').removeClass('active');
            $(e.target).addClass('active');
            var ele = $(e.target).clone().html();
            $('.header .header-nav>li._currency a').html(ele);
            $('.header .header-nav>li.sub').removeClass('active')
        });

        //底部切换语言切换货币；
        $('.footer .tab1 .item:nth-child(1) .dropup .dropdown-menu li').on('click', function() {
            $(this).parent().siblings('.dropdown-toggle').children('span').text($(this).text());
        });

        //登陆&注册模态框的操作

        //已有账号？点击登陆；
        $('.mod .modal-dialog.mad1 .modal-content.regist .modal-header p a').on('click', function() {
            $('.mod .modal-dialog.mad1 .modal-content').removeClass('active');
            $('.mod .modal-dialog.mad1 .modal-content.login.phone').addClass('active');
        });

        //点击切换其他方式注册&登陆；
        $('.mod .modal-dialog.mad1 .modal-content.regist .modal-body.other a').on('click', function() {
            $('.mod .modal-dialog.mad1 .modal-content.regist.phone').toggleClass('active');
            $('.mod .modal-dialog.mad1 .modal-content.regist.email').toggleClass('active');
        });
        $('.mod .modal-dialog.mad1 .modal-content.login .modal-body.other a').on('click', function() {
            $('.mod .modal-dialog.mad1 .modal-content.login.phone').toggleClass('active');
            $('.mod .modal-dialog.mad1 .modal-content.login.email').toggleClass('active');
        });
        //没有账号点击注册；
        $('.mod .modal-dialog.mad1 .modal-content.login .modal-header p a').on('click', function() {
            $('.mod .modal-dialog.mad1 .modal-content').removeClass('active');
            $('.mod .modal-dialog.mad1 .modal-content.regist.phone').addClass('active');
        })

        //表单验证模块

        //选择邮箱或手机号注册
        $('.mod .modal-dialog.mad1 .modal-content.first .modal-body a').on('click', function(e) {
            if (e.target == $('.mod .modal-dialog.mad1 .modal-content.first .phone a')[0]) {
                $('.mod .modal-dialog.mad1 .modal-content').removeClass('active');
                $('.mod .modal-dialog.mad1 .modal-content.regist.phone').addClass('active');
            };
            if (e.target == $('.mod .modal-dialog.mad1 .modal-content.first .email a')[0]) {
                $('.mod .modal-dialog.mad1 .modal-content').removeClass('active');
                $('.mod .modal-dialog.mad1 .modal-content.regist.email').addClass('active');
            };
        });

        //验证手机号；
        $('.mod .modal-dialog.mad1 .modal-content.phone .modal-body.input .inputnmb input').on('keyup', function() {
            var reg = /^1[34578][0-9]{9}$/;
            if (reg.test($(this).val())) {
                $(this).css('border-color', '');
            } else {
                $(this).css('border-color', 'red');
            }
        });
        //验证邮箱：
        $('.mod .modal-dialog.mad1 .modal-content.email .modal-body.input .inputnmb input').on('keyup', function() {
            var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            reg.test($(this).val()) ? $(this).css('border-color', '') : $(this).css('border-color', 'red');
        });
        //生成验证码函数；
        function generate(e) {
            $(this).off('click');
            $(this).css({ 'background-color': '#999', 'border-color': 'transparent' });
            $(this).html('20秒后重新获取');
            $(this).siblings('input').val(''); //每次点击清除输入框内容；
            $(this).siblings('input').css('border-color', ''); //初始化边框样式；

            //随机数生成函数；
            function generateNum() {
                var num = 0;
                do {
                    num = Math.floor(Math.random() * 123);
                } while (num < 48 || (num > 57 && num < 65) || num > 90 && num < 97);
                return num;
            };
            var str = String.fromCharCode(generateNum(), generateNum(), generateNum(), generateNum(), generateNum(), generateNum());
            $(this).siblings('.result').html(str);
            setTimeout(function() {
                $(e.target).css('background-color', '');
                $(e.target).on('click', generate);
                $(e.target).html('点击获取验证码');
            }, 21000);

            //动态倒计时；
            for (let i = 20; i > 0; i--) {
                setTimeout(function() {
                    $(e.target).html((21 - i) + '秒后重新获取');
                }, i * 1000)
            }
        }
        $('.mod .modal-dialog.mad1 .modal-content .modal-body.verify .generate').on('click', generate);

        //验证验证码输入；
        $('.mod .modal-dialog.mad1 .modal-content .modal-body.verify input').on('keyup', function() {
            var str1 = $(this).siblings('.result').html().toLowerCase();
            var str2 = $(this).val().toLowerCase(); //转为小写比较（不区分大小写）
            if (str1 && str2) {
                if (str1 === str2) {
                    $(this).css('border-color', '');
                } else {
                    $(this).css('border-color', 'red');
                }
            }
        });

        //验证密码(验证数字，大写字母，小写字母，特殊字符四选三组成的密码强度，且长度在8到30个数之间);
        $('.mod .modal-dialog.mad1 .modal-content.regist .modal-body.password .pwd').on('keyup', function() {
            var reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/;
            reg.test($(this).val()) ? $(this).css('border-color', 'yellowgreen') : $(this).css('border-color', 'red');
            if ($(this).val().length > 7) {
                $(this).parent().siblings('.length').children('.val').css('color', 'yellowgreen').siblings('i').css('color', 'yellowgreen');
                $(this).parent().siblings('.length').children('i').removeClass('icon-cha').addClass('icon-gou');
                if (reg.test($(this).val())) {
                    $(this).parent().siblings('.word').children('.val').css('color', 'yellowgreen').siblings('i').css('color', 'yellowgreen');
                    $(this).parent().siblings('.word').children('i').removeClass('icon-cha').addClass('icon-gou');
                }
            } else {
                $(this).parent().siblings('p').children('.val').css('color', '#fc642d').siblings('i').css('color', '#fc642d');
                $(this).parent().siblings('p').children('i').removeClass('icon-cha').addClass('icon-cha');
            }
        });
        //密码显示&隐藏；
        $('.mod .modal-dialog.mad1 .modal-content .modal-body.password i').on('click', function() {
            if ($(this).siblings('.pwd').val()) {
                $(this).toggleClass('show');
                $(this).siblings('.pwd')[0].type == 'text' ? $(this).siblings('.pwd')[0].type = 'password' : $(this).siblings('.pwd')[0].type = 'text';
            }
        });

        //邮箱注册&登陆提交验证；
        function email(e) {
            regist.email = [];
            var reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            var reg2 = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/;
            var email = $(this).siblings('.input').children('.inputnmb').children('input').val();
            var pwd = $(this).siblings('.password').children('.box').children('.pwd').val();
            regist.email.push(reg1.test($(this).siblings('.input').children('.inputnmb').children('input').val()));
            if ($(this).siblings('.verify').length != 0) {
                if ($(this).siblings('.verify').children('input').val()) {
                    regist.email.push($(this).siblings('.verify').children('input').val().toLowerCase() === $(this).siblings('.verify').children('.result').html().toLowerCase());
                } else {
                    regist.email.push(false);
                }
            };
            regist.email.push(reg2.test($(this).siblings('.password').children('.box').children('.pwd').val()));
            regist.email.push($(this).siblings('.rule').children('.box').children('.check')[0].checked);
            regist.emailAd = regist.email.every(function(item, index, array) {
                return item == true;
            })
            if (regist.emailAd) {
                regist.emailData = 'email=' + email + '&pwd=' + pwd;
                //注册账号操作；
                if ($(this).text() === '注册') {
                    regist.url = '../php/regist_email.php?_dc=' + (new Date()).getTime(); //添加时间戳，解决缓存问题；
                    if (regist.emailAd) {
                        $.ajax({
                            url: regist.url,
                            type: 'post',
                            data: regist.emailData,
                            success: function(data) {
                                if (data) {
                                    $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('邮箱已被注册');
                                } else {
                                    $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '#fff', 'background': 'yellowgreen' }).html('注册成功(2s后自动跳转)');
                                    setTimeout(function() {
                                        emailLogin(email, pwd, e);
                                    }, 2000);
                                }
                            },
                            error: function(err) {
                                console.log(err)
                            },
                        })
                    }
                } else {
                    //登陆操作；
                    if (regist.emailAd) {
                        //登陆功能函数，接收用户手机号和密码；
                        emailLogin(email, pwd, e);
                        if (sessionStorage.userid) {
                            //登陆成功刷新页面；
                            setTimeout(function() {
                                location.reload();
                            }, 500)
                        }

                    }
                }
            } else {
                $(this).siblings('.tips').css('display', 'block'); //报错；
            }
        }
        $('.mod .modal-dialog.mad1 .modal-content.email .modal-body.button').on('click', email);

        //手机号注册&登陆提交验证；
        function phone(e) {
            $(this).siblings('.tips').css('display', ''); //清除报错信息；
            regist.phone = [];
            var reg1 = /^1[34578][0-9]{9}$/;
            var reg2 = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/;
            var phoneNmb = $(this).siblings('.input').children('.inputnmb').children('input').val();
            var pwd = $(this).siblings('.password').children('.box').children('.pwd').val();
            regist.phone.push(reg1.test(phoneNmb));
            if ($(this).siblings('.verify').length != 0) {
                if ($(this).siblings('.verify').children('input').val()) {
                    regist.phone.push($(this).siblings('.verify').children('input').val().toLowerCase() === $(this).siblings('.verify').children('.result').html().toLowerCase());
                } else {
                    regist.phone.push(false);
                }
            };
            regist.phone.push(reg2.test(pwd));
            regist.phone.push($(this).siblings('.rule').children('.box').children('.check')[0].checked);
            regist.phoneAd = regist.phone.every(function(item, index, array) {
                return item == true;
            });
            if (regist.phoneAd) {
                regist.phoneData = 'phoneNmb=' + phoneNmb + '&pwd=' + pwd;
                //注册账号操作；
                if ($(this).text() === '注册') {
                    regist.url = '../php/regist.php?_dc=' + (new Date()).getTime(); //添加时间戳，解决缓存问题；
                    if (regist.phoneAd) {
                        $.ajax({
                            url: regist.url,
                            type: 'post',
                            data: regist.phoneData,
                            success: function(data) {
                                if (data) {
                                    $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '', 'background': '' }).html('手机号已被注册');
                                } else {
                                    $(e.target).siblings('.tips').css({ 'display': 'block', 'color': '#fff', 'background': 'yellowgreen' }).html('注册成功(2s后自动跳转)');
                                    setTimeout(function() {
                                        phoneLogin(phoneNmb, pwd, e);
                                    }, 2000);
                                }
                            },
                            error: function(err) {
                                console.log(err)
                            },
                        });
                    };
                } else {
                    //登陆操作；
                    if (regist.phoneAd) {
                        //登陆功能函数，接收用户手机号和密码；
                        phoneLogin(phoneNmb, pwd, e);
                    };
                };
            } else {
                $(this).siblings('.tips').css('display', 'block'); //报错；
            };
        }
        $('.mod .modal-dialog.mad1 .modal-content.phone .modal-body.button').on('click', phone);
    });
    // 地图点击按钮 //点击地图按钮地图隐藏或显示

    $('.search_condition_map>span>i').on('click', function() {
            var _that = this;
            $(_that).attr("class", "")
                // console.log(_that.style.marginLeft);
            $('.hi_contant_right').toggle();
            if ($('.hi_contant_right')[0].style.display == "none") {
                $('.house_house,.house_plus').css({
                    display: "none"
                })
                $('.house_housemin,.house_plusmin,.hi_housebtm').css({
                    display: "block"
                })
                $('.hi_contant_left').attr('class', "").addClass('hi_contant_left col-lg-12 col-md-12 col-sm-12 col-xs-12')
            } else {
                $('.house_house,.house_plus').css({
                    display: "block"
                })
                $('.house_housemin,.house_plusmin,.hi_housebtm').css({
                    display: "none"
                })
                $('.hi_contant_left').attr('class', "").addClass('hi_contant_left col-lg-7 col-md-8')
            }
            if (_that.style.marginLeft == "0px") {
                $(_that).animate({
                    "marginLeft": "16px"
                }, 600, function() {
                    $(_that).stop(true, true);
                }).addClass('glyphicon glyphicon-ok').parent().css({
                    "backgroundColor": "#008489"
                })

            } else {
                $(_that).animate({
                    "marginLeft": "0px"
                }, 600, function() {
                    $(_that).stop(true, true);
                }).addClass('glyphicon glyphicon-remove').parent().css({
                    "backgroundColor": "rgb(226, 226, 226)"
                })
            }
        })
        // 获取地图高度
    var mapheight = document.documentElement.clientHeight - 110;
    $('#map').css({
        "height": mapheight
    })
    $(window).on('resize', function() {
        mapheight = document.documentElement.clientHeight - 110;
        $('#map').css({
            "height": mapheight
        })
    })


    // 模态框价格区间
    $("#slider-range").slider({
        range: true,
        min: 69,
        max: 800,
        values: [75, 300],
        slide: function(event, ui) {
            $("#amount").val(ui.values[0] + " - " + ui.values[1]);
        }
    });
    $("#amount").val($("#slider-range").slider("values", 0) +
        " - " + $("#slider-range").slider("values", 1));
    //点击save change 显示价格
    // sessionStorage.setItem("price_inp", "0 - 1000")
    $('.save_change').on('click', function() {
        // console.log(1);
        // console.log($('.price_inp').val());
        sessionStorage.setItem("price_inp", $('.price_inp').val())
        $('.mod_price').html('￥' + x);
        var x = sessionStorage.getItem('price_inp')

        $('.mod_price').html('￥' + x);
        location.reload();

    })
    var x = sessionStorage.getItem('price_inp')
    console.log(typeof x == 'object')
    if (typeof x == 'object') { $('.mod_price').html("价格") } else {
        x = sessionStorage.getItem('price_inp')
        $('.mod_price').html('￥' + x);
    }



    //添加数据ajax 之前先获取search数据
    var searchCity = sessionStorage.getItem('city')
    console.log(searchCity)
        // 改变文字内容
    $('.hi_search_city').html(searchCity)
    $.get("../php/index.php", function(data) {
        var arr = JSON.parse(data);
        // console.log(arr)
        //一开始将所有图片显示到页面
        var arr1 = localStorage.getItem('arr1')
        var arr1 = JSON.parse(arr1);
        var price_inp = sessionStorage.getItem("price_inp");
        // console.log(price_inp);
        var price_inp_arr;
        if (typeof price_inp == 'object') {
            price_inp_arr = [0, 1000]
        } else {
            price_inp_arr = price_inp.split(" - ")
        }
        // var price_inp_arr = price_inp.split(" - ")
        console.log(price_inp_arr)
            // console.log(data)
        for (var i = 0; i < arr.length; i++) {
            if (arr1.indexOf(arr[i].houseposition) == -1) {
                arr1.push(arr[i].houseposition)
            }
        }
        // console.log(arr)
        // 获取首页收入数据
        var cityinp = sessionStorage.getItem("cityinp")

        function fn() {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (Number(arr1[i].countpj) > 14) {
                    if (k < 4) {
                        if (searchCity == arr[i].housecity || cityinp == arr[i].housecity) {
                            var tempLi = $("<li class='row'></li>");
                            $('.house_plus').append(tempLi);
                            var divimg = $("<div class='leftimg'><i class='glyphicon glyphicon-heart-empty'></i><img src=." + arr[i].houseimg + "></div>");
                            tempLi.append(divimg);
                            var divtext = $("<div class='righttext'></div>");
                            tempLi.append(divtext)
                            var divtextl = $("<div class='righttextl'></div>");
                            divtext.append(divtextl);
                            var divtextr = $("<div class='righttextr'></div>");
                            divtext.append(divtextr)
                            var plus_p1 = $("<p class='plus_p1'><span>PLUS</span>已验证 ·" + arr[i].housetype + "</p>");
                            divtextl.append(plus_p1)
                            var plus_name = $("<p class='plus_name'>" + arr[i].housetext + "</p>");
                            divtextl.append(plus_name)
                            var plus_shebei = $("<p  class='plus_shebei'>无线网络·厨房·洗发水·吹风机·等多项便利设施</p>");
                            divtextl.append(plus_shebei);
                            var plus_position = $("<p class='plus_position'>" + arr[i].houseaddress + "</p>");
                            divtextl.append(plus_position);
                            var plus_mark = $("<p title='点击显示地图位置' class='plus_mark'><i class='glyphicon glyphicon-map-marker'></i></p>");
                            divtextl.append(plus_mark);
                            var plus_price = $("<p class='plus_price'>￥ " + arr[i].houseprice + "</p>");
                            divtextr.append(plus_price)
                            var plus_meiwan = $("<p class='plus_meiwan'>每晚</p>");
                            divtextr.append(plus_meiwan)
                            var plus_starpj = $("<p class='plus_starpj'><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b>" + arr1[i].countpj + "</p>");
                            divtextr.append(plus_starpj);
                            var userimg = $("<p class='plus_tx'>" + "<img src=" + arr[i].userheadimg + "> </p>");
                            divtextr.append(userimg);
                            k++;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        fn();

        function fn1() {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (Number(arr[i].houseprice) >= price_inp_arr[0] && Number(arr[i].houseprice) <= price_inp_arr[1]) {
                    if (k < arr.length) {
                        if (searchCity == arr[i].housecity) {
                            var tempLi = $("<li class='row'></li>");
                            $('.house_house').append(tempLi);
                            var divimg = $("<div class='leftimg'><i class='glyphicon glyphicon-heart-empty'></i><img src=." + arr[i].houseimg + "></div>");
                            tempLi.append(divimg);
                            var divtext = $("<div class='righttext'></div>");
                            tempLi.append(divtext)
                            var divtextl = $("<div class='righttextl'></div>");
                            divtext.append(divtextl)
                            var divtextr = $("<div class='righttextr'></div>");
                            divtext.append(divtextr)
                            var plus_p1 = $("<p class='plus_p1'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                            divtextl.append(plus_p1);
                            var plus_name = $("<p class='plus_name'>" + arr[i].housetext + "</p>");
                            divtextl.append(plus_name)
                            var plus_shebei = $("<p class='plus_shebei'>无线网络·厨房·洗发水·吹风机·等多项便利设施</p>");
                            divtextl.append(plus_shebei);
                            var plus_position = $("<p class='plus_position'>" + arr[i].houseaddress + "</p>");
                            divtextl.append(plus_position);
                            var plus_mark = $("<p title='点击显示地图位置' class='plus_mark'><i class='glyphicon glyphicon-map-marker'></i></p>");
                            divtextl.append(plus_mark);
                            var plus_price = $("<p class='plus_price'>￥ " + arr[i].houseprice + "</p>");
                            divtextr.append(plus_price)
                            var plus_meiwan = $("<p class='plus_meiwan'>每晚</p>");
                            divtextr.append(plus_meiwan)
                            var plus_starpj = $("<p class='plus_starpj'><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b>" + arr1[i].countpj + "</p>");
                            divtextr.append(plus_starpj);
                            var plus_free = $("<p class='plus_free'>免费取消</p>");
                            divtextr.append(plus_free)
                            var userimg = $("<p class='plus_tx'>" + "<img src=" + arr[i].userheadimg + "> </p>");
                            divtextr.append(userimg);
                            k++;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        fn1();

        function fnmin(name, ind) {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (Number(arr1[i].countpj) > 14) {
                    if (k < ind) {
                        if (searchCity == arr[i].housecity) {
                            var tempLi = $("<li class='col-lg-3 col-md-4 col-sm-6 col-xs-6'><img src=." + arr[i].houseimg + "></li>");
                            $(name).append(tempLi);
                            var plus_p1 = $("<p class='plus_p1'><span>PLUS</span>已验证 ·" + arr[i].housetype + "</p>");
                            tempLi.append(plus_p1);
                            var plus_name = $("<p class='plus_name'>" + arr[i].housetext + "</p>");
                            tempLi.append(plus_name);
                            var plus_price = $("<p class='plus_price'>每晚￥ " + arr[i].houseprice + "</p>");
                            tempLi.append(plus_price);
                            var plus_starpj = $("<p class='plus_starpj'><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b>" + arr1[i].countpj + "</p>");
                            tempLi.append(plus_starpj);
                            k++;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        fnmin('.house_plusmin', 4);

        function fnmin1(name, ind) {
            for (var i = 0, k = 0; i < arr.length; i++) {
                if (Number(arr[i].houseprice) >= price_inp_arr[0] && Number(arr[i].houseprice) <= price_inp_arr[1]) {

                    if (k < ind) {
                        if (searchCity == arr[i].housecity) {
                            var tempLi = $("<li class='col-lg-3 col-md-4 col-sm-6 col-xs-12'><img src=." + arr[i].houseimg + "></li>");
                            $(name).append(tempLi);
                            var plus_p1 = $("<p class='plus_p1'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
                            tempLi.append(plus_p1);
                            var plus_name = $("<p class='plus_name'>" + arr[i].housetext + "</p>");
                            tempLi.append(plus_name);
                            var plus_price = $("<p class='plus_price'>每晚￥ " + arr[i].houseprice + "免费取消</p>");
                            tempLi.append(plus_price);
                            var plus_starpj = $("<p class='plus_starpj'><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b><b class='glyphicon glyphicon-star'></b>" + arr1[i].countpj + "</p>");
                            tempLi.append(plus_starpj);
                            k++;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        fnmin1('.house_housemin', 12);
        fnmin1('.hi_housebtm_ul', 4);
        // $('.tabs_title>li>a').on('click', function(ev) {

        //         ev.stopPropagation;
        //         $(ev.target).addClass('active1').parent().siblings().children('a').removeClass('active1');
        //         console.log($(ev.target).text());
        //         $('.tabs_house').empty();
        //         for (var i = 0, k = 0; i < arr.length; i++) {
        //             if ($(ev.target).text() == arr[i].housecity) {
        //                 if (k < countimg) {
        //                     var tempLi = $("<li class='col-lg-4 col-md-4 col-sm-6'><img src=" + arr[i].houseimg + "></li>");
        //                     $('.tabs_house').append(tempLi);
        //                     var housePrice = $("<p class='house_price'>每晚￥" + arr[i].houseprice + '<i class="glyphicon glyphicon-flash"></i>' + '<span class="tabs_pj"><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b><b class="glyphicon glyphicon-star"></b>' + arr[i].count + "条评价</span>" + "</p>");
        //                     tempLi.append(housePrice)
        //                     var houseName = $("<p class='house_name'>" + arr[i].housetext + "</p>");
        //                     tempLi.append(houseName)
        //                     var houseSize = $("<p class='house_size'>" + arr[i].housetype + "·" + arr[i].housesize + "</p>");
        //                     tempLi.append(houseSize)
        //                     var userimg = $("<p class='user_tx'>" + "<img src=" + arr[i].userheadimg + "> </p>");
        //                     tempLi.append(userimg);
        //                     k++;
        //                 } else {
        //                     break;
        //                 }
        //             }
        //         }
        //         return false;
        //     })
        ///小分辨率点击轮播
        // 屏幕变换0------------------------------------------------------------
        var screenwidth = document.documentElement.clientWidth;
        if (screenwidth < 1023) {
            console.log($('.search_condition_map>span>i'))
            if ($('.search_condition_map>span>i')[0].style.marginLeft == "0px") {
                $('.hi_contant_right').css({
                    display: "none"
                })
                $('.maplogo').css({
                    display: "block"
                })
            }
        } else {
            $('.hi_contant_right').css({
                display: "block"
            })
            $('.maplogo').css({
                display: "none"
            })
        }
        $(window).on('resize', function() {
            screenwidth = document.documentElement.clientWidth;

            if (screenwidth < 1023) {

                $('.hi_contant_right').css({
                    display: "none"
                })
                $('.maplogo').css({
                    display: "block"
                })
            } else {
                if ($('.search_condition_map>span>i')[0].style.marginLeft == "0px") {

                    $('.hi_contant_right').css({
                        display: "block"
                    })
                    $('.maplogo').css({
                        display: "none"
                    })
                }

            }
        })







        ///获取数据分页--------------------------------------------------------------
        var heightLi = $('.house_house>li')[0].clientHeight + 19;
        console.log(heightLi);
        $('.house_house').css({
            // height: 8 * heightLi,
            // overflow: "hidden"
        })

        function Paging(el, options) {
            this.el = el;
            this.options = {
                pageNo: options.initPageNo || 1, // 初始页码
                totalPages: options.totalPages || 1, //总页数
                totalCount: options.totalCount || '', // 条目总数
                slideSpeed: options.slideSpeed || 0, // 缓动速度
                jump: options.jump || false, // 支持跳转
                callback: options.callback || function() {} // 回调函数
            };
            this.init();
        }
        // 给实例对象添加公共属性和方法
        Paging.prototype = {
            constructor: Paging,
            init: function() {
                this.createDom();
                this.bindEvents();
            },
            createDom: function() {
                console.info(this);
                var that = this,
                    ulDom = '',
                    jumpDom = '',
                    content = '',
                    liWidth = 45, // li的宽度
                    totalPages = that.options.totalPages, // 总页数
                    wrapLength = 0;
                totalPages > 5 ? wrapLength = 5 * liWidth + 8 : wrapLength = totalPages * liWidth + 8;
                for (var i = 1; i <= that.options.totalPages; i++) {
                    i != 1 ? ulDom += '<li>' + i + '</li>' : ulDom += '<li class="sel-page">' + i + '</li>';
                }
                that.options.jump ? jumpDom = '<input type="text" placeholder="1" class="jump-text jumpText" ><button type="button" class="jump-button" >跳转</button>' : jumpDom = '';
                content = '<div class="pagger-box"><button type="button"  class="turnPage first-page">首页</button>' +
                    '<button class="turnPage pre-page">上一页</button>' +
                    '<div class="pageWrap" style="width:' + wrapLength + 'px">' +
                    '<ul class="pageSelect" style="transition:all ' + that.options.slideSpeed + 'ms">' +
                    ulDom +
                    '</ul></div>' +
                    '<button class="turnPage next-page">下一页</button>' +
                    '<button type="button" class="last-page ">尾页</button>' +
                    jumpDom +
                    '<p class="total-pages">共&nbsp;' +
                    that.options.totalPages +
                    '&nbsp;页</p>' +
                    '<p class="total-count">' +
                    that.options.totalCount +
                    '</p></div>';
                that.el.html(content);
            },
            bindEvents: function() {
                var that = this;
                var $el = that.el;
                var pageSelect = $el.find('.pageSelect'), // ul
                    lis = pageSelect.children(), // li的集合
                    liWidth = 45, // li的宽度
                    totalPages = that.options.totalPages, // 总页数
                    pageIndex = that.options.pageNo, // 当前选择的页码
                    distance = 0, // ul移动距离
                    prePage = $el.find('.pre-page'),
                    nextPage = $el.find('.next-page'),
                    firstPage = $el.find('.first-page'),
                    lastPage = $el.find('.last-page'),
                    jumpBtn = $el.find('.jump-button'),
                    jumpText = $el.find('.jump-text');
                prePage.on('click', function() {
                    pageIndex--;
                    if (pageIndex < 1) pageIndex = 1;
                    handles(pageIndex);

                    //文字区域变化
                    console.log($('.house_house'))
                    $('.house_house').css({
                        marginTop: "+=" + heightLi * 8
                    })
                })

                jumpText.on("keyup", function(event) {
                    if (event.keyCode == 13) {
                        jumpBtn.trigger("click");
                    }
                });

                nextPage.on('click', function() {
                    pageIndex++;
                    if (pageIndex > lis.length) pageIndex = lis.length;
                    handles(pageIndex);
                    //文字区域变化
                    console.log($('.house_house'))
                    $('.house_house').css({
                        marginTop: "+=" + heightLi * 8
                    })
                })

                firstPage.on('click', function() {
                    pageIndex = 1;
                    handles(pageIndex);
                })

                lastPage.on('click', function() {
                    pageIndex = totalPages;
                    handles(pageIndex);
                })

                jumpBtn.on('click', function() {
                    var jumpNum = parseInt(jumpText.val().replace(/\D/g, ''));
                    if (jumpNum && jumpNum >= 1 && jumpNum <= totalPages) {
                        pageIndex = jumpNum;
                        handles(pageIndex);
                        jumpText.val(jumpNum);
                    } else {
                        jumpText.val(totalPages);
                        jumpBtn.trigger("click");
                    }
                })

                lis.on('click', function() {
                    pageIndex = $(this).index() + 1;
                    handles(pageIndex);
                })

                function handles(pageIndex) {
                    jumpText.val(pageIndex);
                    lis.removeClass('sel-page').eq(pageIndex - 1).addClass('sel-page');
                    if (totalPages <= 5) {
                        that.options.callback(pageIndex);
                        return false;
                    }
                    if (pageIndex >= 3 && pageIndex <= totalPages - 2) distance = (pageIndex - 3) * liWidth;
                    if (pageIndex == 2 || pageIndex == 1) distance = 0;
                    if (pageIndex > totalPages - 2) distance = (totalPages - 5) * liWidth;
                    pageSelect.css('transform', 'translateX(' + (-distance) + 'px)');
                    pageIndex == 1 ? firstPage.attr('disabled', true) : firstPage.attr('disabled', false);
                    pageIndex == 1 ? prePage.attr('disabled', true) : prePage.attr('disabled', false);
                    pageIndex == totalPages ? lastPage.attr('disabled', true) : lastPage.attr('disabled', false);
                    pageIndex == totalPages ? nextPage.attr('disabled', true) : nextPage.attr('disabled', false);
                    that.options.callback(pageIndex);
                }

                handles(that.options.pageNo); // 初始化页码位置
            }
        }
        $.fn.paging = function(options) {
            return new Paging($(this), options);
        }

        $(function() {
            var setTotalCount = 24;
            $('#box').paging({
                initPageNo: 1, // 初始页码
                totalPages: 3, //总页数
                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function(page) { // 回调函数
                    // console.log(page);
                }
            })

        })



        ////分页







        // --------------------------------------------------------------------------
    })
    $('.maplogo').on('click', function() {
            var screenwidth1 = document.documentElement.clientWidth;
            var screenheight1 = document.documentElement.clientHeight + 80;
            $(window).on('resize', function() {
                screenwidth1 = document.documentElement.clientWidth;
                $('#map').css({
                    "width": screenwidth1,
                })
                $(".hi_contant_right").toggle();
            })
            $('#map').css({
                "width": screenwidth1,
            })
            $(".hi_contant_right").toggle();
        })
        // 获取高度

    // $('.house_house').css({
    //     height:
    // })
    // 点击动态添加的房源 存入sessionStorage
    var house, house1;
    $(".house_housemin").on("click", 'li', function() {
            if (typeof sessionStorage.getItem("housearr") == "object") {
                var housearr = []
                house = $(this).html()
                housearr.unshift(house)
                housearr = JSON.stringify(housearr)
                sessionStorage.setItem("housearr", housearr)
            } else {
                var housearr1 = sessionStorage.getItem("housearr");
                housearr1 = JSON.parse(housearr1);
                house1 = $(this).html()
                if (housearr1.indexOf(house1) == -1) {
                    housearr1.unshift(house1)
                    housearr1 = JSON.stringify(housearr1)
                    sessionStorage.setItem("housearr", housearr1)
                }
            }
        })
        // 输入成功筛选
    $(document).on("keyup", function(e) {
            if (e.key == "Enter") {
                console.log(1)
                var arrcity = localStorage.getItem("arrcity")
                if (arrcity.indexOf($(".input-text").val()) != -1) {
                    sessionStorage.setItem("city", $(".input-text").val())
                    window.location.reload();
                }
            }
        })
        // btm
});