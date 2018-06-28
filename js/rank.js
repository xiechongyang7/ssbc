$(function () {
    //请求书籍列表
    $.ajax({
        url: 'http://127.0.0.1:8080/book/getnumbook?num=18',
        type: 'get',
        dataType: 'json',

        success: function (data) {
            for (var i = 0; i < data.bookList.length; i++) {
                $("#content").append(`
                
                <div class="col-sm-6 col-md-4 ">
            <div class="thumbnail">
            <h1>${i+1}</h1>
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
        }
    })
})

function seeBook(id) {


    console.log(id);
    window.location.href='http://localhost:63342/ssbc/html/book.html?&bookid='+id;
}
