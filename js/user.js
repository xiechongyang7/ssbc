var userId = localStorage.getItem("userId");
var userData = null;
$(function () {

    $("#userTag").text(localStorage.getItem("userName"));
    console.log(localStorage.getItem("userName"));
    init_city_select($("#sel1, #sel2"));

    $('.date').each(function () {
        $(this).ionDatePicker({
            lang: 'zh-cn',
            format: 'YYYY-MM-DD'
        });
    });
    seeUser();
})


function seeUser() {

    $("#all").empty();
    $("#setUser").hide();
    $("#upBook").hide();
    $.ajax({
        url: "http://127.0.0.1:8080/user/getU&A",
        type: "get",
        dataType: "json",
        data: {
            userId: userId
        },
        success: function (data) {
            userData = data.user;
            userData.address = data.user.address.addressProvince +
                "-" + data.user.address.addressCity +
                "-" + data.user.address.addressArea +
                "-" + data.user.address.addressRemark;

            $("#all").append(`
    
    <div class="col-md-10" id="seeuser" >
        <div class="col-md-12">

            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    昵称：
                </div>
                <div class="panel-footer col-md-10">${data.user.userNickname}</div>
            </div>

            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    性别：
                </div>
                <div class="panel-footer col-md-10">${data.user.userSex}</div>
            </div>

            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    个新签名：
                </div>
                <div class="panel-footer col-md-10">${data.user.userSignature}</div>
            </div>


            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    邮箱：
                </div>
                <div class="panel-footer col-md-10">${data.user.userEmail}</div>
            </div>

            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    生日：
                </div>
                <div class="panel-footer col-md-10">${getMyDate(data.user.userBirthday)}</div>
            </div>
            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    地址：
                </div>
                <div class="panel-footer col-md-10">
                ${userData.address}
</div>
            </div>

            <div class="panel    col-md-12">
                <div class="panel-body col-md-2">
                    金币：
                </div>
                <div class="panel-footer col-md-10">${data.user.userCoin}</div>
            </div>


            <div class="col-md-8" style="">
                <img src="../images/w.jpeg"/>
            </div>
        </div>

    </div>
    
    `)

        }
    })

}



