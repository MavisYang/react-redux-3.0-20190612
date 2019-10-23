
**2019/10/21**
## CSS技巧
- [CSS 专业技巧](https://github.com/AllThingsSmitty/css-protips/tree/master/translations/zh-CN)

### [animate.css](https://daneden.github.io/animate.css/)

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






