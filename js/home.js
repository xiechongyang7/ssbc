$(function () {
    console.log(localStorage.getItem("userName") + "  anme")
    $("#userTag").text(localStorage.getItem("userName"));
    userId = localStorage.getItem("userId");

    //请求书籍列表
    $.ajax({
        url: 'http://127.0.0.1:8080/book/getnumbook?num=18',
        type: 'get',
        dataType: 'json',

        success: function (data) {
            for (var i = 0; i < 12; i++) {
                $("#bookList").append(`
                
                <div class="col-md-2">
            <div class="thumbnail">
                <img id = "${data.bookList[i].bookId}" onclick="seeBook(this.id)" src="../images/明朝.png" alt="...">
                <div class="caption">
                    <h3 >${data.bookList[i].bookName}</h3>
                    <p>${data.bookList[i].bookAuthor}</p>
                    <p id = "getBookId">
                        <a onclick="shoucang(this.id)"  id = "${data.bookList[i].bookId}"class="btn btn-primary" role="button" >收藏</a>
                    </p>
                </div>
            </div>
        </div>
                
                
                `);
            }

            for (var i = 12; i < 18; i++) {
                // console.log(data.bookList[i].bookId);
                $("#jingpin").append(`
                
                <div class="col-md-2 ">
            <div class="thumbnail">
                <img onclick="seeBook(this.id)" id = "${data.bookList[i].bookId}" src="../images/明朝.png" alt="...">
                <div class="caption">
                    <h3>${data.bookList[i].bookName}</h3>
                    <p>${data.bookList[i].bookAuthor}</p>
                    <p id = "getBookId">
                        <a onclick="shoucang(this.id)" id = "${data.bookList[i].bookId}" class="btn btn-primary" role="button">收藏</a>
                    </p>
                </div>
            </div>
        </div>
                `)
            }

        }
    })




})


function seeBook(id) {


    console.log(id);
    window.location.href='http://localhost:63342/ssbc/html/book.html?&bookid='+id;
}

function shoucang(id) {
    console.log(id);
    $.ajax({
        url: 'http://127.0.0.1:8080/collection/postCollection',
        type: 'post',
        dataType: 'json',
        data:{
            collectionUserId:userId,
            collectionBookId:id
        },
        success:function(data){
            if(data.resultCode==100){
                alert("收藏成功")
            }
        }
    })

}