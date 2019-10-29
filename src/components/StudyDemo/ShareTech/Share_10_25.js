import React, {Fragment, useEffect} from "react";


export default function Share_10_25() {
    useEffect(()=>{
        console.log(func1(10))//
        console.log(tenToTwo(100))// "1100100"
    },[])

    const func1 = (n)=>{
        //0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233....
        if(n===0){
            return 0
        }
        if(n===1){
            return 1
        }
        return func1(n - 1) + func1(n - 2)
    }

    function tenToTwo(number){
        let intNum = Math.floor(number / 2)
        let restNum = number % 2
        if (intNum > 1) {
            return tenToTwo(intNum) + new String(restNum)
        } else {
            return new String(intNum) + new String(restNum)
        }
    }

    function arrayToTree(items, id = null, link = 'parent_id') {
        items.filter(item => item.id === items[link].id) //先找到父级，
            .map(item => ({...item, children: arrayToTree(item, item.id)}))//然后通过map，重组数据（自己的数据+children数据）
    }

    return(
        <Fragment>
            <h2>递归算法(2019.10.25)</h2>
            <div>
                面试时会经常碰到这个问题，但一直都不是很理解，主要是在开发过程中很少应用。<br/>
                最直接得理解：自己调用自己，就叫递归。<br/>
                编写正确的递归算法，一定要有 ”归“ （有return返回值）的步骤，也就是说递归算法，<br/>
                在分解问题到不能再分解的步骤时，要让递归有退出的条件，否则就会陷入死循环，最终导致内存不足引发栈溢出异常。<br/>
                递归算法有点像数学题中的找规律，用简便的方法做出题来。
            </div>

            <h4>递归的几种方式</h4>
            <h5>1. 阶乘</h5>
            <h5>2. 斐波那契数列</h5>
            <div>
                用文字来说，就是费波那契数列由0和1开始，之后的费波那契系数就是由之前的两数相加而得出。首几个费波那契系数是：<br/>
                0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233....<br/>
            </div>
            <h5>3. 十进制转二进制</h5>
            <h5>4. 阿里面试题目（树结构）</h5>

        </Fragment>

    )
}