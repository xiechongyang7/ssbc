$(function () {
    $.ajax({
            url: 'http://127.0.0.1:8080/review/getreview',
            type: 'get',
            dataType: 'json',
            data: {
                num:1
            },
            success:function (data) {
                console.log(data)
                for(var i = 0;i < data.reviews.length;i++){
                    // console.log(data);
                    $('#reviewContent').append(`
                    <p class="list-group-item col-md-12">
            <span class="label label-default col-md-2" style="font-size: 20px;height: 30px;" id="replace">书籍名称：${data.reviews[i].book.bookName}</span>
            <span class="label label-warning col-md-2" style="font-size: 20px;height: 30px;" id="bValue">作者：${data.reviews[i].book.bookAuthor}</span>
            <span class="label label-success col-md-2" style="font-size: 20px;height: 30px;" id="bookTag">书评人：${data.reviews[i].authorName}</span>
            <span class="label label-info col-md-2" style="font-size: 20px;height: 30px;" id="bookFirstClassify">点赞数量：</span>
            <button id="${data.reviews[i].reviewBookId}" name="${data.reviews[i].reviewId}" class="btn btn-primary col-md-1 pull-right" onclick="gotoDetails(this)" style="height: 30px;">查看书评</button>
        </p>
                    `)
                }
            }
        }
    )
})

function gotoDetails(data) {
    window.location.href = 'http://localhost:63342/ssbc/html/reviewdetails.html?rewiewBookId='+data.id+"&reviewId="+data.name;
}