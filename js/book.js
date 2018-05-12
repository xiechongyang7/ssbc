var bookid = window.location.href.split('=')[1];
var Replyname = null;
var userName = localStorage.getItem("userName");
var userId = localStorage.getItem("userId");
$(function () {
    console.log(localStorage.getItem("userId") + "  anme")
    $("#userTag").text(localStorage.getItem("userName"));
    $.ajax({
        url: 'http://127.0.0.1:8080/book/getbookbyid',
        type: 'get',
        dataType: 'json',
        data: {
            bookid: bookid
        },

        success: function (data) {
            $('#bName').append(data.book.bookName);
            $('#bName').val(data.book.bookId);
            $('#bAuthor').append(data.book.bookAuthor);
            $('#bookIn').append(data.book.bookIntroduce);
            //更新时间
            $('#replace').append(getMyDate(data.book.bookReplace));
            //书籍价值
            $('#bValue').append(data.book.bookValue)
            //书籍标签
            $('#bookTag').append(data.book.bookTag)
            //书籍分一类级
            $('#bookFirstClassify').append(classify.bookFirstClassify[data.book.bookFirstClassify].content)
            //二级
            $('#bookSecondClassify').append(classify.bookSecondClassify[data.book.bookSecondClassify].content)
            //三级
            $('#bookThirdClassify').append(classify.bookThirdClassify[data.book.bookThirdClassify == null ? 0 : data.book.bookThirdClassify].content)
            //    封面
            $('#img1').attr('src', "../images/明朝.png");
            // $('#img1').attr('src',"../images/"+data.book.bookCover);
        }

    })

//    评论功能

    $.ajax({
        url: 'http://127.0.0.1:8080/comment/getcmtbook',
        type: 'get',
        dataType: 'json',
        data: {
            bookId: bookid
        },
        success: function (data) {
            comment(data.commentList, data.commentList.length - 1);
        },
        error: function (data) {
            console.log("error" + data)
        }

    })

})

//主要评论
function comment(data, length) {
    // console.log(data)
    if (length < 0) return;
    if (data[length].replayName == null) {
        $("#commentdiv").append(`


                <div class="input-group input-group-lg " id="comment">
                    <span class="input-group-addon " value="${data[length].commentUserId}">${data[length].userName}</span>
                    <input type="text" class="form-control "id ="${data[length].commentId}" value=${data[length].commentContent} aria-describedby="sizing-addon1" onclick="setReply(this)" readonly>
                </div>
`);
    } else {
        $("#commentdiv").append(`
                <div class="input-group input-group-lg " id="comment">
                    <span class="input-group-addon "  value = "${data[length].commentUserId}">${data[length].userName}</span> 
                    <span class="input-group-addon "  >回复：</span>                                
                    <span class="input-group-addon " >${data[length].replayName}</span>
                <input type="text" class="form-control " id ="${data[length].commentId}" value=${data[length].commentContent} aria-describedby="sizing-addon1"
                       onclick="setReply(this)" readonly>                      
            </div>`);
    }

    if (data[length].commentsSon.length != 0) {
        comment(data[length].commentsSon, data[length].commentsSon.length - 1);
    }
    length--;
    comment(data, length);
}


function setReply(input) {

    $("#send").val(input.id);
    console.log($("#send").val());
    var input = $(input);
    var span = input.parent().children("span:first-child");
    $("#contentComment0").val("回复："+span.text());
    Replyname = span.text();

}


function sendComment() {

//    需要参数
//    回复人id
    var commentUserId =userId;
//    被回复人id
    var commentId = $("#send").val();
    //    书籍id
    var bookid = commentId != ""?null:window.location.href.split('=')[1];
//    回复内容
    var commentContent = $("#contentComment").val();
//    回复时间
    var commentTime = null;
//    评分
//    是否已读
console.log(window.location.href.split('=')[1])
    $.ajax({
        url:'http://127.0.0.1:8080/comment/postComment',
        type:'post',
        dataType:'json',
        data:{
            commentUserId:commentUserId,
            commentReply:commentId,
            commentBookId:bookid,
            commentContent:commentContent,
            commentScore:90,
            commentRead:0,
        },


        success:function (data){
            console.log(data);
            if (commentId == "") {
                $("#commentdiv").append(`


                <div class="input-group input-group-lg " id="comment">
                    <span class="input-group-addon " value="${commentUserId}">${userName}</span>
                    <input type="text" class="form-control "id ="${commentId}" value=${commentContent} aria-describedby="sizing-addon1" onclick="setReply(this)" readonly>
                </div>
`);
            } else {
                $("#commentdiv").append(`
                <div class="input-group input-group-lg " id="comment">
                    <span class="input-group-addon "  value = "${commentUserId}">${userName}</span> 
                    <span class="input-group-addon "  >回复：</span>                                
                    <span class="input-group-addon " >${Replyname}</span>
                <input type="text" class="form-control " id ="${commentId}" value=${commentContent} aria-describedby="sizing-addon1"
                       onclick="setReply(this)" readonly>                      
            </div>`);
            }

        }

    })
}




















