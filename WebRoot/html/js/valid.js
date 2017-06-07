





//验证企业是否注册
function qyname() {
	var gsnm = $("#qiye_name").val();
	if(gsnm.length != 0 ){
		$.ajax({
			type: "post",
			url: "qiye!searchName.action", //url, //
			data: { "qiyeName":gsnm},
			dataType: "text",
			success: function(ret) {
				var data = eval(ret);
				if (data == '1') {
					alert("该企业为已注册企业，不能继续注册！")
					$("#qiye_name").val("");
				}
			},
			error: function(ret, ret1, ret2) {
				debugger;
			}
		});
	}
}

















//valadate

$(function() {

	$.validator.messages = {
		required: '输入不能为空.'
	}

//登陆
	$("#subdeng").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$(element).closest("p").append(error);
		},
		errorElement: "span",
		rules: {
			logName: {
				required: true
			},
			logPwd: {
				required: true
			},
			agree: "required"
		},

		messages: {
			logName: {
				required: "账号不能为空！"
			},
			logPwd: {
				required: "请输入密码！"
			}
		},
		submitHandler: function(form) {
			isLogins();
		}
	});







//注册
	$("#subzhuce").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$(element).closest("p").append(error);
		},
		errorElement: "span",
		rules: {
			logName: {
				required: true,
				rangelength: [4, 15]
			},
			logPwd: {
				required: true,
				rangelength: [6, 20]
			},
			checkpwd: {
				required: true,
				rangelength: [6, 20],
				equalTo: "#logPwd"
			},
			agree: "required"
		},

		messages: {
			logName: {
				required: "账号不能为空！",
				rangelength: "账号必须在4-15位之间！"
			},
			logPwd: {
				required: "请输入密码！",
				rangelength: "密码必须在6-20位之间！"
			},
			checkpwd: {
				required: "请再次输入密码！",
				rangelength: "密码必须在6-20位之间！",
				equalTo: "两次密码输入不一致！"
			}
		},
		submitHandler: function(form) {
			registerSubmit();
		}
	});
	
//企业认证
	$("#qyform").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$(element).closest("tr").find(".td_error").append(error);
		},
		errorElement: "span",
		rules: {
			tm: {
				tm: true
			},
			afileToUpload: {
				required: true
			},
			email:{
				email:true
			},
			url:{
				url:true
			},
			agree: "required"
		},

		messages: {
			tm: {
				tm: "格式错误"
			},
			afileToUpload: {
				required: "请选择文件"
			},
			email:{
				email: "格式错误"
			},
			url:{
				url:"格式错误"
			}
		},
		submitHandler: function(form) { 
			//打开弹窗
			$('#myModal').modal('show');
			//取页面值
			var qiye_name1 = $("#qiye_name1").val(),
			lxr_name1 = $("#lxr_name1").val(),
			telephone1 = $("#telephone1").val(),
			email1 = $("#email1").val(),
			website_add1 = $("#website_add1").val(),
			faren1 = $("#faren1").val(),
			imgs1 = $("#imgs1").html(),
			arlt1 = $("#arlt1").val(),
			term1 = $('input:radio[name="term1"]:checked').val();

			//弹窗获取页面值
			$("#qiye_name").val(qiye_name1);
			$("#lxr_name").val(lxr_name1);
			$("#telephone").val(telephone1);
			$("#email").val(email1);
			$("#website_add").val(website_add1);
			$("#faren").val(faren1);
			$("#imgs").html(imgs1);
			$("#arlt").val(arlt1);
			$("#lxr_name").val(lxr_name1);
			$("input:radio[name='term'][value='" + term1 + "']").prop("checked", "checked");
			
			//提交
			$("#submit").click(function() {
				var qiyeName = $("#qiye_name").val(),
				lxrName = $("#lxr_name").val(),
				telephone = $("#telephone").val(),
				email = $("#email").val(),
				websiteAdd = $("#website_add").val(),
				faren = $("#faren").val(),
				arlt = $("#arlt").val();   
				term = $('input:radio[name="term"]:checked').val();
				$.ajax({
					type:"post",
					url:"qiye!add.action",
					data:{
						"qiyeName":qiyeName,
						"lxrName":lxrName,
						"telephone":telephone,
						"email":email,
						"websiteAdd":websiteAdd,
						"faren":faren,
						"zzImg":arlt,
						"userId":userId,
						"term":term
					},
					success:function(data){
						var data = eval(data);
						if(data == '1'){
							window.location.href="application_2.html"
						}else{
							alert("添加失败");
						}
					},
					error:function(){
						alert("未提交")
					}
				});   
			});  
			
			
			
			$("#submitUd").click(function() {
				var qiyeName = $("#qiye_name").val(),
				lxrName = $("#lxr_name").val(),
				telephone = $("#telephone").val(),
				email = $("#email").val(),
				websiteAdd = $("#website_add").val(),
				faren = $("#faren").val(),
				faren = $("#faren").val(),
				arlt = $("#arlt").val();   
				term = $('input:radio[name="term"]:checked').val();
				qiyeId = $("#qy_id").val(); 
				$.ajax({
					type:"post",
					url:"qiye!update.action",
					data:{
						"qiyeId":qiyeId,
						"qiyeName":qiyeName,
						"lxrName":lxrName,
						"telephone":telephone,
						"email":email,
						"websiteAdd":websiteAdd,
						"faren":faren,
						"zzImg":arlt,
						"term":term
					},
					success:function(data){
						var data = eval(data);
						if(data == '1'){
							window.location.href="application_2.html"
						}else{
							alert("添加失败");
						}
					},
					error:function(){
						alert("未提交")
					}
				});   
			});  
		}  
	});

//反馈
	$("#fkform").validate({
		rules: {
			tm: {
				tm: true
			},
			email:{
				email:true
			},
			files: {
				required: true
			},
			agree: "required"
		},

		messages: {
			tm: {
				tm: "格式错误"
			},
			email:{
				email:"请输入正确格式的邮箱"
			},
			files: {
				required: "请选择文件"
			}
		},
		submitHandler: function(form){
			var fk_des = $("#fk_des").val(),
				fk_emai = $("#fk_email").val(),
				fk_tel = $("#fk_tel").val(),
				fk_img = $("#arlt1").val();
			$.ajax({
					type:"post",
					url:"fk!add.action",
					data:{
						"content":fk_des,
						"email":fk_emai,
						"telephone":fk_tel,
						"arlt":fk_img,
						"userId":userId
					},
					success:function(data){
						if(data == 1){
							alert("提交成功！");
							var $section = $("section");
							$section.html("<p class='than_text'>感谢您的反馈！我们将尽快处理您的问题！</p>")
						}else{
							alert("提交失败！");
						}
					},
					error:function(){
						
					}
				});   
		}
	});



//联系我们
	$("#lxform").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$(element)
			.closest("tr")
			.find(".td_error")
			.append(error);
		},
		errorElement: "span",
		rules: {
			tm: {
				tm: true
			},
			email:{
				email:true
			},
			agree: "required"
		},

		messages: {
			tm: {
				tm: "格式错误"
			},
			email:{
				email:"请输入正确格式的邮箱"
			}
		},
		submitHandler: function(form){
			var th_gsmc = $("#th_gsmc").val(),
				th_gsjs = $("#th_gsjs").val(),
				th_xqms = $("#th_xqms").val(),
				th_lxr = $("#th_lxr").val(),
				th_tm = $("#th_tm").val(),
				th_yx = $("#th_yx").val();

			$.ajax({
				url: '',
				data: {
					'th_gsmc':fk_des,
					'th_gsjs':fk_emai,
					'th_xqms':fk_tel,
					'th_lxr':th_lxr,
					'th_tm':th_tm,
					'th_yx':th_yx
				},
				success:function(){

				},
				error:function(){

				}
			});
		}
	});
































	//邮箱或手机验证规则  
	// jQuery.validator.addMethod("users", function (value, element) {
	//     var users = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
	//   return this.optional(element) || (users.test(value));
	// }, "格式不对");

	//字母和数字的密码
	// jQuery.validator.addMethod("password",function(value,element){
	// 		var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
	// 		return this.optional(element) || (password.test(value));
	// },"密码格式如：abc123");


	//电话或手机验证规则  
	jQuery.validator.addMethod("tm", function(value, element) {
		var tm = /(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
		return this.optional(element) || (tm.test(value));
	}, "格式不对");

})
