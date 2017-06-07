var j = 0, count = 0;
function fileSelected(obj) {
	$('#arlt1').val("");
    j = 0, count = 0; 
    if (!obj.value.match(/.jpg|.gif|.png|.bmp/i)){
		alert("请选择图片文件！");
		return false;
	}
    var file=null; 
    file = document.getElementById('afileToUpload').files; 
    for (var i = 0; i < file.length;i++) {
        var html = "";
		var url = window.URL.createObjectURL(file[i]);
		var txt = file[i].name.split(judge(file[i]));
		html += "<img src='"+url+"' data-action='zoom'/>"+
			"<p class='p_txt'>"+txt+"</p>"+
			"<span class='del' onclick='del()'>删除</span>"
    }
	$("#imgs1").html(html)
    count=file.length;
    uploadFile();
} 

$(document).on('click', '.remove', function () {
    var idx = $(this).parent().prevAll().length;
    $(this).parent().remove(); 
    var al = $('#arlt1').val().split('img');
    al.splice(idx, 1);
    var values = "";
    for (var i = 1; i < al.length; i++) {
        values +="img" +al[i];
       
    }
    $('#arlt1').val(values);
    //alert($('#arlt1').val(values)+"-----+++++");
});

$(document).on('click', '.removePic', function () {
    var idx = $(this).parent().prevAll().length;
    $(this).parent().remove();
    var al = $('#rlt').val().split('img');
    al.splice(idx, 1);
    var values = "";
    for (var i = 1; i < al.length; i++) {
        values += "img" + al[i];

    }
    $('#rlt').val(values);
});

function uploadFile() {
    var fd = new FormData(); 
    if(document.getElementById('afileToUpload').files[j] == null){
     return;
    }
    fd.append("afileToUpload", document.getElementById('afileToUpload').files[j]); 
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            if (percentComplete != 100) {
                $('#progressNumber' + j).text(percentComplete.toString() + '%');
            } else {
                $('#progressNumber' + j).text("上传完成!");
            }
        }
        else {
            $('#progressNumber' + j).text("无法计算!");
        }
    }, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", ""+system.pojUrl+"UploadFile.do");
    xhr.send(fd);
    $('.upfile').hide();
    $('.upfile>a').remove();
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */ 
    var rlt = evt.target.responseText;
    if (rlt.length > 1) {  
            var old = $('#arlt1').val();
            $('#arlt1').val(old + "img" + rlt); 
    }
}


function uploadFailed(evt) {
    alert(evt+"上传失败.");
}

function uploadCanceled(evt) {
    alert("取消上传.");
}
//删除
function del(){
	var Imgnode =  $("#arlt1").val();
	Imgsub = Imgnode.substring(4); 
	$.ajax({
		url:'qiye!deleteFile.action',
		data:{"fileName":Imgsub},
		success:function(data){
			if(data == 1){
				alert("删除成功!")
			}else{
				alert("删除失败!")
			}
		},
		error:function(){
			
		}
	});
	$("#imgs1").html('');
	$("#arlt1").val("");
	
	var jia = "";
	jia += "<a href='javascript:;' class='a-upload' style='height: 20px;'>"+
				"<span><img src='../img/timg.jpg' alt=''></span>"+
				"<input type='file' name='afileToUpload' id='afileToUpload' onchange='fileSelected(this);' />"+
			"</a>"
	$(".upfile").show().html(jia);
}