function shoucang(id) {
    console.log(id);
    $.ajax({
        url: 'http://127.0.0.1:8080/collection/postCollection',
        type: 'post',
        dataType: 'json',
        data:{
            collectionUserId:localStorage.getItem("userId"),
            collectionBookId:id
        },
        success:function(data){
            if(data.resultCode==100){
                alert(data.resultMsg)
            }
        }
    })

}