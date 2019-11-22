/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 00:22:55
 * @LastEditTime: 2019-11-06 18:07:09
 * @LastEditors: duchengdong
 */
import moment from 'moment';
export const uuid = () => {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
// 计算文字字数，汉字两个字符，英文1个字符
export const textCountRange = (str) => {
    let countf = str.replace(/[^\x00-\xff]/g, "oo").length / 2;
    return countf
}

// 计算超过长度限制的index
export const textCountIndex = (str,limit) => {
    let strArr = str.split('')
    let count = 0
    let index = 1
    for(let i =0;i<strArr.length;i++){
        count += /[^\x00-\xff]/.test(strArr[i])?2:1
        index = i+1
        if(count>=limit*2) return index
    }
    return index
}

export const formatDate = (strTime) => {
    if(!strTime){
        return [null,null];
    }
    var date = new Date(strTime)
    var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    return [date.getFullYear() + "-" + month + "-" + day,hours + ":" + minutes]
}

export const formatYear = (strTime) =>{
    if(!strTime){
        return null;
    }
    strTime = Number(strTime);
    var date = new Date(strTime)
    var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + "-" + month + "-" + day
}
export const optionValue = (item, optionsData) => {
    const index = optionsData.paramaValue.indexOf(item)
    return { id: index, name: optionsData.selectOption[index] }
}

export const getTop = (e) => {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

export const getLeft = (e) => {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}

//创建一个全局监听事件
export const sendEvent = (key, vals) => {
    var event = new Event(key);
    event.vals = vals;
    window.dispatchEvent(event);
}
export const toThousands = (num) => {
    num = num + '';
    if (!num.includes('.')) {
        num += '.'
    }
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
    }).replace(/\.$/, '');
}

export const result_ = (num)=>{
    if(num){
        return num;
    }else {
        return '-'
    }
}

export const xmlHandleFn = (xml) => {
    return {
        title: xml.match(/<sourcedisplayname>(.*)<\/sourcedisplayname>/)?xml.match(/<sourcedisplayname>(.*)<\/sourcedisplayname>/)[1]:'',
        content: xml.match(/<title>(.*?)<\/title>/)?xml.match(/<title>(.*?)<\/title>/)[1]:'',
        weappiconurl: xml.match(/<weappiconurl>(.*?)<\/weappiconurl>/)?xml.match(/<weappiconurl>(.*?)<\/weappiconurl>/)[1].replace('<![CDATA[', '').replace(']]>', ''):process.env.PUBLIC_URL+'/images/icon/wxapp_logo.png',//<![CDATA[  ]]>
        pagepath: xml.match(/<pagepath>(\S*?)<\/pagepath>/)?xml.match(/<pagepath>(\S*?)<\/pagepath>/)[1].replace('<![CDATA[', '').replace(']]>', ''):'',//<![CDATA[  ]]>
    }
}

export const cursorMoveEnd=obj=>{
    obj.focus();
    let len = obj.innerHTML.length;
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.moveStart('character',len);
        sel.collapse();
        sel.select();
    }
    else{                                                 /* IE11 特殊处理 */
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(obj);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

export const numberHandle = num => {
    if (num.length>1) {
        return num.replace(/\D|^0/g,'')
    } else {
        return num.replace(/\D/g,'')
    }
}

// 计算时间
export const getTime = (time) => {
    let formateTime = moment(time).fromNow()
    if(/秒|分|小时/.test(formateTime)){
        return formateTime
    }else if(/^1 天/.test(formateTime)){
        return '昨天 '+time.split(/T|\s/)[1].slice(0,-3)
    }else {
        // 2018-12-14T16:26:06
        return time.replace('T',' ').replace(/-/g,'/',).slice(0,-3)
    }
}

export const downloadImage = (imgUrl) => {
    function toDataURL(url) {
        return fetch(url).then((response) => {
                return response.blob();
            }).then(blob => {
                return URL.createObjectURL(blob);
            });
    }
    (async function() {
            const a = document.createElement("a");
            imgUrl = imgUrl+'?'+Math.random()
            a.href = await toDataURL(imgUrl);
            a.setAttribute('download','')
            a.click();
    })()
}