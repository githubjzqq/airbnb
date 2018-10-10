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
        for (let i = 1900; i <= Number(time); i++) {
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
    $('.main>.container>.row>.content:not(.tabs_content).estimate .row.tabs').on('click', 'span', tab)
    $('.main>.container>.row>.content:not(.tabs_content).recommend .row.tabs').on('click', 'span', tab)
});