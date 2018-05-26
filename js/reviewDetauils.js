var url = window.location.href.split('&');
var rewiewBookId = url[0].split("=")[1];
var reviewId = url[1].split("=")[1];
var userName = localStorage.getItem("userName");
var userId = localStorage.getItem("userId");
// http://localhost:63342/ssbc/html/reviewdetails.html?rewiewBookId=12&reviewId=4
$(function () {
    console.log(":::::"+rewiewBookId+"::::"+reviewId);
    //书籍信息
    $.ajax({
        url: 'http://127.0.0.1:8080/book/getbookbyid',
        type: 'get',
        dataType: 'json',
        data: {
            bookid:rewiewBookId
        },
        success:function (data) {
            console.log(data);
            $("#bookname").text(data.book.bookName);
            $("#bookcover").attr("src","../images/"+data.book.bookCover);
            $("#bookAuthor").text("作者:"+data.book.bookAuthor);
        }
    })

    //书评信息
    $.ajax({
        url: 'http://127.0.0.1:8080/review/getReviewByReviewid',
        type: 'get',
        dataType: 'json',
        data: {
            reviewId:reviewId
        },
        success:function (data) {
            console.log(data)
            var review = data.review;
            $("#reviewName").val("名称:"+review.reviewName);
            $("#reviewAuthor").val("作者:"+review.reviewAuthor);
            $("#reviewContent").text(review.reviewContent);
        }
    })

    //评论
    //    评论功能

    $.ajax({
        url: 'http://127.0.0.1:8080/comment/getCommentByReviewId',
        type: 'get',
        dataType: 'json',
        data: {
            reviewId: reviewId
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
    var reviewId = reviewId = url[1].split("=")[1];;
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
            commentReviewId:reviewId,
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
































