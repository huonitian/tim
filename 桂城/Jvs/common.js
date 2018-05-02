$(window).load(function() {
/*live_Payment.html start*/
$(".live_Payment_cot ul li").on("click",function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".live_UserMoneys").val($(this).children("div").children("var").text());
	})
/*live_Payment.html end*/
/*hr_personnel.html*/
$(".hr_personnel ul li").on("click",function(){
		$(this).addClass("hover").siblings().removeClass("hover")
	})

/*pay_ChooseObj.html*/
$(".person_info td:first-child").on("click",function(){
		$(this).addClass("hover").parent("tr").siblings("tr").children("td:first-child").removeClass("hover")
	})
$(".bg_Choice_cot li").on("click",function(){
		$(this).addClass("hover").siblings().removeClass("hover")
	})
/*pay_Wait.html*/
	$(".mz_waitPay_top li").on("click",function(){
		var index=$(this).index();
		if($(this).hasClass("hover")){
		}else{
			$(this).addClass("hover");
			$(this).siblings().removeClass("hover");
			if(index==0){
				$(".mz_waitPay_cot").attr("style","visibility:visible");
				$(".mz_Pay_cot").attr("style","visibility:hidden");
			}else{
				$(".mz_waitPay_cot").attr("style","visibility:hidden");
				$(".mz_Pay_cot").attr("style","visibility:visible");
			}
			
		}
	})	
/*按钮切换*/
	$(".mz_waitPay_cot table tr:first-child td span").on("click",function(){
		if(!$(this).parent("td").hasClass("hover")){
			$(this).parent("td").addClass("hover").parents("table").siblings("table").find(".hover").removeClass("hover")
		}else{
			//$(this).parent("td").removeClass("hover")
		}
	})
/*gh_AffirmGh.html*/
$(".gh_ChoiceObjTab tr td").find(".user_Chiose").on("click",function(){
	$(this).parents("tr").addClass("hover").siblings("tr").removeClass("hover")
})
/*gh_ChooseKs.html*/
var wH=$(window).height();
	wH=wH-101;
	$(".choice_list").height(wH);
	$(".choice_info").height(wH);
	
	userClick(".choice_tab li")
	userClick(".choice_list li")
	userList(".choice_list li",".choice_info ol")
/*gh_ChooseDoc.html*/
$(".swiper-container .swiper-wrapper div").on("click", function() {
			var userClick=$(this).index();
			if ($(this).hasClass("full")) {
				alert("本天满人不能预约")
			} else {
				if ($(this).hasClass("hover")){
						$(this).removeClass("hover")
				} else {
					$(this).addClass("hover").siblings().removeClass("hover")
				}
				
			}
			
			var curTime=GetWeek();
			var cur=$(this).index();
			$(".gh-times .showtime").html(curTime[cur])
		})
/*获取周期*/
	for(var i=0;i<7;i++){	
		$(".getweek").append("<div class=\"swiper-slide\">"+
						"<span></span>"+
						"<p></p>"+
						"<time></time>"+
					"</div>")
	}
GetWeek();

				// var mySwiper = new Swiper('.swiper-container', {
				// 	slidesPerView: 3,
				// 	slidesPerGroup: 1,
				// 	prevButton: '.swiper-button-prev',
				// 	nextButton: '.swiper-button-next',
				// })
GetWeek02();
GetWeek03();
//这是bg_MyCheck.html——我的体检 
$(".swiper-container03 .getweeks div").on("click", function() {
			var userClick=$(this).index();
			if ($(this).hasClass("full")) {
				alert("本天满人不能预约")
			} else {
				$(this).addClass("hover").siblings().removeClass("hover")
			}
			var curTime=GetWeek02();
			var cur=$(this).index();
			
			$(".mz_waitPay_cot .gh-times .showtime").html(curTime[cur])
		})
//这是bg_MyCheck.html02——我的检查
$(".swiper-container02 .getweek02 div").on("click", function() {
	
			var userClick=$(this).index();
			if ($(this).hasClass("full")) {
				alert("本天满人不能预约")
			} else {
				$(this).addClass("hover").siblings().removeClass("hover")
			}
			var curTime=GetWeek03();
			var cur=$(this).index();
			
			$(".my_check_cot .gh-times02 .showtime").html(curTime[cur])
		})
/*星星评价*/
	getStart(".hosp_skill li")
	getStart(".hosp_sever li")
	getStart(".doc_sever li")
	getStart(".doc_skill li")
	getStart(".hj_zt li")
	getStart(".hj_set li")
/*当天初始值*/
	$(".definition-time .swiper-wrapper div").eq(0).addClass("cur");
/*计算金额*/
	moneys();

/*bk_DocBook.html*/
	user_Href(".can_btn","确认取消预约?","gh_Visit.html","预约取消成功")
	user_Href(".can_btns","确认取消预约?","gh_Visit.html","预约取消成功")
	user_Href(".canCotBtn","确认取消绑卡?","bk_TemporaryNum.html","绑卡取消成功")
/*bk_MyInfo*/
	//user_Href(".yBtn","确认取消绑卡?","bk_TemporaryNum.html")
/*gh_DocWTInfo.html*/
	user_Tab_Two(".gh_bookTAndPerson li",".gh_DocWT_Time",".gh_DocWT_docJs")
	
/*live_EveryDayList.html*/
	getCurDay("#everyDate")
/*myinfo_BKInfo.html	正则判断*/
	user_Regular();
/*myinfo_NewCard.html*/
	live_Regular();

})
/*点击事件*/
function userClick(userClick){
	$(userClick).on("click",function(e){
		stopDefault(e);
		$(this).addClass("hover").siblings().removeClass("hover")
	})
}
function userList(userClick,tagerObj){
	$(userClick).on("click",function(e){
		stopDefault(e);
		var userChoice=$(this).index();
		$(tagerObj).eq(userChoice).show().siblings().hide();
	})
}
/*获取当天时间*/
function getCurDay(TimeObj){
	var year,month,day,cur;
	var curDay=new Date();
	year=curDay.getFullYear();
	month=curDay.getMonth()+1;
	day=curDay.getDate();
	cur=year+"年"+month+"月"+day+"日";
	$(TimeObj).val(cur)
}
/*用户选择优化*/
function user_Tab_Two(targetOBJ,Tab,Tab02){
	$(targetOBJ).on("click",function(){
		if($(this).hasClass("hover")){
		}else{
			$(this).addClass("hover").siblings("li").removeClass("hover");
			if($(this).index()==0){
				$(Tab).show();
				$(Tab02).hide();
			}else{
				$(Tab).hide();
				$(Tab02).show();
			}
		}
	})
}
/*用户校正*/
function user_Regular(){
	$(".submit").on("click",function(){
		var userName=$(".name").val();//人名
		var sfNum=$(".sfNum").val();//身份证
		if(userName==''){$("#tip").html("用户名不能为空");return false;}else{$("#tip").html("");}
		if(sfNum.length==''){$("#tip").html("身份证不能为空");return false;}else{$("#tip").html("");}
		
		if(checkPersonName(userName)){}else{$("#tip").html("用户名请输入中文字名称或者英文名称");return false;}
		if(checkIdcard(sfNum)){}else{$("#tip").html("身份证格式不正确");return false;}
		document.location.href="myinfo_Myset.html";
	})
}

function live_Regular(){
	$(".submits").on("click",function(){
		var userName=$(".names").val();//人名
		var sfNum=$(".sfNums").val();//身份证
		var phNum=$(".phoneNums").val();//电话号码
		var yzCode=$(".autocode").val();//验证码
		if(userName==''){$("#tip").html("用户名不能为空");return false;}else{$("#tip").html("");}
		if(sfNum.length==''){$("#tip").html("身份证不能为空");return false;}else{$("#tip").html("");}
		if(phNum.length==''){$("#tip").html("电话号码不能为空");return false;}else{$("#tip").html("");}
		if(yzCode!=""){$("#tip").html("");}else{$("#tip").html("验证码不能为空");return false;}
		
		if(checkPersonName(userName)){}else{$("#tip").html("用户名请输入中文字名称或者英文名称");return false;}
		if(checkIdcard(sfNum)){}else{$("#tip").html("身份证格式不正确");return false;}
		if(checkPhone(phNum)){}else{$("#tip").html("请输入正确的手机号码");return false;}
		//if(checkCard(phNum)){}else{$("#tip").html("请输入正确的卡号");return false;}
		//document.location.href="bk_Success.html";
	})
}
/*用户弹框效果*/
function user_Href(btnObj,tips,url,tips02){
	$(btnObj).on("click",function(){
		swal({title: "",text:tips,type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "确定",   closeOnConfirm: false,cancelButtonText:"取消",confirmButtonText:"确定",confirmButtonColor:"#ccc" }, function(){   swal("", tips02, "success");
			$(".confirm").on("click",function(){
		window.location.href="#";
	})
		});
	})
}
/*住院金额 */
function moneys(){
	$(".down_box").on("touchstart",function(e){
		var usermoneys=$(".live_UserMoneys").val();
			usermoneys=parseInt(usermoneys);
		stopDefault(e);
		if(usermoneys<=0){
			alert("预存不能低于0元");
		}else{
			usermoneys=usermoneys-100;
			$(".live_UserMoneys").val(usermoneys);
		}
	})
	$(".up_box").on("touchstart",function(e){
		var usermoneys=$(".live_UserMoneys").val();
			usermoneys=parseInt(usermoneys);
		stopDefault(e);
		console.log(usermoneys)
			usermoneys=usermoneys+100;
			$(".live_UserMoneys").val(usermoneys);
	})
}
/*倒计时*/
function closeTime(intDiff){
	var MyTime=window.setInterval(function(){
		var minute=0,second=0;
		if(intDiff>0){
			minute=Math.floor(intDiff/60);
			second=Math.floor(intDiff)-(minute*60);
		}
		if(minute<=9)minute="0"+minute;
		if(second<=9)second="0"+second;
		$(".gh-Sure-times").html(minute+":"+second);
		if(intDiff==0){
			$(".gh-Sure-times").html("操作!超时");
			clearInterval(MyTime)
		}
		console.log(intDiff)
		intDiff--;
		
	},1000);
}
/*星星评价*/
function getStart(obj){
	$(obj).on("touchstart",function(){
		var longth=$(obj).length;
		for(var i=0;i<longth;i++){
			$(obj).eq(i).removeClass("hover")
		}
		$(this).toggleClass("hover");
		$(this).prevAll().toggleClass("hover");	
	})
}
/*周期*/
 function GetWeek(){
	var timeOBJ=new Date();
	var year=timeOBJ.getFullYear();
	var month=timeOBJ.getMonth()+1;
	var day=timeOBJ.getDate();
	var str=year+"-"+month+"-"+day;
	var creaTime=Date.parse(str);
	var getWeek=new Array();
	var creaYear=new Array();
	var creaMonth=new Array();
	var creaDay=new Array();
	var weeks=new Array();
	var week={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};
	for(var i=0;i<7;i++){
		getWeek[i]=creaTime+86400000*i;
		creaYear[i]=new Date(getWeek[i]).getFullYear();
		creaMonth[i]=new Date(getWeek[i]).getMonth()+1;
		creaDay[i]=new Date(getWeek[i]).getDate();
		weeks[i]=creaYear[i]+"-"+creaMonth[i]+"-"+creaDay[i];
		var curDay=creaYear[i].toString()+creaMonth[i].toString()+creaDay[i]+toString();
		$(".getweek div").eq(i).find("p").html(week[GetDay(i)]);
		$(".getweek div").eq(i).find("time").html(creaDay[i])
	}
	$(".gh-times .showtime").html(weeks[0])
	return weeks;
  }
 /*周期02*/
 function GetWeek02(){
	var timeOBJ=new Date();
	var year=timeOBJ.getFullYear();
	var month=timeOBJ.getMonth()+1;
	var day=timeOBJ.getDate();
	var str=year+"-"+month+"-"+day;
	var creaTime=Date.parse(str);
	var getWeek=new Array();
	var creaYear=new Array();
	var creaMonth=new Array();
	var creaDay=new Array();
	var weeks=new Array();
	var week={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};
	for(var i=0;i<7;i++){
		getWeek[i]=creaTime+86400000*i;
		creaYear[i]=new Date(getWeek[i]).getFullYear();
		creaMonth[i]=new Date(getWeek[i]).getMonth()+1;
		creaDay[i]=new Date(getWeek[i]).getDate();
		weeks[i]=creaYear[i]+"-"+creaMonth[i]+"-"+creaDay[i];
		var curDay=creaYear[i].toString()+creaMonth[i].toString()+creaDay[i]+toString();
		$(".getweeks div").eq(i).find("p").html(week[GetDay(i)]);
		$(".getweeks div").eq(i).find("time").html(creaMonth[i]+"月"+creaDay[i]+"日")
	}
	$(".mz_waitPay_cot .gh-times .showtime").html(weeks[0])
	return weeks;
  }
 //周期03
 function GetWeek03(){
 	
	var timeOBJ=new Date();
	var year=timeOBJ.getFullYear();
	var month=timeOBJ.getMonth()+1;
	var day=timeOBJ.getDate();
	var str=year+"-"+month+"-"+day;
	var creaTime=Date.parse(str);
	var getWeek=new Array();
	var creaYear=new Array();
	var creaMonth=new Array();
	var creaDay=new Array();
	var weeks=new Array();
	var week={0:"日",1:"一",2:"二",3:"三",4:"四",5:"五",6:"六"};
	for(var i=0;i<7;i++){
		getWeek[i]=creaTime+86400000*i;
		creaYear[i]=new Date(getWeek[i]).getFullYear();
		creaMonth[i]=new Date(getWeek[i]).getMonth()+1;
		creaDay[i]=new Date(getWeek[i]).getDate();
		weeks[i]=creaYear[i]+"-"+creaMonth[i]+"-"+creaDay[i];
		var curDay=creaYear[i].toString()+creaMonth[i].toString()+creaDay[i]+toString();
		$(".getweek02 div").eq(i).find("p").html(week[GetDay(i)]);
		$(".getweek02 div").eq(i).find("time").html(creaMonth[i]+"月"+creaDay[i]+"日")
	}
	
	$(".my_check_cot .gh-times02 .showtime").html(weeks[0])
	return weeks;
  }
 /*获取时间*/
  function GetDay(AddDayCount) {
	  var dd = new Date();
	  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  
	  var days = dd.getDay();
	  return days;
}
  
/*取消浏览器默认行为*/
 function stopDefault(e){ 
	document.onselectstart=document.ondragstart=document.oncontextmenu=function () {return false;}
   
}

/*pj_page.html 开始*/
	$(window).ready(function() {
/*pj_page.html*/
	var userclick=null;
	$(".pj_page_top li").on("touchstart",function(){
		$(this).addClass("hover").siblings().removeClass("hover")
		userclick=$(this).index();
		if(userclick==0){
			$(".pj_hop_cot").show();
			$(".pj_aboutMe_cot").hide();
		}if(userclick==1){
			$(".pj_hop_cot").hide();
			$(".pj_aboutMe_cot").show();
		}
	})
})
/*pj_page.html 结束*/