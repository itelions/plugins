;
// 日历插件
// 功能:
// 1.初始化时定位当前日期
// 2.通过左右箭头切换月份显示
// 3.高亮今日日期
// 4.点击头部年月选择新的目标年月
function Kalendar(eleID,options){
	this.ele;
	this.eleID;
	// 样式类型
	this.type=1;
	//今日时间戳显示时间戳
	this.nowDay=null;
	//当前显示年份
	this.targetYear;
	//当前显示月份
	this.targetMonth;
	//当前显示时间戳
	this.targetDay;
	this.default={
		nowDay:null,
		activeDay:null,
		dateClickCallBack:null,
		yearAndMonthChange:null
	};
	this.init(eleID,options);
}
// 初始化数据
Kalendar.prototype.init=function(eleID,options){
	// 获取目标id
	if(!eleID)throw "no target element_id";
	this.eleID=eleID;
	this.ele=document.getElementById(eleID)
	// 获取自定义参数
	if(options){
		for(var x in options){
			this.default[x]=options[x];
		}
	}

	this.nowDay=new Date().getTime();
	if(this.default.initDay){
		this.targetDay=new Date().getTime(this.default.initDay);
	}else{
		this.targetDay=this.nowDay;
	}

	var ele=this.ele;
	var options=this.default;

	this.initDom(ele,options);
	this.initEvent();

	this.randerKalendar(this.targetDay);

	console.log('inited')
	return this
}
// 初始化节点
Kalendar.prototype.initDom=function(ele,options){
	var headerString='<div id="'+this.eleID+'KalendarHeader"><button id="'+this.eleID+'KalendarPrev">&lt;</button><span id="'+this.eleID+'KalendarHeaderInfo">headerInfo</span><button id="'+this.eleID+'KalendarNext">&gt;</button></div>';
	var bodyString='<div id="'+this.eleID+'KalendarBody">body</div>'
	ele.innerHTML=headerString+bodyString;
}
// 初始化事件处理
Kalendar.prototype.initEvent=function(){
	var _this=this;
	// 前进后退按钮
	document.getElementById(this.eleID+'KalendarPrev').onclick=function(){
		var prevDate=new Date(_this.targetDay);
		prevDate.setMonth(prevDate.getMonth()-1);
		_this.setYearAndMonth(prevDate.getFullYear(),prevDate.getMonth()+1)
	}
	document.getElementById(this.eleID+'KalendarNext').onclick=function(){
		var nextDate=new Date(_this.targetDay);
		nextDate.setMonth(nextDate.getMonth()+1);
		_this.setYearAndMonth(nextDate.getFullYear(),nextDate.getMonth()+1)
	}

	// 标题栏年月点击事件处理
	document.getElementById(this.eleID+'KalendarHeaderInfo').onclick=function(){
		// 创建弹窗
		//将当前年/月填入输入框
		var MaskStyle='position:fixed; width:100%; height:100%; background:rgba(0,0,0,0.5); top:0; left:0; text-align:center;';
		var ContentStyle='position:absolute; left:50%; top:50%; margin-left:-100px; maegin-top:75px; width:200px; height:150px; background:#fff;';
		var TitleStyle='font-size:18px; font-weight:normal; line-height:20px;'
		var InputStype='width:60px;';
		var ButtomStype='margin:25px 10px; ';

		var KalendarPopHtmlString='<div id="'+_this.eleID+'KalendarPop" style="'+MaskStyle+'"><div class="content" style="'+ContentStyle+'"><h3 class="kalendarPopHeader" style="'+TitleStyle+'">请输入目标年/月</h3><div class="selector"><input type="number" name="year" style="'+InputStype+'" value="'+_this.targetYear+'" /> 年 <input type="number" name="month" style="'+InputStype+'" value="'+_this.targetMonth+'" /> 月 </div><div class="button-group"><button style="'+ButtomStype+'">确认</button><button style="'+ButtomStype+'">取消</button></div></div><div>';
		var KalendarPopContainer=document.createElement('div');
		KalendarPopContainer.id='KalendarPopContainer';
		KalendarPopContainer.innerHTML+=KalendarPopHtmlString;
		document.body.appendChild(KalendarPopContainer);
		var KalendarPop=document.getElementById(_this.eleID+'KalendarPop');

		function closeKalendarPop(){
			document.body.removeChild(KalendarPopContainer);
		}

		// 绑定事件
		var btnGroup=KalendarPop.getElementsByTagName('button');
		// 确认
		btnGroup[0].onclick=function(){
			var inputGroup=KalendarPop.getElementsByTagName('input');

			// 格式验证
			if(inputGroup[0].value<100){
				alert('年份必须是大于99的整数');
				return
			}
			if(inputGroup[1].value<1||inputGroup[1].value>12){
				alert('月份填写错误 请填写1-12内的整数');
				return
			}
			//设定时间
			_this.setYearAndMonth(parseInt(inputGroup[0].value),parseInt(inputGroup[1].value))
			closeKalendarPop()
		}
		// 关闭
		btnGroup[1].onclick=function(){
			closeKalendarPop()
		}
	}
}
// 渲染日历
Kalendar.prototype.randerKalendar=function(targetDay){
	var randerList=[];

	var randerDay=new Date(targetDay);
	var targetDate=randerDay.getDate();
	var targetYear=randerDay.getFullYear();
	var targetMonth=randerDay.getMonth()+1;
	this.targetYear=targetYear;
	this.targetMonth=targetMonth;
	randerDay.setMonth(targetMonth);
	randerDay.setDate(0);
	var dateLength=randerDay.getDate(0);
	var endWeekDay=randerDay.getDay();
	randerDay.setDate(1);
	var startWeekDay=randerDay.getDay();

	var nowDay=new Date(this.nowDay);
	var nowYear=nowDay.getFullYear();
	var nowMonth=nowDay.getMonth()+1;
	var nowDate=nowDay.getDate();
	
	var weekList=['日','一','二','三','四','五','六'];

	var randerHtml='<table>';
	randerHtml+='<tr>';
	for(var i=0;i<weekList.length;i++){
		randerHtml+='<td class="week">'+weekList[i]+'</td>'
	};
	randerHtml+='</tr>';

	for(var i=0;i<startWeekDay;i++){
		randerList.push('')
	}
	for(var i=1;i<=dateLength;i++){
		randerList.push(i)
	}
	for(var i=1;i<=(7-endWeekDay-1);i++){
		if(7-endWeekDay-1==0)break;
		randerList.push('')
	}
	for(var i=0;i<randerList.length;i++){
		var itemHTML='';
		if(i==0)itemHTML+='<tr>';
		if((i)%7==0&&i!=0)itemHTML+='</tr><tr>';

		if(randerList[i]==''){
			itemHTML+='<td class="date null">'
		}else{
			if(randerList[i]==nowDate&&targetYear==nowYear&&targetMonth==nowMonth){
				itemHTML+='<td class="date now" style="color:#fff;background:#000;text-align:center;"><span>'
			}else{
				itemHTML+='<td class="date" style="text-align:center;"><span>'
			}
		}
		itemHTML+=randerList[i]+'</span></td>';

		if(i==randerList.length-1)itemHTML+='</tr>';

		randerHtml+=itemHTML;
	}

	randerHtml+='</table>';
	document.getElementById(this.eleID+'KalendarBody').innerHTML=randerHtml;
	document.getElementById(this.eleID+'KalendarHeaderInfo').innerHTML=targetYear+'年'+targetMonth+'月';

	var tablebody=document.getElementById(this.eleID+'KalendarBody')
	var dateList=tablebody.getElementsByClassName('date');
	
	var _this=this;
	for(var i=0;i<randerList.length;i++){
		if(dateList[i].innerHTML!==''){
			dateList[i].onclick=(function(i){
				return function(){
					console.log(targetYear+'/'+targetMonth+'/'+randerList[i])
				}
			})(i)
		}
	}
}
Kalendar.prototype.setYearAndMonth=function(year,month){
	if(isNaN(year)||isNaN(month)){
		throw 'year and month must be NumberType'
	}
	var newDate=new Date(year+'/'+month+'/'+1).getTime();
	this.targetDay=newDate;
	this.default.yearAndMonthChange&&this.default.yearAndMonthChange(year+'/'+month);
	this.randerKalendar(this.targetDay);
};
// 废除插件
Kalendar.prototype.destroy=function(){
	item.ele=null;
	document.getElementById(this.eleID).innerHTML='';
}
;