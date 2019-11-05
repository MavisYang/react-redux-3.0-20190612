### javascript 忍者秘籍第2版
**2019/11/01**
### 函数定义
1. 函数声明和函数表达式
2. 函数构造函数<br/>
3. 箭头函数（es6）<br/>
4. 生成器函数(es6） <br/>

#### 1.函数声明和函数表达式
```js
function myFuncDe() {
  return '函数声明'
}

const myFunc = function(){//函数表达式作为变量声明赋值语句中的一部分
    return '函数表达式'
}
myFunc(function() { //函数表达式作为一次函数调用中的参数
  return function() {//函数表达式作为函数返回值
  }
})

(function named() {
  
})() //作为函数调用的一部分，命名函数表达式会被立即调用（立即函数）
```
#### 3.箭头函数
```js
const greet = name =>'Greetings' + name;//定义箭头函数
greet('Oishi') //调用
```
### 函数的实参和行参
1. 行参是我们定义函数时所列举的变量；（函数定义时指定的值）<br/>
2. 实参是我们调用函数时所传递给函数的值。（函数调用时所传给函数的值）

##### 剩余参数
```js
function multiMax(first,...remainingMumbers) {//剩余参数以...作为前缀
}
 multiMax(1,3,21,6) //由于函数的第三个参数是剩余参数，故所有的剩余参数（3,21,6）都被放在了一个新的数组里
multiMax()//undefined
```
##### 默认参数
```js
function performAction(state,action = 'skulking') {//es6可以为函数的行参赋值
  return state + ' ' + action
}
```
```js
 const a =(()=>'Tomoe')(); //Tomoe
 const b = (()=>{'Toshi'})();//undefined
```

### 构造函数
使用关键词new调用函数会触发以下几个动作
1。创建一个新的空对象
2。该对象作为this参数传递给构造函数，从而成为构造函数的函数上下文；
3。新构造的对象作为new运算符的返回值

```
function what() {
    console.log(this) //this指向what()函数
    this.skulk = function () {
        return this;//'构造函数'
    }

}
let newWhat = new what()
console.log(newWhat,'newWhat')//{skulk: ƒ}skulk: ƒ ()__proto__: Object
```
**当使用关键词new调用函数时，会创建一个空的对象实例兵将其设置为构造函数的上下文（this参数）**                     
