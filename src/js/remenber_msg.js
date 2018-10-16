$(function() {
    if (sessionStorage.userid != 'null' && sessionStorage.userid) {
        //记住用户上次输入的电话或邮箱
        if (sessionStorage.usertel != 'null') {
            localStorage.setItem('user_his_tel', sessionStorage.usertel);
        };
        if (sessionStorage.useremail != 'null') {
            localStorage.setItem('user_his_email', sessionStorage.useremail);
        }
    }
    if (!sessionStorage.userid) {
        if ($('.mod .login.phone .modal-body.input input').length) {
            $('.mod .login.phone .modal-body.input input').val(localStorage.user_his_tel);
        };
        if ($('.mod .login.email .modal-body.input input').length) {
            $('.mod .login.email .modal-body.input input').val(localStorage.user_his_email);
        };
    }
})