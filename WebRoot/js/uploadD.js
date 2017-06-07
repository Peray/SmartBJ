var j = 0, count = 0;
var num;
function fileSelected(obj) {
	num = 0;
	$('#arlt1').val();
    j = 0, count = 0; 
    var html = "";
    if (!obj.value.match(/.jpg|.gif|.png|.bmp/i)){
		alert("请选择图片文件！");
		return false;
	}
    var file=null; 
    file = document.getElementById('afileToUpload').files;
    while(num<1000){
		num = Math.floor(Math.random()*10000);
	}
    for (var i = 0; i < file.length;i++) {
		var url = window.URL.createObjectURL(file[i]);
		var txt = file[i].name.split(judge(file[i]));
		html += "<div class='imgBox' id='imgbox"+num+i+"'>" +
		"<div class='bg' style='background:url("+url+") no-repeat center;background-size:100% 100%'></div>"+
		"<p style='text-align:center;'>"+txt+"</p><input type='text' style='display:none;' name='imgname"+num+i+"' id='imgname"+num+i+"'/>"+
		"<span class='del' onclick='del("+num+i+")'>删除</span></div>"
    }
    $(".upfile").hide();
    $(".newUpload").hide();
    $("#imgs").append(html);
			
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
    if(count >= 1 && count - j == 1){
		$("#afileToUpload").val("");
    	$(".upfile").remove();
    	$(".newUpload").remove();
    	$("#imgs").append("<div class='newUpload'>"+
			"<span>"+"<img src='img/timg.jpg' alt=''>"+"</span>"+
			"<input type='file' name='afileToUpload' id='afileToUpload' multiple='true' onchange='fileSelected(this);' />"+
			"<p>按住Ctrl可多选照片</p>"+
			"</div>");
	}
    //$('.upfile').hide();
    //$('.upfile>a').remove();
}

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */ 
    var rlt = evt.target.responseText;
    var old = $('#arlt1').val();
    if (rlt.length > 1) {  
            $('#arlt1').val(old + "," + rlt); 
    }
    if (j < count){
	    	$('#imgname'+num+j).val(rlt);
	        j++;
	        uploadFile();
	}
}


function uploadFailed(evt) {
    alert(evt+"上传失败.");
}

function uploadCanceled(evt) {
    alert("取消上传.");
}
//删除
function del(v){
		var Imgnode = $('#imgname'+v).val().replace(/[\r\n]/g,"");
		var delz = Imgnode.replace('"',''); 
	$.ajax({
		url:'qiye!deleteFile.action',
		data:{"fileName":delz},
		success:function(data){
			if(data == 1){
				alert("删除成功!");
				var arr1 = new Array();
				var arr = [];
				var arrlist = $('#arlt1').val();
				arr1 = arrlist.split(",");
				for(var i=0; i<arr1.length; i++){
					if(arr1[i] != delz){
						arr.push(arr1[i]);
					}
				}
				$('#arlt1').val(arr.toString()); 
				$("#afileToUpload").val("")
				$("#imgbox"+v).remove();
				$(".upfile").remove();
				v = 0;
			}else{
				alert("删除失败!")
			}
		},
		error:function(){
			
		}
	});
}