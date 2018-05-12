var userId = localStorage.getItem("userId");
function setUser() {
    console.log("setUser");
    $("#all").empty();
    $("#setUser").show();

    $("#userNickname").val(userData.userNickname);
    $("#userSex").val(userData.userSex);
    $("#userSignature").val(userData.userSignature);
    $("#userEmail").val(userData.userEmail);
    $("#userBirthday").val(getMyDate(userData.userBirthday));
    $("#sel1").val(userData.address);

}
$.address =function () {
    var addressProvince= null;
    var addressCity = null;
    var addressArea =null;
    var addressUserd = null;
    // this.addressCity{
    //
    // }
}
function set() {
    console.log("修改执行")

    // for(var i = 0;i<3;i++){
    //     console.log("cscsadcsdcsa")
    //     console.log($("#sel1").val().split("-")[i]);
    //
    // }


    // var address = new $.address();
    //     address.addressProvince=$("#sel1").val().split("-")[1];
    //     address.addressCity=$("#sel1").val().split("-")[2];
    //     address.addressArea=$("#sel1").val().split("-")[3];
    //     address.addressUserd=userId;
    //     console.log(address.addressArea);

    // [
    //     addressProvince=$("#sel1").val().split("-")[1],
    //     addressCity=$("#sel1").val().split("-")[2],
    //     addressArea=$("#sel1").val().split("-")[3],
    //     addressUserd=userId,
    // ]
    console.log($("#sel1").val().split("-")[0]);
    console.log($("#sel1").val().split("-")[1]);
    console.log($("#sel1").val().split("-")[2]);
    console.log(userId);
    var sex = null;
    if($("#userSex").val()=='男'){
        sex = 1;
    }else {
        sex = 2;
    }
    $.ajax({
        url:"http://127.0.0.1:8080/user/postUser",
        type:"post",
        dataType:"json",
        data:{
            userId:userId,
            userSex:sex,
            userPortrait:"",
            userNickname:$("#userNickname").val(),
            userSignature:$("#userSignature").val(),
            userEmail:$("#userEmail").val(),
            userBirthday:$("#userBirthday").val(),
            // address:userId+"-"+$("#sel1").val(),

            addressProvince:$("#sel1").val().split("-")[0],
            addressCity:$("#sel1").val().split("-")[1],
            addressArea:$("#sel1").val().split("-")[2],
            addressUserId:userId,
        },
        success: function (data) {
            if(data.resultCode==100){
                alert("修改成功")
            }
        }

    })
}
function getValue() {
    // alert($('#sel1').val());
    console.log($('#sel1').val())


}