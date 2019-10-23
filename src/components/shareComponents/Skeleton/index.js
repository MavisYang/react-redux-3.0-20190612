import React from "react";
import {Skeleton} from "antd";
import 'antd/lib/skeleton/style/index.css'

function SkeletonCom(props) {
    return(
        <Skeleton
            loading={props.loading}
            avatar={props.avatar}
            active={props.active}
            paragraph={props.paragraph}
            title={props.title}
        >
            {props.children?props.children:null}
        </Skeleton>
    )
}
export default SkeletonCom;

/**
 *  paragraph={{ rows: 4 ,width:500}}
 * avatar={{size:large,shape:circle}}
 size	设置头像占位图的大小	number | Enum{ 'large', 'small', 'default' }
 shape	指定头像的形状	Enum{ 'circle', 'square' }
 *
 * */