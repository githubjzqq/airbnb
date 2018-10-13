$(function() {

    //创建生日option；
    if ($('#birthmouth').html()) {
        for (let i = 1; i <= 12; i++) {
            var elm = '<option value="' + i + '">' + i + '月</option>';
            $('#birthmouth').append(elm);
        }
    }
    if ($('#birthday').html()) {
        for (let i = 1; i <= 31; i++) {
            var elm = '<option value="' + i + '">' + i + '日</option>';
            $('#birthday').append(elm);
        }
    }
    if ($('#birthyear').html()) {
        var time = (new Date).toUTCString().substr(12, 4);
        for (let i = Number(time); i >= 1900; i--) {
            var elm = '<option value="' + i + '">' + i + '年</option>';
            $('#birthyear').append(elm);
        }
    }

    //点击左侧tab切换；
    $('.main .tabs_content').on('click', '.tabs a', function(e) {
        //使用事件委托；

        //取消<a>的默认点击跳转事件；
        event.preventDefault();
        var index = $(e.target).index('.main .tabs_content .tabs li a');
        $(e.target).parent().siblings('li').removeClass('active');
        $(e.target).parent().addClass('active');

        //为对应的选项卡添加 active；
        $('.main>.container>.row>.content:not(.tabs_content)').removeClass('active');
        $('.main>.container>.row>.content:not(.tabs_content)').eq(index).addClass('active');
    })

    //点击子tab切换；
    function tab(e) {
        var index1 = $(e.target).index('.main>.container>.row>.content:not(.tabs_content).estimate .row.tabs span');
        var index2 = $(e.target).index('.main>.container>.row>.content:not(.tabs_content).recommend .row.tabs span');
        index1 == -1 ? index = index2 : index = index1;
        $(e.target).parent().siblings().toggleClass('active');
        $(e.target).siblings().removeClass('active');
        $(e.target).addClass('active');
    }
    $('.main>.container>.row>.content:not(.tabs_content).estimate .row.tabs').on('click', 'span', tab);
    $('.main>.container>.row>.content:not(.tabs_content).recommend .row.tabs').on('click', 'span', tab);


    function downloadMsg() {
        var user = sessionStorage;
        if (user.length != 0) {
            if (user.username != 'null') {
                $('#name').val(user.username).css('background-color', '#f1f1f1');
            };
            if (user.usersex != 'null') {
                $('#sex').attr('selected', 'selected').css('background-color', '#f1f1f1');
                $('#sex option').attr({ 'selectde': '' });
                $('#sex option[value=' + user.usersex + ']').attr('selected', 'selected').css('background-color', '#f1f1f1');
            };
            if (user.userbirth != 'null') {
                var birth = JSON.parse(user.userbirth);
                var y = birth.year;
                var d = birth.day;
                var m = birth.mouth;
                $("#birthmouth,#birthyear,#birthday").attr('selected', 'selected').css('background-color', '#f1f1f1');
                $('.main .container .row .base .birthday option').attr({ 'selectde': '' });
                $('#birthmouth option[value=' + m + ']').attr('selected', 'selected');
                $('#birthyear option[value=' + y + ']').attr('selected', 'selected');
                $('#birthday option[value=' + d + ']').attr('selected', 'selected');
            };
            if (user.useremail != 'null') {
                $('#email').val(user.useremail).css('background-color', '#f1f1f1');
            };
            if (user.usertel != 'null') {
                $('#phoneNmb').val(user.usertel).css('background-color', '#f1f1f1');
            };
            if (user.useraddress != 'null') {
                $('#address').val(user.useraddress).css('background-color', '#f1f1f1');
            };
            if (user.userintro != 'null') {
                $('#intro').val(user.userintro).css('background-color', '#f1f1f1');
            };
            if (user.userschool != 'null') {
                $('#school').val(user.userschool).css('background-color', '#f1f1f1');
            };
            if (user.userwork != 'null') {
                $('#work').val(user.userwork).css('background-color', '#f1f1f1');
            };
            if (user.userheaderimg != 'null') {
                $('.main .content.picture .row .pic img').attr('src', user.userheadimg);
            }
        };
    }

    //同步用户信息；
    if (sessionStorage.userid) {
        //如果登陆同步信息；
        downloadMsg();
    }

    //获取用户编辑信息
    function earnMsg() {
        var msg = {};
        msg.name = $('#name').val();
        msg.sex = $('#sex').val();
        msg.email = $('#email').val();
        msg.phoneNmb = $('#phoneNmb').val();
        msg.address = $('#address').val();
        msg.intro = $('#intro').val();
        msg.school = $('#school').val();
        msg.work = $('#work').val();
        msg.id = sessionStorage.userid;
        msg.birth = birth();

        function birth() {
            var m = $('#birthmouth').val();
            var y = $('#birthyear').val();
            var d = $('#birthday').val();

            var birth = {};
            birth.mouth = m;
            birth.day = d;
            birth.year = y;

            return JSON.stringify(birth);
        }
        return msg;
    };
    //点击保存按钮提交更改；
    $('#save').on('click', function() {
        if (sessionStorage.length != 0) {
            var msg = earnMsg();
            var url = '../php/user_edit.php';
            var data = '';
            for (var i in msg) {
                data = data.concat(i + '=' + msg[i] + '&')
            };
            data = data.slice(0, -1);
            $.ajax({
                url: url,
                type: 'post',
                data: data,
                success: function(data) {
                    var newMsg = JSON.parse(data);
                    var usermsg = sessionStorage;
                    //储存用户信息；
                    for (var i in newMsg) {
                        usermsg.setItem(i, newMsg[i]);
                    }
                }
            });
            $('.waiting').css({ 'display': 'block' }).html('修改完成，2s后自动跳转...')
            setTimeout(function() {
                $('.waiting').css({ 'display': '' })
                location.reload();
            }, 2000);
        } else {
            $('.waiting').css({ 'display': 'block', 'background-color': '#ff5a5f' }).html(': )请先登陆!');
            setTimeout(function() {
                $('.waiting').css({ 'display': '', 'background-color': '' }).html('');
            }, 2000);
        }
    });

    //用户头像；

    //同步数据库中的头像；
    function downloadPic() {
        var url = '../php/user_pic.php';
        $.ajax({
            url: url,
            type: 'post',
            data: null,
            success: function(data) {
                sessionStorage.pic = JSON.stringify(JSON.parse(data));
            }
        })
    };
    //判断是否已经保存头像到本地；
    if (!sessionStorage.pic) {
        downloadPic();
        var obj = JSON.parse(sessionStorage.pic);
        console.log(obj);
        for (var i in obj) {
            var item = $('<div class="item"></div>')
            item.html('<img src="' + obj[i].path + '" alt="pic">');
            $('#pic_list').append(item);
        }
    } else {
        var obj = JSON.parse(sessionStorage.pic);
        for (var i in obj) {
            var item = $('<div class="item"></div>')
            item.html('<img src="' + obj[i].path + '" alt="pic">');
            $('#pic_list').append(item);
        }
    }


    //点击选择头像；

    //样式；
    $('#pic_list').on('click', '.item', function(e) {
        $(e.target).parent().siblings().removeClass('active');
        $(e.target).parent().toggleClass('active');
    });

    //放弃修改移除选中的；
    $('#no_save').on('click', function(e) {
        $(e.target).parent().siblings('#pic_list').children().removeClass('active');
    });

    //点击提交按钮；

    $('#save_pic').on('click', function(e) {
        if (sessionStorage.userid) {
            if ($('#pic_list .item.active').length) {
                var path = $('#pic_list .item.active img').attr('src');
                var data = 'path=' + path + '&userid=' + sessionStorage.userid;
                console.log(path, data);
                $.ajax({
                    url: '../php/user_edit_pic.php',
                    data: data,
                    type: 'post',
                    success: function(data) {
                        sessionStorage.userheadimg = path;
                        $('#save_pic').parent().siblings('.waiting').css({ 'display': 'block' }).html('登陆成功(2s后自动关闭)');
                        setTimeout(function() {
                            $('#save_pic').parent().siblings('.waiting').css({ 'display': '' }).empty();
                            location.reload();
                        }, 1500)
                    }
                })
            }
        } else {
            $('#save_pic').parent().siblings('.waiting').css({ 'display': 'block' }).html('请先登陆!');
            setTimeout(function() {
                $('#save_pic').parent().siblings('.waiting').css({ 'display': '' }).empty();
            }, 1500);
        }


    });
});