/**
 * 设置时间格式
 * FormatDate(time, 'MM/dd hh:mm')
 * FormatDate(time,'hh:mm')
 * FormatDate(srcDate, "yyyy/M/d")
 *  */
export const FormatDate = (date, fmt) => {
  var o = {
    "M+": date.getMonth() + 1,//月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

//设置朋友圈列表
export const setMyTime = (time) => {
  var currentTime = Date.parse(new Date());
  var dateTime = time;//后台传递来的时间
  var d_day = Date.parse(new Date(dateTime));
  var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));//计算日期
  var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));//计算小时
  var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));//计算分钟
  if (day >= 2) {
    return FormatDate(time, 'MM/dd hh:mm')
  } else if (day > 0 && day < 2) {
    return "昨天 " + FormatDate(time, 'hh:mm')
  } else if (hour > 0 && hour < 24) {
    return "今天 " + FormatDate(time, 'hh:mm')
  } else if (minutes < 60) {
    return minutes <= 0 ? '1分钟前' : parseInt(minutes) + "分钟前"
  }
}

//设置仿朋友圈时间
export const setTime = (time) => {
  var currentTime = Date.parse(new Date());
  var dateTime = time;//后台传递来的时间
  var d_day = Date.parse(new Date(dateTime));
  var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));//计算日期
  var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));//计算小时
  var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));//计算分钟
  var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));//计算秒
  if (day >= 2) {
    return parseInt(day) + "天前";
  } else if (day > 0 && day < 2) {
    return "昨天"
  } else if (hour > 0 && hour < 24) {
    return parseInt(hour) + "小时前"
  } else if (minutes < 60) {
    return minutes <= 0 ? '1分钟前' : parseInt(minutes) + "分钟前"
  } else if (seconds > 0 && seconds < 60) {
    return parseInt(seconds) + "秒前"
  }
}

/** 
 * var createDate = new Date("2019-06-18T10:30:50").getTime()
 * 用于首页“消息”界面时
 * GetTimeStringAutoShort2(createDate, false)  "2019/6/10"
 * 用于聊天内容界面时
 * GetTimeStringAutoShort2(createDate, true)  "2019/6/10 10:59"
*/
export const GetTimeStringAutoShort2 = (timestamp, mustIncludeTime) => {
  // 当前时间
  var currentDate = new Date();
  // 目标判断时间
  var srcDate = new Date(parseInt(timestamp));

  var currentYear = currentDate.getFullYear();
  var currentMonth = (currentDate.getMonth() + 1);
  var currentDateD = currentDate.getDate();

  var srcYear = srcDate.getFullYear();
  var srcMonth = (srcDate.getMonth() + 1);
  var srcDateD = srcDate.getDate();

  var ret = "";

  // 要额外显示的时间分钟
  var timeExtraStr = (mustIncludeTime ? " " + FormatDate(srcDate, "hh:mm") : "");

  // 当年
  if (currentYear === srcYear) {
    var currentTimestamp = currentDate.getTime();
    var srcTimestamp = timestamp;
    // 相差时间（单位：毫秒）
    var deltaTime = (currentTimestamp - srcTimestamp);

    // 当天（月份和日期一致才是）
    if (currentMonth === srcMonth && currentDateD === srcDateD) {
      //  ret = setTime(timestamp)
      // 时间相差60秒以内
      if (deltaTime < 60 * 1000) ret = "刚刚";
      // 否则当天其它时间段的，直接显示“时:分”的形式
      else ret = FormatDate(srcDate, "hh:mm");
    }
    // 当年 && 当天之外的时间（即昨天及以前的时间）
    else {
      // 昨天（以“现在”的时候为基准-1天）
      var yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      // 前天（以“现在”的时候为基准-2天）
      var beforeYesterdayDate = new Date();
      beforeYesterdayDate.setDate(beforeYesterdayDate.getDate() - 2);

      // 用目标日期的“月”和“天”跟上方计算出来的“昨天”进行比较，是最为准确的（如果用时间戳差值
      // 的形式，是不准确的，比如：现在时刻是2019年02月22日1:00、而srcDate是2019年02月21日23:00，
      // 这两者间只相差2小时，直接用“deltaTime/(3600 * 1000)” > 24小时来判断是否昨天，就完全是扯蛋的逻辑了）
      if (srcMonth === (yesterdayDate.getMonth() + 1) && srcDateD === yesterdayDate.getDate()) ret = "昨天" + timeExtraStr; // -1d
      // “前天”判断逻辑同上
      else if (srcMonth === (beforeYesterdayDate.getMonth() + 1) && srcDateD === beforeYesterdayDate.getDate()) ret = "前天" + timeExtraStr; // -2d
      else {
        // 跟当前时间相差的小时数
        var deltaHour = (deltaTime / (3600 * 1000));

        // 如果小于或等 7*24小时就显示星期几
        if (deltaHour <= 7 * 24) {
          var weekday = new Array(7);
          weekday[0] = "星期日";
          weekday[1] = "星期一";
          weekday[2] = "星期二";
          weekday[3] = "星期三";
          weekday[4] = "星期四";
          weekday[5] = "星期五";
          weekday[6] = "星期六";

          // 取出当前是星期几
          var weedayDesc = weekday[srcDate.getDay()];
          ret = weedayDesc + timeExtraStr;
        }
        // 否则直接显示完整日期时间
        else ret = FormatDate(srcDate, "yyyy/M/d") + timeExtraStr;
      }
    }
  }
  // 往年
  else {
    ret = FormatDate(srcDate, "yyyy/M/d") + timeExtraStr;
  }

  return ret;
};

