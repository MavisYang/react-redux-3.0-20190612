import React, {Fragment} from "react";

export default function ShareTech() {
    return(
        <div className='container'>
            <Share_10_25/>
        </div>
    )
}

function Share_10_25() {
    return(
        <Fragment>
            <h2>递归算法(2019.10.25)</h2>
            <div>
                面试时会经常碰到这个问题，但一直都不是很理解，主要是在开发过程中很少应用。<br/>
                最直接得理解：自己调用自己，就叫递归。<br/>
                编写正确的递归算法，一定要有 ”归“ 的步骤，也就是说递归算法，在分解问题到不能再分解的步骤时，要让递归有退出的条件，否则就会陷入死循环，最终导致内存不足引发栈溢出异常
            </div>

        </Fragment>

    )
}