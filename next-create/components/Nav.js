import React, { useState } from 'react';
import Link from 'next/link';

const Nav = function () {
    const [WeChat, setWeChat] = useState({a: 1})

    return(
        <div className="list">
            <div onClick={()=>setWeChat({a: 2})}>{WeChat.a}</div>
        </div>
    )
}

export default Nav