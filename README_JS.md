- JavaScript 工具函数大全（新）
- console
- 窥探数据结构的世界-ES6版




**2019.10.22**

### [「中高级前端面试」JavaScript手写代码无敌秘籍](https://juejin.im/post/5c9c3989e51d454e3a3902b6)



### [中高级前端」窥探数据结构的世界- ES6版](https://juejin.im/post/5cd1ab3df265da03587c142a)
1.2 八大常见的数据结构
1. 数组：Array
2. 堆栈：Stack
3. 队列：Queue
4. 链表：Linked Lists
5. 树：Trees
6. 图：Graphs
7. 字典树：Trie
8. 散列表（哈希表）：Hash Tables

#### 2. 堆栈：Stack
>Push从底部添加
>Pop从底部往顶部删除

>unshift从顶部添加
>shift从顶部往底部删除

三句话解释堆栈：
 
1. 两个原则操作：push和pop。Push 将元素添加到数组的顶部，而Pop将它们从同一位置删除。
2. 遵循"Last In，First Out"，即：LIFO，后进先出。
3. 没了。

#### 3. 队列：Queue
1. 只是具有两个主要操作的数组：unshift和pop。
2. 遵循"Fist In，first out"即：FIFO，先进先出。

#### 4. 链表：Linked Lists

单链表的操作核心有：
- push（value） - 在链表的末尾/头部添加一个节点
- pop（） - 从链表的末尾/头部删除一个节点
- get（index） - 返回指定索引处的节点
- delete（index） - 删除指定索引处的节点
- isEmpty（） - 根据列表长度返回true或false
- print（） - 返回链表的可见表示



### [console](https://juejin.im/post/5d9eea84e51d4577eb5d8510)

1. 变量打印：%s、%o、%d、和%c
```js
console.log('%c 文本1', 'font-size:50px; background: ; text-shadow: 10px 10px 10px blue')
```
2. 打印对象的小技巧
```js
console.log({hello, world});
```
3. 布尔断言打印：console.assert()
4. 给console编组：console.group()
5. 测试执行效率：console.time()
6. 输出表格：console.table()
7. 打印DOM对象节点：console.dir()
```js
console.log({name:1,age:2})
//{name: 1, age: 2}
undefined
console.dir({name:1,age:2})
// Object {age: 2 name: 1}
undefined
```

**2019/10/21**

[JavaScript 工具函数大全（新）](https://juejin.im/post/5da1a04ae51d45783d6122bf)

- 第一部分：数组
- 第二部分：函数
- 第三部分：字符串
- 第四部分：对象
- 第五部分：数字
- 第六部分：浏览器操作及其它

### 数组
1. all：布尔全等判断
```js

const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

2. allEqual：检查数组各项相等
```js
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
10. compact：去除数组中的无效/无用值
>compact：去除数组中的无效/无用值
在使用delete删除数组时，会多一个[empty, 23, 4] empty的数组，所以需要将清除
const compact = arr => arr.filter(Boolean);
compact([empty, 23, 4])
> 或者用lodash中的_.compact</p>

18. intersection：两数组的交集

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```

19. intersectionWith：两数组都符合条件的交集
```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
```
24. sample：在指定数组中获取随机数
 
```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
sample([3, 7, 9, 11]); // 9

```
27.nest：根据parent_id生成树结构（阿里一面真题）
很重要的一题
```js
const comments = [
    {id: 1, parent_id: null, sort: 0, name: '菜单1'},
    {id: 2, parent_id: 1, sort: 0, name: '菜单1-1'},
    {id: 3, parent_id: 1, sort: 0, name: '菜单1-2'},
    {id: 4, parent_id: 2, sort: 2, name: '菜单1-1-2'},
    {id: 5, parent_id: 4, sort: 3, name: '菜单1-1-2-1'},
    {id: 6, parent_id: null, sort: 0, name: '菜单2'},
    {id: 7, parent_id: 6, sort: 0, name: '菜单2-1'},
];
const nest = (items, id = null, link = 'parent_id') =>
items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));

const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
```

### 函数
### 字符串
1.byteSize：返回字符串的字节长度
```js
const byteSize = str => new Blob([str]).size
```

3.capitalizeEveryWord：每个单词首字母大写
```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]g/,char=>char.toUpperCase())
```
5. luhnCheck：银行卡号码校验（luhn算法）

7. stripHTMLTags：删除字符串中的HTMl标签
```js
const stripHTMLTags = str=>str.replace(/<[^>]*>/g,'')
```

### 对象


```js
new Date().toTimeString()
"17:31:18 GMT+0800 (中国标准时间)"
new Date().toDateString()
"Mon Oct 21 2019"
new Date().toGMTString()
"Mon, 21 Oct 2019 09:31:33 GMT"
```

### 数字

### 浏览器操作及其它
1.返回当前链接url
```js
const currentHref = ()=> window.location.href
```
10. httpsRedirect：HTTP 跳转 HTTPS
```js
const httpsRedirect =()=>{
    if(location.protocol !=='https') 
        location.replace('https://' + location.href.split('//')[1])
}
```
13. isBrowser：检查是否为浏览器环境
```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)

```
15. nodeListToArray：转换nodeList为数组
```js
const nodeListToArray = nodeList => [...nodeList]
```
16. Random Hexadecimal Color Code：随机十六进制颜色
```js

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // "#e34155"

```
17. scrollToTop：平滑滚动至顶部
```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop();

```

18. smoothScroll：滚动到指定元素区域
```js
const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
  
smoothScroll('#fooBar'); 
smoothScroll('.fooBar'); 

```

20. getScrollPosition：返回当前的滚动位置

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

getScrollPosition(); // {x: 0, y: 200}
```






