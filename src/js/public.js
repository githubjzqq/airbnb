$(function() {
    var login = 0; //储存登陆信息；
    var regist = {}; //储存注册信息；
    regist.url = '../php/regist.php';


    if (login) {
        $('.header .header-nav li.sub.user-msg').attr('style', 'visibility: visible')
    }
    //搜索框获得焦点时出发事件；
    $('.header .search .input-text').on('focus', function() {
        $(this).parent('.search').addClass('focus'); //边框高亮；
        $('.header .search .user-history').addClass('show'); //显示搜索历史；
        $('.header-nav-min').removeClass('show'); //关闭nav-min(移动端);
    });

    //搜索框失去焦点时触发事件；
    $('.header .search .input-text').on('blur', function() {
        setTimeout(function() {
            $('.header .search .user-history').removeClass('show'); //搜索历史隐藏；
        }, 100);
        $(this).parent('.search').removeClass('focus'); //清除边框的高亮；
    });

    if (window.innerWidth < 1370) {
        $('.header .header-nav li:first-child a').html('<img src="../images/public/China.png" alt="" class="country">');
    };

    //屏幕宽度变化调整导航的隐藏与显示；
    $(window).resize(function() {
        if (window.innerWidth < 1370) {
            $('.header .header-nav li:first-child a').html('<img src="../images/public/China.png" alt="" class="country">')
        };
        if (window.innerWidth >= 1370) {
            $('.header .header-nav li:first-child a').html('<img src="../images/public/China.png" alt="" class="country">人民币（￥）')
        };
    });
    $(window).resize(function() {
        if (window.innerWidth < 1340) {
            $('.header .header-nav li:not(.sub)').eq(2).empty();
            $('.header .header-nav li:not(.sub)').eq(3).empty();
        };
        if (window.innerWidth >= 1340) {
            $('.header .header-nav li:not(.sub)').eq(2).html('<a href="">成为房东/体验达人</a>');
            $('.header .header-nav li:not(.sub)').eq(3).html('<a href="">故事</a>');
        };
    });
    $('#logo').on('click', function() {
        if (window, innerWidth < 1128) {
            $('.header .sub-btn .img').toggleClass('trans');
            $('.header-nav-min').toggleClass('show')
        }
    });

    //点击导航出现/隐藏子菜单；
    $('.header .header-nav li:not(.sub)').on('click', function(e) {
        index = $(this).index('.header .header-nav li:not(.sub)');
        $('.header .header-nav li.sub').not($('.header .header-nav li.sub').eq(index)).removeClass('active');
        $('.header .header-nav li.sub').eq(index).toggleClass('active');
    });

    //点击选择货币；
    $('.header .header-nav li.sub.currency .list').on('click', function(e) {
        $('.header .header-nav li.sub.currency .list').removeClass('active');
        $(e.target).addClass('active');
        var ele = $(e.target).clone().html();
        $('.header .header-nav li._currency a').html(ele);
        $('.header .header-nav li.sub').removeClass('active')
    });

    //底部切换语言切换货币；
    $('.footer .tab1 .item:nth-child(1) .dropup .dropdown-menu li').on('click', function() {
        // console.log($(this).parent().siblings('.dropdown-toggle').children('span'));
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

    //验证验证码
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
    $('.mod .modal-dialog.mad1 .modal-content.email .modal-body.button').on('click', function() {
        regist.email = [];
        var reg1 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        var reg2 = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/;
        regist.email.push(reg1.test($(this).siblings('.input').children('.inputnmb').children('input').val()));
        if ($(this).siblings('.verify').length != 0) {
            console.log($(this).siblings('.verify').children('input').val(), $(this).siblings('.verify').children('.result').html());
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
        console.log(regist.email, regist.emailAd);
    });

    //手机号注册&登陆提交验证；
    $('.mod .modal-dialog.mad1 .modal-content.phone .modal-body.button').on('click', function() {
        regist.phone = [];
        var reg1 = /^1[34578][0-9]{9}$/;
        var reg2 = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/;
        regist.phone.push(reg1.test($(this).siblings('.input').children('.inputnmb').children('input').val()));
        if ($(this).siblings('.verify').length != 0) {
            console.log($(this).siblings('.verify').children('input').val(), $(this).siblings('.verify').children('.result').html());
            if ($(this).siblings('.verify').children('input').val()) {
                regist.phone.push($(this).siblings('.verify').children('input').val().toLowerCase() === $(this).siblings('.verify').children('.result').html().toLowerCase());
            } else {
                regist.phone.push(false);
            }
        };
        regist.phone.push(reg2.test($(this).siblings('.password').children('.box').children('.pwd').val()));
        regist.phone.push($(this).siblings('.rule').children('.box').children('.check')[0].checked);
        regist.phoneAd = regist.phone.every(function(item, index, array) {
            return item == true;
        });
        console.log(regist.phone, regist.phoneAd);
        regist.phoneData = ;
        if (regist.phoneAd) {
            $.ajax({
                url: regist.url,
                type: 'post',
                data: regist.phoneData,
                success: function() {

                },
                error: function(err) {
                    console.log(err)
                },
            })
        }
    });

});