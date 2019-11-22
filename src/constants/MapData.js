/*
 * @Author: duchengdong
 * @Date: 2019-10-16 11:49:31
 * @LastEditors: duchengdong
 * @LastEditTime: 2019-10-28 14:38:37
 * @Description: 
 */
export const QQFACE_TEXT = {
    qqEmoji_array_chinese: ["[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[大哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[酷]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[饥饿]", "[困]", "[惊恐]", "[流汗]", "[憨笑]", "[悠闲]", "[奋斗]", "[咒骂]", "[疑问]", "[嘘]", "[晕]", "[疯了]", "[衰]", "[骷髅]", "[敲打]", "[再见]", "[擦汗]", "[抠鼻]", "[鼓掌]", "[糗大了]", "[坏笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙视]", "[委屈]", "[快哭了]", "[阴险]", "[亲亲]", "[吓]", "[可怜]", "[菜刀]", "[西瓜]", "[啤酒]", "[篮球]", "[乒乓]", "[咖啡]", "[饭]", "[猪头]", "[玫瑰]", "[凋谢]", "[嘴唇]", "[爱心]", "[心碎]", "[蛋糕]", "[闪电]", "[炸弹]", "[刀]", "[足球]", "[瓢虫]", "[便便]", "[月亮]", "[太阳]", "[礼物]", "[拥抱]", "[强]", "[弱]", "[握手]", "[胜利]", "[抱拳]", "[勾引]", "[拳头]", "[差劲]", "[爱你]", "[NO]", "[OK]", "[爱情]", "[飞吻]", "[跳跳]", "[发抖]", "[怄火]", "[转圈]", "[磕头]", "[回头]", "[跳绳]", "[投降]", "[激动]", "[乱舞]", "[献吻]", "[左太极]", "[右太极]",'😀', '😷', '😂', '😝', '😳', '😱', '😔', '😒', "[嘿哈]", "[捂脸]", "[奸笑]", "[机智]", "[皱眉]", "[耶]", "[鸡]", '👻', '🙏', '💪', '🎉', '🎁', "[红包]", '[發]', '[福]'],
    qqEmoji_array: ["[Smile]", "[Grimace]", "[Drool]", "[Scowl]", "[CoolGuy]", "[Sob]", "[Shy]", "[Silent]", "[Sleep]", "[Cry]", "[Awkward]", "[Angry]", "[Tongue]", "[Grin]", "[Surprise]", "[Frown]", "[Ruthless]", "[Blush]", "[Scream]", "[Puke]", "[Chuckle]", "[Joyful]", "[Slight]", "[Smug]", "[Hungry]", "[Drowsy]", "[Panic]", "[Sweat]", "[Laugh]", "[Commando]", "[Determined]", "[Scold]", "[Shocked]", "[Shhh]", "[Dizzy]", "[Tormented]", "[Toasted]", "[Skull]", "[Hammer]", "[Wave]", "[Speechless]", "[NosePick]", "[Clap]", "[Shame]", "[Trick]", "[Bah！L]", "[Bah！R]", "[Yawn]", "[Pooh-pooh]", "[Shrunken]", "[TearingUp]", "[Sly]", "[Kiss]", "[Wrath]", "[Whimper]", "[Cleaver]", "[Watermelon]", "[Beer]", "[Basketball]", "[PingPong]", "[Coffee]", "[Rice]", "[Pig]", "[Rose]", "[Wilt]", "[Lips]", "[Heart]", "[BrokenHeart]", "[Cake]", "[Lightning]", "[Bomb]", "[Dagger]", "[Soccer]", "[Ladybug]", "[Poop]", "[Moon]", "[Sun]", "[Gift]", "[Hug]", "[ThumbsUp]", "[ThumbsDown]", "[Shake]", "[Peace]", "[Fight]", "[Beckon]", "[Fist]", "[Pinky]", "[RockOn]", "[Nuh-uh]", "[OK]", "[InLove]", "[Blowkiss]", "[Waddle]", "[Tremble]", "[Aaagh!]", "[Twirl]", "[Kotow]", "[Dramatic]", "[JumpRope]", "[Surrender]", "[Hooray]", "[Meditate]", "[Smooch]", "[TaiChi L]", "[TaiChi R]", '😀', '😷', '😂', '😝', '😳', '😱', '😔', '😒', "[Hey]", "[Facepalm]", "[Smirk]", "[Smart]", "[Concerned]", "[Yeah!]", "[Chicken]", '👻', '🙏', '💪', '🎉', '🎁',  "[Packet]", '[發]', '[福]'],
}

export const dataTransform = (data) => {
    // 传参容错处理
    if(data===null||data===undefined){
        return ''
    }
    var _reg = new RegExp('\\[(.+?)\\]', "g")
    var matchArray = data?data.match(_reg):'';//筛选qqemojj表情
    var str = data
    str = str.replace(/\n\n\n/gi, '')
    str = str.replace(/\n/gi, '<br>')
    str = str.replace(/↵/g, "<br>")//过滤换行标签
    str = str.replace(/_web/g, '')//过滤换行标签
    if (matchArray != null) {
        var index
        for (let i = 0; i < matchArray.length; i++) {
            if (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array_chinese.indexOf(matchArray[i]));
            } else if (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]) != -1) {
                index = (QQFACE_TEXT.qqEmoji_array.indexOf(matchArray[i]));
            }
            if (index == undefined) {
                str = str.replace(matchArray[i], '&nbsp;' + matchArray[i] + '&nbsp;');
            } else {
                str = str.replace(matchArray[i], '<img class="qqemoji  qqemoji' + index + '" name="' + index + '" src="'+process.env.PUBLIC_URL+'/images/icon/spacer.png" />');
            }
        }
    }
    return str
}