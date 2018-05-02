//日期初始化
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;

//格式化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

//获得某月的天数
function getMonthDays(myMonth) {
	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}
//获得本周的开始日期
function getWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	return formatDate(weekStartDate);
}
//获得本周的结束日期
function getWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	return formatDate(weekEndDate);
}
//获得上下周的开始日期
function getLastWeekStartDate(cout) {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - cout);
	return formatDate(weekStartDate);
}
//获得上下周的结束日期
function getLastWeekEndDate(cout) {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - cout);
	return formatDate(weekEndDate);
}
//获得本月的开始日期
function getMonthStartDate() {
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	return formatDate(monthStartDate);
}
//获得本月的结束日期
function getMonthEndDate() {
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	return formatDate(monthEndDate);
}
//获得上下月开始时间
function getLastMonthStartDate(cout) {
	now.setMonth(now.getMonth()+cout);//获取AddDayCount天后的日期
	now.setDate(1);//获取AddDayCount天后的日期
	now.setFullYear(now.getFullYear())
	var y = now.getFullYear();
	var m = now.getMonth()+1;//获取当前月份的日期
	var d = now.getDate();
	return y+"-"+m+"-"+d;
}
//获得上下月结束时间
function getLastMonthEndDate(cout) {
	var lastMonthEndDate = new Date(now.getFullYear(), now.getMonth() - cout, getMonthDays(now.getMonth() - cout));
	now.setMonth(lastMonthEndDate.getMonth())
	return formatDate(lastMonthEndDate);
}
//获得上下年开始时间
function getLastYearStartDate(cout) {
	now.setFullYear(now.getFullYear()+cout);//获取AddDayCount天后的日期
	var y = now.getFullYear();
	var m = 1;//获取当前月份的日期
	var d = 1;
	return y+"-"+m+"-"+d;
}
//获得上下年结束时间
function getLastYearEndDate(cout) {
	var lastMonthEndDate = new Date(now.getFullYear()-cout,11,getMonthDays(12));
	now.setFullYear(lastMonthEndDate.getFullYear())
	return formatDate(lastMonthEndDate);
}
//获得上下天时间
function GetDateStr(AddDayCount) {
	now.setDate(now.getDate()+AddDayCount);//获取AddDayCount天后的日期
	var y = now.getFullYear();
	var m = now.getMonth()+1;//获取当前月份的日期
	var d = now.getDate();
	return y+"-"+m+"-"+d;
}
//清除设定
function clear(){
	now = new Date();
}