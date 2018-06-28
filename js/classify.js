$(function () {

    var id = window.location.href.split('=')[1];

    var data = classify;
    getBook(id==null?1:id);

    for(var i=0;i<data.bookFirstClassify.length;i++){
        $("#bookClassify").append(` <li class="list-group-item" id="${data.bookFirstClassify[i].num}" onclick="getBook(this.id)">${data.bookFirstClassify[i].content}</li>`);
    }

})

function getBook(id) {
    $("#bookContent").html("");
    $.ajax({
        url:'http://127.0.0.1:8080/classify/getbookbyclassify',
        type:'get',
        dataType:'json',
        data:{
            classifyId:id
        },
        success:function (data) {
            for (var i = 0; i < data.bookList.length; i++) {
                $("#bookContent").append(`
                
                <div class="col-md-4">
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
        }
    })
}
function seeBook(id) {


    console.log(id);
    window.location.href='http://localhost:63342/ssbc/html/book.html?&bookid='+id;
}

