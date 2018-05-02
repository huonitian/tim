/*周期*/
 function GetWeek(){
	var timeOBJ=new Date();
	var year=timeOBJ.getFullYear();
	var month=timeOBJ.getMonth()+1;
	var day=timeOBJ.getDate();
	var weekNum = timeOBJ.getDay();
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
	$("#date_week").html(weeks[0]+"&nbsp;&nbsp;星期"+week[weekNum])
	return weeks;
}
GetWeek()

 /*获取时间*/
function GetDay(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  
	var days = dd.getDay();
	return days;
}

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
	var weekGetDay = $(this).find("p").html();
	$(".gh-times .showtime").html(curTime[cur])
	$("#date_week").html(curTime[cur]+"&nbsp;&nbsp;星期"+weekGetDay)
})