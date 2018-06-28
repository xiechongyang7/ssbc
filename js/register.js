function register() {


    $.ajax({
        url: 'http://127.0.0.1:8080/register/putUser',
        type: 'post',
        dataType: 'json',
        data: {
            phone: $("#user_phone").val(),
            passward:$("#user_password").val()
        },
        success: function (data) {
            if(data.resultCode == "100"){
                alert("注册成功")
                window.location.href='http://localhost:63342/ssbc/html/login.html';
            }else {
                alert("注册失败"+data.resultCode)
            }

        }

    })
}