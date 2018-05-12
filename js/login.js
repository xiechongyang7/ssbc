var log_btn = document.querySelector('#btn_login');

log_btn.onclick = function () {

    console.log("cds")
    $.ajax({
        url:'http://127.0.0.1:8080/lg/getpwd',
        type:'post',
        dataType:'json',

        data:{
            userId:$("#user_action").val(),
            pwd:$("#user_password").val()
        },
        success:function (data){

            setIt();

            if(data.resultCode == 300) {
                window.location.href = 'http://localhost:63342/ssbc/html/home.html'
            }
        }

    })
}

function setIt() {
    $.ajax({
        url:'http://127.0.0.1:8080/user/getuser',
        type:'get',
        dataType:'json',

        data:{
            userPhone:$("#user_action").val(),
        },
        success:function (data){
            console.log(data.user.userNickname);
            localStorage.setItem("userName",data.user.userNickname);
            localStorage.setItem("userId",data.user.userId);
            localStorage.setItem("user",data.user)

            console.log(localStorage.getItem("userName"))
        }
    })
}