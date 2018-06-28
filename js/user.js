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
            if(data.user.address!=null){
                userData.address = data.user.address.addressProvince +
                    "-" + data.user.address.addressCity +
                    "-" + data.user.address.addressArea
                    // "-" + data.user.address.addressRemark;
            }


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
                ${userData.address==null?"":userData.address}
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

function getCollection() {

    $("#all").html("");
    $("#setUser").hide();
    $("#upBook").hide();
    $.ajax({
        url:'http://127.0.0.1:8080/collection/getCollection',
        type:'get',
        dataType:'json',

        data:{
            userId:userId
        },
        success:function (data){

            console.log(data)
            $("#all").append(`<div class="col-md-10">`);
            for(var i = 0; i < data.bookList.length;i++){
                $("#all").append(`

                    <div class="col-md-4">
                    <div class="thumbnail">
                    <img id = "${data.bookList[i].bookId}" onclick="seeBook(this.id)" src="../images/明朝2.png" alt="...">
                    <div class="caption">
                    <h3>${data.bookList[i].book.bookName}</h3>
                    <p>${data.bookList[i].book.bookAuthor}</p>
                    <p>
                    <a href="#" class="btn btn-primary" role="button">删除</a>
                    </p>
                    </div>
                    </div>
                    </div>
`);

            }
        }
    })
}
function seeBook(id) {


    console.log(id);
    window.location.href='http://localhost:63342/ssbc/html/book.html?&bookid='+id;
}


