var data = classify;
function updata() {

    console.log("csacdacsda")
    $("#all").empty();

    $('#setUser').hide();

    $('#upBook').show();
    for(var i=0;i<data.bookFirstClassify.length;i++){
        $("#bookFirstClassify").append(`<option value="${data.bookFirstClassify[i].num}">${data.bookFirstClassify[i].content}</option>`);
    }

    for(var i=0;i<data.bookSecondClassify.length;i++){
        $("#bookSecondClassify").append(`<option value="${data.bookSecondClassify[i].num}">${data.bookSecondClassify[i].content}</option>`);
    }

    for(var i=0;i<data.bookThirdClassify.length;i++){
        $("#classifythird").append(`<option value="${data.bookThirdClassify[i].num}">${data.bookThirdClassify[i].content}</option>`);
    }
    $('#bookUserId').val(localStorage.getItem("userId"));
    console.log( $('#bookUserId').val())

}
function upbook() {
// console.log($('#bookcover').val());
// console.log($('#bookcover').name);
// console.log($("#bookname").val());
// console.log();
// console.log();
// console.log();
    $.ajax({
        url:'http://127.0.0.1:8080/book/postbook',
        type:'post',
        dataType:'json',
        processData: false,
        contentType: false,
        data:new FormData($('#from1')[0]),
        success:function (data) {
            alert("上传成功")
        }
    })

}


