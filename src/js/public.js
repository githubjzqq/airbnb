$(function() {
    var login = 0; //登陆状态；


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
        var reg = /^1[34578]\d{9}$/;
        if (reg.test($(this).val())) {
            $(this).css('border-color', 'yellowgreen');
        } else {
            $(this).css('border-color', 'red');
        }
    });

    //生成验证码；
    function generate() {
        function generateNum() {
            var num = 0;
            do {
                num = Math.floor(Math.random() * 123);
            } while (num < 48 || (num > 57 && num < 65) || num > 90 && num < 97);
            return num;
        };
        var str = String.fromCharCode(generateNum(), generateNum(), generateNum(), generateNum(), generateNum(), generateNum());
        $(this).parent().children('.result').html(str);
        console.log(str.toLowerCase());
    }
    $('.mod .modal-dialog.mad1 .modal-content .modal-body.verify .generate').on('click', generate);
});