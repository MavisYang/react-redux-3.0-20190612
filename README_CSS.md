
**2019/10/21**
## CSS小技巧
- [CSS 专业技巧](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN)
- [提高幸福感的 9 个 CSS 技巧](https://mp.weixin.qq.com/s/id_n8SO4nNazzGK7H6BPyg)
- [你未必知道的49个CSS知识点](https://juejin.im/post/5d3eca78e51d4561cb5dde12)

### [animate.css](https://daneden.github.io/animate.css/)


**2019.10.23**
#### 非table 布局 重叠边框合并方法
```css
.item{
 margin-right: -1px;
}
```
#### 合理使用变量

>变量定义的语法是： --； // *为变量名称。
 变量使用的语法是：var()；

1. 无论是变量的定义和使用只能在声明块 {} 里面
2. CSS 变量字符限制为： [0-9]、[a-zA-Z]、_、-、中文和韩文等。
```
:root {
    --blue_color: #3388ff;
    --main_bgcolor: #fafafa;
    --font_size_12: 12px;
    --font_size_14: 14px;
    --color: 20px;
}

.div1{
    background-color: var(--main_bgcolor);
    font-size: var(--font_size_12);
}
```

#### 使用伪类 + transform
```
.failTipContent {
    font-size: 13px;
    color: #fff;
    background: #434A5F;
    border-radius: 4px;
    padding: 5px 9px;
    word-break: break-all;
    z-index: 9;

    //向下伪类三角
    &::after {
        content: '';
        width: 10px;
        height: 10px;
        background: #434A5F;
        position: absolute;
        bottom: -5px;
        left: 18px;
        transform: translateX(-50%) rotate(135deg);
    }
}
```
#### 从 html 元素继承 box-sizing

```css
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
```
>这样的好处在于他不会覆盖其他组件的 box-sizing 值，又无需为每一个元素重复设置 box-sizing:border-box;。

#### 文字超出省略、文字两端对齐
```css

```


**2019.10.21**
####   box-sizing
```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

####  unset
CSS关键字,
- 从其父级继承，则将该属性重新设置为继承的值，该值等同于 inherit
- 如果没有继承父级样式，则将该属性重新设置为初始值,该值等同于 initial

重置元素的属性时，不需要重置每个单独的属性：

```css
button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 0;
}
```
重置css button时，我们会一个一个值进行设置，可以用unset完美解决
```css
button {
  all: unset;
}
```
####  使用 :not() 选择器来决定表单是否显示边框
```css
.nav li:not(:last-child){
    border-right: 1px solid #666;
}
```

####  垂直居中任何元素
1. flex 布局
2. grid布局
```css
body {
  display: grid;
  height: 100vh;
  margin: 0;
  place-items: center center;
}
```
#### 使用 .not()
#### 隐藏没有静音、自动播放的影片
```css
video[autoplay]:not(muted){
    display: none;
}
```
####  使列表的每项都由固定符合分隔，如逗号、【】
1. 逗号分割
```css
.span_map:not(:last-child)::after{
  content: ',';
}
```
2.【】区分
```css
.span::before{
  content: '【';
}
.span::after{
  content: '】';
}
```
注意： 这一技巧对于无障碍，特别是屏幕阅读器而言并不理想。而且复制粘贴并不会带走CSS生成的内容，需要注意。


####  使用负的 nth-child 来选择元素
```css
li {
  display: none;
}

/* 选择第 1 至第 3 个元素并显示出来 */
li:nth-child(-n+3) {
  display: block;
}
/*或*/
/* 选择除前3个之外的所有项目，并显示它们 */
li:not(:nth-child(-n+3)) {
  display: none;
}
```

####  使用 max-height 来建立纯 CSS 的滑块
max-height
####  当 <a> 元素没有文本内容，但有 href 属性的时候，显示它的 href 属性：
a[href^="http"]:empty::before {
  content: attr(href);
}

####  给 “默认” 链接定义样式
```css
a[href]:not([class]) {
  color: #008000;
  text-decoration: underline;
}
```

####  一致垂直节奏
通用选择器 (*) 跟元素一起使用，可以保持一致的垂直节奏：
(可以用于每一层级即每一个块元素之间的间距)
```css
.intro > * {
  margin-bottom: 1.25rem;
}

```

####  固定比例盒子
>要创建具有固定比例的一个盒子，所有你需要做的就是给 div 的顶部或底部设置一个 padding：
使用 20％ 的 padding-bottom 使得框等于其宽度的 20％ 的高度。与视口宽度无关，子元素的 div 将保持其宽高比（100％/ 20％= 5:1）。
```css

```
####  用 rem 来调整全局大小；用 em 来调整局部大小
#### 禁用按钮上的默认指针事件: pointer-events: none;
```css
.button-disabled{
    opacity: 0.5;
    pointer-events: none;
}
```





